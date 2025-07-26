let menuItems = [
  { name: "Pizza Krabben", price: 9.5, amount: 0 },
  { name: "Pizza Margherita", price: 5.9, amount: 0 },
  { name: "Pizza Diavolo (scharf)", price: 8.5, amount: 0 },
  { name: "Pizzabrötchen", price: 12.9, amount: 0 },
  { name: "Tiramisu", price: 4.5, amount: 0 },
];

function init() {
  renderMenuList();
  updateCartUI();
}

function renderMenuList() {
  let html = "";
  for (let i = 0; i < menuItems.length; i++) {
    html += createMenuItemHTML(menuItems[i], i);
  }
  document.getElementById("menu").innerHTML = html;
}

function createMenuItemHTML(item, i) {
  return `<div class="menu-item">
    <div class="menu-name">${item.name}</div>
    <div class="menu-price-action">
      <span>${formatPrice(item.price)}</span>
      <button onclick="addItem(${i})">+</button>
    </div>
  </div>`;
}

function createCartItemHTML(item, i, total) {
  return `<div class="cart-item">
    <div class="cart-name">${item.name}</div>
    <div class="cart-controls">
      <button onclick="decrease(${i})">-</button>
      <span class="quantity">${item.amount}</span>
      <button onclick="increase(${i})">+</button>
    </div>
    <div class="cart-price">${formatPrice(total)}</div>
    <button class="delete-btn" onclick="remove(${i})">🗑️</button>
  </div>`;
}

function getCartHTML() {
  let html = "", subtotal = 0;
  for (let i = 0; i < menuItems.length; i++) {
    let item = menuItems[i];
    if (item.amount > 0) {
      let total = item.price * item.amount;
      subtotal += total;
      html += createCartItemHTML(item, i, total);
    }
  }
  let delivery = 5, total = subtotal + delivery;
  html += `<div class="cart-total"><strong>Gesamt:</strong> ${formatPrice(total)} (inkl. ${formatPrice(delivery)} Lieferkosten)</div>`;
  return { html, total };
}

function updateCartUI() {
  const cartData = getCartHTML();
  document.getElementById("cart").innerHTML = cartData.html;
  document.getElementById("cart-total-mini").textContent = formatPrice(cartData.total);
  document.getElementById("cart-dialog-content").innerHTML = cartData.html;
}

function addItem(i) { menuItems[i].amount++; updateCartUI(); }
function increase(i) { menuItems[i].amount++; updateCartUI(); }
function decrease(i) { menuItems[i].amount = Math.max(0, menuItems[i].amount - 1); updateCartUI(); }
function remove(i) { menuItems[i].amount = 0; updateCartUI(); }

function submitOrder() {
  for (let i = 0; i < menuItems.length; i++) menuItems[i].amount = 0;
  updateCartUI();
  let el = document.getElementById("order-confirmation");
  el.style.display = "block";
  setTimeout(() => el.style.display = "none", 3000);
}

function submitDialogOrder() {
  for (let i = 0; i < menuItems.length; i++) menuItems[i].amount = 0;
  updateCartUI();
  let msg = document.getElementById("dialog-confirmation");
  msg.textContent = "Deine Testbestellung wurde erfolgreich aufgenommen!";
  setTimeout(() => { msg.textContent = ""; closeCartDialog(); }, 3000);
}

function openCartDialog() {
  document.getElementById("cart-dialog").classList.remove("hidden");
}

function closeCartDialog() {
  document.getElementById("cart-dialog").classList.add("hidden");
}

function formatPrice(num) {
  return num.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}