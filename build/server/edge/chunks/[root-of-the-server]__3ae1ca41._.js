(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["chunks/[root-of-the-server]__3ae1ca41._.js", {

"[externals]/node:buffer [external] (node:buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}}),
"[project]/src/lib/auth0.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "auth0": (()=>auth0)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$server$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/@auth0/nextjs-auth0/dist/server/index.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$server$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@auth0/nextjs-auth0/dist/server/client.js [middleware-edge] (ecmascript)");
;
const auth0 = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$auth0$2f$nextjs$2d$auth0$2f$dist$2f$server$2f$client$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["Auth0Client"]({
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    secret: process.env.AUTH0_SECRET,
    appBaseUrl: process.env.APP_BASE_URL
});
}}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "config": (()=>config),
    "middleware": (()=>middleware)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/spec-extension/response.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth0$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth0.ts [middleware-edge] (ecmascript)");
;
;
// Helper function to get management token and fetch user metadata
async function getUserMetadata(userId) {
    try {
        // Get Management API token
        const tokenResponse = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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
async function middleware(request) {
    const auth0Response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth0$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["auth0"].middleware(request);
    if (auth0Response.status !== 200) {
        return auth0Response;
    }
    const session = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth0$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["auth0"].getSession(request);
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
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/onboarding", request.url));
            } else {
                console.log("✅ User has completed onboarding, allowing access");
            }
        }
        if (pathname.startsWith("/onboarding") && userMetadata.onboardingCompleted) {
            console.log("❌ Redirecting away from onboarding - user already completed");
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$spec$2d$extension$2f$response$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/", request.url));
        }
        console.log("=== END MIDDLEWARE DEBUG ===");
    } else {
        console.log("❌ No session found");
    }
    return auth0Response;
}
const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/auth).*)"
    ]
};
}}),
}]);

//# sourceMappingURL=%5Broot-of-the-server%5D__3ae1ca41._.js.map