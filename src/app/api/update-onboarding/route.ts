import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    console.log('=== API DEBUG START ===');
    
    const body = await req.json();
    console.log('Request body:', body);
    
    const { userId } = body;
    const domain = process.env.AUTH0_DOMAIN;

    console.log('User ID:', userId);
    console.log('Domain:', domain);
    console.log('M2M Client ID:', process.env.AUTH0_M2M_CLIENT_ID ? 'Set' : 'Missing');
    console.log('M2M Client Secret:', process.env.AUTH0_M2M_CLIENT_SECRET ? 'Set' : 'Missing');

    if (!userId || !domain) {
      console.log('❌ Missing userId or domain');
      return NextResponse.json(
        { error: "Missing user ID or Auth0 domain" },
        { status: 400 }
      );
    }

    console.log('🔑 Getting management token...');
    const authRes = await fetch(`https://${domain}/oauth/token`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_id: process.env.AUTH0_M2M_CLIENT_ID,
        client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
        audience: `https://${domain}/api/v2/`,
        grant_type: "client_credentials",
      }),
    });

    const authData = await authRes.json();
    console.log('Auth response status:', authRes.status);
    
    if (!authRes.ok) {
      console.log('❌ Auth failed:', authData);
      throw new Error('Failed to get management token');
    }
    
    console.log('✅ Got management token');
    const { access_token } = authData;

    // Using camelCase
    const updatePayload = {
      user_metadata: {
        onboardingCompleted: true, // camelCase
        onboardingCompletedAt: new Date().toISOString() // camelCase
      }
    };

    console.log('📝 Updating user with payload:', JSON.stringify(updatePayload, null, 2));

    const updateRes = await fetch(`https://${domain}/api/v2/users/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatePayload),
    });

    console.log('Update response status:', updateRes.status);
    
    const result = await updateRes.json();
    console.log('Update result:', JSON.stringify(result, null, 2));

    if (!updateRes.ok) {
      console.log('❌ Update failed:', result);
      throw new Error('Failed to update user');
    }

    console.log('✅ User updated successfully');
    console.log('Updated user_metadata:', JSON.stringify(result.user_metadata, null, 2));
    console.log('=== API DEBUG END ===');

    return NextResponse.json(result);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log('❌ API Error:', err.message);
    console.log('=== API DEBUG END (ERROR) ===');
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}