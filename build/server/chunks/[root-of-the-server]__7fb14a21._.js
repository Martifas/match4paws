module.exports = {

"[project]/.next-internal/server/app/api/update-onboarding/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({});
}}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}}),
"[project]/src/app/api/update-onboarding/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "POST": (()=>POST)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
async function POST(req) {
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
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: "Missing user ID or Auth0 domain"
            }, {
                status: 400
            });
        }
        console.log('🔑 Getting management token...');
        const authRes = await fetch(`https://${domain}/oauth/token`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                client_id: process.env.AUTH0_M2M_CLIENT_ID,
                client_secret: process.env.AUTH0_M2M_CLIENT_SECRET,
                audience: `https://${domain}/api/v2/`,
                grant_type: "client_credentials"
            })
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
                onboardingCompleted: true,
                onboardingCompletedAt: new Date().toISOString() // camelCase
            }
        };
        console.log('📝 Updating user with payload:', JSON.stringify(updatePayload, null, 2));
        const updateRes = await fetch(`https://${domain}/api/v2/users/${userId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatePayload)
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
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err) {
        console.log('❌ API Error:', err.message);
        console.log('=== API DEBUG END (ERROR) ===');
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: err.message
        }, {
            status: 500
        });
    }
}
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__7fb14a21._.js.map