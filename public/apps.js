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

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_cart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/cart */ \"./src/models/cart.js\");\n/* harmony import */ var _models_products__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/products */ \"./src/models/products.js\");\n/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/storage */ \"./src/utils/storage.js\");\n/* harmony import */ var _utils_renderProduct__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/renderProduct */ \"./src/utils/renderProduct.js\");\n\n\n\n\n\n// date\nconst date = document.querySelector(\"#date\");\ndate.innerHTML = `© Copyright\n\t\t\t\t${new Date().getFullYear()} Ecommerce Dulzor Kimei`;\n\n/** Extacción del DOM */\nconst openCart = document.querySelector(\".cart__icon\");\nconst modalCart = document.querySelector(\".cart\");\nconst closeCart = document.querySelector(\".close__cart\");\nconst modalLogin = document.querySelector(\".login__container\");\nconst openLogin = document.querySelector(\".login\");\nconst closeLogin = document.querySelector(\".close__login\");\nconst productDOM = document.querySelector(\".product__center\");\nconst itemsTotal = document.querySelector(\".item__total\");\nconst cartTotal = document.querySelector(\".cart__total\");\n\nlet cartInstance = new _models_cart__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nlet cart = [];\n\n/** Renderizar productos en el Home */\nconst displayProducts = (products) => {\n\tlet results = \"\";\n\tproducts.forEach(({ id, title, price, image }) => {\n\t\tresults += (0,_utils_renderProduct__WEBPACK_IMPORTED_MODULE_3__[\"default\"])(id, title, price, image);\n\t});\n\n\tproductDOM.innerHTML = results;\n};\n\nconst getButtons = () => {\n\tconst buttons = [...document.querySelectorAll(\".addToCart\")];\n\tbuttons.forEach((button) => {\n\t\tconst id = button.dataset.id;\n\t\tconst inCart = cart.find((item) => item.id === id);\n\n\t\tif (inCart) {\n\t\t\tbutton.innerText = \"In Cart\";\n\t\t\t// FIXME: next line\n\t\t\tbutton.disable = false;\n\t\t}\n\n\t\tbutton.addEventListener(\"click\", (event) => {\n\t\t\tevent.target.innerText = \"In Cart\";\n\t\t\t// FIXME: next line\n\t\t\tevent.target.disable = false;\n\t\t\t// Get product from product expande feature\n\t\t\tconst cartItem = { ..._utils_storage__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getProducts(id), amount: 1 };\n\t\t\t// Add the product to cart\n\t\t\tcartInstance.addItem(cartItem); //instancia de Cart\n\t\t\tcart = [...cart, cartItem];\n\n\t\t\t// Store the product in local Storage\n\t\t\t_utils_storage__WEBPACK_IMPORTED_MODULE_2__[\"default\"].saveCart(cart);\n\t\t\tsetItemValues();\n\t\t});\n\t});\n};\n\nconst handleEventModal = () => modalCart.classList.toggle(\"show\");\n\nconst showModal = () => openCart.addEventListener(\"click\", handleEventModal);\n\nconst hideModal = () => closeCart.addEventListener(\"click\", handleEventModal);\n\nconst handleEventModalLogin = () => modalLogin.classList.toggle(\"toshow\");\n\nconst showModalLogin = () =>\n\topenLogin.addEventListener(\"click\", handleEventModalLogin);\n\nconst hideModalLogin = () =>\n\tcloseLogin.addEventListener(\"click\", handleEventModalLogin);\n\nconst setItemValues = () => {\n\titemsTotal.innerText = cartInstance.totalProducts;\n\tcartTotal.innerText = parseFloat(cartInstance.totalPrice.toFixed(2));\n};\n\n/**\n * Programa principal - Asincrona\n */\nconst main = async () => {\n\tconst products = new _models_products__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\tconst productsObject = await products.getProduct();\n\n\tdisplayProducts(productsObject);\n\t/** Listeners para escuchar el boton de abrir Modal */\n\tshowModal();\n\thideModal();\n\tshowModalLogin();\n\thideModalLogin();\n\tgetButtons();\n\t_utils_storage__WEBPACK_IMPORTED_MODULE_2__[\"default\"].saveProducts(productsObject);\n};\n\nmain();\n\n\n//# sourceURL=webpack://shopping-cart-spa/./src/app.js?");

/***/ }),

/***/ "./src/models/cart.js":
/*!****************************!*\
  !*** ./src/models/cart.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Cart)\n/* harmony export */ });\n/* harmony import */ var _utils_renderProductCart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/renderProductCart */ \"./src/utils/renderProductCart.js\");\n/* harmony import */ var _utils_removeAllChildNodes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/removeAllChildNodes */ \"./src/utils/removeAllChildNodes.js\");\n\n\n\nconst cartDOM = document.querySelector(\".cart__center\");\nconst itemsTotal = document.querySelector(\".item__total\");\nconst cartTotal = document.querySelector(\".cart__total\");\nconst clearCart = document.querySelector(\".clear__cart\");\n\nclass Cart {\n\tconstructor() {\n\t\tthis.totalPrice = 0;\n\t\tthis.totalProducts = 0;\n\t\tthis.items = new Map(); // lista de compras {llave: valor}\n\t\t// this.items.get(key) => devolver el valor\n\n\t\t// Event Listeners\n\t\tthis.addCleanCartEvent();\n\n\t\tthis.removeItem = this.removeItem.bind(this);\n\t\tthis.addItem = this.addItem.bind(this);\n\t\tthis.deleteDisplayItem = this.deleteDisplayItem.bind(this);\n\t\tthis.deleteDisplayItem = this.deleteDisplayItem.bind(this);\n\t}\n\n\t// Principal\n\t/**\n\t * ADD Item => Hacer la logica del Mapa (agrega) o Revisar si existe\n\t *    Si no existe => renderItem (agregarlo en el DOM)\n\t *    renderItem => llama a createItem (crea un molde y agrega listeners)\n\t */\n\taddItem(item) {\n\t\tconst existingProduct = this.items.get(item.id);\n\n\t\tthis.totalPrice += item.price;\n\t\tthis.totalProducts++;\n\n\t\tif (existingProduct) {\n\t\t\tconst currentAmount = existingProduct.amount;\n\n\t\t\treturn this.updateAmountItem(item.id, currentAmount + 1);\n\t\t}\n\n\t\tthis.items.set(item.id, item);\n\t\tthis.renderItem(item);\n\t}\n\n\tremoveItem(id) {\n\t\tconst productToDelete = this.items.get(id);\n\n\t\tthis.totalPrice -= productToDelete.amount * productToDelete.price;\n\t\tthis.totalProducts -= productToDelete.amount;\n\n\t\tthis.deleteDisplayItem(id);\n\t\tthis.items.delete(id);\n\t\tthis.setItemValues();\n\t}\n\n\t// Crea los elementos necesarios del Modal + eventos listeners\n\tcreateItem(id, title, image, price, amount) {\n\t\tlet modal = document.createElement(\"div\");\n\t\tmodal.classList.add(\"cart__item\");\n\t\tmodal.id = `product-${id}`;\n\t\tmodal.innerHTML = (0,_utils_renderProductCart__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(id, title, image, price, amount);\n\n\t\tconst increaseButton = modal.querySelector(`.increase`);\n\t\tconst decreaseButton = modal.querySelector(`.decrease`);\n\t\tconst removeButton = modal.querySelector(`#remove-${id}`);\n\n\t\t// Listeners\n\t\tremoveButton.addEventListener(\"click\", () => this.removeItem(id));\n\n\t\tincreaseButton.addEventListener(\"click\", () =>\n\t\t\tthis.handleUpdateButton(id, \"increase\")\n\t\t);\n\n\t\tdecreaseButton.addEventListener(\"click\", () => {\n\t\t\tconst { amount: currentAmount } = this.items.get(id);\n\t\t\t// const amount = this.items.get(id);\n\t\t\t// const currentAmount = amount;\n\n\t\t\tthis.handleUpdateButton(id, \"decrease\");\n\t\t\t// if (currentAmount - 1 === 0) {\n\t\t\t//   this.removeItem(id);\n\t\t\t// }\n\t\t\tcurrentAmount - 1 === 0 && this.removeItem(id);\n\t\t});\n\n\t\treturn modal;\n\t}\n\n\thandleUpdateButton(id, operation) {\n\t\tconst toUpdate = this.items.get(id);\n\t\tswitch (operation) {\n\t\t\tcase \"increase\":\n\t\t\t\tthis.totalPrice += toUpdate.price;\n\t\t\t\tthis.totalProducts++;\n\t\t\t\tthis.updateAmountItem(id, toUpdate.amount + 1);\n\t\t\t\treturn this.setItemValues();\n\t\t\tcase \"decrease\":\n\t\t\t\tthis.totalPrice -= toUpdate.price;\n\t\t\t\tthis.totalProducts--;\n\t\t\t\tthis.updateAmountItem(id, toUpdate.amount - 1);\n\t\t\t\treturn this.setItemValues();\n\t\t\tdefault:\n\t\t\t\treturn;\n\t\t}\n\t}\n\t/* Agregar el escuchador del evento click en clearCartButton */\n\taddCleanCartEvent() {\n\t\tclearCart.addEventListener(\"click\", () => {\n\t\t\tthis.totalPrice = 0;\n\t\t\tthis.totalProducts = 0;\n\n\t\t\tthis.items = new Map();\n\n\t\t\tthis.deleteDisplayAllItems();\n\t\t\tthis.setItemValues();\n\t\t});\n\t}\n\n\t// Render Operations(lógica de productos)\n\n\t// Agrega en el Modal el producto\n\trenderItem({ id, title, image, price, amount }) {\n\t\tcartDOM.append(this.createItem(id, title, image, price, amount));\n\t}\n\n\t// Actualiza el input de producto ya añadido en el modal suma o resta el product\n\t// dependiendo el caso\n\tupdateAmountItem(id, newAmount) {\n\t\tconst toUpdate = this.items.get(id);\n\t\tthis.items.set(id, { ...toUpdate, amount: newAmount });\n\t\t//actualiza y agrega los elementos expandiendo con ...spread\n\n\t\tconst input = cartDOM.querySelector(`#product-${id} input.item__amount`);\n\t\tinput.value = newAmount.toString();\n\t}\n\n\t// Busca en el dom el Id y lo remueve\n\tdeleteDisplayItem(id) {\n\t\tcartDOM.querySelector(`#product-${id}`).remove();\n\t}\n\n\t// borra todos los elementos del modal y actualiza el valor\n\tdeleteDisplayAllItems() {\n\t\t(0,_utils_removeAllChildNodes__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(cartDOM);\n\t}\n\n\t// Actualiza en el DOM los valores de cantidad y precio total\n\tsetItemValues() {\n\t\titemsTotal.innerText = this.totalProducts;\n\t\tcartTotal.innerText = parseFloat(this.totalPrice.toFixed(2));\n\t}\n}\n\n\n//# sourceURL=webpack://shopping-cart-spa/./src/models/cart.js?");

/***/ }),

/***/ "./src/models/products.js":
/*!********************************!*\
  !*** ./src/models/products.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Products)\n/* harmony export */ });\n// Products\nclass Products {\n  async getProduct() {\n    try {\n      const results = await fetch(\"/products.json\");\n      const data = await results.json();\n      const products = data.items;\n      return products;\n    } catch (err) {\n      console.log(err);\n      return [];\n    }\n  }\n}\n\n\n//# sourceURL=webpack://shopping-cart-spa/./src/models/products.js?");

/***/ }),

/***/ "./src/utils/removeAllChildNodes.js":
/*!******************************************!*\
  !*** ./src/utils/removeAllChildNodes.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nfunction removeAllChildNodes(parent) {\n  console.log(parent);\n  while (parent.firstChild) {\n    parent.removeChild(parent.firstChild);\n  }\n}\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (removeAllChildNodes);\n\n\n//# sourceURL=webpack://shopping-cart-spa/./src/utils/removeAllChildNodes.js?");

/***/ }),

/***/ "./src/utils/renderProduct.js":
/*!************************************!*\
  !*** ./src/utils/renderProduct.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst renderProduct = (id, title, price, image) => `\n      <div class=\"product\">\n      <div class=\"image__container\">\n        <img src=\"${image}\" alt=\"${title}\" />\n      </div>\n      <div class=\"product__footer\">\n        <h2>${title}</h2>\n        <div class=\"rating\">\n          <span>\n            <svg>\n              <use xlink:href=\"./images/sprite.svg#icon-star-full\"></use>\n            </svg>\n          </span>\n          <span>\n            <svg>\n              <use xlink:href=\"./images/sprite.svg#icon-star-full\"></use>\n            </svg>\n          </span>\n          <span>\n            <svg>\n              <use xlink:href=\"./images/sprite.svg#icon-star-full\"></use>\n            </svg>\n          </span>\n          <span>\n            <svg>\n              <use xlink:href=\"./images/sprite.svg#icon-star-full\"></use>\n            </svg>\n          </span>\n          <span>\n            <svg>\n              <use xlink:href=\"./images/sprite.svg#icon-star-empty\"></use>\n            </svg>\n          </span>\n        </div>\n        <div class=\"bottom\">\n          <div class=\"btn__group\">\n            <button class=\"btn addToCart\" data-id=${id}>Add to Cart</button>\n          </div>\n          <div class=\"price\">$${price}</div>\n        </div>\n      </div>\n    </div>\n`;\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderProduct);\n\n\n//# sourceURL=webpack://shopping-cart-spa/./src/utils/renderProduct.js?");

/***/ }),

/***/ "./src/utils/renderProductCart.js":
/*!****************************************!*\
  !*** ./src/utils/renderProductCart.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst renderProductCart = (id, title, image, price, amount) => `\n    <img src=${image}>\n    <div>\n      <h3 class=\"titleproduct\">${title}</h3>\n      <h3 class=\"price\">$${price}</h3>\n    </div>\n    <div>\n      <span class=\"increase\" data-id=${id}>\n        <svg>\n          <use xlink:href=\"./images/sprite.svg#icon-angle-up\"></use>\n        </svg>\n      </span>\n      <input class=\"item__amount\" type=\"number\" value=${amount}>\n      <span class=\"decrease\" data-id=${id}>\n        <svg>\n          <use xlink:href=\"./images/sprite.svg#icon-angle-down\"></use>\n        </svg>\n      </span>\n    </div>\n      <span id=\"remove-${id}\"  class=\"remove__item\">\n        <svg>\n          <use xlink:href=\"./images/sprite.svg#icon-trash\"></use>\n        </svg>\n      </span>\n    </div>\n`;\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (renderProductCart);\n\n\n//# sourceURL=webpack://shopping-cart-spa/./src/utils/renderProductCart.js?");

/***/ }),

/***/ "./src/utils/storage.js":
/*!******************************!*\
  !*** ./src/utils/storage.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Storage)\n/* harmony export */ });\n// Storage\nclass Storage {\n  static saveProducts(obj) {\n    localStorage.setItem('products', JSON.stringify(obj));\n  }\n\n  static saveCart(cart) {\n    localStorage.setItem('carts', JSON.stringify(cart));\n  }\n\n  static getProducts(id) {\n    const products = JSON.parse(localStorage.getItem('products'));\n    return products.find((item) => item.id === parseInt(id));\n  }\n\n  static removeCart(cart) {\n    localStorage.removeItem('carts', JSON.stringify(cart));\n  }\n}\n\n\n//# sourceURL=webpack://shopping-cart-spa/./src/utils/storage.js?");

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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;