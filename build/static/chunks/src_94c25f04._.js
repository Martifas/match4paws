(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/ui/buttons/ToggleChip.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ToggleChip)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function defaultGetId(item) {
    return typeof item === "string" ? item : item.id;
}
function ToggleChip({ items, selected, onChange, render, getId = defaultGetId }) {
    const setValue = (next)=>onChange(next);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-2",
        children: items.map((item)=>{
            const id = getId(item);
            const active = id === selected;
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: ()=>setValue(active ? null : id),
                className: [
                    "rounded-full border px-4 py-1 text-sm transition shadow-sm",
                    active ? "bg-orange-500 text-white border-orange-500" : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                ].join(" "),
                children: render(item, active)
            }, id, false, {
                fileName: "[project]/src/components/ui/buttons/ToggleChip.tsx",
                lineNumber: 45,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/ui/buttons/ToggleChip.tsx",
        lineNumber: 39,
        columnNumber: 5
    }, this);
}
_c = ToggleChip;
var _c;
__turbopack_context__.k.register(_c, "ToggleChip");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/assets/DogIcon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const DogIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 36 36",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        role: "img",
        preserveAspectRatio: "xMidYMid meet",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#D99E82",
                d: "M31.034 14.374c3.508-.65 3.587-6.297-.051-6.254c-2.847.034-2.56 2.795-2.945 2.252c-.748-1.055-.989-3.769 1.862-4.894c2.461-.971 5.846.996 6.063 4.591c.139 2.302-1.297 6.554-6.453 5.846c-7.222-.991-1.983-.892 1.524-1.541z"
            }, void 0, false, {
                fileName: "[project]/src/assets/DogIcon.tsx",
                lineNumber: 11,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#C1694F",
                d: "M10.321 21.935s1.016 2.352.676 8.242c-.061 1.057-.209 2.136-.242 3.022c-1.812 0-1.652 2.064-1.268 2.064h2.902c.683 0 1.893-3.438 2.212-8.209c.319-4.772-4.28-5.119-4.28-5.119zm11.89-.331s.575 3.528 3.651 6.413c.257 1.163.769 4.232.949 5.195c-1.889 0-1.282 2.047-.731 2.047h2.646c.951 0 1.092-3.442.206-7.694c-.885-4.251-6.721-5.961-6.721-5.961z"
            }, void 0, false, {
                fileName: "[project]/src/assets/DogIcon.tsx",
                lineNumber: 15,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#D99E82",
                d: "M32.202 15.654c-1.253-3.752-7.214-3.628-13.997-2.765c-3.055.389-3.64-4.453-3.64-5.286c0-3.626-3.244-5.455-6.496-4.229c-.779.293-1.402 1.33-1.754 1.872c-1.977 3.037-4.658.015-4.917 2.822c-.313 3.395 1.721 4.534 5.051 4.821c1.892.163 3.459 1.095 3.871 5.044c.154 1.472-.295 5.644 2.388 7.076c.78 2.959 1.836 6.615 2.25 8.475c-2.252.476-1.341 2.179-1.341 2.179s3.151-.043 3.836-.043c.814 0 .191-5.976-.935-9.787c4.764.043 7.828-1.337 8.799-1.762c1.028 2.96 4.152 3.633 4.851 4.892c.433.78 1.878 3.383 2.001 4.496c-1.602.52-1.091 1.732-.909 2.122c1.083-.043 3.22-.043 3.498-.043c1.11 0-1.137-6.904-2.083-8.713c-1.082-2.071.781-7.419-.473-11.171z"
            }, void 0, false, {
                fileName: "[project]/src/assets/DogIcon.tsx",
                lineNumber: 19,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#F4C7B5",
                d: "M16.266 24.464c.044.371.141.891.253 1.369c4.764.043 7.828-1.337 8.799-1.762c-.215-.78-.23-1.27-.171-1.538c-3.394.557-4.548 2.205-8.881 1.931zM6.449 12.889c1.892.163 2.425 1.069 2.838 5.018c.154 1.472.739 5.67 3.421 7.102c-.72-2.788-1.959-12.388-6.259-12.12z"
            }, void 0, false, {
                fileName: "[project]/src/assets/DogIcon.tsx",
                lineNumber: 23,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#F4C7B5",
                d: "M3.153 6.665c-2.793 0-1.909.526-2.002 1.692c-.093 1.166-.074 2.976.776 3.929c1.127 1.262 3.858 1.266 5.215.277s-.424-5.898-3.989-5.898z"
            }, void 0, false, {
                fileName: "[project]/src/assets/DogIcon.tsx",
                lineNumber: 27,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#272B2B",
                d: "M2.503 8.326c-.109.762-.494 1.192-.879 1.133C.864 9.342.232 8.372.232 7.603s.624-.963 1.392-.928c1.043.048 1.002.788.879 1.651z"
            }, void 0, false, {
                fileName: "[project]/src/assets/DogIcon.tsx",
                lineNumber: 31,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#662113",
                d: "M15.167 9.026c.348 2.515-1.157 2.898-2.383 2.898s-3.054-1.25-2.748-3.77c.134-1.107.555-2.193.809-3.175c.336-1.303 1.199-1.732 1.894-1.367c1.665.874 2.203 3.797 2.428 5.414z"
            }, void 0, false, {
                fileName: "[project]/src/assets/DogIcon.tsx",
                lineNumber: 35,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                fill: "#292F33",
                cx: "8.069",
                cy: "6.675",
                r: ".928"
            }, void 0, false, {
                fileName: "[project]/src/assets/DogIcon.tsx",
                lineNumber: 39,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#C1694F",
                d: "M19.035 12.789c.073 1.532.906 3.178 2.733 3.663c1.901.505 4.12.127 4.67-2.475c.091-.43.13-1.224.073-1.514c-2.151-.179-4.73 0-7.476.326z"
            }, void 0, false, {
                fileName: "[project]/src/assets/DogIcon.tsx",
                lineNumber: 40,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                fill: "#D99E82",
                cx: "3.053",
                cy: "10.503",
                r: ".488"
            }, void 0, false, {
                fileName: "[project]/src/assets/DogIcon.tsx",
                lineNumber: 44,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                fill: "#D99E82",
                cx: "3.695",
                cy: "9.804",
                r: ".269"
            }, void 0, false, {
                fileName: "[project]/src/assets/DogIcon.tsx",
                lineNumber: 45,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                fill: "#D99E82",
                cx: "4.1",
                cy: "10.503",
                r: ".269"
            }, void 0, false, {
                fileName: "[project]/src/assets/DogIcon.tsx",
                lineNumber: 46,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/assets/DogIcon.tsx",
        lineNumber: 2,
        columnNumber: 3
    }, this);
_c = DogIcon;
const __TURBOPACK__default__export__ = DogIcon;
var _c;
__turbopack_context__.k.register(_c, "DogIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/assets/CatIcon.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const CatIcon = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "100%",
        height: "100%",
        viewBox: "0 0 36 36",
        xmlns: "http://www.w3.org/2000/svg",
        "aria-hidden": "true",
        role: "img",
        preserveAspectRatio: "xMidYMid meet",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#292F33",
                d: "M10.478 22.439s.702 2.281-.337 7.993c-.186 1.025-.46 2.072-.599 2.93c-1.757 0-1.851 2.002-1.478 2.002h2.094c1.337 0 2.971-3.334 3.854-7.961s-3.534-4.964-3.534-4.964zm13.042 3.702s2.272 1.22 2.188 4.081c-.033 1.131-.249 2.091-.355 3.024c-1.832 0-1.839 1.985-1.305 1.985h1.856c.923 0 3.001-3.158 3.379-7.281c.379-4.122-5.763-1.809-5.763-1.809z"
            }, void 0, false, {
                fileName: "[project]/src/assets/CatIcon.tsx",
                lineNumber: 11,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#292F33",
                d: "M36 8.447C36 3.525 31.859 1 27 1a1 1 0 1 0 0 2c1.804 0 6.717.934 6.717 5.447c0 2.881-1.567 5.462-3.77 5.982c-.164-.073-.345-.104-.509-.192c-7.239-3.917-13.457.902-15.226-.29c-1.752-1.182-.539-3.255-2.824-5.243c-.33-1.841-1.073-4.477-1.794-4.477c-.549 0-1.265 1.825-1.74 3.656c-.591-1.381-1.363-2.756-1.86-2.756c-.64 0-1.278 2.273-1.594 4.235c-1.68 1.147-2.906 2.809-2.906 4.765c0 2.7 4.05 3.357 5.4 3.411c1.35.054 3.023 3.562 3.585 5.072c1.242 4.367 2.051 8.699 2.698 11.183c-1.649 0-1.804 2.111-1.348 2.111c.713 0 1.953-.003 2.225 0c1.381.014 2.026-4.706 2.026-8.849c0-.212-.011-.627-.011-.627s1.93.505 6.038-.208c2.444-.424 5.03.849 5.746 3.163c.527 1.704 1.399 3.305 1.868 4.484c-1.589 0-1.545 2.037-1.084 2.037c.787 0 1.801.014 2.183 0c1.468-.055.643-7.574 1.03-10.097s1.267-5.578-.229-8.797C34.857 15.236 36 11.505 36 8.447z"
            }, void 0, false, {
                fileName: "[project]/src/assets/CatIcon.tsx",
                lineNumber: 15,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                fill: "#C3C914",
                cx: "5.994",
                cy: "11.768",
                r: ".9"
            }, void 0, false, {
                fileName: "[project]/src/assets/CatIcon.tsx",
                lineNumber: 19,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#66757F",
                d: "M2.984 12.86c-.677.423-.677 1.777-1.015 1.777S.954 13.841.954 12.86c-.001-.981 2.862-.52 2.03 0zm3.594 1.483c-.041.026-.09.036-.142.026c-.018-.004-1.548-.241-2.545.146c-.129.05-.341-.023-.413-.191s.023-.365.152-.415c1.44-.569 2.857-.234 2.934-.218c.139.029.195.19.188.372c-.004.114-.104.235-.174.28zm-.472 2.339a.186.186 0 0 1-.141-.031c-.015-.01-1.331-.83-2.402-.853c-.138-.003-.305-.154-.305-.341c0-.186.165-.335.304-.333c1.552.024 2.724.891 2.789.937c.117.082.104.255.027.424c-.049.107-.189.182-.272.197z"
            }, void 0, false, {
                fileName: "[project]/src/assets/CatIcon.tsx",
                lineNumber: 20,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M7.854 7.881s.372-.039.859.033c.217-.46.585-.887.585-.887s.281.668.386 1.179c.025.12.218.117.322.189c0 0 .038-3.463-.863-3.836c.001-.002-.755 1.124-1.289 3.322zM4.399 9.36s.384-.267.883-.574c.217-.624.568-1.333.568-1.333s.307.602.345.81c.21-.114.21-.106.403-.19c0 0-.114-2.286-1.099-2.527c0 0-.732 1.372-1.1 3.814z",
                fill: "#7F676D"
            }, void 0, false, {
                fileName: "[project]/src/assets/CatIcon.tsx",
                lineNumber: 24,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#66757F",
                d: "M18.45 23.644c-2.649.57-2.38 2.782-2.38 2.782s1.93.505 6.038-.208a5.542 5.542 0 0 1 3.107.377c-1.607-3.047-4.315-3.479-6.765-2.951z"
            }, void 0, false, {
                fileName: "[project]/src/assets/CatIcon.tsx",
                lineNumber: 28,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                fill: "#292F33",
                d: "M5.976 10.982s.333.347.319.778c-.014.43-.25.833-.25.833s-.292-.347-.319-.826c-.027-.48.25-.785.25-.785z"
            }, void 0, false, {
                fileName: "[project]/src/assets/CatIcon.tsx",
                lineNumber: 32,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/assets/CatIcon.tsx",
        lineNumber: 2,
        columnNumber: 3
    }, this);
_c = CatIcon;
const __TURBOPACK__default__export__ = CatIcon;
var _c;
__turbopack_context__.k.register(_c, "CatIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/constants/pet.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "AGES": (()=>AGES),
    "GENDERS": (()=>GENDERS),
    "PAGE_SIZE": (()=>PAGE_SIZE),
    "PET_FILTERS": (()=>PET_FILTERS),
    "PET_TYPES": (()=>PET_TYPES),
    "SIZES": (()=>SIZES)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$DogIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/assets/DogIcon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$CatIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/assets/CatIcon.tsx [app-client] (ecmascript)");
;
;
const PET_TYPES = [
    {
        id: 'dog',
        label: 'Dog',
        IconComponent: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$DogIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    },
    {
        id: 'cat',
        label: 'Cat',
        IconComponent: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$CatIcon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    }
];
const GENDERS = [
    {
        id: 'any',
        label: 'Any'
    },
    {
        id: 'male',
        label: 'Male'
    },
    {
        id: 'female',
        label: 'Female'
    }
];
const SIZES = [
    {
        id: 'small',
        label: 'Small'
    },
    {
        id: 'medium',
        label: 'Medium'
    },
    {
        id: 'large',
        label: 'Large'
    }
];
const AGES = [
    {
        id: 'baby',
        label: 'Baby'
    },
    {
        id: 'young',
        label: 'Young'
    },
    {
        id: 'adult',
        label: 'Adult'
    },
    {
        id: 'senior',
        label: 'Senior'
    }
];
const PET_FILTERS = [
    {
        id: 'cat',
        label: 'Cat'
    },
    {
        id: 'dog',
        label: 'Dog'
    },
    {
        id: 'female',
        label: 'Female'
    },
    {
        id: 'male',
        label: 'Male'
    },
    {
        id: 'small',
        label: 'Small'
    },
    {
        id: 'medium',
        label: 'Medium'
    },
    {
        id: 'large',
        label: 'Large'
    },
    {
        id: 'baby',
        label: 'Baby'
    },
    {
        id: 'young',
        label: 'Young'
    },
    {
        id: 'adult',
        label: 'Adult'
    },
    {
        id: 'senior',
        label: 'Senior'
    }
];
const PAGE_SIZE = 9;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/hooks/usePetSearch.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>usePetSearch)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$pet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/pet.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function usePetSearch(query, limit = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$pet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PAGE_SIZE"]) {
    _s();
    const page = Number(query.get('page') ?? 1);
    const [pets, setPets] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [total, setTotal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "usePetSearch.useEffect": ()=>{
            const run = {
                "usePetSearch.useEffect.run": async ()=>{
                    try {
                        setLoading(true);
                        const res = await fetch(`/api/pets/search?${query.toString()}`);
                        const json = await res.json();
                        setPets(json.pets);
                        setTotal(json.totalCount);
                        setError(null);
                    } catch  {
                        setError('Failed to load pets');
                    } finally{
                        setLoading(false);
                    }
                }
            }["usePetSearch.useEffect.run"];
            run();
        }
    }["usePetSearch.useEffect"], [
        query
    ]);
    const totalPages = Math.max(1, Math.ceil(total / limit));
    return {
        pets,
        page,
        totalPages,
        loading,
        error
    };
}
_s(usePetSearch, "NYVP5330jWlE3m6u+oHk03Jw+ec=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/buttons/FavoriteButton.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>FavoriteButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Favorite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Favorite.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$FavoriteBorderOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/FavoriteBorderOutlined.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function FavoriteButton({ petId, initiallyFav, onUnfavorited, onFavoriteRestored }) {
    _s();
    const [isFavorite, setIsFavorite] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initiallyFav);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const handleClick = async (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setIsLoading(true);
        const newFavoriteState = !isFavorite;
        const previousFavoriteState = isFavorite;
        setIsFavorite(newFavoriteState);
        if (!newFavoriteState && onUnfavorited) {
            onUnfavorited(petId);
        }
        try {
            const response = await fetch("/api/favorites", {
                method: newFavoriteState ? "POST" : "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    petId
                })
            });
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
        } catch (error) {
            console.error("Failed to update favorite:", error);
            setIsFavorite(previousFavoriteState);
            if (!newFavoriteState && onFavoriteRestored) {
                onFavoriteRestored(petId);
            }
        } finally{
            setIsLoading(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: handleClick,
        disabled: isLoading,
        className: `
        p-2 rounded-full transition-all duration-200 z-10 relative
        ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:scale-105"}
        ${!isLoading ? "hover:bg-orange-200" : ""}
      `,
        style: {
            color: "#ed9426",
            backgroundColor: isFavorite ? "rgba(237, 148, 38, 0.15)" : "transparent"
        },
        onMouseEnter: (e)=>{
            if (!isLoading) {
                e.currentTarget.style.backgroundColor = "rgba(237, 148, 38, 0.3)";
            }
        },
        onMouseLeave: (e)=>{
            if (!isLoading) {
                e.currentTarget.style.backgroundColor = isFavorite ? "rgba(237, 148, 38, 0.15)" : "transparent";
            }
        },
        "aria-label": isFavorite ? "Remove from favorites" : "Add to favorites",
        children: isFavorite ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Favorite$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/components/ui/buttons/FavoriteButton.tsx",
            lineNumber: 89,
            columnNumber: 21
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$FavoriteBorderOutlined$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/components/ui/buttons/FavoriteButton.tsx",
            lineNumber: 89,
            columnNumber: 40
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/buttons/FavoriteButton.tsx",
        lineNumber: 61,
        columnNumber: 5
    }, this);
}
_s(FavoriteButton, "m842hbud29uWLtrLlV3wBrf+dOE=");
_c = FavoriteButton;
var _c;
__turbopack_context__.k.register(_c, "FavoriteButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/pet/petInfo/SearchPetCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SearchPetCard)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$buttons$2f$FavoriteButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/buttons/FavoriteButton.tsx [app-client] (ecmascript)");
'use client';
;
;
;
;
function SearchPetCard({ id, name, imageUrl, isFavorite = false, onUnfavorited, onFavoriteRestored }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative block overflow-hidden hover:opacity-80",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: `/pet/${id}`,
                children: [
                    imageUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        src: imageUrl,
                        alt: name,
                        width: 400,
                        height: 300,
                        className: "md:h-48 h-38 w-full object-cover rounded-xl"
                    }, void 0, false, {
                        fileName: "[project]/src/components/pet/petInfo/SearchPetCard.tsx",
                        lineNumber: 31,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 space-y-1",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-semibold text-lg",
                            children: name
                        }, void 0, false, {
                            fileName: "[project]/src/components/pet/petInfo/SearchPetCard.tsx",
                            lineNumber: 41,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/pet/petInfo/SearchPetCard.tsx",
                        lineNumber: 40,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/pet/petInfo/SearchPetCard.tsx",
                lineNumber: 29,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-2 right-2",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$buttons$2f$FavoriteButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    petId: id,
                    initiallyFav: isFavorite,
                    onUnfavorited: onUnfavorited,
                    onFavoriteRestored: onFavoriteRestored
                }, void 0, false, {
                    fileName: "[project]/src/components/pet/petInfo/SearchPetCard.tsx",
                    lineNumber: 46,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/pet/petInfo/SearchPetCard.tsx",
                lineNumber: 45,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/pet/petInfo/SearchPetCard.tsx",
        lineNumber: 28,
        columnNumber: 5
    }, this);
}
_c = SearchPetCard;
var _c;
__turbopack_context__.k.register(_c, "SearchPetCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/containers/Header.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Header)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
function Header({ left, center, right, children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "w-full max-w-md mx-auto  md:max-w-xl py-2 flex items-center justify-between gap-4",
        children: children ? children : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-shrink-0",
                    children: left
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/containers/Header.tsx",
                    lineNumber: 22,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 text-center overflow-hidden",
                    children: center
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/containers/Header.tsx",
                    lineNumber: 23,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-shrink-0",
                    children: right
                }, void 0, false, {
                    fileName: "[project]/src/components/ui/containers/Header.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/containers/Header.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, this);
}
_c = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/buttons/BackButton.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>BackButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowBack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/ArrowBack.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function BackButton({ to, hidden, className, onClick, smartNavigation = false, ...buttonProps }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    if (hidden) return null;
    const handleClick = ()=>{
        if (onClick) {
            onClick();
        } else if (to) {
            router.push(to);
        } else if (smartNavigation) {
            const referrer = document.referrer;
            if (referrer.includes("/favorites") || pathname.startsWith("/pet/")) {
                router.push("/favorites?refresh=" + Date.now());
            } else {
                router.back();
            }
        } else {
            router.back();
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: handleClick,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("text-[#ed9426] hover:text-orange-300 hover:scale-110 font-bold", className),
        ...buttonProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$ArrowBack$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            fontSize: "large"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/buttons/BackButton.tsx",
            lineNumber: 57,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/buttons/BackButton.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
_s(BackButton, "gA9e4WsoP6a20xDgQgrFkfMP8lc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = BackButton;
var _c;
__turbopack_context__.k.register(_c, "BackButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/buttons/SearchButton.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SearchButton)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@mui/icons-material/esm/Search.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function SearchButton({ to = "/search", hidden, className, ...buttonProps }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    if (hidden) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: "button",
        onClick: ()=>router.push(to),
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("flex items-center justify-center w-9 h-9 rounded-full border border-gray-300", "hover:bg-gray-50 active:bg-gray-100", className),
        ...buttonProps,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$icons$2d$material$2f$esm$2f$Search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            fontSize: "small"
        }, void 0, false, {
            fileName: "[project]/src/components/ui/buttons/SearchButton.tsx",
            lineNumber: 34,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/ui/buttons/SearchButton.tsx",
        lineNumber: 24,
        columnNumber: 5
    }, this);
}
_s(SearchButton, "fN7XvhJ+p5oE6+Xlo0NJmXpxjC8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = SearchButton;
var _c;
__turbopack_context__.k.register(_c, "SearchButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/searchresults/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>SearchResultsPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Box/Box.js [app-client] (ecmascript) <export default as Box>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Pagination$2f$Pagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pagination$3e$__ = __turbopack_context__.i("[project]/node_modules/@mui/material/esm/Pagination/Pagination.js [app-client] (ecmascript) <export default as Pagination>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$buttons$2f$ToggleChip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/buttons/ToggleChip.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$pet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/pet.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePetSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/usePetSearch.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pet$2f$petInfo$2f$SearchPetCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/pet/petInfo/SearchPetCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$containers$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/containers/Header.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$buttons$2f$BackButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/buttons/BackButton.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$buttons$2f$SearchButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/buttons/SearchButton.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
;
;
;
;
function SearchResultsPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const limit = 12;
    const { pets, totalPages, page, loading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePetSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(params, limit);
    const setParam = (key, value)=>{
        const q = new URLSearchParams(params.toString());
        if (value) {
            q.set(key, value);
        } else {
            q.delete(key);
        }
        q.set('page', '1');
        router.replace(`/searchresults?${q.toString()}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$containers$2f$Header$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                left: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$buttons$2f$BackButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    smartNavigation: true
                }, void 0, false, {
                    fileName: "[project]/src/app/searchresults/page.tsx",
                    lineNumber: 37,
                    columnNumber: 15
                }, void 0),
                center: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-lg font-semibold",
                    children: "Search results"
                }, void 0, false, {
                    fileName: "[project]/src/app/searchresults/page.tsx",
                    lineNumber: 38,
                    columnNumber: 17
                }, void 0),
                right: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$buttons$2f$SearchButton$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/src/app/searchresults/page.tsx",
                    lineNumber: 39,
                    columnNumber: 16
                }, void 0)
            }, void 0, false, {
                fileName: "[project]/src/app/searchresults/page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                className: "px-4 py-3 space-y-3 max-w-3xl mx-auto",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$buttons$2f$ToggleChip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        items: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$pet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PET_TYPES"],
                        selected: params.get('type'),
                        onChange: (v)=>setParam('type', v),
                        getId: (p)=>p.id.toLowerCase(),
                        render: (p)=>p.label
                    }, void 0, false, {
                        fileName: "[project]/src/app/searchresults/page.tsx",
                        lineNumber: 44,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$buttons$2f$ToggleChip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        items: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$pet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GENDERS"],
                        selected: params.get('gender'),
                        onChange: (v)=>setParam('gender', v === 'any' ? null : v),
                        render: (g)=>g.label
                    }, void 0, false, {
                        fileName: "[project]/src/app/searchresults/page.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$buttons$2f$ToggleChip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        items: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$pet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SIZES"],
                        selected: params.get('size'),
                        onChange: (v)=>setParam('size', v),
                        render: (s)=>s.label
                    }, void 0, false, {
                        fileName: "[project]/src/app/searchresults/page.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$buttons$2f$ToggleChip$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        items: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$pet$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AGES"],
                        selected: params.get('age'),
                        onChange: (v)=>setParam('age', v),
                        render: (a)=>a.label
                    }, void 0, false, {
                        fileName: "[project]/src/app/searchresults/page.tsx",
                        lineNumber: 66,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/searchresults/page.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this),
            loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center py-10",
                children: "Loading…"
            }, void 0, false, {
                fileName: "[project]/src/app/searchresults/page.tsx",
                lineNumber: 76,
                columnNumber: 9
            }, this) : pets.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-3xl mx-auto px-4",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid gap-4 md:gap-6 grid-cols-2 lg:grid-cols-3 py-6",
                    children: pets.map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$pet$2f$petInfo$2f$SearchPetCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            id: p.id,
                            name: p.name,
                            age: p.ageGroup,
                            breed: p.breed,
                            size: p.size,
                            imageUrl: p.imageUrl,
                            isFavorite: p.isFavorite ?? false
                        }, p.id, false, {
                            fileName: "[project]/src/app/searchresults/page.tsx",
                            lineNumber: 81,
                            columnNumber: 15
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/src/app/searchresults/page.tsx",
                    lineNumber: 79,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/searchresults/page.tsx",
                lineNumber: 78,
                columnNumber: 9
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-center py-10 text-gray-500",
                children: "No pets match those filters yet."
            }, void 0, false, {
                fileName: "[project]/src/app/searchresults/page.tsx",
                lineNumber: 95,
                columnNumber: 9
            }, this),
            totalPages > 1 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Box$2f$Box$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Box$3e$__["Box"], {
                className: "flex justify-center pb-14",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$mui$2f$material$2f$esm$2f$Pagination$2f$Pagination$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pagination$3e$__["Pagination"], {
                    count: totalPages,
                    page: page,
                    onChange: (_, newPage)=>setParam('page', String(newPage)),
                    shape: "rounded"
                }, void 0, false, {
                    fileName: "[project]/src/app/searchresults/page.tsx",
                    lineNumber: 102,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/searchresults/page.tsx",
                lineNumber: 101,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true);
}
_s(SearchResultsPage, "GCfv+HuB+fA6QNQCP/eH+cByuj4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$usePetSearch$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    ];
});
_c = SearchResultsPage;
var _c;
__turbopack_context__.k.register(_c, "SearchResultsPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_94c25f04._.js.map