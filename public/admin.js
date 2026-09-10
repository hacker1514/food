// Sri Skanda Home Foods - Executive Admin Management Logic

let cachedOrders = [];
let cachedMenu = [];

function initAdmin() {
    checkAuth();

    // Login Form Submit
    const loginForm = document.getElementById('pin-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Search & Filter listeners
    const searchInput = document.getElementById('admin-search');
    if (searchInput) searchInput.addEventListener('input', () => renderTable());

    const statusFilter = document.getElementById('status-filter-select');
    if (statusFilter) statusFilter.addEventListener('change', () => renderTable());

    // Add/Edit Item Form Submit
    const itemForm = document.getElementById('item-form');
    if (itemForm) {
        itemForm.addEventListener('submit', handleSaveItemForm);
    }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initAdmin();
} else {
    document.addEventListener('DOMContentLoaded', initAdmin);
}

// Check Passcode Session
function checkAuth() {
    const token = sessionStorage.getItem('skanda_admin_token');
    const loginModal = document.getElementById('login-modal');
    const dashboard = document.getElementById('dashboard-container');

    if (token && token.startsWith('skanda_admin_secret_token')) {
        if (loginModal) loginModal.classList.add('hidden');
        if (dashboard) dashboard.classList.remove('hidden');
        fetchOrders();
        fetchStats();
        fetchAdminMenu();
    } else {
        if (loginModal) loginModal.classList.remove('hidden');
        if (dashboard) dashboard.classList.add('hidden');
    }
}

// Handle Passcode Login
async function handleLogin(e) {
    e.preventDefault();
    const pinInput = document.getElementById('admin-pin-input');
    const errorMsg = document.getElementById('login-error');
    const pin = pinInput.value.trim();

    try {
        const res = await fetch('/api/admin/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pin })
        });
        const data = await res.json();

        if (data.success) {
            sessionStorage.setItem('skanda_admin_token', data.token);
            if (errorMsg) errorMsg.classList.add('hidden');
            checkAuth();
        } else {
            if (errorMsg) {
                errorMsg.innerText = data.message || "Invalid Passcode!";
                errorMsg.classList.remove('hidden');
            }
        }
    } catch (err) {
        if (errorMsg) {
            errorMsg.innerText = "Connection error. Ensure server is running.";
            errorMsg.classList.remove('hidden');
        }
    }
}

// Logout Admin
function logoutAdmin() {
    sessionStorage.removeItem('skanda_admin_token');
    checkAuth();
}

// Switch Tabs between Orders and Menu Manager
function switchTab(tabName) {
    const secOrders = document.getElementById('section-orders');
    const secMenu = document.getElementById('section-menu');
    const btnOrders = document.getElementById('tab-orders-btn');
    const btnMenu = document.getElementById('tab-menu-btn');

    if (tabName === 'orders') {
        if (secOrders) secOrders.classList.remove('hidden');
        if (secMenu) secMenu.classList.add('hidden');
        if (btnOrders) {
            btnOrders.className = "admin-tab px-5 py-2.5 rounded-t-xl font-bold text-xs transition border-t-2 border-x border-amber-300 bg-white text-maroon-900 shadow-sm flex items-center gap-2";
        }
        if (btnMenu) {
            btnMenu.className = "admin-tab px-5 py-2.5 rounded-t-xl font-bold text-xs transition border-t-2 border-x border-amber-300/50 bg-amber-200/50 text-gray-700 hover:bg-white flex items-center gap-2";
        }
    } else {
        if (secOrders) secOrders.classList.add('hidden');
        if (secMenu) secMenu.classList.remove('hidden');
        if (btnMenu) {
            btnMenu.className = "admin-tab px-5 py-2.5 rounded-t-xl font-bold text-xs transition border-t-2 border-x border-amber-300 bg-white text-maroon-900 shadow-sm flex items-center gap-2";
        }
        if (btnOrders) {
            btnOrders.className = "admin-tab px-5 py-2.5 rounded-t-xl font-bold text-xs transition border-t-2 border-x border-amber-300/50 bg-amber-200/50 text-gray-700 hover:bg-white flex items-center gap-2";
        }
        fetchAdminMenu();
    }
}

// Fetch Customer Orders
async function fetchOrders() {
    try {
        const res = await fetch('/api/admin/orders');
        const data = await res.json();
        if (data.success) {
            cachedOrders = data.orders || [];
            renderTable();
        }
    } catch (err) {
        console.error("Error fetching orders:", err);
    }
}

// Fetch KPI Stats
async function fetchStats() {
    try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        if (data.success && data.stats) {
            const s = data.stats;
            document.getElementById('stat-revenue').innerText = `₹${s.total_revenue.toLocaleString('en-IN')}`;
            document.getElementById('stat-total-orders').innerText = s.total_orders;
            document.getElementById('stat-pending-orders').innerText = s.pending_orders;
            document.getElementById('stat-delivered-orders').innerText = s.delivered_orders;
        }
    } catch (err) {
        console.error("Error fetching stats:", err);
    }
}

// Render Orders Table
function renderTable() {
    const tbody = document.getElementById('orders-tbody');
    const countTag = document.getElementById('order-count-tag');
    if (!tbody) return;

    const search = document.getElementById('admin-search')?.value.toLowerCase().trim() || '';
    const statusFilter = document.getElementById('status-filter-select')?.value || 'all';

    let filtered = cachedOrders.filter(o => {
        const matchesStatus = (statusFilter === 'all') || (o.order_status.toLowerCase() === statusFilter.toLowerCase());
        const matchesSearch = (!search) || (
            o.order_number.toLowerCase().includes(search) ||
            o.customer_name.toLowerCase().includes(search) ||
            o.customer_phone.toLowerCase().includes(search) ||
            o.customer_city.toLowerCase().includes(search)
        );
        return matchesStatus && matchesSearch;
    });

    if (countTag) countTag.innerText = `${filtered.length} Orders`;

    if (filtered.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center py-12 text-gray-500 font-medium">
                    <i class="fas fa-box-open text-3xl text-amber-500 mb-2"></i>
                    <p>No customer orders placed yet. Orders placed on your website will appear here!</p>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = filtered.map(order => {
        const itemsList = (order.items || []).map(i => `<span class="inline-block bg-amber-50 text-amber-900 border border-amber-200 rounded px-1.5 py-0.5 text-[11px] font-semibold mr-1 mb-1">${i.name} (${i.weight}) x${i.qty}</span>`).join('');

        const statusColors = {
            'Pending': 'bg-amber-100 text-amber-900 border-amber-300',
            'Preparing': 'bg-blue-100 text-blue-900 border-blue-300',
            'Packed': 'bg-purple-100 text-purple-900 border-purple-300',
            'Shipped': 'bg-indigo-100 text-indigo-900 border-indigo-300',
            'Delivered': 'bg-green-100 text-green-900 border-green-300',
            'Cancelled': 'bg-red-100 text-red-900 border-red-300'
        };

        const currentBadgeClass = statusColors[order.order_status] || 'bg-gray-100 text-gray-800 border-gray-300';
        
        const cleanPhone = (order.customer_phone || '').replace(/[^0-9]/g, '');
        const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

        return `
            <tr class="hover:bg-amber-50/50 transition">
                
                <!-- Order ID & Date -->
                <td class="p-4 align-top">
                    <span class="font-extrabold text-maroon-900 text-sm block">${order.order_number}</span>
                    <span class="text-[11px] text-gray-500">${order.created_at}</span>
                </td>

                <!-- Customer Details & WhatsApp Direct Link -->
                <td class="p-4 align-top max-w-xs">
                    <div class="font-extrabold text-gray-900 text-sm">${order.customer_name}</div>
                    <div class="mt-0.5">
                        <a href="https://wa.me/${phoneWithCountry}" target="_blank" class="inline-flex items-center gap-1.5 bg-green-50 hover:bg-green-100 text-green-800 border border-green-300 px-2 py-0.5 rounded-lg text-xs font-bold transition" title="Click to chat directly with customer on WhatsApp">
                            <i class="fab fa-whatsapp text-green-600 text-sm"></i> ${order.customer_phone || 'No Phone'}
                        </a>
                    </div>
                    <div class="text-[11px] text-gray-600 truncate mt-1" title="${order.customer_address}, ${order.customer_city}">${order.customer_address}, ${order.customer_city}</div>
                </td>

                <!-- Items Purchased -->
                <td class="p-4 align-top max-w-sm">
                    <div class="flex flex-wrap">${itemsList}</div>
                    ${order.customer_notes ? `<div class="text-[11px] text-amber-800 italic mt-1">Note: "${order.customer_notes}"</div>` : ''}
                </td>

                <!-- Total Amount & Payment -->
                <td class="p-4 align-top text-right">
                    <div class="font-black text-maroon-900 text-sm">₹${(order.total_amount || 0).toLocaleString('en-IN')}</div>
                    <select 
                        onchange="updatePaymentStatus('${order.id}', this.value)"
                        class="mt-1 text-[11px] font-bold px-1.5 py-0.5 rounded border border-gray-300 bg-gray-50 cursor-pointer"
                    >
                        <option value="Unpaid" ${order.payment_status === 'Unpaid' ? 'selected' : ''}>Unpaid</option>
                        <option value="Paid" ${order.payment_status === 'Paid' ? 'selected' : ''}>Paid</option>
                        <option value="COD" ${order.payment_status === 'COD' ? 'selected' : ''}>COD</option>
                    </select>
                </td>

                <!-- Status Selector -->
                <td class="p-4 align-top">
                    <select 
                        onchange="updateOrderStatus('${order.id}', this.value)"
                        class="text-xs font-bold px-2.5 py-1 rounded-lg border shadow-sm cursor-pointer ${currentBadgeClass}"
                    >
                        <option value="Pending" ${order.order_status === 'Pending' ? 'selected' : ''}>Pending</option>
                        <option value="Preparing" ${order.order_status === 'Preparing' ? 'selected' : ''}>Preparing</option>
                        <option value="Packed" ${order.order_status === 'Packed' ? 'selected' : ''}>Packed</option>
                        <option value="Shipped" ${order.order_status === 'Shipped' ? 'selected' : ''}>Shipped</option>
                        <option value="Delivered" ${order.order_status === 'Delivered' ? 'selected' : ''}>Delivered</option>
                        <option value="Cancelled" ${order.order_status === 'Cancelled' ? 'selected' : ''}>Cancelled</option>
                    </select>
                </td>

                <!-- Action Controls & WhatsApp -->
                <td class="p-4 align-top text-center">
                    <div class="flex items-center justify-center gap-1.5">
                        <button onclick="contactCustomerWhatsApp('${order.id}')" title="Chat with Customer on WhatsApp" class="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs font-bold transition shadow flex items-center gap-1">
                            <i class="fab fa-whatsapp text-sm"></i> Contact
                        </button>
                        <button onclick="openInvoiceModal('${order.id}')" title="Print Slip / Invoice" class="p-2 bg-amber-100 hover:bg-amber-200 text-maroon-900 rounded-lg text-xs transition">
                            <i class="fas fa-print"></i>
                        </button>
                        <button onclick="deleteOrder('${order.id}')" title="Delete Order Record" class="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs transition">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>

            </tr>
        `;
    }).join('');
}

// 1-Click WhatsApp Direct Customer Messaging
function contactCustomerWhatsApp(orderId) {
    const order = cachedOrders.find(o => String(o.id) === String(orderId) || o.order_number === orderId);
    if (!order) return;

    const cleanPhone = order.customer_phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    const message = 
`Hello ${order.customer_name}! 👋
This is Sri Skanda Home Foods regarding your Order *${order.order_number}*.

Current Status: *${order.order_status}*
Total Amount: *₹${(order.total_amount || 0).toLocaleString('en-IN')}*

Thank you for choosing our authentic Brahmin foods! Let us know if you need any assistance.`;

    window.open(`https://wa.me/${phoneWithCountry}?text=${encodeURIComponent(message)}`, '_blank');
}

// Update Order Status via API
async function updateOrderStatus(orderId, newStatus) {
    try {
        const res = await fetch(`/api/admin/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order_status: newStatus })
        });
        const data = await res.json();
        if (data.success) {
            fetchOrders();
            fetchStats();
        }
    } catch (err) {
        console.error("Error updating order status:", err);
    }
}

// Update Payment Status via API
async function updatePaymentStatus(orderId, newPaymentStatus) {
    try {
        const res = await fetch(`/api/admin/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ payment_status: newPaymentStatus })
        });
        const data = await res.json();
        if (data.success) fetchOrders();
    } catch (err) {
        console.error("Error updating payment status:", err);
    }
}

// Delete Order
async function deleteOrder(orderId) {
    const confirmed = await showConfirmModal(
        "Delete Customer Order?",
        "Are you sure you want to delete this order record? This action cannot be undone.",
        "fa-trash-alt text-red-500",
        "Yes, Delete Order"
    );
    if (!confirmed) return;

    try {
        const res = await fetch(`/api/admin/orders/${orderId}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
            showAdminToast("Order record deleted successfully!", "success");
            fetchOrders();
            fetchStats();
        }
    } catch (err) {
        console.error("Error deleting order:", err);
    }
}

// --- STORE MENU MANAGER LOGIC ---

// Fetch Store Menu Items
async function fetchAdminMenu() {
    try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        if (data.success) {
            cachedMenu = data.menu || [];
            renderAdminMenuTable();
        }
    } catch (err) {
        console.error("Error fetching menu:", err);
    }
}

// Render Admin Menu Table
function renderAdminMenuTable() {
    const tbody = document.getElementById('admin-menu-tbody');
    const countTag = document.getElementById('menu-count-tag');
    if (!tbody) return;

    if (countTag) countTag.innerText = `${cachedMenu.length} Items`;

    if (cachedMenu.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-12 text-gray-500">
                    <p class="font-bold">No menu items found.</p>
                    <button onclick="openAddItemModal()" class="mt-3 px-4 py-2 bg-maroon-800 text-white rounded-lg text-xs font-bold">Add First Food Item</button>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = cachedMenu.map(item => {
        const pricesBadges = Object.entries(item.prices || {}).map(([w, p]) => 
            `<span class="inline-block bg-amber-100 text-maroon-900 border border-amber-300 rounded px-2 py-0.5 text-[11px] font-bold mr-1 mb-1">${w}: ₹${p}</span>`
        ).join('');

        return `
            <tr class="hover:bg-amber-50/50 transition">
                
                <!-- Item & Photo -->
                <td class="p-4 align-top">
                    <div class="flex items-center gap-3">
                        <img src="${item.image || 'images/podis.jpg'}" alt="${item.name}" class="w-12 h-12 rounded-xl object-cover border border-amber-300 shadow-sm">
                        <div>
                            <div class="font-extrabold text-maroon-900 text-sm">${item.name}</div>
                            <div class="text-[11px] text-amber-800 italic">${item.transliteration || ''}</div>
                        </div>
                    </div>
                </td>

                <!-- Category & Badge -->
                <td class="p-4 align-top">
                    <span class="inline-block bg-maroon-800 text-amber-100 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase mb-1">${item.category}</span>
                    <div class="text-[11px] font-bold text-amber-900">${item.badge || ''}</div>
                </td>

                <!-- Weight Prices -->
                <td class="p-4 align-top max-w-xs">
                    <div class="flex flex-wrap">${pricesBadges}</div>
                </td>

                <!-- Description & Health -->
                <td class="p-4 align-top max-w-sm">
                    <div class="text-xs text-gray-700 line-clamp-2">${item.description || ''}</div>
                    <div class="text-[11px] text-green-700 font-semibold mt-1"><i class="fas fa-leaf mr-1"></i> ${item.healthBenefit || ''}</div>
                </td>

                <!-- Manage Actions -->
                <td class="p-4 align-top text-center">
                    <div class="flex items-center justify-center gap-1.5">
                        <button onclick="openEditItemModal('${item.id}')" title="Edit Item & Prices" class="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition shadow">
                            <i class="fas fa-edit"></i> Edit
                        </button>
                        <button onclick="deleteMenuItem('${item.id}')" title="Delete Item" class="p-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-xs transition">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </td>

            </tr>
        `;
    }).join('');
}

// Modal Handlers for Menu Items
function openAddItemModal() {
    document.getElementById('edit-item-id').value = '';
    document.getElementById('item-modal-title').innerText = 'Add New Store Food Item';
    document.getElementById('item-form').reset();
    document.getElementById('item-modal').classList.remove('hidden');
}

function openEditItemModal(itemId) {
    const item = cachedMenu.find(i => i.id === itemId);
    if (!item) return;

    document.getElementById('edit-item-id').value = item.id;
    document.getElementById('item-modal-title').innerText = `Edit Menu Item: ${item.name}`;
    
    document.getElementById('item-name').value = item.name || '';
    document.getElementById('item-transliteration').value = item.transliteration || '';
    document.getElementById('item-category').value = item.category || 'podis';
    document.getElementById('item-badge').value = item.badge || '';
    document.getElementById('item-image').value = item.image || '';
    document.getElementById('item-description').value = item.description || '';
    document.getElementById('item-health').value = item.healthBenefit || '';

    const p = item.prices || {};
    document.getElementById('price-100g').value = p['100g'] || '';
    document.getElementById('price-250g').value = p['250g'] || '';
    document.getElementById('price-500g').value = p['500g'] || '';
    document.getElementById('price-1kg').value = p['1kg'] || '';

    document.getElementById('item-modal').classList.remove('hidden');
}

function closeItemModal() {
    document.getElementById('item-modal').classList.add('hidden');
}

// Save (Add or Edit) Item Form Handler
async function handleSaveItemForm(e) {
    e.preventDefault();
    const itemId = document.getElementById('edit-item-id').value;

    const prices = {};
    const p100 = parseInt(document.getElementById('price-100g').value);
    const p250 = parseInt(document.getElementById('price-250g').value);
    const p500 = parseInt(document.getElementById('price-500g').value);
    const p1k = parseInt(document.getElementById('price-1kg').value);

    if (p100) prices['100g'] = p100;
    if (p250) prices['250g'] = p250;
    if (p500) prices['500g'] = p500;
    if (p1k) prices['1kg'] = p1k;

    const payload = {
        name: document.getElementById('item-name').value.trim(),
        transliteration: document.getElementById('item-transliteration').value.trim(),
        category: document.getElementById('item-category').value,
        badge: document.getElementById('item-badge').value.trim() || 'Fresh Batch',
        image: document.getElementById('item-image').value.trim() || 'images/podis.jpg',
        description: document.getElementById('item-description').value.trim(),
        healthBenefit: document.getElementById('item-health').value.trim(),
        prices: Object.keys(prices).length > 0 ? prices : { "100g": 100, "250g": 250, "500g": 500, "1kg": 1000 }
    };

    try {
        let res;
        if (itemId) {
            res = await fetch(`/api/admin/menu/${itemId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        } else {
            res = await fetch('/api/admin/menu', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
        }

        const data = await res.json();
        if (data.success) {
            closeItemModal();
            fetchAdminMenu();
            showAdminToast("Store menu item saved successfully!", "success");
        } else {
            showAdminToast(data.error || "Could not save menu item.", "error");
        }
    } catch (err) {
        console.error("Error saving menu item:", err);
    }
}

// Delete Menu Item
async function deleteMenuItem(itemId) {
    const confirmed = await showConfirmModal(
        "Remove Store Item?",
        "Are you sure you want to remove this food item from the store catalog?",
        "fa-utensils text-amber-500",
        "Yes, Remove Item"
    );
    if (!confirmed) return;

    try {
        const res = await fetch(`/api/admin/menu/${itemId}`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
            showAdminToast("Food item removed from catalog!", "success");
            fetchAdminMenu();
        }
    } catch (err) {
        console.error("Error deleting menu item:", err);
    }
}

// Open Invoice Modal
function openInvoiceModal(orderId) {
    const order = cachedOrders.find(o => String(o.id) === String(orderId) || o.order_number === orderId);
    if (!order) return;

    document.getElementById('invoice-order-num').innerText = order.order_number;
    document.getElementById('invoice-date').innerText = `Date: ${order.created_at}`;
    document.getElementById('invoice-cust-name').innerText = order.customer_name;
    document.getElementById('invoice-cust-phone').innerText = `Phone: ${order.customer_phone}`;
    document.getElementById('invoice-cust-address').innerText = order.customer_address;
    document.getElementById('invoice-cust-city').innerText = order.customer_city;
    document.getElementById('invoice-status-badge').innerText = order.order_status;
    document.getElementById('invoice-payment-badge').innerText = order.payment_status;
    document.getElementById('invoice-notes').innerText = order.customer_notes ? `Note: "${order.customer_notes}"` : '';

    const tbody = document.getElementById('invoice-items-tbody');
    tbody.innerHTML = (order.items || []).map((item, idx) => `
        <tr class="border-b border-gray-200">
            <td class="p-2 border-r border-gray-200 text-center">${idx + 1}</td>
            <td class="p-2 border-r border-gray-200 font-bold text-gray-900">${item.name}</td>
            <td class="p-2 border-r border-gray-200 text-gray-700">${item.weight}</td>
            <td class="p-2 border-r border-gray-200 text-center font-bold">${item.qty}</td>
            <td class="p-2 border-r border-gray-200 text-right">₹${item.price}</td>
            <td class="p-2 text-right font-bold text-maroon-900">₹${item.itemTotal || (item.price * item.qty)}</td>
        </tr>
    `).join('');

    document.getElementById('invoice-grand-total').innerText = `₹${(order.total_amount || 0).toLocaleString('en-IN')}`;

    document.getElementById('printable-invoice-modal').classList.remove('hidden');
}

function closeInvoiceModal() {
    document.getElementById('printable-invoice-modal').classList.add('hidden');
}

// Export CSV
function exportCSV() {
    if (cachedOrders.length === 0) {
        showAdminToast("No customer orders available to export.", "warning");
        return;
    }

    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Order Number,Date,Customer Name,Phone,Address,City,Total Amount,Order Status,Payment Status\n";

    cachedOrders.forEach(o => {
        const row = [
            `"${o.order_number}"`,
            `"${o.created_at}"`,
            `"${o.customer_name}"`,
            `"${o.customer_phone}"`,
            `"${o.customer_address.replace(/"/g, '""')}"`,
            `"${o.customer_city}"`,
            `"${o.total_amount}"`,
            `"${o.order_status}"`,
            `"${o.payment_status}"`
        ].join(",");
        csvContent += row + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `skanda_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showAdminToast("Customer orders exported to CSV file!", "success");
}

// --- BRAND UI DIALOG & TOAST HELPERS ---

let pendingConfirmResolver = null;

function showConfirmModal(title, text, iconClass = 'fa-exclamation-triangle text-amber-500', okButtonText = 'Yes, Proceed') {
    return new Promise((resolve) => {
        pendingConfirmResolver = resolve;
        
        const modal = document.getElementById('custom-confirm-modal');
        const titleEl = document.getElementById('confirm-modal-title');
        const textEl = document.getElementById('confirm-modal-text');
        const iconEl = document.getElementById('confirm-modal-icon');
        const okBtn = document.getElementById('confirm-modal-ok-btn');

        if (titleEl) titleEl.innerText = title;
        if (textEl) textEl.innerText = text;
        if (iconEl) iconEl.className = `fas ${iconClass}`;
        if (okBtn) okBtn.innerText = okButtonText;

        if (modal) modal.classList.remove('hidden');
    });
}

function closeConfirmModal(result) {
    const modal = document.getElementById('custom-confirm-modal');
    if (modal) modal.classList.add('hidden');
    if (pendingConfirmResolver) {
        pendingConfirmResolver(result);
        pendingConfirmResolver = null;
    }
}

function showAdminToast(message, type = 'success') {
    const toast = document.createElement('div');
    const isError = type === 'error';
    const isWarning = type === 'warning';

    const bgClass = isError ? 'bg-red-800 text-white border-red-500' : isWarning ? 'bg-amber-800 text-white border-amber-500' : 'bg-maroon-900 text-amber-200 border-gold-500';
    const iconClass = isError ? 'fa-exclamation-circle text-red-300' : isWarning ? 'fa-exclamation-triangle text-amber-300' : 'fa-check-circle text-gold-400';

    toast.className = `fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl shadow-2xl font-bold text-xs flex items-center gap-2.5 transform transition-all duration-300 translate-y-10 opacity-0 border-2 ${bgClass}`;
    toast.innerHTML = `<i class="fas ${iconClass} text-base"></i> <span>${message}</span>`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// --- CHANGE ADMIN PASSCODE MODAL & HANDLERS ---

function openChangePinModal() {
    const modal = document.getElementById('change-pin-modal');
    if (modal) {
        modal.classList.remove('hidden');
        document.getElementById('change-pin-form')?.reset();
    }
}

function closeChangePinModal() {
    const modal = document.getElementById('change-pin-modal');
    if (modal) modal.classList.add('hidden');
}

async function handleChangePinSubmit(event) {
    event.preventDefault();

    const currentPin = document.getElementById('current-pin-input')?.value.trim();
    const newPin = document.getElementById('new-pin-input')?.value.trim();
    const confirmPin = document.getElementById('confirm-pin-input')?.value.trim();

    if (!currentPin || !newPin || !confirmPin) {
        showAdminToast("Please fill in all passcode fields!", "warning");
        return;
    }

    if (newPin.length < 4) {
        showAdminToast("New passcode must be at least 4 characters or digits long!", "warning");
        return;
    }

    if (newPin !== confirmPin) {
        showAdminToast("New passcode and confirmation do not match!", "error");
        return;
    }

    try {
        const res = await fetch('/api/admin/change-pin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                current_pin: currentPin,
                new_pin: newPin
            })
        });

        const data = await res.json();
        if (data.success) {
            showAdminToast("Passcode updated successfully! Please use your new passcode on next login.", "success");
            closeChangePinModal();
        } else {
            showAdminToast(data.message || "Failed to update passcode.", "error");
        }
    } catch (err) {
        showAdminToast("Error updating passcode. Please try again.", "error");
    }
}
