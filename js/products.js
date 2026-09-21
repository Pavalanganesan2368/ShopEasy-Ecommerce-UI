// Display All products on products page
function displayAllProducts() {
  const productsContainer = document.getElementById("all-products");

  if (productsContainer) {
    productsContainer.innerHTML = "";

    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className =
        "product-card shadow border border-gray-200 p-3 rounded-md";
      productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="min-w-full h-50">
                <div class="product-info">
                        <div class="flex justify-between py-3">
                            <h3 class="product-title">${product.name}</h3>
                            <p class="product-price">${product.price.toFixed(2)}</p>
                        </div>
                    <button class="add-to-cart w-full bg-sky-500 text-white p-3 rounded-md" data-id="${product.id}">Add to Cart</button>
                </div>
            `;
      productsContainer.appendChild(productElement);
    });

    // Add event listener to "Add to Cart" buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  }
}

function setupFiltersAndSort() {
  const sortSelect = document.getElementById("sort");
  const applyFiltersBtn = document.querySelector(".apply-filters");
  const priceSlider = document.getElementById("price-slider");
  const maxPriceDisplay = document.getElementById("max-price");

  if (sortSelect) {
    sortSelect.addEventListener("change", function () {
      applyFiltersAndSort();
    });
  }

  if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener("click", applyFiltersAndSort);
  }

  if (priceSlider) {
    priceSlider.addEventListener("input", function () {
      maxPriceDisplay.textContent = `$${this.value}`;
    });
  }
}

function applyFiltersAndSort() {
  const sortSelect = document.getElementById("sort");
  const categoryCheckboxes = document.querySelectorAll(
    '.filter-option input[type="checkbox"]:checked',
  );
  const priceSlider = document.getElementById("price-slider");

  // Get selected categories
  const selectedCategories = Array.from(categoryCheckboxes).map(
    (cb) => cb.value,
  );

  // Get max price
  const maxPrice = parseFloat(priceSlider.value);

  // Filter products
  let filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategories.includes(product.category);
    const priceMatch = product.price <= maxPrice;
    return categoryMatch && priceMatch;
  });

  // Sort products
  const sortValue = sortSelect ? sortSelect.value : "default";

  switch (sortValue) {
    case "price-low":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;

    case "price-high":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;

    case "name-asc":
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
      break;

    case "name-desc":
      filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
      break;

    default:
      break;
  }
  displayFilteredProducts(filteredProducts);
}

function displayFilteredProducts(filteredProducts) {
  const productsContainer = document.getElementById("all-products");

  if (productsContainer) {
    productsContainer.innerHTML = "";

    if (filteredProducts.length === 0) {
      productsContainer.innerHTML =
        '<p class="no-products">No Products Match Your Filters.</p>';
      return;
    }

    filteredProducts.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.className =
        "product-cart product-card shadow border border-gray-200 p-3 rounded-md";
      productElement.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="min-w-full h-50">
                <div class="flex justify-between flex-col py-3"> 
                    <h3 class="product-title">${product.name}</h3>
                    <p class="product-price">${product.price.toFixed(2)}</p>
                    <button class="add-to-cart w-full bg-sky-500 text-white p-3 rounded-md" data-id="${product.id}">Add to Cart</button>
                </div>   
            `;

      productsContainer.appendChild(productElement);
    });

    // Add event listener to "Add to cart" buttons
    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", addToCart);
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  displayAllProducts();
  displayFeaturedProducts();
  updateCartCount();
  setupFiltersAndSort();

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
});
