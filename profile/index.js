// Check if user is logged in
if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = '/login';
}

// Update cart count
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    document.getElementById('cartCount').textContent = cart.length;
}

// Load user data
function loadUserData() {
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || 'user@example.com';
    
    document.getElementById('userName').textContent = userName.charAt(0).toUpperCase() + userName.slice(1);
    document.getElementById('userEmail').textContent = userEmail;
}

// Load order history
function loadOrderHistory() {
    const orders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    const container = document.getElementById('orderList');
    
    if (orders.length === 0) {
        container.innerHTML = `
            <div class="no-orders">
                <div class="no-orders-icon">📦</div>
                <p>No orders yet</p>
                <a href="/shop" class="btn-shop">Start Shopping</a>
            </div>
        `;
        return;
    }
    
    container.innerHTML = '';
    
    // Show orders in reverse (newest first)
    orders.reverse().forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-card';
        
        const itemsHTML = order.items.map(item => `
            <div class="order-item">
                <span class="order-item-emoji">${item.emoji}</span>
                <span>${item.name} - $${item.price}</span>
            </div>
        `).join('');
        
        orderDiv.innerHTML = `
            <div class="order-header">
                <span class="order-id">Order #${order.id}</span>
                <span class="order-date">${order.date}</span>
            </div>
            <div class="order-items">
                ${itemsHTML}
            </div>
            <div class="order-total">Total: $${order.total.toFixed(2)}</div>
        `;
        
        container.appendChild(orderDiv);
    });
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', function() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userName');
        window.location.href = '/login';
    }
});

// Initialize
updateCartCount();
loadUserData();
loadOrderHistory();
