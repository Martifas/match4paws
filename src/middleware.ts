import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth0 } from "./lib/auth0";

// Helper function to get management token and fetch user metadata
async function getUserMetadata(userId: string) {
  try {
    // Get Management API token
    const tokenResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.AUTH0_M2M_CLIENT_ID,
        client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
        grant_type: 'client_credentials'
      })
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      console.error('Failed to get management token:', tokenData);
      return {};
    }

    // Fetch user metadata
    const userResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/api/v2/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'Content-Type': 'application/json'
      }
    });

    const userData = await userResponse.json();
    
    if (!userResponse.ok) {
      console.error('Failed to fetch user data:', userData);
      return {};
    }

    return userData.user_metadata || {};
  } catch (error) {
    console.error('Error fetching user metadata:', error);
    return {};
  }
}

export async function middleware(request: NextRequest) {
  const auth0Response = await auth0.middleware(request);

  if (auth0Response.status !== 200) {
    return auth0Response;
  }

  const session = await auth0.getSession(request);

  if (session?.user) {
    const { pathname } = request.nextUrl;

    console.log("=== MIDDLEWARE DEBUG ===");
    console.log("Pathname:", pathname);
    console.log("User:", session.user.email || session.user.sub);

    // Skip API calls and auth routes to avoid infinite loops
    if (pathname.startsWith("/api") || pathname.startsWith("/auth")) {
      console.log("Skipping API/auth route");
      console.log("=== END MIDDLEWARE DEBUG ===");
      return auth0Response;
    }

    // Fetch user metadata from Auth0 Management API
    const userMetadata = await getUserMetadata(session.user.sub);
    console.log("Fetched user metadata:", JSON.stringify(userMetadata, null, 2));
    console.log("Onboarding completed:", userMetadata.onboardingCompleted);

    if (!pathname.startsWith("/onboarding")) {
      if (!userMetadata.onboardingCompleted) {
        console.log("❌ Redirecting to onboarding - user has not completed onboarding");
        return NextResponse.redirect(new URL("/onboarding", request.url));
      } else {
        console.log("✅ User has completed onboarding, allowing access");
      }
    }

    if (pathname.startsWith("/onboarding") && userMetadata.onboardingCompleted) {
      console.log("❌ Redirecting away from onboarding - user already completed");
      return NextResponse.redirect(new URL("/", request.url));
    }

    console.log("=== END MIDDLEWARE DEBUG ===");
  } else {
    console.log("❌ No session found");
  }

  return auth0Response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/auth).*)",
  ],
};