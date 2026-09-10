// Sri Skanda Home Foods - Main Application Data & Interaction Logic

// Default Fallback Menu Items (Overridden dynamically by /api/menu REST API)
let MENU_ITEMS = [
    {
        id: "munaga-podi",
        name: "Munaga Podi",
        transliteration: "Drumstick Leaf / Moringa Powder",
        category: "podis",
        badge: "Bestseller",
        image: "images/podis.jpg",
        description: "Nutrient-rich Moringa leaf powder expertly blended with traditional Brahmin spices, garlic-free & wholesome.",
        healthBenefit: "Rich in iron, antioxidants & immunity boosters. Perfect with hot rice & cow ghee.",
        prices: { "100g": 120, "250g": 300, "500g": 600, "1kg": 1200 }
    },
    {
        id: "palli-podi",
        name: "Palli Podi",
        transliteration: "Spiced Peanut Powder",
        category: "podis",
        badge: "Protein Rich",
        image: "images/podis.jpg",
        description: "Slow-roasted premium groundnuts ground with roasted lentils, cumin, and mild Kashmiri red chilies.",
        healthBenefit: "High in plant protein & healthy fats. Delicious with Idli, Dosa, or steamed rice.",
        prices: { "100g": 65, "250g": 130, "500g": 260, "1kg": 520 }
    },
    {
        id: "nuvvula-podi",
        name: "Nuvvula Podi",
        transliteration: "Toasted Sesame Seed Powder",
        category: "podis",
        badge: "Calcium Power",
        image: "images/podis.jpg",
        description: "Aromatic white sesame seeds lightly toasted and ground with authentic South Indian spice mix.",
        healthBenefit: "Excellent source of calcium, zinc, and healthy dietary fiber.",
        prices: { "100g": 80, "250g": 185, "500g": 360, "1kg": 720 }
    },
    {
        id: "avisa-podi",
        name: "Avisa Podi",
        transliteration: "Flaxseed Spice Powder",
        category: "podis",
        badge: "Superfood",
        image: "images/podis.jpg",
        description: "Golden organic flax seeds slow-roasted and ground into a fragrant, earthy spice powder.",
        healthBenefit: "Loaded with Omega-3 fatty acids for heart & joint health. Enjoy daily with hot rice.",
        prices: { "100g": 120, "250g": 290, "500g": 580, "1kg": 1150 }
    },
    {
        id: "karivepaku-podi",
        name: "Karivepaku Podi",
        transliteration: "Fresh Curry Leaf Powder",
        category: "podis",
        badge: "Traditional",
        image: "images/podis.jpg",
        description: "Hand-picked farm fresh curry leaves sun-dried and pounded with pepper, cumin, and roasted chana dal.",
        healthBenefit: "Promotes hair growth, aids digestion, and controls blood sugar naturally.",
        prices: { "100g": 80, "250g": 170, "500g": 340, "1kg": 650 }
    },
    {
        id: "kobbari-podi",
        name: "Kobbari Podi",
        transliteration: "Coconut Spice Mix",
        category: "podis",
        badge: "Flavorful",
        image: "images/podis.jpg",
        description: "Grated sun-dried dry coconut (Kopra) tempered with lentils, red chilies, and aromatic asafoetida.",
        healthBenefit: "Rich, satisfying coastal aroma. Enhances vegetable stir-fries, tiffins, and rice.",
        prices: { "100g": 110, "250g": 270, "500g": 530, "1kg": 1050 }
    },
    {
        id: "rasam-powder",
        name: "Rasam Powder",
        transliteration: "Authentic Brahmin Rasam Podi",
        category: "podis",
        badge: "Signature Secret",
        image: "images/podis.jpg",
        description: "Heritage family recipe blend of coriander seeds, black pepper, cumin, turmeric, and fenugreek.",
        healthBenefit: "Instant comfort soup mix that boosts digestion and soothes throat & stomach.",
        prices: { "100g": 90, "250g": 175, "500g": 330, "1kg": 650 }
    },
    {
        id: "kandhi-podi",
        name: "Kandhi Podi",
        transliteration: "Toor Dal / Paruppu Podi",
        category: "podis",
        badge: "Comfort Food",
        image: "images/podis.jpg",
        description: "Golden roasted Toor Dal (pigeon peas) pounded with red chilies, black pepper, and hing.",
        healthBenefit: "Classic South Indian comfort dish. Serve with hot rice, pure ghee, and papad.",
        prices: { "100g": 90, "250g": 160, "500g": 320, "1kg": 640 }
    },
    {
        id: "putnala-podi",
        name: "Putnala Podi",
        transliteration: "Roasted Gram Dal Powder",
        category: "podis",
        badge: "Mild & Tasty",
        image: "images/podis.jpg",
        description: "Crispy fried chana dal blended with mild garlic, cumin, and sea salt. Light on the stomach.",
        healthBenefit: "Easy to digest protein snack powder, perfect for kids & elders.",
        prices: { "100g": 65, "250g": 160, "500g": 320, "1kg": 640 }
    },
    {
        id: "dry-fruit-laddu",
        name: "Dry Fruit Laddu",
        transliteration: "Sugar-Free Premium Energy Balls",
        category: "sweets",
        badge: "No Added Sugar",
        image: "images/sweets.jpg",
        description: "Rich combination of dates, figs, California almonds, cashews, and pistachios bound with pure ghee.",
        healthBenefit: "100% natural sweetness from dates & figs. Superior healthy stamina booster.",
        prices: { "100g": 130, "250g": 330, "500g": 640, "1kg": 1275 }
    },
    {
        id: "palli-chikki",
        name: "Palli Chikki",
        transliteration: "Peanut Jaggery Brittle",
        category: "sweets",
        badge: "Organic Jaggery",
        image: "images/sweets.jpg",
        description: "Crunchy golden roasted peanuts set in melted organic jaggery with a touch of cardamom.",
        healthBenefit: "High energy, rich in iron & healthy monounsaturated fats.",
        prices: { "100g": 65, "250g": 160, "500g": 310, "1kg": 625 }
    },
    {
        id: "nuvvula-chikki",
        name: "Nuvvula Chikki",
        transliteration: "Sesame Jaggery Brittle (Til Chikki)",
        category: "sweets",
        badge: "Mineral Rich",
        image: "images/sweets.jpg",
        description: "Traditional crunchy sesame seed bar sweetened with pure unrefined jaggery syrup.",
        healthBenefit: "Provides body warmth, strengthens bones, and enhances skin health.",
        prices: { "100g": 65, "250g": 160, "500g": 310, "1kg": 625 }
    },
    {
        id: "ragi-laddu",
        name: "Ragi Laddu",
        transliteration: "Finger Millet Sweet Balls",
        category: "sweets",
        badge: "Millet Special",
        image: "images/sweets.jpg",
        description: "Sprouted finger millet flour slow-cooked in pure cow ghee and organic jaggery.",
        healthBenefit: "Supercharged with calcium, fiber & iron. Ideal guilt-free sweet snack.",
        prices: { "100g": 100, "250g": 250, "500g": 500, "1kg": 1000 }
    },
    {
        id: "sunnundalu",
        name: "Sunnundalu",
        transliteration: "Roasted Black Gram / Urad Dal Laddu",
        category: "sweets",
        badge: "Authentic Classic",
        image: "images/sweets.jpg",
        description: "Traditional Andhra Brahmin specialty made from slow-roasted urad dal, pure ghee, and jaggery.",
        healthBenefit: "Strengthens spine & muscles. A timeless festive nourishing delicacy.",
        prices: { "100g": 135, "250g": 320, "500g": 640, "1kg": 1250 }
    },
    {
        id: "dry-gulab-jamun",
        name: "Dry Gulab Jamun",
        transliteration: "Local Fresh Sweet (2 Pieces)",
        category: "specials",
        badge: "Local Special",
        image: "images/hero.jpg",
        description: "Melt-in-your-mouth soft dry gulab jamun soaked in fragrant cardamom syrup. (Available locally near Madanapalle)",
        healthBenefit: "Freshly made daily in small batches with pure milk solids.",
        prices: { "Pack of 2 pcs": 20 }
    },
    {
        id: "custom-millet-order",
        name: "Custom Millet Sweets & Snacks",
        transliteration: "Foxtail, Kodo, Barnyard & Little Millet Specials",
        category: "specials",
        badge: "Made to Order",
        image: "images/sweets.jpg",
        description: "We prepare customized traditional sweets, laddus, and savory snacks using organic Millets tailored to your taste & dietary preference.",
        healthBenefit: "Gluten-free, diabetic-friendly, and packed with ancient grain nutrition.",
        prices: { "Custom Quote": 0 }
    }
];

// App State
let cart = JSON.parse(localStorage.getItem('skanda_cart')) || [];
let activeCategory = 'all';
let searchQuery = '';
let selectedWeights = {}; // itemId -> weight

// Initialize weights
function initSelectedWeights() {
    MENU_ITEMS.forEach(item => {
        if (!selectedWeights[item.id]) {
            selectedWeights[item.id] = Object.keys(item.prices || {})[0] || '100g';
        }
    });
}

// Multi-Language Translation Dictionaries (TastyIgniter Multilingual System)
const TRANSLATIONS = {
    en: {
        install_app: "Install App",
        whatsapp_us: "WhatsApp Us",
        my_orders: "My Orders",
        cart: "Cart",
        search_placeholder: "Search Munaga Podi, Sunnundalu...",
        heritage_recipes: "Traditional Heritage Recipes",
        pure_ghee: "100% Pure Cow Ghee",
        garlic_free: "Garlic-Free Brahmin Recipe",
        tab_all: "All Items",
        tab_podis: "Podis & Powders",
        tab_sweets: "Sweets & Laddus",
        tab_specials: "Specials & Millets",
        add_to_cart: "Add to Cart",
        custom_millet_title: "Custom Millet Sweets & Bulk Order Inquiry",
        empty_cart: "Your cart is currently empty.",
        subtotal: "Subtotal Amount:",
        complete_wa: "Complete Order on WhatsApp"
    },
    te: {
        install_app: "యాప్ ఇన్‌స్టాల్",
        whatsapp_us: "వాట్సాప్ చేయండి",
        my_orders: "నా ఆర్డర్లు",
        cart: "కార్ట్",
        search_placeholder: "మునగ పొడి, సున్నుండలు వెతకండి...",
        heritage_recipes: "సాంప్రదాయ హెరిటేజ్ వంటకాలు",
        pure_ghee: "100% స్వచ్ఛమైన ఆవు నెయ్యి",
        garlic_free: "వెల్లుల్లి లేని బ్రాహ్మణ వంటకం",
        tab_all: "అన్నీ",
        tab_podis: "కారప్పొడులు",
        tab_sweets: "మిఠాయిలు & సున్నుండలు",
        tab_specials: "ప్రత్యేక చిరుతిండ్లు",
        add_to_cart: "కార్ట్‌కు జోడించు",
        custom_millet_title: "చిరుధాన్యాల స్వీట్లు & బల్క్ ఆర్డర్లు",
        empty_cart: "మీ కార్ట్ ఖాళీగా ఉంది.",
        subtotal: "మొత్తం ధర:",
        complete_wa: "వాట్సాప్‌లో ఆర్డర్ పూర్తి చేయండి"
    },
    hi: {
        install_app: "ऐप इंस्टॉल करें",
        whatsapp_us: "व्हाट्सएप करें",
        my_orders: "मेरे ऑर्डर",
        cart: "कार्ट",
        search_placeholder: "मुनागा पोडी, सुन्नुंडालू खोजें...",
        heritage_recipes: "पारंपरिक व्यंजन",
        pure_ghee: "100% शुद्ध गाय का घी",
        garlic_free: "लहसुन-रहित ब्राह्मण रेसिपी",
        tab_all: "सभी उत्पाद",
        tab_podis: "पोडी और मसाले",
        tab_sweets: "मिठाइयाँ और लड्डू",
        tab_specials: "स्पेशल और मिलेट्स",
        add_to_cart: "कार्ट में जोड़ें",
        custom_millet_title: "कस्टम मिलेट मिठाइयाँ एवं बल्क ऑर्डर",
        empty_cart: "आपकी कार्ट अभी खाली है।",
        subtotal: "कुल राशि:",
        complete_wa: "व्हाट्सएप पर ऑर्डर पूरा करें"
    },
    ta: {
        install_app: "ஆப் நிறுவுக",
        whatsapp_us: "வாட்ஸ்அப் செய்க",
        my_orders: "என் ஆர்டர்கள்",
        cart: "கார்ட்",
        search_placeholder: "முருங்கை பொடி, சுன்னுண்டாலு தேட...",
        heritage_recipes: "பாரம்பரிய சமையல் குறிப்புகள்",
        pure_ghee: "100% தூய்மையான பசு நெய்",
        garlic_free: "பூண்டு இல்லாத பிராமண சமையல்",
        tab_all: "அனைத்தும்",
        tab_podis: "பொடி வகைகள்",
        tab_sweets: "இனிப்புகள் & லட்டுகள்",
        tab_specials: "சிறப்பு வகைகள்",
        add_to_cart: "கார்ட்டில் சேர்க்கவும்",
        custom_millet_title: "சிறப்பு தினை இனிப்புகள் & பல்க் ஆர்டர்",
        empty_cart: "உங்கள் கார்ட் காலியாக உள்ளது.",
        subtotal: "மொத்த தொகை:",
        complete_wa: "வாட்ஸ்அப்பில் ஆர்டர் செய்க"
    }
};

let currentLang = localStorage.getItem('skanda_lang') || 'en';
let currentFulfillmentMode = 'delivery'; // 'delivery' or 'pickup'
let appliedCoupon = null; // Coupon object e.g. { code: 'SKANDA10', percent: 10 } or { code: 'FREESHIP', fixed: 50 }

function changeLanguage(lang) {
    if (!TRANSLATIONS[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem('skanda_lang', lang);

    const selectEl = document.getElementById('lang-select');
    if (selectEl) selectEl.value = lang;

    const dict = TRANSLATIONS[lang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.innerText = dict[key];
    });

    const searchInput = document.getElementById('search-input');
    if (searchInput && dict.search_placeholder) {
        searchInput.placeholder = dict.search_placeholder;
    }

    renderMenu();
    updateCartUI();
    showToast(`Language set to ${lang.toUpperCase()} 🌐`, "info");
}

function setFulfillmentMode(mode) {
    currentFulfillmentMode = mode;
    const delBtn = document.getElementById('mode-delivery-btn');
    const picBtn = document.getElementById('mode-pickup-btn');
    const addrContainer = document.getElementById('address-fields-container');

    if (mode === 'pickup') {
        if (delBtn) delBtn.className = "py-1.5 px-3 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition bg-amber-100 text-maroon-900 border-amber-300";
        if (picBtn) picBtn.className = "py-1.5 px-3 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition bg-maroon-800 text-amber-100 border-maroon-900 shadow";
        if (addrContainer) addrContainer.classList.add('hidden');
        showToast("Fulfillment: Store Pickup at Madanapalle Counter 🏪", "info");
    } else {
        if (delBtn) delBtn.className = "py-1.5 px-3 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition bg-maroon-800 text-amber-100 border-maroon-900 shadow";
        if (picBtn) picBtn.className = "py-1.5 px-3 rounded-xl border-2 font-bold text-xs flex items-center justify-center gap-1.5 transition bg-amber-100 text-maroon-900 border-amber-300";
        if (addrContainer) addrContainer.classList.remove('hidden');
        showToast("Fulfillment: Home Delivery 🚚", "info");
    }
    updateCartUI();
}

function applyCouponCode() {
    const input = document.getElementById('coupon-code-input');
    const msg = document.getElementById('coupon-message');
    const code = (input?.value || '').trim().toUpperCase();

    if (!code) {
        showToast("Please enter a coupon code!", "warning");
        return;
    }

    if (code === 'SKANDA10') {
        appliedCoupon = { code: 'SKANDA10', percent: 10 };
        if (msg) {
            msg.innerText = "✓ Coupon SKANDA10 Applied! 10% Discount unlocked.";
            msg.className = "text-[10px] font-bold text-green-700 block mt-1";
        }
        showToast("Coupon SKANDA10 applied! 10% Off 🎉", "success");
    } else if (code === 'FREESHIP' || code === 'SKANDA50') {
        appliedCoupon = { code: code, fixed: 50 };
        if (msg) {
            msg.innerText = "✓ Coupon FREESHIP Applied! ₹50 Discount unlocked.";
            msg.className = "text-[10px] font-bold text-green-700 block mt-1";
        }
        showToast("Coupon FREESHIP applied! ₹50 Off 🎉", "success");
    } else {
        appliedCoupon = null;
        if (msg) {
            msg.innerText = "× Invalid code. Try SKANDA10 or FREESHIP.";
            msg.className = "text-[10px] font-bold text-red-600 block mt-1";
        }
        showToast("Invalid coupon code.", "error");
    }

    updateCartUI();
}

// DOM Loaded / Initialization
function initApp() {
    initSelectedWeights();
    renderMenu();
    updateCartUI();
    setupEventListeners();
    fetchLiveMenu();
    syncCustomerOrders();
    changeLanguage(currentLang);
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initApp();
} else {
    document.addEventListener('DOMContentLoaded', initApp);
}

// Fetch Live Menu from REST API
async function fetchLiveMenu() {
    try {
        const res = await fetch('/api/menu');
        const data = await res.json();
        if (data.success && Array.isArray(data.menu) && data.menu.length > 0) {
            MENU_ITEMS = data.menu;
            initSelectedWeights();
            renderMenu();
        }
    } catch (err) {
        console.warn("Using fallback menu:", err);
    }
}

// Setup Events
function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            renderMenu();
        });
    }

    // Global Keyboard Shortcut: Single Key 'a' or 'A' to Open Admin Management Portal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'a' || e.key === 'A') {
            const activeEl = document.activeElement;
            const isInput = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
            
            // Redirect to admin portal and ALWAYS demand passcode entry
            if (!isInput) {
                e.preventDefault();
                sessionStorage.removeItem('skanda_admin_token');
                showToast("Opening Sri Skanda Executive Admin Portal...", "success");
                setTimeout(() => {
                    window.location.href = 'admin.html';
                }, 400);
            }
        }
    });

    // Category Tabs
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active', 'bg-maroon-700', 'text-white'));
            tabs.forEach(t => t.classList.add('bg-amber-100', 'text-maroon-900'));
            tab.classList.add('active', 'bg-maroon-700', 'text-white');
            tab.classList.remove('bg-amber-100', 'text-maroon-900');
            activeCategory = tab.dataset.category;
            renderMenu();
        });
    });

    // Cart Drawer Toggle
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');

    if (openCartBtn) openCartBtn.addEventListener('click', toggleCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', toggleCart);
    if (cartOverlay) cartOverlay.addEventListener('click', toggleCart);

    // My Orders Modal Listeners
    const openMyOrdersBtn = document.getElementById('open-my-orders-btn');
    const myOrdersModal = document.getElementById('my-orders-modal');

    if (openMyOrdersBtn) {
        openMyOrdersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openMyOrdersModal();
        });
    }

    if (myOrdersModal) {
        myOrdersModal.addEventListener('click', (e) => {
            if (e.target === myOrdersModal) closeMyOrdersModal();
        });
    }

    const detailModal = document.getElementById('customer-order-detail-modal');
    if (detailModal) {
        detailModal.addEventListener('click', (e) => {
            if (e.target === detailModal) closeOrderDetailModal();
        });
    }

    // WhatsApp Order Button in Cart Drawer
    const whatsappOrderBtn = document.getElementById('whatsapp-order-btn');
    if (whatsappOrderBtn) {
        whatsappOrderBtn.addEventListener('click', sendWhatsAppOrder);
    }

    // Millet Custom Form Submit
    const milletForm = document.getElementById('millet-custom-form');
    if (milletForm) {
        milletForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const milletType = document.getElementById('millet-type').value;
            const quantity = document.getElementById('millet-qty').value;
            const notes = document.getElementById('millet-notes').value;

            const text = `*CUSTOM MILLET ORDER INQUIRY*\nBrand: Sri Skanda Home Foods\nMillet Type: ${milletType}\nQuantity Needed: ${quantity}\nSpecial Preferences: ${notes || 'None'}\n\nPlease share availability and quote. Thank you!`;
            
            window.open(`https://wa.me/919490068924?text=${encodeURIComponent(text)}`, '_blank');
        });
    }
}

// Toggle Cart Drawer
function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (drawer && overlay) {
        drawer.classList.toggle('translate-x-full');
        overlay.classList.toggle('hidden');
    }
}

// Render Menu Cards
function renderMenu() {
    const container = document.getElementById('menu-container');
    if (!container) return;

    let filtered = MENU_ITEMS.filter(item => {
        if (!item) return false;
        const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
        const itemName = (item.name || '').toLowerCase();
        const itemTrans = (item.transliteration || '').toLowerCase();
        const itemDesc = (item.description || '').toLowerCase();
        const matchesSearch = itemName.includes(searchQuery) ||
                              itemTrans.includes(searchQuery) ||
                              itemDesc.includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-500">
                <i class="fas fa-search text-4xl text-amber-600 mb-3"></i>
                <p class="text-lg font-semibold">No delicious items match your search.</p>
                <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-maroon-700 text-white rounded-lg hover:bg-maroon-800 transition">View All Menu Items</button>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(item => {
        const availableWeights = Object.keys(item.prices || {});
        const currentWeight = selectedWeights[item.id] || availableWeights[0] || '100g';
        const currentPrice = (item.prices && item.prices[currentWeight] !== undefined) ? item.prices[currentWeight] : 0;

        const isCustom = item.id === 'custom-millet-order';

        return `
            <div class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-amber-200 flex flex-col justify-between group">
                <div>
                    <!-- Card Header Image & Badge -->
                    <div class="relative h-48 overflow-hidden bg-amber-50 cursor-pointer" onclick="openImageModal('${item.image || 'images/podis.jpg'}', '${item.name}')">
                        <img src="${item.image || 'images/podis.jpg'}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
                        <div class="absolute top-3 left-3 bg-maroon-700 text-amber-100 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                            ${item.badge || 'Fresh Batch'}
                        </div>
                        <div class="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded flex items-center gap-1 backdrop-blur-sm">
                            <i class="fas fa-expand text-xs"></i> Zoom
                        </div>
                    </div>

                    <!-- Card Body -->
                    <div class="p-5">
                        <div class="flex justify-between items-start mb-1">
                            <h3 class="text-xl font-bold text-maroon-900 group-hover:text-amber-700 transition-colors">${item.name}</h3>
                        </div>
                        <p class="text-xs font-medium text-amber-800 italic mb-2">${item.transliteration || ''}</p>
                        <p class="text-sm text-gray-600 mb-3 leading-relaxed">${item.description || ''}</p>
                        
                        <!-- Health Benefit Badge -->
                        ${item.healthBenefit ? `
                            <div class="bg-amber-50 border-l-4 border-amber-600 p-2 text-xs text-amber-900 rounded-r mb-4">
                                <i class="fas fa-leaf text-green-600 mr-1"></i> <strong>Key Benefit:</strong> ${item.healthBenefit}
                            </div>
                        ` : ''}
                    </div>
                </div>

                <!-- Weight Selection & Pricing Footer -->
                <div class="p-5 pt-0 bg-white">
                    ${!isCustom ? `
                        <div class="mb-4">
                            <label class="block text-xs font-semibold text-gray-700 mb-1">Select Pack Weight:</label>
                            <div class="grid grid-cols-4 gap-1">
                                ${availableWeights.map(weight => `
                                    <button 
                                        type="button"
                                        onclick="selectWeight('${item.id}', '${weight}')"
                                        class="py-1.5 px-2 text-xs font-black rounded-xl border-2 text-center transition-all transform active:scale-95 ${weight === currentWeight ? 'gold-gradient text-maroon-950 border-gold-600 shadow-md scale-105' : 'bg-amber-50/80 text-maroon-900 border-amber-300 hover:bg-amber-100 font-bold'}"
                                    >
                                        ${weight}
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <div class="flex items-center justify-between pt-3 border-t border-amber-100">
                            <div>
                                <span class="text-xs text-gray-500">Price (${currentWeight})</span>
                                <div class="text-2xl font-black text-maroon-900">₹${currentPrice}</div>
                            </div>
                            <button 
                                onclick="addToCart('${item.id}', '${currentWeight}')"
                                class="bg-gradient-to-r from-maroon-800 to-maroon-900 hover:from-amber-600 hover:to-amber-700 text-white px-4 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center gap-2"
                            >
                                <i class="fas fa-cart-plus"></i> Add to Cart
                            </button>
                        </div>
                    ` : `
                        <div class="pt-3 border-t border-amber-100 flex items-center justify-between">
                            <span class="text-sm font-semibold text-maroon-900">Fresh Custom Batch</span>
                            <a href="#custom-millet-section" class="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow">
                                Request Quote
                            </a>
                        </div>
                    `}
                </div>
            </div>
        `;
    }).join('');
}

// Select weight for an item card
function selectWeight(itemId, weight) {
    selectedWeights[itemId] = weight;
    renderMenu();
}

// Reset Search Filters
function resetFilters() {
    searchQuery = '';
    activeCategory = 'all';
    const searchInput = document.getElementById('search-input');
    if (searchInput) searchInput.value = '';

    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(t => {
        if (t.dataset.category === 'all') {
            t.classList.add('active', 'bg-maroon-700', 'text-white');
            t.classList.remove('bg-amber-100', 'text-maroon-900');
        } else {
            t.classList.remove('active', 'bg-maroon-700', 'text-white');
            t.classList.add('bg-amber-100', 'text-maroon-900');
        }
    });

    renderMenu();
}

// Add Item to Cart
function addToCart(itemId, weight) {
    const item = MENU_ITEMS.find(i => i.id === itemId);
    if (!item) return;

    const unitPrice = (item.prices && item.prices[weight] !== undefined) ? item.prices[weight] : 0;
    const existingIndex = cart.findIndex(c => c.id === itemId && c.weight === weight);

    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({
            id: itemId,
            name: item.name,
            weight: weight,
            price: unitPrice,
            qty: 1
        });
    }

    saveCart();
    updateCartUI();
    showToast(`Added ${item.name} (${weight}) to Cart!`);
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('skanda_cart', JSON.stringify(cart));
}

// Update Cart UI
function updateCartUI() {
    const cartCountElements = document.querySelectorAll('.cart-count-badge');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    cartCountElements.forEach(el => {
        el.innerText = totalItems;
        if (totalItems > 0) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });

    const cartContainer = document.getElementById('cart-items-list');
    const cartSubtotalEl = document.getElementById('cart-subtotal');
    const emptyCartMsg = document.getElementById('empty-cart-message');

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = '';
        if (emptyCartMsg) emptyCartMsg.classList.remove('hidden');
        if (cartSubtotalEl) cartSubtotalEl.innerText = '₹0';
        return;
    }

    if (emptyCartMsg) emptyCartMsg.classList.add('hidden');

    let subtotal = 0;

    cartContainer.innerHTML = cart.map((item, index) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;

        return `
            <div class="flex items-center justify-between p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 mb-2">
                <div class="flex-1 pr-2">
                    <h4 class="font-bold text-sm text-maroon-900">${item.name}</h4>
                    <div class="text-xs text-amber-800 font-medium">Weight: ${item.weight} | ₹${item.price} each</div>
                    <div class="text-xs font-bold text-gray-800 mt-0.5">Item Total: ₹${itemTotal}</div>
                </div>

                <div class="flex items-center gap-2">
                    <button onclick="updateQty(${index}, -1)" class="w-7 h-7 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-amber-100 flex items-center justify-center transition">-</button>
                    <span class="text-sm font-bold text-gray-900 w-4 text-center">${item.qty}</span>
                    <button onclick="updateQty(${index}, 1)" class="w-7 h-7 bg-white border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-amber-100 flex items-center justify-center transition">+</button>
                    <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-700 ml-1 p-1 text-sm"><i class="fas fa-trash-alt"></i></button>
                </div>
            </div>
        `;
    }).join('');

    if (cartSubtotalEl) cartSubtotalEl.innerText = `₹${subtotal.toLocaleString('en-IN')}`;
}

// Update Item Quantity in Cart
function updateQty(index, delta) {
    if (cart[index]) {
        cart[index].qty += delta;
        if (cart[index].qty <= 0) {
            cart.splice(index, 1);
        }
        saveCart();
        updateCartUI();
    }
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    updateCartUI();
}

// Clear Cart
function clearCart() {
    cart = [];
    saveCart();
    updateCartUI();
}

// Send WhatsApp Order & Save to Real Database
async function sendWhatsAppOrder() {
    if (cart.length === 0) {
        showToast("Your cart is empty! Add items first.", "error");
        return;
    }

    const customerName = document.getElementById('cust-name')?.value.trim() || 'Valued Customer';
    const customerPhone = document.getElementById('cust-phone')?.value.trim();
    const customerAddress = document.getElementById('cust-address')?.value.trim() || 'Address to be shared';
    const customerCity = document.getElementById('cust-city')?.value.trim() || 'India';

    if (!customerPhone) {
        showToast("Please enter your Phone / WhatsApp Number to complete order!", "error");
        document.getElementById('cust-phone')?.focus();
        return;
    }

    let orderItemsText = "";
    let subtotal = 0;

    const formattedItems = cart.map((item, idx) => {
        const itemTotal = item.price * item.qty;
        subtotal += itemTotal;
        orderItemsText += `${idx + 1}. *${item.name}* (${item.weight}) x ${item.qty} = ₹${itemTotal}\n`;
        return {
            name: item.name,
            weight: item.weight,
            price: item.price,
            qty: item.qty,
            itemTotal: itemTotal
        };
    });

    let orderNumber = "SKD-2026-PENDING";

    try {
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                customer_name: customerName,
                customer_phone: customerPhone,
                customer_address: customerAddress,
                customer_city: customerCity,
                items: formattedItems,
                total_amount: subtotal
            })
        });
        const data = await res.json();
        if (data.success && data.order_number) {
            orderNumber = data.order_number;
            if (customerPhone) localStorage.setItem('skanda_last_phone', customerPhone);
            
            if (data.order) {
                addCustomerOrder(data.order);
            } else {
                addCustomerOrder({
                    order_number: orderNumber,
                    customer_name: customerName,
                    customer_phone: customerPhone,
                    customer_address: customerAddress,
                    customer_city: customerCity,
                    items: formattedItems,
                    total_amount: subtotal,
                    order_status: "Pending",
                    created_at: new Date().toLocaleString('en-IN')
                });
            }
        }
    } catch (err) {
        console.warn("Could not save to server API, proceeding with WhatsApp:", err);
    }

    const message = 
`*NEW ORDER - SRI SKANDA HOME FOODS* 🚩
*Order Ref:* ${orderNumber}
----------------------------------------
*Customer Name:* ${customerName}
*Customer Phone:* ${customerPhone}
*Delivery Address:* ${customerAddress}, ${customerCity}

*ORDER ITEMS:*
${orderItemsText}
----------------------------------------
*TOTAL AMOUNT:* ₹${subtotal.toLocaleString('en-IN')}
----------------------------------------
*Notes:* 
• Homemade with Tradition & Love
• Pure Brahmin Preparation
• No Preservatives | Fresh Small Batches

Please confirm order details, packing & payment options. Thank you!`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919490068924?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    // Reset Cart to 0 items & close drawer
    clearCart();
    toggleCart();
    showToast("Order sent via WhatsApp! Your cart has been reset to 0 items. 🙏");
}

// Toast notification helper
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl shadow-2xl font-semibold text-sm flex items-center gap-2 transform transition-all duration-300 translate-y-10 opacity-0 ${type === 'error' ? 'bg-red-800 text-white' : 'bg-maroon-800 text-amber-100 border border-amber-400'}`;
    toast.innerHTML = `<i class="fas ${type === 'error' ? 'fa-exclamation-circle text-red-300' : 'fa-check-circle text-amber-400'}"></i> ${message}`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    }, 10);

    setTimeout(() => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Open Image Zoom Modal
function openImageModal(imgSrc, title) {
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');

    if (modal && modalImg && modalTitle) {
        modalImg.src = imgSrc;
        modalTitle.innerText = title;
        modal.classList.remove('hidden');
    }
}

function closeImageModal() {
    const modal = document.getElementById('image-modal');
    if (modal) modal.classList.add('hidden');
}

// --- SUPPORT ASSISTANT FRONTEND LOGIC ---
let chatHistory = [];

function toggleAIChat() {
    const drawer = document.getElementById('ai-chat-drawer');
    if (!drawer) return;

    if (drawer.classList.contains('hidden')) {
        drawer.classList.remove('hidden');
        setTimeout(() => {
            drawer.classList.remove('translate-y-4', 'opacity-0');
        }, 10);
    } else {
        drawer.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => {
            drawer.classList.add('hidden');
        }, 300);
    }
}

function sendQuickPrompt(promptText) {
    const input = document.getElementById('chat-user-input');
    if (input) {
        input.value = promptText;
        sendChatMessage();
    }
}

async function sendChatMessage() {
    const input = document.getElementById('chat-user-input');
    const container = document.getElementById('chat-messages-container');
    const sendBtn = document.getElementById('chat-send-btn');
    const suggestions = document.getElementById('quick-suggestions');

    if (!input || !container) return;

    const userText = input.value.trim();
    if (!userText) return;

    if (suggestions) suggestions.classList.add('hidden');

    const userMsgHtml = `
        <div class="flex items-start justify-end gap-2">
            <div class="bg-maroon-800 text-amber-100 p-3 rounded-2xl border border-amber-400 shadow-sm max-w-[85%] font-medium">
                ${escapeHtml(userText)}
            </div>
            <div class="w-7 h-7 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold">
                <i class="fas fa-user"></i>
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', userMsgHtml);
    input.value = '';
    container.scrollTop = container.scrollHeight;

    const typingId = `typing-${Date.now()}`;
    const typingHtml = `
        <div id="${typingId}" class="flex items-start gap-2 max-w-[85%]">
            <div class="w-7 h-7 rounded-full bg-maroon-800 text-gold-300 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                <i class="fas fa-headset"></i>
            </div>
            <div class="bg-white p-3 rounded-2xl border border-amber-200 shadow-sm text-gray-500 italic flex items-center gap-1.5">
                <i class="fas fa-circle-notch fa-spin text-amber-600"></i> Skanda Assistant is typing...
            </div>
        </div>
    `;
    container.insertAdjacentHTML('beforeend', typingHtml);
    container.scrollTop = container.scrollHeight;

    if (sendBtn) sendBtn.disabled = true;

    try {
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                message: userText,
                history: chatHistory
            })
        });

        const data = await res.json();
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();

        const botReply = data.reply || "I am here to assist you with Sri Skanda Home Foods!";
        
        chatHistory.push({ role: 'user', content: userText });
        chatHistory.push({ role: 'assistant', content: botReply });

        const botMsgHtml = `
            <div class="flex items-start gap-2 max-w-[88%]">
                <div class="w-7 h-7 rounded-full bg-maroon-800 text-gold-300 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    <i class="fas fa-headset"></i>
                </div>
                <div class="bg-white p-3 rounded-2xl border border-amber-200 shadow-sm text-gray-800 space-y-1 font-sans leading-relaxed">
                    ${formatBotReply(botReply)}
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', botMsgHtml);
        container.scrollTop = container.scrollHeight;

    } catch (err) {
        const typingEl = document.getElementById(typingId);
        if (typingEl) typingEl.remove();

        const errHtml = `
            <div class="flex items-start gap-2 max-w-[85%]">
                <div class="w-7 h-7 rounded-full bg-red-800 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <div class="bg-red-50 p-3 rounded-2xl border border-red-200 text-red-800">
                    Sorry, connection error! Please call or WhatsApp us at +91 94900 68924.
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', errHtml);
        container.scrollTop = container.scrollHeight;
    } finally {
        if (sendBtn) sendBtn.disabled = false;
    }
}

function escapeHtml(str) {
    return (str || '').replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function formatBotReply(text) {
    let formatted = escapeHtml(text);
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    formatted = formatted.replace(/\n/g, '<br>');
    return formatted;
}

// Customer Feedback Form Submit Handler
function handleFeedbackSubmit(event) {
    event.preventDefault();
    const name = document.getElementById('fb-name')?.value.trim() || 'Valued Customer';
    const city = document.getElementById('fb-city')?.value.trim() || '';
    const product = document.getElementById('fb-product')?.value.trim() || '';
    const comments = document.getElementById('fb-comments')?.value.trim() || '';

    showToast(`Thank you ${name}! Your feedback has been received. Sri Skanda Home Foods appreciates your support! 🙏`);
    
    // Reset Form
    const form = document.getElementById('feedback-form');
    if (form) form.reset();
}

// Service Worker Registration for Offline Capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('[PWA] Service Worker registered scope:', reg.scope))
            .catch(err => console.warn('[PWA] Service Worker registration failed:', err));
    });
}

// Progressive Web App (PWA) Install Prompt Handling
let deferredPwaPrompt = null;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPwaPrompt = e;
    
    const isDismissed = localStorage.getItem('skanda_pwa_dismissed');
    if (!isDismissed) {
        setTimeout(showPwaInstallBanner, 1500);
    }
});

// Check PWA Installation Status (Hide install buttons if app is already installed or in standalone mode)
function checkPwaInstallation() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                         window.navigator.standalone || 
                         document.referrer.includes('android-app://') ||
                         localStorage.getItem('skanda_pwa_installed') === 'true';

    if (isStandalone) {
        hidePwaInstallButtons();
    }
}

function hidePwaInstallButtons() {
    const headerBtn = document.getElementById('header-install-app-btn');
    if (headerBtn) headerBtn.classList.add('hidden');

    const banner = document.getElementById('pwa-install-banner');
    if (banner) banner.classList.add('hidden');
}

// App Installed Event Listener
window.addEventListener('appinstalled', () => {
    console.log('[PWA] App successfully installed!');
    localStorage.setItem('skanda_pwa_installed', 'true');
    hidePwaInstallButtons();
    showToast("Sri Skanda App installed successfully! 🙏");
});

// Check installation on load
checkPwaInstallation();

// Fallback banner trigger if event isn't deferred yet
setTimeout(() => {
    const isInstalled = localStorage.getItem('skanda_pwa_installed') === 'true' || window.matchMedia('(display-mode: standalone)').matches;
    const isDismissed = localStorage.getItem('skanda_pwa_dismissed');
    if (!isInstalled && !isDismissed) {
        showPwaInstallBanner();
    }
}, 3500);

function showPwaInstallBanner() {
    const isInstalled = localStorage.getItem('skanda_pwa_installed') === 'true' || window.matchMedia('(display-mode: standalone)').matches;
    if (isInstalled) return;

    const banner = document.getElementById('pwa-install-banner');
    if (banner && banner.classList.contains('hidden')) {
        banner.classList.remove('hidden');
        setTimeout(() => {
            banner.classList.remove('translate-y-4', 'opacity-0');
        }, 100);
    }
}

function triggerPwaInstall() {
    if (deferredPwaPrompt) {
        deferredPwaPrompt.prompt();
        deferredPwaPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                localStorage.setItem('skanda_pwa_installed', 'true');
                hidePwaInstallButtons();
                showToast("Thank you for installing Sri Skanda App! 🙏");
            }
            deferredPwaPrompt = null;
            dismissPwaPrompt();
        });
    } else {
        openPwaModal();
    }
}

function openPwaModal() {
    const modal = document.getElementById('pwa-install-modal');
    if (modal) modal.classList.remove('hidden');
}

function closePwaModal() {
    const modal = document.getElementById('pwa-install-modal');
    if (modal) modal.classList.add('hidden');
}

function dismissPwaPrompt() {
    const banner = document.getElementById('pwa-install-banner');
    if (banner && !banner.classList.contains('hidden')) {
        banner.classList.add('translate-y-4', 'opacity-0');
        setTimeout(() => banner.classList.add('hidden'), 300);
    }
    localStorage.setItem('skanda_pwa_dismissed', 'true');
}

// --- CUSTOMER MY ORDERS & LOCALSTORAGE SYNC LOGIC ---

function getStoredCustomerOrders() {
    try {
        const raw = localStorage.getItem('skanda_customer_orders');
        return raw ? JSON.parse(raw) : [];
    } catch (e) {
        return [];
    }
}

function saveStoredCustomerOrders(orders) {
    try {
        localStorage.setItem('skanda_customer_orders', JSON.stringify(orders || []));
        updateMyOrdersBadge(orders ? orders.length : 0);
    } catch (e) {
        console.warn("Failed to save customer orders to localStorage", e);
    }
}

function addCustomerOrder(newOrder) {
    const orders = getStoredCustomerOrders();
    if (!orders.some(o => o.order_number === newOrder.order_number)) {
        orders.unshift(newOrder);
        saveStoredCustomerOrders(orders);
    }
    syncCustomerOrders();
}

function updateMyOrdersBadge(count) {
    const badge = document.getElementById('my-orders-badge');
    if (badge) {
        if (count > 0) {
            badge.innerText = count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

// Sync Customer Orders with Server (Admin Dashboard database)
async function syncCustomerOrders(notifyUser = false) {
    const syncIcon = document.getElementById('sync-orders-icon');
    if (syncIcon) syncIcon.classList.add('fa-spin');

    const stored = getStoredCustomerOrders();
    const orderNumbers = stored.map(o => o.order_number).filter(Boolean);
    const lastPhone = localStorage.getItem('skanda_last_phone') || '';

    if (orderNumbers.length === 0 && !lastPhone) {
        if (syncIcon) syncIcon.classList.remove('fa-spin');
        renderMyOrders([]);
        updateMyOrdersBadge(0);
        if (notifyUser) showToast("No stored orders found in local storage.", "info");
        return;
    }

    try {
        const res = await fetch('/api/customer/sync-orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order_numbers: orderNumbers,
                phone: lastPhone
            })
        });

        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
            // Server returns ONLY orders that STILL EXIST in the admin dashboard!
            const activeOrders = data.orders;

            // Overwrite local storage to ONLY keep active orders (purges deleted orders automatically)
            saveStoredCustomerOrders(activeOrders);
            renderMyOrders(activeOrders);

            if (notifyUser) {
                showToast(`Synced ${activeOrders.length} active order(s) with kitchen status!`, "success");
            }
        }
    } catch (err) {
        console.warn("Failed to sync customer orders:", err);
        renderMyOrders(stored);
    } finally {
        if (syncIcon) syncIcon.classList.remove('fa-spin');
    }
}

// Search past orders by customer phone number
async function searchCustomerOrdersByPhone() {
    const phoneInput = document.getElementById('my-orders-phone-input');
    const phone = phoneInput?.value.trim();

    if (!phone) {
        showToast("Please enter a phone number to search orders!", "error");
        return;
    }

    localStorage.setItem('skanda_last_phone', phone);

    const syncIcon = document.getElementById('sync-orders-icon');
    if (syncIcon) syncIcon.classList.add('fa-spin');

    try {
        const res = await fetch('/api/customer/sync-orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone: phone })
        });
        const data = await res.json();

        if (data.success && Array.isArray(data.orders)) {
            const foundOrders = data.orders;
            saveStoredCustomerOrders(foundOrders);
            renderMyOrders(foundOrders);

            if (foundOrders.length > 0) {
                showToast(`Found ${foundOrders.length} active order(s) for ${phone}!`, "success");
            } else {
                showToast(`No active orders found for phone ${phone}`, "info");
            }
        }
    } catch (err) {
        showToast("Failed to search orders", "error");
    } finally {
        if (syncIcon) syncIcon.classList.remove('fa-spin');
    }
}

let activeCustomerOrdersList = [];

// Render My Orders UI in Modal
function renderMyOrders(orders) {
    activeCustomerOrdersList = orders || [];
    const container = document.getElementById('my-orders-container');
    if (!container) return;

    if (!orders || orders.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8 px-4 space-y-4">
                <div class="w-16 h-16 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center mx-auto text-2xl border border-amber-300">
                    <i class="fas fa-box-open"></i>
                </div>
                <div>
                    <h4 class="font-bold text-base text-maroon-900 font-serif">No Active Orders Stored in This Browser</h4>
                    <p class="text-xs text-gray-600 max-w-sm mx-auto mt-1">If you previously ordered on WhatsApp or another device, enter your phone number below to fetch your active orders directly from our kitchen database!</p>
                </div>
                
                <div class="max-w-sm mx-auto bg-amber-50 p-3.5 rounded-2xl border border-amber-300 space-y-2 text-left">
                    <label class="block text-[11px] font-bold text-maroon-900 uppercase">Find Orders By Phone Number</label>
                    <div class="flex gap-2">
                        <input type="tel" id="empty-state-phone-input" placeholder="Enter Phone Number (e.g. 9490068924)..." class="flex-1 px-3 py-2 bg-white text-black font-bold border border-amber-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-maroon-700">
                        <button onclick="const p = document.getElementById('empty-state-phone-input')?.value; if(p) { document.getElementById('my-orders-phone-input').value = p; searchCustomerOrdersByPhone(); }" class="bg-maroon-800 hover:bg-maroon-900 text-gold-300 font-bold px-3.5 py-2 rounded-xl text-xs shadow transition flex-shrink-0">
                            Find Orders
                        </button>
                    </div>
                </div>

                <button onclick="closeMyOrdersModal()" class="gold-gradient text-maroon-950 font-black px-5 py-2.5 rounded-xl text-xs shadow hover:shadow-md transition inline-flex items-center gap-1.5 border border-gold-500">
                    <i class="fas fa-utensils"></i> Browse Menu & Place Order
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = orders.map((order, index) => {
        const statusClassMap = {
            'Pending': 'bg-amber-100 text-amber-900 border-amber-400',
            'Confirmed': 'bg-blue-100 text-blue-900 border-blue-400',
            'Processing': 'bg-purple-100 text-purple-900 border-purple-400',
            'Delivered': 'bg-emerald-100 text-emerald-900 border-emerald-500',
            'Cancelled': 'bg-red-100 text-red-900 border-red-400'
        };

        const statusClass = statusClassMap[order.order_status] || 'bg-amber-100 text-amber-900 border-amber-400';

        let itemsList = order.items;
        if (typeof itemsList === 'string') {
            try { itemsList = JSON.parse(itemsList); } catch(e) { itemsList = []; }
        }
        if (!Array.isArray(itemsList)) itemsList = [];

        const itemsHtml = itemsList.map(item => `
            <div class="flex justify-between items-center text-xs py-1 border-b border-amber-100/80 last:border-0">
                <span class="font-medium text-gray-800">${item.name} <span class="text-amber-800 font-normal">(${item.weight || 'Standard'})</span> × ${item.qty || 1}</span>
                <span class="font-bold text-maroon-900">₹${item.itemTotal || (item.price * item.qty) || 0}</span>
            </div>
        `).join('') || '<p class="text-xs text-gray-500">Order item details</p>';

        const orderRef = order.order_number || order.id || `SKD-ORDER-${index}`;

        return `
            <div onclick="openOrderDetailModal('${orderRef}')" class="bg-white rounded-2xl border-2 border-amber-200/90 shadow-sm p-4 hover:border-gold-500 hover:shadow-md transition cursor-pointer space-y-3 group">
                <div class="flex flex-wrap justify-between items-start gap-2 border-b border-amber-100 pb-2.5">
                    <div>
                        <div class="flex items-center gap-2">
                            <span class="font-black text-sm text-maroon-900 font-serif group-hover:text-gold-600 transition">${orderRef}</span>
                            <span class="text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusClass}">
                                ● ${order.order_status || 'Pending'}
                            </span>
                        </div>
                        <p class="text-[11px] text-gray-500 mt-0.5">
                            <i class="far fa-clock mr-1"></i>${order.created_at || 'Recently placed'}
                        </p>
                    </div>

                    <div class="text-right">
                        <span class="text-xs text-gray-500 uppercase block tracking-wider font-semibold">Total Amount</span>
                        <span class="font-black text-base text-maroon-900">₹${(order.total_amount || 0).toLocaleString('en-IN')}</span>
                    </div>
                </div>

                <div class="bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
                    <p class="text-[11px] font-bold text-maroon-900 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                        <span><i class="fas fa-list-ul text-amber-700 mr-1"></i> Items Summary:</span>
                        <span class="text-[10px] text-amber-800 font-bold group-hover:underline">View full receipt & live status &rarr;</span>
                    </p>
                    ${itemsHtml}
                </div>

                <div class="flex items-center justify-between pt-1 gap-2">
                    <div class="text-[11px] text-amber-900">
                        <i class="fas fa-user-circle text-amber-700 mr-1"></i> ${order.customer_name || 'Valued Customer'} (${order.customer_phone || ''})
                    </div>
                    <button onclick="event.stopPropagation(); openOrderDetailModal('${orderRef}')" class="gold-gradient hover:opacity-95 text-maroon-950 px-3 py-1.5 rounded-xl text-xs font-black transition shadow border border-gold-500 flex items-center gap-1.5 transform active:scale-95">
                        <i class="fas fa-receipt"></i> Full Receipt & Status
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function openMyOrdersModal() {
    const modal = document.getElementById('my-orders-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
        
        // Immediately render stored customer orders without waiting for network response
        const stored = getStoredCustomerOrders();
        renderMyOrders(stored);
        
        syncCustomerOrders();
    }
}

function closeMyOrdersModal() {
    const modal = document.getElementById('my-orders-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

// --- DETAILED ORDER RECEIPT MODAL LOGIC ---

function openOrderDetailModal(orderRefKey) {
    const searchKey = String(orderRefKey || '').trim();
    
    // Look up in active displayed list first
    let order = activeCustomerOrdersList.find(o => 
        String(o.order_number || '').trim() === searchKey || 
        String(o.id || '').trim() === searchKey
    );

    // Fallback to local storage lookup
    if (!order) {
        const stored = getStoredCustomerOrders();
        order = stored.find(o => 
            String(o.order_number || '').trim() === searchKey || 
            String(o.id || '').trim() === searchKey
        );
    }

    if (!order) {
        showToast("Order details not found.", "error");
        return;
    }

    const modal = document.getElementById('customer-order-detail-modal');
    const body = document.getElementById('customer-order-detail-body');
    const refEl = document.getElementById('detail-modal-order-ref');
    const waBtn = document.getElementById('detail-modal-wa-btn');

    if (refEl) refEl.innerText = `Ref: ${order.order_number}`;

    const status = order.order_status || 'Pending';
    const statusLower = status.toLowerCase();

    // Visual Status Timeline Tracker
    const isPending = true;
    const isConfirmed = statusLower === 'confirmed' || statusLower === 'processing' || statusLower === 'delivered';
    const isProcessing = statusLower === 'processing' || statusLower === 'delivered';
    const isDelivered = statusLower === 'delivered';
    const isCancelled = statusLower === 'cancelled';

    let timelineHtml = '';
    if (isCancelled) {
        timelineHtml = `
            <div class="bg-red-50 border border-red-300 text-red-900 p-3.5 rounded-2xl flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-red-800 text-white flex items-center justify-center text-lg flex-shrink-0">
                    <i class="fas fa-times-circle"></i>
                </div>
                <div>
                    <h4 class="font-bold text-sm">Order Cancelled by Kitchen</h4>
                    <p class="text-[11px] text-red-700">This order was marked as cancelled. Contact our team on WhatsApp for details.</p>
                </div>
            </div>
        `;
    } else {
        timelineHtml = `
            <div class="bg-amber-50/90 p-4 rounded-2xl border border-amber-300 space-y-3 shadow-sm">
                <div class="flex justify-between items-center text-xs font-bold text-maroon-900 border-b border-amber-200 pb-2">
                    <span><i class="fas fa-tasks text-amber-700 mr-1"></i> Kitchen Live Status Tracker</span>
                    <span class="px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase shadow-sm ${
                        isDelivered ? 'bg-emerald-600 text-white' :
                        isProcessing ? 'bg-purple-700 text-white' :
                        isConfirmed ? 'bg-blue-700 text-white' : 'bg-amber-500 text-maroon-950'
                    }">
                        ● ${status}
                    </span>
                </div>

                <!-- Timeline Steps -->
                <div class="grid grid-cols-4 gap-1 text-center pt-1">
                    <div class="space-y-1">
                        <div class="w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${isPending ? 'bg-amber-500 text-maroon-950 font-black ring-2 ring-amber-300' : 'bg-gray-200 text-gray-400'}">
                            1
                        </div>
                        <span class="text-[10px] font-bold ${isPending ? 'text-maroon-900' : 'text-gray-400'} block">Received</span>
                    </div>

                    <div class="space-y-1">
                        <div class="w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${isConfirmed ? 'bg-blue-600 text-white font-black ring-2 ring-blue-300' : 'bg-gray-200 text-gray-400'}">
                            2
                        </div>
                        <span class="text-[10px] font-bold ${isConfirmed ? 'text-blue-900' : 'text-gray-400'} block">Confirmed</span>
                    </div>

                    <div class="space-y-1">
                        <div class="w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${isProcessing ? 'bg-purple-600 text-white font-black ring-2 ring-purple-300' : 'bg-gray-200 text-gray-400'}">
                            3
                        </div>
                        <span class="text-[10px] font-bold ${isProcessing ? 'text-purple-900' : 'text-gray-400'} block">Dispatched</span>
                    </div>

                    <div class="space-y-1">
                        <div class="w-7 h-7 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${isDelivered ? 'bg-emerald-600 text-white font-black ring-2 ring-emerald-300' : 'bg-gray-200 text-gray-400'}">
                            4
                        </div>
                        <span class="text-[10px] font-bold ${isDelivered ? 'text-emerald-900' : 'text-gray-400'} block">Delivered</span>
                    </div>
                </div>
            </div>
        `;
    }

    let rawItems = order.items;
    if (typeof rawItems === 'string') {
        try { rawItems = JSON.parse(rawItems); } catch(e) { rawItems = []; }
    }
    if (!Array.isArray(rawItems)) rawItems = [];

    const itemsTableHtml = rawItems.length > 0 ? rawItems.map((item, i) => {
        const itemPrice = item.price || 0;
        const itemQty = item.qty || 1;
        const total = item.itemTotal || (itemPrice * itemQty);

        return `
            <tr class="border-b border-amber-100 hover:bg-amber-50/50 transition">
                <td class="py-2.5 px-3 font-semibold text-gray-900">
                    <div>${item.name}</div>
                    <span class="text-[10px] text-amber-800 font-normal">Pack: ${item.weight || 'Standard'}</span>
                </td>
                <td class="py-2.5 px-3 text-center text-gray-700 font-medium">₹${itemPrice}</td>
                <td class="py-2.5 px-3 text-center font-bold text-maroon-900">×${itemQty}</td>
                <td class="py-2.5 px-3 text-right font-bold text-maroon-900">₹${total.toLocaleString('en-IN')}</td>
            </tr>
        `;
    }).join('') : '<tr><td colspan="4" class="p-3 text-center text-gray-500">No items recorded</td></tr>';

    body.innerHTML = `
        ${timelineHtml}

        <!-- Customer & Order Information Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80">
            <div class="space-y-1">
                <p class="text-[10px] uppercase tracking-wider font-bold text-amber-800">Delivery Details</p>
                <p class="font-bold text-maroon-900 text-xs flex items-center gap-1.5"><i class="fas fa-user text-amber-700"></i> ${order.customer_name || 'Valued Customer'}</p>
                <p class="text-gray-700 text-xs flex items-center gap-1.5"><i class="fas fa-phone text-amber-700"></i> ${order.customer_phone || 'N/A'}</p>
                <p class="text-gray-700 text-xs flex items-start gap-1.5 mt-1"><i class="fas fa-map-marker-alt text-amber-700 mt-0.5"></i> ${order.customer_address || 'Address provided'}, ${order.customer_city || ''}</p>
            </div>

            <div class="space-y-1 sm:text-right border-t sm:border-t-0 sm:border-l border-amber-200 pt-2 sm:pt-0 sm:pl-3">
                <p class="text-[10px] uppercase tracking-wider font-bold text-amber-800">Order Information</p>
                <p class="font-bold text-maroon-900 text-xs"><i class="far fa-calendar-alt text-amber-700 mr-1"></i> Date: ${order.created_at || 'Recently placed'}</p>
                <p class="text-xs text-gray-700"><i class="fas fa-wallet text-amber-700 mr-1"></i> Payment Status: <span class="font-bold text-maroon-900">${order.payment_status || 'Unpaid / COD'}</span></p>
                <p class="text-xs text-gray-700"><i class="fas fa-hashtag text-amber-700 mr-1"></i> Order Ref: <span class="font-mono font-bold text-maroon-900">${order.order_number}</span></p>
            </div>
        </div>

        <!-- Itemized Receipt Table -->
        <div class="border-2 border-amber-200 rounded-2xl overflow-hidden shadow-sm">
            <div class="bg-maroon-900 text-amber-100 px-3.5 py-2 font-bold font-serif text-xs flex justify-between items-center border-b border-gold-500/40">
                <span><i class="fas fa-shopping-basket text-gold-400 mr-1"></i> Itemized Receipt Breakdown</span>
                <span class="text-[10px] font-sans font-normal text-amber-300">Pure Brahmin Recipe</span>
            </div>

            <table class="w-full text-xs text-left">
                <thead class="bg-amber-100/80 text-maroon-950 font-bold uppercase text-[10px] tracking-wider border-b border-amber-300">
                    <tr>
                        <th class="py-2 px-3">Item & Weight</th>
                        <th class="py-2 px-3 text-center">Price</th>
                        <th class="py-2 px-3 text-center">Qty</th>
                        <th class="py-2 px-3 text-right">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${itemsTableHtml}
                </tbody>
            </table>

            <!-- Grand Total Footer -->
            <div class="bg-amber-100/90 p-3.5 flex flex-wrap justify-between items-center gap-2 border-t-2 border-gold-500">
                <div>
                    <span class="text-[10px] uppercase font-bold text-amber-800 block">Packaging & Shipping</span>
                    <span class="text-xs font-bold text-green-700 flex items-center gap-1"><i class="fas fa-check-circle"></i> Standard Shipping Included</span>
                </div>
                <div class="text-right">
                    <span class="text-[10px] uppercase font-bold text-amber-800 block">Grand Total</span>
                    <span class="text-xl font-black text-maroon-900 font-serif">₹${(order.total_amount || 0).toLocaleString('en-IN')}</span>
                </div>
            </div>
        </div>

        <!-- Authenticity & Quality Badge -->
        <div class="bg-maroon-950 text-amber-200 p-3.5 rounded-2xl border border-gold-500/40 flex items-center justify-between gap-3">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full gold-gradient text-maroon-950 flex items-center justify-center text-base font-bold flex-shrink-0 shadow">
                    <i class="fas fa-award"></i>
                </div>
                <div>
                    <p class="font-bold text-xs text-gold-300">Sri Skanda Heritage Guarantee</p>
                    <p class="text-[10px] text-amber-200/80">100% Pure Cow Ghee • Garlic-Free Brahmin Recipe • No Preservatives</p>
                </div>
            </div>
        </div>
    `;

    const waText = encodeURIComponent(`Namaste Sri Skanda Team! Inquiry regarding my Order Ref: ${order.order_number}. Current status shows: ${order.order_status}.`);
    if (waBtn) waBtn.href = `https://wa.me/919490068924?text=${waText}`;

    if (modal) {
        modal.classList.remove('hidden');
        modal.style.display = 'flex';
    }
}

function closeOrderDetailModal() {
    const modal = document.getElementById('customer-order-detail-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.style.display = 'none';
    }
}

// Expose global window scope methods for HTML inline triggers
window.openMyOrdersModal = openMyOrdersModal;
window.closeMyOrdersModal = closeMyOrdersModal;
window.openOrderDetailModal = openOrderDetailModal;
window.closeOrderDetailModal = closeOrderDetailModal;
window.syncCustomerOrders = syncCustomerOrders;
window.searchCustomerOrdersByPhone = searchCustomerOrdersByPhone;

// --- SMART PWA INSTALLATION & AUTO-DISAPPEAR LOGIC ---
let deferredPrompt = null;

function isAppInstalled() {
    return window.matchMedia('(display-mode: standalone)').matches || 
           window.navigator.standalone === true || 
           localStorage.getItem('skanda_app_installed') === 'true';
}

function updateInstallButtonVisibility() {
    const installBtn = document.getElementById('header-install-app-btn');
    if (!installBtn) return;

    if (isAppInstalled()) {
        installBtn.classList.add('hidden');
        installBtn.style.display = 'none';
    } else {
        installBtn.classList.remove('hidden');
        installBtn.style.display = 'inline-flex';
    }
}

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    updateInstallButtonVisibility();
});

window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    localStorage.setItem('skanda_app_installed', 'true');
    updateInstallButtonVisibility();
});

async function triggerPwaInstall() {
    if (isAppInstalled()) {
        updateInstallButtonVisibility();
        return;
    }

    if (deferredPrompt) {
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            localStorage.setItem('skanda_app_installed', 'true');
            deferredPrompt = null;
            updateInstallButtonVisibility();
        }
    } else {
        openPwaModal();
    }
}

function openPwaModal() {
    const modal = document.getElementById('pwa-install-modal');
    if (modal) modal.classList.remove('hidden');
}

function closePwaModal() {
    const modal = document.getElementById('pwa-install-modal');
    if (modal) modal.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', updateInstallButtonVisibility);
window.addEventListener('load', updateInstallButtonVisibility);

window.triggerPwaInstall = triggerPwaInstall;
window.openPwaModal = openPwaModal;
window.closePwaModal = closePwaModal;
