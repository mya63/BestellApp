
let menuItems = [
  { name: "Pizza Krabben", price: 9.5, amount: 0 },
  { name: "Pizza Margherita", price: 5.9, amount: 0 },
  { name: "Pizza Diavolo (scharf)", price: 8.5, amount: 0 },
  { name: "Pizzabrötchen", price: 12.9, amount: 0 },
  { name: "Tiramisu", price: 4.5, amount: 0 },
];

function init() {
  renderMenuList();
  renderCart();
}

function renderMenuList() {
  let menuHTML = "";
  for (let i = 0; i < menuItems.length; i++) {
    let item = menuItems[i];
    menuHTML += `<div class="menu-item">
      <div class="menu-name">${item.name}</div>
      <div class="menu-price-action">
        <span>${formatPrice(item.price)}</span>
        <button onclick="addItem(${i})">+</button>
      </div>
    </div>`;
  }
  document.getElementById("menu").innerHTML = menuHTML;
}

function renderCart() {
  let cartHTML = "";
  let subtotal = 0;

  for (let i = 0; i < menuItems.length; i++) {
    let item = menuItems[i];
    if (item.amount > 0) {
      let total = item.price * item.amount;
      subtotal += total;
      cartHTML += createCartItemHTML(item, i, total);
    }
  }

  const delivery = 5;
  let totalPrice = subtotal + delivery;
  cartHTML += `<div class="cart-total">
    <strong>Gesamt:</strong> ${formatPrice(totalPrice)} (inkl. ${formatPrice(delivery)} Lieferkosten)
  </div>`;

  document.getElementById("cart").innerHTML = cartHTML;
  document.getElementById("cart-total-mini").textContent = formatPrice(totalPrice);
  document.getElementById("cart-dialog-content").innerHTML = cartHTML;
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

function addItem(index) {
  menuItems[index].amount++;
  renderCart();
}

function increase(index) {
  menuItems[index].amount++;
  renderCart();
}

function decrease(index) {
  if (menuItems[index].amount > 1) menuItems[index].amount--;
  else menuItems[index].amount = 0;
  renderCart();
}

function remove(index) {
  menuItems[index].amount = 0;
  renderCart();
}

function submitOrder() {
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].amount = 0;
  }
  renderCart();
  document.getElementById("order-confirmation").style.display = "block";
  setTimeout(() => {
    document.getElementById("order-confirmation").style.display = "none";
  }, 3000);
}

function submitDialogOrder() {
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].amount = 0;
  }
  renderCart();
  document.getElementById("dialog-confirmation").textContent = "Deine Testbestellung wurde erfolgreich aufgenommen!";
  setTimeout(() => {
    document.getElementById("dialog-confirmation").textContent = "";
    closeCartDialog();
  }, 3000);
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
