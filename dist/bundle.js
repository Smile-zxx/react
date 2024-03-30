/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.tsx":
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar react_1 = __webpack_require__(/*! ./packages/react */ \"./src/packages/react/index.ts\");\nvar a = react_1.default.createElement(\"div\", null, \" 123123\");\nconsole.log(a);\n\n\n//# sourceURL=webpack://smile_react/./src/index.tsx?");

/***/ }),

/***/ "./src/packages/react/index.ts":
/*!*************************************!*\
  !*** ./src/packages/react/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nvar jsx_1 = __webpack_require__(/*! ./src/jsx */ \"./src/packages/react/src/jsx.ts\");\nexports[\"default\"] = {\n    version: \"0.0.1\",\n    createElement: jsx_1.jsx\n};\n\n\n//# sourceURL=webpack://smile_react/./src/packages/react/index.ts?");

/***/ }),

/***/ "./src/packages/react/src/jsx.ts":
/*!***************************************!*\
  !*** ./src/packages/react/src/jsx.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.jsx = void 0;\nvar ReactSymbols_1 = __webpack_require__(/*! ../../shared/ReactSymbols */ \"./src/packages/shared/ReactSymbols.ts\");\n// 返回一个 ReactElemnent \nvar ReactElement = function (type, key, ref, props) {\n    var element = {\n        $$typeof: ReactSymbols_1.REACT_ELEMENT_TYPE, // 表示这是一个 react 元素\n        key: key,\n        ref: ref,\n        props: props,\n        type: type\n    };\n    return element;\n};\n/*\n接受一个jsx编辑的结果\n<div id=123 ></div>\n=>\njsx('div',{\n    id:123\n})\n返回一个 reactElement\n*/\nvar jsx = function (type, config) {\n    var maybeChildren = [];\n    for (var _i = 2; _i < arguments.length; _i++) {\n        maybeChildren[_i - 2] = arguments[_i];\n    }\n    // 要生成一个 ReactElement\n    //react 中有两个属性要进行特殊的处理  key  ref\n    var key = null;\n    var ref = null;\n    var props = {};\n    // 遍历 jsx 的属性\n    for (var prop in config) {\n        var val = config[prop];\n        // key\n        if (prop === 'key' && val !== undefined) {\n            // 转换成字符串\n            key = \"\" + val;\n        }\n        // ref\n        if (prop === 'ref' && val !== undefined) {\n            // 转换成字符串\n            ref = val;\n        }\n        // 判断是不是 config 自己的属性而不是其原型上的属性 TODO 为啥？\n        if ({}.hasOwnProperty.call(config, prop)) {\n            props[prop] = val;\n        }\n    }\n    // 处理 子节点\n    var maybeChildrenLength = maybeChildren.length;\n    if (maybeChildrenLength === 1) {\n        // 一个的时候 props 的 children 直接就是其子节点\n        props.children = maybeChildren[0];\n    }\n    else {\n        // 多个的时候是子节点构成的数组\n        props.children = maybeChildren;\n    }\n    // 将一个 jsx 对象 转换成 react element\n    return ReactElement(type, key, ref, props);\n};\nexports.jsx = jsx;\n\n\n//# sourceURL=webpack://smile_react/./src/packages/react/src/jsx.ts?");

/***/ }),

/***/ "./src/packages/shared/ReactSymbols.ts":
/*!*********************************************!*\
  !*** ./src/packages/shared/ReactSymbols.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.REACT_ELEMENT_TYPE = void 0;\n// 标识 react 元素类型\nexports.REACT_ELEMENT_TYPE = Symbol.for('react.element');\n\n\n//# sourceURL=webpack://smile_react/./src/packages/shared/ReactSymbols.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.tsx");
/******/ 	
/******/ })()
;