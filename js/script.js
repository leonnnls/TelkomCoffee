'use strict';

/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */
const preloader = document.querySelector("[data-preload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

// Navbar toggle
let navbar = document.querySelector('.navbar');
let menuBtn = document.getElementById('menu-btn');

menuBtn.addEventListener('click', () => {
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
  cartItem.classList.remove('active');
});

// Search form toggle
let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () => {
  searchForm.classList.toggle('active');
  navbar.classList.remove('active');
  cartItem.classList.remove('active');
};

// Cart toggle
let cartItem = document.querySelector('.cart-items-container');

document.querySelector('#cart-btn').onclick = () => {
  cartItem.classList.toggle('active');
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
};

// Close all dropdowns on scroll
window.onscroll = () => {
  navbar.classList.remove('active');
  searchForm.classList.remove('active');
  cartItem.classList.remove('active');
};

/**
 * Add items to the cart and update the cart icon
 */
function addToCart(name, price, imageSrc) {
  const cartContainer = document.querySelector(".cart-items-container");
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Cart item HTML structure
  cartItem.innerHTML = `
    <span class="fas fa-times remove-item"></span>
    <img src="${imageSrc}" alt="${name}">
    <div class="content">
      <h3>${name}</h3>
      <div class="price">IDR ${price}</div>
    </div>
  `;

  // Append to cart container and update cart count
  cartContainer.appendChild(cartItem);
  updateCartCount();

  // Remove item from cart on click
  cartItem.querySelector(".remove-item").addEventListener("click", function () {
    cartItem.remove();
    updateCartCount();
  });
}

// Function to update cart count on cart icon
function updateCartCount() {
  const cartCount = document.querySelectorAll(".cart-items-container .cart-item").length;
  const cartIcon = document.getElementById("cart-btn");

  // If there's no badge, create one
  let badge = cartIcon.querySelector(".cart-count-badge");
  if (!badge) {
    badge = document.createElement("span");
    badge.classList.add("cart-count-badge");
    cartIcon.appendChild(badge);
  }

  // Update badge count
  badge.textContent = cartCount;

  // Remove badge if cart is empty
  if (cartCount === 0) {
    badge.remove();
  }
}

// Attach event listener to each "add to cart" button
document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", function (event) {
    event.preventDefault();
    const itemBox = this.closest('.box');
    const name = itemBox.querySelector('h3').textContent;
    const price = itemBox.querySelector('.price').textContent.replace("IDR ", "");
    const imageSrc = itemBox.querySelector('img').getAttribute('src');
    addToCart(name, price, imageSrc);
  });
});
