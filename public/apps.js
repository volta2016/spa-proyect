(()=>{"use strict";const t=document.querySelector(".cart__center"),e=document.querySelector(".item__total"),s=document.querySelector(".cart__total"),n=document.querySelector(".clear__cart");class i{async getProduct(){try{const t=await fetch("/products.json");return(await t.json()).items}catch(t){return console.log(t),[]}}}class a{static saveProducts(t){localStorage.setItem("products",JSON.stringify(t))}static saveCart(t){localStorage.setItem("carts",JSON.stringify(t))}static getProducts(t){return JSON.parse(localStorage.getItem("products")).find((e=>e.id===parseInt(t)))}static removeCart(t){localStorage.removeItem("carts",JSON.stringify(t))}}document.querySelector("#date").innerHTML=`© Copyright\n\t\t\t\t${(new Date).getFullYear()} Ecommerce Dulzor Kimei`;const r=document.querySelector(".cart__icon"),c=document.querySelector(".cart"),o=document.querySelector(".close__cart"),l=document.querySelector(".login__container"),d=document.querySelector(".login"),u=document.querySelector(".close__login"),m=document.querySelector(".product__center"),h=document.querySelector(".item__total"),v=document.querySelector(".cart__total");let g=new class{constructor(){this.totalPrice=0,this.totalProducts=0,this.items=new Map,this.addCleanCartEvent(),this.removeItem=this.removeItem.bind(this),this.addItem=this.addItem.bind(this),this.deleteDisplayItem=this.deleteDisplayItem.bind(this),this.deleteDisplayItem=this.deleteDisplayItem.bind(this)}addItem(t){const e=this.items.get(t.id);if(this.totalPrice+=t.price,this.totalProducts++,e){const s=e.amount;return this.updateAmountItem(t.id,s+1)}this.items.set(t.id,t),this.renderItem(t)}removeItem(t){const e=this.items.get(t);this.totalPrice-=e.amount*e.price,this.totalProducts-=e.amount,this.deleteDisplayItem(t),this.items.delete(t),this.setItemValues()}createItem(t,e,s,n,i){let a=document.createElement("div");a.classList.add("cart__item"),a.id=`product-${t}`,a.innerHTML=((t,e,s,n,i)=>`\n    <img src=${s}>\n    <div>\n      <h3 class="titleproduct">${e}</h3>\n      <h3 class="price">$${n}</h3>\n    </div>\n    <div>\n      <span class="increase" data-id=${t}>\n        <svg>\n          <use xlink:href="./images/sprite.svg#icon-angle-up"></use>\n        </svg>\n      </span>\n      <input class="item__amount" type="number" value=${i}>\n      <span class="decrease" data-id=${t}>\n        <svg>\n          <use xlink:href="./images/sprite.svg#icon-angle-down"></use>\n        </svg>\n      </span>\n    </div>\n      <span id="remove-${t}"  class="remove__item">\n        <svg>\n          <use xlink:href="./images/sprite.svg#icon-trash"></use>\n        </svg>\n      </span>\n    </div>\n`)(t,e,s,n,i);const r=a.querySelector(".increase"),c=a.querySelector(".decrease");return a.querySelector(`#remove-${t}`).addEventListener("click",(()=>this.removeItem(t))),r.addEventListener("click",(()=>this.handleUpdateButton(t,"increase"))),c.addEventListener("click",(()=>{const{amount:e}=this.items.get(t);this.handleUpdateButton(t,"decrease"),e-1==0&&this.removeItem(t)})),a}handleUpdateButton(t,e){const s=this.items.get(t);switch(e){case"increase":return this.totalPrice+=s.price,this.totalProducts++,this.updateAmountItem(t,s.amount+1),this.setItemValues();case"decrease":return this.totalPrice-=s.price,this.totalProducts--,this.updateAmountItem(t,s.amount-1),this.setItemValues();default:return}}addCleanCartEvent(){n.addEventListener("click",(()=>{this.totalPrice=0,this.totalProducts=0,this.items=new Map,this.deleteDisplayAllItems(),this.setItemValues()}))}renderItem({id:e,title:s,image:n,price:i,amount:a}){t.append(this.createItem(e,s,n,i,a))}updateAmountItem(e,s){const n=this.items.get(e);this.items.set(e,{...n,amount:s}),t.querySelector(`#product-${e} input.item__amount`).value=s.toString()}deleteDisplayItem(e){t.querySelector(`#product-${e}`).remove()}deleteDisplayAllItems(){!function(t){for(console.log(t);t.firstChild;)t.removeChild(t.firstChild)}(t)}setItemValues(){e.innerText=this.totalProducts,s.innerText=parseFloat(this.totalPrice.toFixed(2))}},p=[];const y=()=>c.classList.toggle("show"),I=()=>l.classList.toggle("toshow");(async()=>{const t=new i,e=await t.getProduct();(t=>{let e="";t.forEach((({id:t,title:s,price:n,image:i})=>{e+=((t,e,s,n)=>`\n      <div class="product">\n      <div class="image__container">\n        <img src="${n}" alt="${e}" />\n      </div>\n      <div class="product__footer">\n        <h2>${e}</h2>\n        <div class="rating">\n          <span>\n            <svg>\n              <use xlink:href="./images/sprite.svg#icon-star-full"></use>\n            </svg>\n          </span>\n          <span>\n            <svg>\n              <use xlink:href="./images/sprite.svg#icon-star-full"></use>\n            </svg>\n          </span>\n          <span>\n            <svg>\n              <use xlink:href="./images/sprite.svg#icon-star-full"></use>\n            </svg>\n          </span>\n          <span>\n            <svg>\n              <use xlink:href="./images/sprite.svg#icon-star-full"></use>\n            </svg>\n          </span>\n          <span>\n            <svg>\n              <use xlink:href="./images/sprite.svg#icon-star-empty"></use>\n            </svg>\n          </span>\n        </div>\n        <div class="bottom">\n          <div class="btn__group">\n            <button class="btn addToCart" data-id=${t}>Add to Cart</button>\n          </div>\n          <div class="price">$${s}</div>\n        </div>\n      </div>\n    </div>\n`)(t,s,n,i)})),m.innerHTML=e})(e),r.addEventListener("click",y),o.addEventListener("click",y),d.addEventListener("click",I),u.addEventListener("click",I),[...document.querySelectorAll(".addToCart")].forEach((t=>{const e=t.dataset.id;p.find((t=>t.id===e))&&(t.innerText="In Cart",t.disable=!1),t.addEventListener("click",(t=>{t.target.innerText="In Cart",t.target.disable=!1;const s={...a.getProducts(e),amount:1};g.addItem(s),p=[...p,s],a.saveCart(p),h.innerText=g.totalProducts,v.innerText=parseFloat(g.totalPrice.toFixed(2))}))})),a.saveProducts(e)})()})();