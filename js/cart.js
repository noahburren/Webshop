document.addEventListener("DOMContentLoaded", function () {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCart() {
    const cartContents = document.getElementById("cart-contents");
    if (cart.length === 0) {
      cartContents.innerHTML = "<p>Der Warenkorb ist leer.</p>";
    } else {
      cartContents.innerHTML = cart
        .map(
          (product) => `
              <div class="cart-item">
                <img src="${product.image}" alt="${product.name}" width="50" 
                     onclick="showProductDetails(${product.id})" style="cursor: pointer;" />
                <p>${product.name}</p>
                <p>Preis: ${product.price}</p>
                <button onclick="removeFromCart(${product.id})">Entfernen</button>
              </div>
            `
        )
        .join("");
    }
  }

  function removeFromCart(productId) {
    const productIndex = cart.findIndex((item) => item.id === productId);
    if (productIndex > -1) {
      cart.splice(productIndex, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
    }
  }

  // Function to show product details
  function showProductDetails(productId) {
    const product = cart.find((item) => item.id === productId);
    if (product) {
      // Redirect to product detail page with query parameter
      window.location.href = `product_detail.html?product=${product.id}`;
    }
  }

  // Make removeFromCart and showProductDetails functions global
  window.removeFromCart = removeFromCart;
  window.showProductDetails = showProductDetails;

  updateCart();
});
