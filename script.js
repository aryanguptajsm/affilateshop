// Dark/Light Mode Toggle
const toggleBtn = document.getElementById('theme-toggle');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    toggleBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// API URL
const API_URL = "https://affilateshop-backend.onrender.com";

// Load Products
async function loadProducts() {
    try {
        const res = await fetch(`${API_URL}/products`);
        const products = await res.json();

        const productGrid = document.getElementById('product-grid');
        productGrid.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <a href="${product.link}" target="_blank">Buy Now</a>
            `;
            productGrid.appendChild(productCard);
        });
    } catch (err) {
        console.error("Error loading products:", err);
    }
}
loadProducts();

// Register Form
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(registerForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        const result = await res.json();
        showMessage(result.message);
    } catch (error) {
        showMessage("Registration failed");
    }
});

// Login Form
const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(loginForm);
    const data = Object.fromEntries(formData.entries());

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        });
        const result = await res.json();
        if(result.token){
            localStorage.setItem("authToken", result.token);
            showMessage("Login successful");
        } else {
            showMessage(result.message);
        }
    } catch (error) {
        showMessage("Login failed");
    }
});

// Message Display
function showMessage(msg){
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = msg;
    setTimeout(() => messageDiv.textContent = '', 5000);
}
