// Check if user is logged in
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '../login/index.html';
}

// All products data
const allProducts = [
    { id: 1, name: 'Wireless Headphones', price: 79.99, image:'assets/OIP.webp'},
    { id: 2, name: 'Smart Watch', price: 199.99, image:'assets/Smartwatch.jpg' },
    { id: 3, name: 'Laptop', price: 999.99, image:'assets/laptop.jpg' },
    { id: 4, name: 'Camera', price: 549.99, image:'assets/cameracanon.webp' },
    { id: 5, name: 'Apple Iphone 17', price: 900, image:'assets/iphone_17.webp' },
    { id: 6, name: 'Ipad pro 6', price: 999, image:'assets/ipad.jpg' },
    { id: 7, name: 'Gaming Console', price: 399.99, image:'assets/gamingconsole.jpg' },
    { id: 8, name: 'Keyboard', price: 89.99, image:'assets/keyboard.webp' }
];

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    document.getElementById('cartCount').textContent = cart.length;
}

// Render all products
function renderProducts() {
    const grid = document.getElementById('productGrid');
    
    allProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-price">$${product.price}</div>
                <button class="btn-add" id="btn-${product.id}" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Add to cart function
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Add unique cart item ID
    const cartItem = { ...product, cartId: Date.now() };
    cart.push(cartItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    
    // Visual feedback
    const btn = document.getElementById(`btn-${productId}`);
    btn.textContent = '✓ Added';
    btn.classList.add('added');
    
    setTimeout(() => {
        btn.textContent = 'Add to Cart';
        btn.classList.remove('added');
    }, 1500);
}

// Initialize
updateCartCount();
renderProducts();
