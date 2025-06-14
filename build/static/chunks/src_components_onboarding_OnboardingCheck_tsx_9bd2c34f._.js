(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/onboarding/OnboardingCheck.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>OnboardingCheck)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function OnboardingCheck({ children }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isReady, setIsReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const checkOnboardingStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OnboardingCheck.useCallback[checkOnboardingStatus]": async (userId)=>{
            try {
                console.log("[OnboardingCheck] Checking or creating user:", userId);
                await fetch("/api/users/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId
                    })
                });
                const response = await fetch("/api/check-onboarding", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userId
                    })
                });
                const data = await response.json();
                if (!data.onboardingCompleted) {
                    console.log("[OnboardingCheck] Redirecting to /onboarding");
                    router.push("/onboarding");
                } else {
                    console.log("[OnboardingCheck] Onboarding complete");
                    setIsReady(true);
                }
            } catch (error) {
                console.error("[OnboardingCheck] Failed:", error);
                setIsReady(true); // allow fallback render
            }
        }
    }["OnboardingCheck.useCallback[checkOnboardingStatus]"], [
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OnboardingCheck.useEffect": ()=>{
            const fetchUser = {
                "OnboardingCheck.useEffect.fetchUser": async ()=>{
                    try {
                        const response = await fetch("/auth/profile");
                        const contentType = response.headers.get("content-type");
                        if (!contentType?.includes("application/json")) {
                            console.warn("[OnboardingCheck] Invalid content type:", contentType);
                            setIsReady(true);
                            return;
                        }
                        if (response.ok) {
                            const user = await response.json();
                            console.log("[OnboardingCheck] User loaded:", user?.sub);
                            if (user?.sub) {
                                checkOnboardingStatus(user.sub);
                            } else {
                                setIsReady(true);
                            }
                        } else {
                            console.warn("[OnboardingCheck] Failed to fetch user");
                            setIsReady(true);
                        }
                    } catch (err) {
                        console.error("[OnboardingCheck] Error fetching user:", err);
                        setIsReady(true);
                    }
                }
            }["OnboardingCheck.useEffect.fetchUser"];
            fetchUser();
        }
    }["OnboardingCheck.useEffect"], [
        checkOnboardingStatus
    ]);
    if (!isReady) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "Not working!"
    }, void 0, false, {
        fileName: "[project]/src/components/onboarding/OnboardingCheck.tsx",
        lineNumber: 82,
        columnNumber: 24
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: children
    }, void 0, false);
}
_s(OnboardingCheck, "4N+17AGBt+1IS0uXCiTr/lHCG/Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = OnboardingCheck;
var _c;
__turbopack_context__.k.register(_c, "OnboardingCheck");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_components_onboarding_OnboardingCheck_tsx_9bd2c34f._.js.map