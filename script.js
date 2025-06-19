// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Utility: Load cart from sessionStorage
function getCartFromStorage() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

// Utility: Save cart to sessionStorage
function saveCartToStorage(cart) {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear current list
  const cart = getCartFromStorage();

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === parseInt(productId));
  if (!product) return;

  const cart = getCartFromStorage();
  cart.push(product);
  saveCartToStorage(cart);
  renderCart();
}

// Clear cart
function clearCart() {
  sessionStorage.removeItem("cart");
  renderCart();
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });

  // Event delegation for add-to-cart buttons
  productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart-btn")) {
      const productId = e.target.getAttribute("data-id");
      addToCart(productId);
    }
  });
}

// Attach clear cart button event
clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
