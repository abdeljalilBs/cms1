// Check if user is logged in
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '/login/index.html';
}

// Featured products data
const featuredProducts = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, emoji: '🎧' },
    { id: 2, name: 'Smart Watch', price: 199.99, emoji: '⌚' },
    { id: 3, name: 'Laptop', price: 999.99, emoji: '💻' },
    { id: 4, name: 'Camera', price: 549.99, emoji: '📷' }
];

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    document.getElementById('cartCount').textContent = cart.length;
}

// Render featured products
function renderProducts() {
    const grid = document.getElementById('featuredProducts');
    
    featuredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price}</div>
                <button class="btn-add" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Add to cart function
function addToCart(productId) {
    const product = featuredProducts.find(p => p.id === productId);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

// Initialize
updateCartCount();
renderProducts();
