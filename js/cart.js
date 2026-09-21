//Display cart items
function displayCartItems() {
  const cartContainer = document.getElementById("cart-items");
  const subtotalElement = document.getElementById("subtotal");
  const totalElement = document.getElementById("total");

  if (cartContainer) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let subtotal = 0;

    if (cart.length === 0) {
      cartContainer.innerHTML =
        '<p class="empty-cart">Your cart is empty. <a href="product.html">Continue Shopping</a></p>';
      subtotalElement.textContent = "$0.00";
      totalElement.textContent = "$5.99";
      return;
    }

    cartContainer.innerHTML = "";

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      const cartItem = document.createElement("div");
      cartItem.className = "flex justify-between text-md gap-5 shadow p-3";
      cartItem.innerHTML = `
                <div class="max-w-50 max-h-auto m-2">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="flex flex-col text-center justify-center">
                    <h3>${item.name}</h3>
                    <p>${item.price.toFixed(2)}</p>
                    <div class="flex justify-evenly items-center gap-3">
                        <button class="quantity-btn rounded-md p-2 minus border border-gray-200" data-id="${item.id}">-</button>
                        <span class="w-15 border border-gray-200 rounded-md p-2">${item.quantity}</span>
                        <button class="quantity-btn rounded-md p-2 plus border border-gray-200" data-id="${item.id}">+</button>
                    </div>
                </div>

                <div class="flex flex-col text-center justify-center">
                    <p>$${itemTotal.toFixed(2)}</p>
                    <button class="remove-btn" data-id="${item.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                `;
      cartContainer.appendChild(cartItem);
    });

    //Update totals
    const shipping = 5.99;
    const total = subtotal + shipping;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;

    //Add event listener
    document.querySelectorAll(".quantity-btn.minus").forEach((btn) => {
      btn.addEventListener("click", descreseQuantity);
    });

    document.querySelectorAll(".quantity-btn.plus").forEach((btn) => {
      btn.addEventListener("click", increaseQuantity);
    });

    document.querySelectorAll(".remove-btn").forEach((btn) => {
      btn.addEventListener("click", removeFromCart);
    });
  }
}

// Descrease item quantity
function descreseQuantity(e) {
  const productId = parseInt(e.target.getAttribute("data-id"));
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    if (cart[itemIndex].quantity > 1) {
      cart[itemIndex].quantity -= 1;
    } else {
      cart.splice(itemIndex, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
  }
}

//Increase item quantity
function increaseQuantity(e) {
  const productId = parseInt(e.target.getAttribute("data-id"));
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex !== -1) {
    cart[itemIndex].quantity += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
    updateCartCount();
  }
}

//Remove item from cart
function removeFromCart(e) {
  const productId = parseInt(
    e.target.closest("button").getAttribute("data-id"),
  );
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart = cart.filter((item) => item.id !== productId);

  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
}

//Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  displayCartItems();
  updateCartCount();
});
