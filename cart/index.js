// Check if user is logged in
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '/login';
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    document.getElementById('cartCount').textContent = cart.length;
}

// Calculate totals
function calculateTotals() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 3.00;
    const total = subtotal + shipping;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Render cart items
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const container = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <div class="empty-cart-icon">🛒</div>
                <h2>Your bag is empty</h2>
                <p>Add some products to get started!</p>
                <a href="../shop/index.html" class="btn-shop">Continue Shopping</a>
            </div>
        `;
        document.getElementById('checkoutBtn').disabled = true;
        return;
    }
    
    container.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="item-image">${item.emoji}</div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-category">${item.category || 'Personal Care'}</div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
                <span class="quantity">${item.quantity || 1}</span>
                <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
            <div class="item-price">$${(item.price * (item.quantity || 1)).toFixed(2)}</div>
            <button class="btn-remove" onclick="removeItem(${index})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(itemDiv);
    });
    
    calculateTotals();
}

// Update item quantity
function updateQuantity(index, change) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cart[index]) {
        cart[index].quantity = (cart[index].quantity || 1) + change;
        
        // Remove item if quantity is 0 or less
        if (cart[index].quantity <= 0) {
            cart.splice(index, 1);
        }
        
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }
}

// Remove item from cart
function removeItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    renderCart();
}

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', function() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    if (cart.length > 0) {
        // Save to order history
        const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        const order = {
            id: Date.now(),
            date: new Date().toLocaleDateString(),
            items: cart,
            total: cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0) + 3.00
        };
        orders.push(order);
        localStorage.setItem('orderHistory', JSON.stringify(orders));
        
        // Clear cart
        localStorage.setItem('cart', '[]');
        
        alert('Order placed successfully! Thank you for shopping with us.');
        window.location.href = '../profile/index.html';
    }
});

// Initialize
updateCartCount();
renderCart();