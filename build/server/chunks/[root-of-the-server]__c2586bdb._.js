module.exports = {

"[project]/.next-internal/server/app/api/pets/search/route/actions.js [app-rsc] (server actions loader, ecmascript)": ((__turbopack_context__) => {
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
"[externals]/fs [external] (fs, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}}),
"[externals]/path [external] (path, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}}),
"[externals]/os [external] (os, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[externals]/pg [external] (pg, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("pg");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/src/lib/db.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "db": (()=>db)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$config$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/config.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$kysely$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/kysely/dist/esm/kysely.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$postgres$2f$postgres$2d$dialect$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/kysely/dist/esm/dialect/postgres/postgres-dialect.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$camel$2d$case$2f$camel$2d$case$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/kysely/dist/esm/plugin/camel-case/camel-case-plugin.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$29$__["Pool"]({
    connectionString: process.env.DATABASE_URL
});
const dialect = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$dialect$2f$postgres$2f$postgres$2d$dialect$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostgresDialect"]({
    pool
});
const db = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$kysely$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["Kysely"]({
    dialect,
    plugins: [
        new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$plugin$2f$camel$2d$case$2f$camel$2d$case$2d$plugin$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["CamelCasePlugin"]()
    ]
});
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/queries/pets.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "createPet": (()=>createPet),
    "deletePet": (()=>deletePet),
    "getPetById": (()=>getPetById),
    "getPetByIdForOwner": (()=>getPetByIdForOwner),
    "getPetOwner": (()=>getPetOwner),
    "getPetPhotos": (()=>getPetPhotos),
    "getUserPets": (()=>getUserPets),
    "getUserPetsSlice": (()=>getUserPetsSlice),
    "isPetFavorited": (()=>isPetFavorited),
    "savePetImageUrls": (()=>savePetImageUrls),
    "searchPets": (()=>searchPets),
    "searchPetsSlice": (()=>searchPetsSlice),
    "updatePet": (()=>updatePet),
    "updatePetWithImages": (()=>updatePetWithImages)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/kysely/dist/esm/raw-builder/sql.js [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
async function searchPetsSlice(filters, page, limit) {
    /* 1️⃣  base builder with filters, no joins yet ------------------ */ let base = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].selectFrom('pets');
    if (filters.type) base = base.where('pets.type', '=', filters.type);
    if (filters.gender) base = base.where('pets.gender', '=', filters.gender);
    if (filters.size) base = base.where('pets.size', '=', filters.size);
    if (filters.age) base = base.where('pets.ageGroup', '=', filters.age);
    /* 2️⃣  total count ---------------------------------------------- */ const { count } = await base.clearSelect() // keep builder clean
    .select((eb)=>eb.fn.countAll().as('count')).executeTakeFirstOrThrow();
    /* 3️⃣  data slice with join + select ---------------------------- */ const pets = await base.leftJoin('petImages as pi', (j)=>j.onRef('pi.petId', '=', 'pets.id').on('pi.orderIdx', '=', 0)).offset((page - 1) * limit).limit(limit).orderBy('pets.createdAt', 'desc').select([
        'pets.id',
        'pets.name',
        'pets.breed',
        'pets.size',
        'pets.ageGroup',
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`pi.url`.as('imageUrl')
    ]).execute();
    return {
        pets,
        totalCount: Number(count)
    };
}
async function searchPets(filters) {
    let q = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].selectFrom('pets').select(({ ref })=>[
            'pets.id',
            'pets.name',
            ref('pets.ageGroup').as('ageGroup'),
            'pets.breed',
            'pets.size',
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`pi.url`.as('imageUrl'),
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$kysely$2f$dist$2f$esm$2f$raw$2d$builder$2f$sql$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["sql"]`CASE WHEN f.pet_id IS NOT NULL THEN true ELSE false END`.as('isFavorite')
        ]).leftJoin('petImages as pi', (j)=>j.onRef('pi.petId', '=', 'pets.id').on('pi.orderIdx', '=', 0)).leftJoin('favourites as f', 'f.petId', 'pets.id').limit(20);
    if (filters.type) q = q.where('pets.type', '=', filters.type);
    if (filters.gender) q = q.where('pets.gender', '=', filters.gender);
    if (filters.size) q = q.where('pets.size', '=', filters.size);
    if (filters.age) q = q.where('pets.ageGroup', '=', filters.age);
    return await q.execute();
}
async function getPetByIdForOwner(petId, ownerId) {
    const pet = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].selectFrom('pets').selectAll().where('id', '=', petId).where('ownerId', '=', ownerId).executeTakeFirst();
    if (!pet) return null;
    const images = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].selectFrom('petImages').select([
        'url',
        'orderIdx'
    ]).where('petId', '=', petId).orderBy('orderIdx', 'asc').execute();
    return {
        ...pet,
        images
    };
}
async function getPetById(id) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].selectFrom('pets').where('pets.id', '=', id).select([
        'id',
        'name',
        'ageGroup',
        'breed',
        'size',
        'gender',
        'description',
        'ownerId'
    ]).executeTakeFirst() || null;
}
async function getPetPhotos(petId) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].selectFrom('petImages').where('petId', '=', petId).orderBy('orderIdx').select([
        'url'
    ]).execute();
}
async function getPetOwner(ownerId) {
    return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].selectFrom('users').where('id', '=', ownerId).select([
        'name'
    ]).executeTakeFirst() || null;
}
async function isPetFavorited(petId, userId) {
    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].selectFrom('favourites').select('petId').where('petId', '=', petId).where('userId', '=', userId).executeTakeFirst();
    return !!res;
}
async function createPet(ownerId, petData) {
    const result = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insertInto('pets').values({
        ownerId,
        ...petData
    }).returning('id').executeTakeFirstOrThrow();
    return result.id;
}
async function getUserPets(userId) {
    const pets = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].selectFrom('pets').select([
        'pets.id',
        'pets.name',
        'pets.type',
        'pets.breed',
        'pets.gender',
        'pets.size',
        'pets.ageGroup',
        'pets.description',
        'pets.status',
        'pets.createdAt',
        'pets.updatedAt'
    ]).where('pets.ownerId', '=', userId).orderBy('pets.createdAt', 'desc').execute();
    const petsWithImages = await Promise.all(pets.map(async (p)=>({
            ...p,
            images: await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].selectFrom('petImages').select([
                'url',
                'orderIdx'
            ]).where('petId', '=', p.id).orderBy('orderIdx', 'asc').execute()
        })));
    return petsWithImages;
}
async function getUserPetsSlice(userId, offset, limit, chips) {
    let q = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].selectFrom('pets').where('ownerId', '=', userId);
    if (chips.includes('cat') || chips.includes('dog')) q = q.where('type', 'in', chips.filter((c)=>c === 'cat' || c === 'dog'));
    if (chips.includes('female') || chips.includes('male')) q = q.where('gender', 'in', chips.filter((c)=>c === 'female' || c === 'male'));
    if ([
        'small',
        'medium',
        'large'
    ].some((c)=>chips.includes(c))) q = q.where('size', 'in', chips.filter((c)=>[
            'small',
            'medium',
            'large'
        ].includes(c)));
    if ([
        'baby',
        'young',
        'adult',
        'senior'
    ].some((c)=>chips.includes(c))) q = q.where('ageGroup', 'in', chips.filter((c)=>[
            'baby',
            'young',
            'adult',
            'senior'
        ].includes(c)));
    const [{ count }] = await q.select((eb)=>eb.fn.countAll().as('count')).execute();
    const pets = await q.offset(offset).limit(limit).orderBy('createdAt', 'desc').selectAll().execute();
    const petsWithImages = await Promise.all(pets.map(async (p)=>({
            ...p,
            images: await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].selectFrom('petImages').select([
                'url',
                'orderIdx'
            ]).where('petId', '=', p.id).orderBy('orderIdx', 'asc').execute()
        })));
    return {
        pets: petsWithImages,
        totalCount: Number(count)
    };
}
async function updatePet(petId, ownerId, petData) {
    if (!Object.keys(petData).length) return;
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].updateTable('pets').set({
        ...petData,
        updatedAt: new Date()
    }).where('id', '=', petId).where('ownerId', '=', ownerId).execute();
}
async function updatePetWithImages(petId, ownerId, petData, imageUrls) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].transaction().execute(async (trx)=>{
        if (Object.keys(petData).length) {
            await trx.updateTable('pets').set({
                ...petData,
                updatedAt: new Date()
            }).where('id', '=', petId).where('ownerId', '=', ownerId).execute();
        }
        const existing = await trx.selectFrom('petImages').select([
            'id',
            'url'
        ]).where('petId', '=', petId).execute();
        const currentUrls = new Set(existing.map((e)=>e.url));
        const newUrls = new Set(imageUrls);
        const toDelete = existing.filter((e)=>!newUrls.has(e.url)).map((e)=>e.id);
        if (toDelete.length) {
            await trx.deleteFrom('petImages').where('id', 'in', toDelete).execute();
        }
        const toInsert = imageUrls.map((url, idx)=>currentUrls.has(url) ? null : {
                id: crypto.randomUUID(),
                petId,
                url,
                orderIdx: idx
            }).filter(Boolean);
        if (toInsert.length) await trx.insertInto('petImages').values(toInsert).execute();
        await Promise.all(imageUrls.map(async (url, idx)=>{
            const row = existing.find((e)=>e.url === url);
            if (row) {
                await trx.updateTable('petImages').set({
                    orderIdx: idx
                }).where('id', '=', row.id).execute();
            }
        }));
    });
}
async function deletePet(petId, ownerId) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].deleteFrom('petImages').where('petId', '=', petId).execute();
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].deleteFrom('pets').where('id', '=', petId).where('ownerId', '=', ownerId).execute();
}
async function savePetImageUrls(petId, imageUrls) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].deleteFrom('petImages').where('petId', '=', petId).execute();
    if (imageUrls.length) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].insertInto('petImages').values(imageUrls.map((url, idx)=>({
                petId,
                url,
                orderIdx: idx
            }))).execute();
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/app/api/pets/search/route.ts [app-route] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "GET": (()=>GET)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2f$pets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/queries/pets.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2f$pets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
([__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2f$pets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
async function GET(req) {
    const p = req.nextUrl.searchParams;
    const page = Number(p.get('page') ?? '1');
    const limit = Number(p.get('limit') ?? '12');
    const filters = {
        type: p.get('type') ?? undefined,
        gender: p.get('gender') ?? undefined,
        size: p.get('size') ?? undefined,
        age: p.get('age') ?? undefined
    };
    const { pets, totalCount } = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$queries$2f$pets$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["searchPetsSlice"])(filters, page, limit);
    return Response.json({
        pets,
        totalCount
    });
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__c2586bdb._.js.map