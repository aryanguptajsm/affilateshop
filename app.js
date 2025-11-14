const backend = "https://affilateshop-backend.onrender.com";

fetch(backend + "/products")
  .then(res => res.json())
  .then(products => {
    let html = "";
    products.forEach(p => {

      const imageURL = backend + "/" + p.image; 
      // example → https://affilateshop-backend.onrender.com/uploads/123-image.jpg

      html += `
      <div class="product-card">
        <img src="${imageURL}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <a class="buy-btn" href="${p.link}" target="_blank">Buy Now</a>
      </div>
      `;
    });

    document.getElementById("productList").innerHTML = html;
  })
  .catch(err => console.error("Error:", err));
