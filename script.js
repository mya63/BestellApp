let menus = [
  "Pizza Krabben",
  "Pizza Margherita",
  "Pizza Diavolo (scharf)",
  "Pizzabrötchen",
  "Tiramisu",
];
let prices = [9.5, 5.9, 8.5, 12.9, 4.5];
let amounts = [0, 0, 0, 0, 0];

function createMenuHTML(name, price, index) {
  return `<div class="menu-item">
    <div class="menu-name">${name}</div>
    <div class="menu-price-action">
      <span>${price.toFixed(2)} €</span>
      <button onclick="onAddMenu(${index})">+</button>
    </div>
  </div>`;
}

function renderMenuList() {
  let menuContainer = document.getElementById("menu");
  menuContainer.innerHTML = "";
  for (let i = 0; i < menus.length; i++) {
    menuContainer.innerHTML += createMenuHTML(menus[i], prices[i], i);
  }
}

function renderCart() {
  let cartContainer = document.getElementById("cart");
  cartContainer.innerHTML = "";
  let subtotal = 0;
  for (let i = 0; i < menus.length; i++) {
    if (amounts[i] > 0) {
      let total = prices[i] * amounts[i];
      subtotal += total;
      cartContainer.innerHTML += `
  <div class="cart-item">
    <div class="cart-name">${menus[i]}</div>
    <div class="cart-controls">
    <button class="decrease-btn" data-index="${i}">-</button>
<span class="quantity">${amounts[i]}</span>
<button class="increase-btn" data-index="${i}">+</button>
    </div>
    <div class="cart-price">${total.toFixed(2)} €</div>
    <button class="delete-btn" data-index="${i}">🗑️</button>
  </div>
`;
    }
  }
  cartContainer.innerHTML += `<div class="cart-total">
    <strong>Gesamt:</strong> ${(subtotal + 5).toFixed(
      2
    )} € (inkl. 5 € Lieferkosten)
  </div>`;

  const miniTotal = document.getElementById("cart-total-mini");
  if (miniTotal) {
    miniTotal.textContent = (subtotal + 5).toFixed(2) + " €";
  }

  registerCartEventListenersForMainCart();
}

document.querySelectorAll("#cart .decrease-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const index = parseInt(btn.dataset.index);
    onDecreaseAmount(index);
  });
});

document.querySelectorAll("#cart .delete-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const index = parseInt(btn.dataset.index);
    onDeleteItem(index);
  });
});

function registerCartEventListenersForMainCart() {
  document
    .querySelectorAll("#cart .cart-controls .decrease-btn")
    .forEach((btn) => {
      const index = btn.dataset.index;
      btn.addEventListener("click", () => {
        onDecreaseAmount(index);
      });
    });

  document
    .querySelectorAll("#cart .cart-controls .increase-btn")
    .forEach((btn) => {
      const index = btn.dataset.index;
      btn.addEventListener("click", () => {
        onIncreaseAmount(index);
      });
    });

  document.querySelectorAll("#cart .delete-btn").forEach((btn) => {
    const index = btn.dataset.index;
    btn.addEventListener("click", () => {
      onDeleteItem(index);
    });
  });
}

function onAddMenu(index) {
  amounts[index]++;
  renderCart();
}

function onIncreaseAmount(index) {
  amounts[index]++;
  renderCart();
}

function onDecreaseAmount(index) {
  if (amounts[index] > 1) {
    amounts[index]--;
  } else {
    amounts[index] = 0;
  }
  renderCart();
}

function onDeleteItem(index) {
  amounts[index] = 0;
  renderCart();
}

document.addEventListener("DOMContentLoaded", function () {
  renderMenuList();
  renderCart();
});

document.addEventListener("DOMContentLoaded", function () {
  renderMenuList();
  renderCart();

  const dialogOrderButton = document.getElementById("dialog-order-button");

  dialogOrderButton.addEventListener("click", function () {
    const totalItems = amounts.reduce((a, b) => a + b, 0);

    if (totalItems === 0) {
      alert("Bitte wähle mindestens ein Gericht aus.");
    } else {
      document.getElementById("order-confirmation").style.display = "block";
      document.getElementById("cart-dialog").classList.add("hidden");

      const confirmation = document.getElementById("order-confirmation");
      confirmation.innerText = "Deine Bestellung wird vorbereitet …";
      confirmation.style.display = "block";

      for (let i = 0; i < amounts.length; i++) {
        amounts[i] = 0;
      }

      renderCart();

      setTimeout(() => {
        confirmation.style.display = "none";
        confirmation.innerText =
          "Deine Testbestellung wurde erfolgreich aufgenommen!";
      }, 3000);
    }
  });

  const orderButton = document.getElementById("order-button");

  orderButton.addEventListener("click", function () {
    const totalItems = amounts.reduce((a, b) => a + b, 0);

    if (totalItems === 0) {
      alert("Bitte wähle mindestens ein Gericht aus.");
    } else {
      document.getElementById("order-confirmation").style.display = "block";

      for (let i = 0; i < amounts.length; i++) {
        amounts[i] = 0;
      }

      renderCart();

      setTimeout(() => {
        document.getElementById("order-confirmation").style.display = "none";
      }, 3000);
    }
  });
});

document
  .getElementById("floating-cart-button")
  .addEventListener("click", () => {
    openCartDialog();
  });

function closeCartDialog() {
  document.getElementById("cart-dialog").classList.add("hidden");
}

function registerCartEventListeners() {
  document
    .querySelectorAll("#cart-dialog-content .increase-btn")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        onIncreaseAmount(index);
        openCartDialog();
      });
    });

  document
    .querySelectorAll("#cart-dialog-content .decrease-btn")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        onDecreaseAmount(index);
        openCartDialog();
      });
    });

  document
    .querySelectorAll("#cart-dialog-content .delete-btn")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const index = parseInt(btn.dataset.index);
        onDeleteItem(index);
        openCartDialog();
      });
    });
}

function openCartDialog() {
  const dialog = document.getElementById("cart-dialog");
  const content = document.getElementById("cart-dialog-content");

  dialog.classList.remove("hidden");

  content.innerHTML = "";

  content.innerHTML = document.getElementById("cart").innerHTML;

  registerCartEventListeners();
  setupDialogOrderButton();
}

document.addEventListener("DOMContentLoaded", function () {
  const dialogOrderButton = document.getElementById("dialog-order-button");
  const dialogConfirmation = document.getElementById("dialog-confirmation");

  if (dialogOrderButton) {
    dialogOrderButton.addEventListener("click", function () {
      const totalItems = amounts.reduce((a, b) => a + b, 0);

      if (totalItems === 0) {
        alert("Bitte wähle mindestens ein Gericht aus.");
      } else {
        dialogConfirmation.textContent = "Deine Bestellung wird vorbereitet …";

        for (let i = 0; i < amounts.length; i++) {
          amounts[i] = 0;
        }

        renderCart();

        setTimeout(() => {
          dialogConfirmation.textContent = "Bestellung erfolgreich aufgegeben!";
        }, 2000);

        setTimeout(() => {
          dialogConfirmation.textContent = "";
          closeCartDialog();
        }, 4000);
      }
    });
  }
});

function setupDialogOrderButton() {
  const dialogOrderButton = document.getElementById("dialog-order-button");
  const dialogConfirmation = document.getElementById("dialog-confirmation");

  dialogOrderButton?.replaceWith(dialogOrderButton.cloneNode(true));
  const newOrderButton = document.getElementById("dialog-order-button");

  if (newOrderButton) {
    newOrderButton.addEventListener("click", function () {
      const totalItems = amounts.reduce((a, b) => a + b, 0);
      console.log("amounts:", amounts);
      console.log("totalItems:", totalItems);

      if (totalItems === 0) {
        alert("Bitte wähle mindestens ein Gericht aus.");
        return;
      }

      dialogConfirmation.textContent = "🕒 Deine Bestellung wird vorbereitet ...";

      for (let i = 0; i < amounts.length; i++) {
        amounts[i] = 0;
      }

      renderCart();
      registerCartEventListeners();
      dialogConfirmation.textContent = "✅ Bestellung erfolgreich aufgegeben!";

      setTimeout(() => {
        dialogConfirmation.textContent = "";
        closeCartDialog();
      }, 2500);
    });
  }
}

document.getElementById("dialog-order-button").addEventListener("click", function () {
  const totalItems = amounts.reduce((a, b) => a + b, 0);

  if (totalItems === 0) {
    alert("Bitte wähle mindestens ein Gericht aus.");
  } else {
    const confirmationBox = document.getElementById("dialog-confirmation");
    confirmationBox.textContent = "🕒 Bestellung wird vorbereitet ...";
    confirmationBox.style.display = "block";

    setTimeout(() => {
      confirmationBox.textContent = "✅ Bestellung erfolgreich!";
      for (let i = 0; i < amounts.length; i++) {
        amounts[i] = 0;
      }
      renderCart();

      setTimeout(() => {
        confirmationBox.style.display = "none";
        closeCartDialog();
      }, 2000);
    }, 1500);
  }
});
