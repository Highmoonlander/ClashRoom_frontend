/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/process/route";
exports.ids = ["app/api/process/route"];
exports.modules = {

/***/ "(rsc)/./app/api/process/route.ts":
/*!**********************************!*\
  !*** ./app/api/process/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\nasync function POST(request) {\n    try {\n        const formData = await request.formData();\n        console.log(\"Incoming formData:\", formData);\n        const file = formData.get(\"file\");\n        if (!file) {\n            console.error(\"❌ No file received from client\");\n            return Response.json({\n                error: \"File is required\"\n            }, {\n                status: 400\n            });\n        }\n        console.log(\"✅ Got file:\", file.name, file.size);\n        // Forward to FastAPI\n        const backendFormData = new FormData();\n        backendFormData.append(\"file\", file);\n        // process.env.NEXT_PUBLIC_API_URL ||\n        const apiUrl = \"http://localhost:8000\";\n        console.log(\"➡️ Forwarding to backend:\", apiUrl + \"/process\");\n        const response = await fetch(`${apiUrl}/process`, {\n            method: \"POST\",\n            body: backendFormData\n        });\n        console.log(\"⬅️ Backend response status:\", response.status);\n        if (!response.ok) {\n            const text = await response.text();\n            console.error(\"Backend error:\", text);\n            throw new Error(`Backend responded with status: ${response.status}`);\n        }\n        const data = await response.json();\n        return Response.json(data);\n    } catch (error) {\n        console.error(\"Process API error:\", error);\n        return Response.json({\n            error: \"Processing failed\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL3Byb2Nlc3Mvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUFPLGVBQWVBLEtBQUtDLE9BQWdCO0lBQ3pDLElBQUk7UUFDRixNQUFNQyxXQUFXLE1BQU1ELFFBQVFDLFFBQVE7UUFDdkNDLFFBQVFDLEdBQUcsQ0FBQyxzQkFBc0JGO1FBRWxDLE1BQU1HLE9BQU9ILFNBQVNJLEdBQUcsQ0FBQztRQUMxQixJQUFJLENBQUNELE1BQU07WUFDVEYsUUFBUUksS0FBSyxDQUFDO1lBQ2QsT0FBT0MsU0FBU0MsSUFBSSxDQUFDO2dCQUFFRixPQUFPO1lBQW1CLEdBQUc7Z0JBQUVHLFFBQVE7WUFBSTtRQUNwRTtRQUVBUCxRQUFRQyxHQUFHLENBQUMsZUFBZUMsS0FBS00sSUFBSSxFQUFFTixLQUFLTyxJQUFJO1FBRS9DLHFCQUFxQjtRQUNyQixNQUFNQyxrQkFBa0IsSUFBSUM7UUFDNUJELGdCQUFnQkUsTUFBTSxDQUFDLFFBQVFWO1FBQ25DLHFDQUFxQztRQUNqQyxNQUFNVyxTQUFVO1FBQ2hCYixRQUFRQyxHQUFHLENBQUMsNkJBQTZCWSxTQUFTO1FBRWxELE1BQU1DLFdBQVcsTUFBTUMsTUFBTSxHQUFHRixPQUFPLFFBQVEsQ0FBQyxFQUFFO1lBQ2hERyxRQUFRO1lBQ1JDLE1BQU1QO1FBQ1I7UUFFQVYsUUFBUUMsR0FBRyxDQUFDLCtCQUErQmEsU0FBU1AsTUFBTTtRQUUxRCxJQUFJLENBQUNPLFNBQVNJLEVBQUUsRUFBRTtZQUNoQixNQUFNQyxPQUFPLE1BQU1MLFNBQVNLLElBQUk7WUFDaENuQixRQUFRSSxLQUFLLENBQUMsa0JBQWtCZTtZQUNoQyxNQUFNLElBQUlDLE1BQU0sQ0FBQywrQkFBK0IsRUFBRU4sU0FBU1AsTUFBTSxFQUFFO1FBQ3JFO1FBRUEsTUFBTWMsT0FBTyxNQUFNUCxTQUFTUixJQUFJO1FBQ2hDLE9BQU9ELFNBQVNDLElBQUksQ0FBQ2U7SUFDdkIsRUFBRSxPQUFPakIsT0FBTztRQUNkSixRQUFRSSxLQUFLLENBQUMsc0JBQXNCQTtRQUNwQyxPQUFPQyxTQUFTQyxJQUFJLENBQUM7WUFBRUYsT0FBTztRQUFvQixHQUFHO1lBQUVHLFFBQVE7UUFBSTtJQUNyRTtBQUNGIiwic291cmNlcyI6WyIvVXNlcnMvYXJ5YXJhanZhaWR5YS9BcnlhL1B5dGhvbi9OTFAvZnJvbnRlbmQvYXBwL2FwaS9wcm9jZXNzL3JvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcXVlc3Q6IFJlcXVlc3QpIHtcbiAgdHJ5IHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IGF3YWl0IHJlcXVlc3QuZm9ybURhdGEoKVxuICAgIGNvbnNvbGUubG9nKFwiSW5jb21pbmcgZm9ybURhdGE6XCIsIGZvcm1EYXRhKVxuXG4gICAgY29uc3QgZmlsZSA9IGZvcm1EYXRhLmdldChcImZpbGVcIikgYXMgRmlsZVxuICAgIGlmICghZmlsZSkge1xuICAgICAgY29uc29sZS5lcnJvcihcIuKdjCBObyBmaWxlIHJlY2VpdmVkIGZyb20gY2xpZW50XCIpXG4gICAgICByZXR1cm4gUmVzcG9uc2UuanNvbih7IGVycm9yOiBcIkZpbGUgaXMgcmVxdWlyZWRcIiB9LCB7IHN0YXR1czogNDAwIH0pXG4gICAgfVxuXG4gICAgY29uc29sZS5sb2coXCLinIUgR290IGZpbGU6XCIsIGZpbGUubmFtZSwgZmlsZS5zaXplKVxuXG4gICAgLy8gRm9yd2FyZCB0byBGYXN0QVBJXG4gICAgY29uc3QgYmFja2VuZEZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKClcbiAgICBiYWNrZW5kRm9ybURhdGEuYXBwZW5kKFwiZmlsZVwiLCBmaWxlKVxuLy8gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTCB8fFxuICAgIGNvbnN0IGFwaVVybCA9ICBcImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMFwiXG4gICAgY29uc29sZS5sb2coXCLinqHvuI8gRm9yd2FyZGluZyB0byBiYWNrZW5kOlwiLCBhcGlVcmwgKyBcIi9wcm9jZXNzXCIpXG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKGAke2FwaVVybH0vcHJvY2Vzc2AsIHtcbiAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICBib2R5OiBiYWNrZW5kRm9ybURhdGEsXG4gICAgfSlcblxuICAgIGNvbnNvbGUubG9nKFwi4qyF77iPIEJhY2tlbmQgcmVzcG9uc2Ugc3RhdHVzOlwiLCByZXNwb25zZS5zdGF0dXMpXG5cbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICBjb25zdCB0ZXh0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpXG4gICAgICBjb25zb2xlLmVycm9yKFwiQmFja2VuZCBlcnJvcjpcIiwgdGV4dClcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQmFja2VuZCByZXNwb25kZWQgd2l0aCBzdGF0dXM6ICR7cmVzcG9uc2Uuc3RhdHVzfWApXG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuICAgIHJldHVybiBSZXNwb25zZS5qc29uKGRhdGEpXG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIlByb2Nlc3MgQVBJIGVycm9yOlwiLCBlcnJvcilcbiAgICByZXR1cm4gUmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlByb2Nlc3NpbmcgZmFpbGVkXCIgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICB9XG59Il0sIm5hbWVzIjpbIlBPU1QiLCJyZXF1ZXN0IiwiZm9ybURhdGEiLCJjb25zb2xlIiwibG9nIiwiZmlsZSIsImdldCIsImVycm9yIiwiUmVzcG9uc2UiLCJqc29uIiwic3RhdHVzIiwibmFtZSIsInNpemUiLCJiYWNrZW5kRm9ybURhdGEiLCJGb3JtRGF0YSIsImFwcGVuZCIsImFwaVVybCIsInJlc3BvbnNlIiwiZmV0Y2giLCJtZXRob2QiLCJib2R5Iiwib2siLCJ0ZXh0IiwiRXJyb3IiLCJkYXRhIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/process/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprocess%2Froute&page=%2Fapi%2Fprocess%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprocess%2Froute.ts&appDir=%2FUsers%2Faryarajvaidya%2FArya%2FPython%2FNLP%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faryarajvaidya%2FArya%2FPython%2FNLP%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprocess%2Froute&page=%2Fapi%2Fprocess%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprocess%2Froute.ts&appDir=%2FUsers%2Faryarajvaidya%2FArya%2FPython%2FNLP%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faryarajvaidya%2FArya%2FPython%2FNLP%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_aryarajvaidya_Arya_Python_NLP_frontend_app_api_process_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/process/route.ts */ \"(rsc)/./app/api/process/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/process/route\",\n        pathname: \"/api/process\",\n        filename: \"route\",\n        bundlePath: \"app/api/process/route\"\n    },\n    resolvedPagePath: \"/Users/aryarajvaidya/Arya/Python/NLP/frontend/app/api/process/route.ts\",\n    nextConfigOutput,\n    userland: _Users_aryarajvaidya_Arya_Python_NLP_frontend_app_api_process_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcm9jZXNzJTJGcm91dGUmcGFnZT0lMkZhcGklMkZwcm9jZXNzJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGcHJvY2VzcyUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRmFyeWFyYWp2YWlkeWElMkZBcnlhJTJGUHl0aG9uJTJGTkxQJTJGZnJvbnRlbmQlMkZhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPSUyRlVzZXJzJTJGYXJ5YXJhanZhaWR5YSUyRkFyeWElMkZQeXRob24lMkZOTFAlMkZmcm9udGVuZCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDc0I7QUFDbkc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIi9Vc2Vycy9hcnlhcmFqdmFpZHlhL0FyeWEvUHl0aG9uL05MUC9mcm9udGVuZC9hcHAvYXBpL3Byb2Nlc3Mvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL3Byb2Nlc3Mvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9wcm9jZXNzXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9wcm9jZXNzL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL2FyeWFyYWp2YWlkeWEvQXJ5YS9QeXRob24vTkxQL2Zyb250ZW5kL2FwcC9hcGkvcHJvY2Vzcy9yb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprocess%2Froute&page=%2Fapi%2Fprocess%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprocess%2Froute.ts&appDir=%2FUsers%2Faryarajvaidya%2FArya%2FPython%2FNLP%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faryarajvaidya%2FArya%2FPython%2FNLP%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fprocess%2Froute&page=%2Fapi%2Fprocess%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fprocess%2Froute.ts&appDir=%2FUsers%2Faryarajvaidya%2FArya%2FPython%2FNLP%2Ffrontend%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Faryarajvaidya%2FArya%2FPython%2FNLP%2Ffrontend&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();