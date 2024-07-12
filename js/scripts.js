document.addEventListener("DOMContentLoaded", function () {
  fetch("data/autos.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Netzwerkantwort war nicht in Ordnung");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Daten erfolgreich geladen:");

      const productGrid = document.getElementById("product-grid");
      const highlightedProducts = document.getElementById(
        "highlighted-products"
      );

      if (productGrid) {
        productGrid.innerHTML = data
          .map(
            (product) => `
              <div class="product-item">
                  <img src="${product.image}" alt="${product.name}" />
                  <h3>${product.name}</h3>
                  <p>${product.description}</p>
                  <p>Preis: ${product.price}</p>
                  <button onclick="addToCart(${product.id})">In den Warenkorb</button>
                  <button onclick="window.location.href='product_detail.html?product=${product.id}'">Mehr erfahren</button>
              </div>
            `
          )
          .join("");
      }

      if (highlightedProducts) {
        highlightedProducts.innerHTML = data
          .slice(0, 3)
          .map(
            (product) => `
              <div class="product-item">
                  <img src="${product.image}" alt="${product.name}" />
                  <h3>${product.name}</h3>
                  <p>${product.description}</p>
                  <p>Preis: ${product.price}</p>
                  <button onclick="addToCart(${product.id})">In den Warenkorb</button>
                  <button onclick="window.location.href='product_detail.html?product=${product.id}'">Mehr erfahren</button>
              </div>
            `
          )
          .join("");
      }
    })
    .catch((error) => console.error("Fehler beim Abrufen der Daten:", error));

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  function addToCart(productId) {
    fetch("data/autos.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Netzwerkantwort war nicht in Ordnung");
        }
        return response.json();
      })
      .then((data) => {
        const product = data.find((item) => item.id === productId);
        if (product) {
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      })
      .catch((error) => console.error("Fehler beim Abrufen der Daten:", error));
  }

  // Make addToCart function global for inline event handlers
  window.addToCart = addToCart;
});
