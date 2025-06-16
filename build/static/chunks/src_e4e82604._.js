(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/assets/dog-photo.png (static in ecmascript)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v("/_next/static/media/dog-photo.de7fb13d.png");}}),
"[project]/src/assets/dog-photo.png.mjs { IMAGE => \"[project]/src/assets/dog-photo.png (static in ecmascript)\" } [app-client] (structured image object, ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$dog$2d$photo$2e$png__$28$static__in__ecmascript$29$__ = __turbopack_context__.i("[project]/src/assets/dog-photo.png (static in ecmascript)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$dog$2d$photo$2e$png__$28$static__in__ecmascript$29$__["default"],
    width: 1277,
    height: 1280,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAA+ElEQVR42g3KyU7CUBQA0Pfh/gAf4MYVRlfgjLOpNSFFE1uoSCfakJZ0gL6+oDVQ6b33Fc76sGYvFH+y/T6V7YErW89f9OqlcllWTVVjw1brbWPPl5TkgjbVP/Gfkq4Nnw66Knb1QLJ7M5Cq6dL5ZQ/6fQ1u7x7BdANsHZ/Whw8asZEzkf5shroxgquzi1rXhxCnKb5oGhqeJ9nCuaHIVtGyJvV4nyzbhiT4gKFyBImrEIu9NxzrT5BlKfJCEOc5WZ890JQOJKFDzC9KOZjOsRACwzDCJC/wRA+w8x3jal1JVgM0gmfEFzFGgYNZHJJjm5SlIW03v3IHL7vfaXoZgNcAAAAASUVORK5CYII=",
    blurWidth: 8,
    blurHeight: 8
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/onboarding/OnboardingFlow.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>OnboardingFlow)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
function OnboardingFlow({ userId, onComplete }) {
    _s();
    const [activeStep, setActiveStep] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const totalSteps = 3;
    const stepContent = [
        {
            title: 'Match4Paws - Where Furry Tales Begin',
            description: 'Embark on a heartwarming journey to find your perfect companion. Swipe, match, and open your heart to a new furry friend.'
        },
        {
            title: 'Explore a World of Companionship',
            description: 'Discover a diverse array of adorable companions, find your favorites, and let the tail-wagging adventure begin.'
        },
        {
            title: 'Connect with Caring Pet Owners Around You',
            description: 'Easily connect with pet owners, ask about animals, & make informed decisions. Match4Paws is here to guide you every step of the way.'
        }
    ];
    const finishOnboarding = async ()=>{
        try {
            const response = await fetch('/api/update-onboarding', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId
                })
            });
            if (response.ok) {
                onComplete();
            }
        } catch (error) {
            console.error('Failed to update user metadata:', error);
        }
    };
    const handleNext = ()=>{
        if (activeStep < totalSteps - 1) {
            setActiveStep((prev)=>prev + 1);
        }
    };
    const handleSkip = finishOnboarding;
    const handleContinue = ()=>{
        if (activeStep < totalSteps - 1) {
            handleNext();
        } else {
            finishOnboarding();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col justify-between flex-1 px-4 py-8 h-full",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center flex flex-1 flex-col gap-8 justify-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold text-gray-800 mb-4 leading-tight",
                        children: stepContent[activeStep].title
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-gray-600 text-xl leading-relaxed",
                        children: stepContent[activeStep].description
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-center gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-center gap-2 mt-4",
                        children: Array.from({
                            length: totalSteps
                        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `h-2 rounded-full transition-all duration-300 ${index === activeStep ? 'bg-[#ed9426] w-8' : 'bg-gray-300 w-2'}`
                            }, index, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                lineNumber: 75,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-full h-0.5 bg-[#ed9426]"
                    }, void 0, false, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 84,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `flex gap-5 w-full ${activeStep === totalSteps - 1 ? 'justify-center' : 'justify-between'}`,
                        children: [
                            activeStep < totalSteps - 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSkip,
                                className: "flex-1 text-[#ed9426] font-bold py-3 px-6 rounded-full bg-orange-50 hover:bg-orange-100 transition-colors",
                                children: "Skip"
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                lineNumber: 92,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleContinue,
                                className: `bg-[#ed9426] text-white font-bold py-3 px-6 rounded-full hover:bg-[#d17d1f] transition-colors ${activeStep === totalSteps - 1 ? 'w-full' : 'flex-1'}`,
                                children: activeStep === totalSteps - 1 ? 'Get Started' : 'Continue'
                            }, void 0, false, {
                                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                        lineNumber: 86,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/onboarding/OnboardingFlow.tsx",
        lineNumber: 62,
        columnNumber: 5
    }, this);
}
_s(OnboardingFlow, "cJXWosTT0XUh3gGn3cCcv/Y+Hws=");
_c = OnboardingFlow;
var _c;
__turbopack_context__.k.register(_c, "OnboardingFlow");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/onboarding/Onboarding.tsx [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, k: __turbopack_refresh__, m: module, e: exports } = __turbopack_context__;
{
const e = new Error(`Could not parse module '[project]/src/components/onboarding/Onboarding.tsx'

Unexpected token `(`. Expected ... , *,  (, [, :, , ?, =, an identifier, public, protected, private, readonly, <.`);
e.code = 'MODULE_UNPARSEABLE';
throw e;}}),
}]);

//# sourceMappingURL=src_e4e82604._.js.map