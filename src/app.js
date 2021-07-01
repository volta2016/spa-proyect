import Cart from "./models/cart";
import Products from "./models/products";
import Storage from "./utils/storage";
import renderProduct from "./utils/renderProduct";

// date
const date = document.querySelector("#date");
date.innerHTML = `© Copyright
				${new Date().getFullYear()} Ecommerce Dulzor Kimei`;

/** Extacción del DOM */
const openCart = document.querySelector(".cart__icon");
const modalCart = document.querySelector(".cart");
const closeCart = document.querySelector(".close__cart");
const modalLogin = document.querySelector(".login__container");
const openLogin = document.querySelector(".login");
const closeLogin = document.querySelector(".close__login");
const productDOM = document.querySelector(".product__center");
const itemsTotal = document.querySelector(".item__total");
const cartTotal = document.querySelector(".cart__total");

let cartInstance = new Cart();
let cart = [];

/** Renderizar productos en el Home */
const displayProducts = (products) => {
	let results = "";
	products.forEach(({ id, title, price, image }) => {
		results += renderProduct(id, title, price, image);
	});

	productDOM.innerHTML = results;
};

const getButtons = () => {
	const buttons = [...document.querySelectorAll(".addToCart")];
	buttons.forEach((button) => {
		const id = button.dataset.id;
		const inCart = cart.find((item) => item.id === id);

		if (inCart) {
			button.innerText = "In Cart";
			// FIXME: next line
			button.disable = false;
		}

		button.addEventListener("click", (event) => {
			event.target.innerText = "In Cart";
			// FIXME: next line
			event.target.disable = false;
			// Get product from product expande feature
			const cartItem = { ...Storage.getProducts(id), amount: 1 };
			// Add the product to cart
			cartInstance.addItem(cartItem); //instancia de Cart
			cart = [...cart, cartItem];

			// Store the product in local Storage
			Storage.saveCart(cart);
			setItemValues();
		});
	});
};

const handleEventModal = () => modalCart.classList.toggle("show");

const showModal = () => openCart.addEventListener("click", handleEventModal);

const hideModal = () => closeCart.addEventListener("click", handleEventModal);

const handleEventModalLogin = () => modalLogin.classList.toggle("toshow");

const showModalLogin = () =>
	openLogin.addEventListener("click", handleEventModalLogin);

const hideModalLogin = () =>
	closeLogin.addEventListener("click", handleEventModalLogin);

const setItemValues = () => {
	itemsTotal.innerText = cartInstance.totalProducts;
	cartTotal.innerText = parseFloat(cartInstance.totalPrice.toFixed(2));
};

/**
 * Programa principal - Asincrona
 */
const main = async () => {
	const products = new Products();
	const productsObject = await products.getProduct();

	displayProducts(productsObject);
	/** Listeners para escuchar el boton de abrir Modal */
	showModal();
	hideModal();
	showModalLogin();
	hideModalLogin();
	getButtons();
	Storage.saveProducts(productsObject);
};

main();
