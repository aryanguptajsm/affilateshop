fetch("https://YOUR_BACKEND_URL/products")
  .then(res => res.json())
  .then(products => {
    let html = "";
    products.forEach(p => {
      html += `
      <div class="product-card">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <a class="buy-btn" href="${p.link}" target="_blank">Buy Now</a>
      </div>
      `;
    });

    document.getElementById("productList").innerHTML = html;
  });
