const products = [
    {
        id: 1,
        name: 'حساب Roblox احترافي',
        description: 'اسم الحساب: mohammed_amine95| فيه Gamepass الطائرة ✈️ والشرطي 🚔 | أكثر الألعاب لعب: Emergency Emden و Emergency Hamburg | سيرفر: Previ',
        price: '200 درهم',
        emoji: '🎮'
    },
    {
        id: 2,
        name: 'حساب Roblox إضافي',
        description: 'اسم الحساب: mohammed_amine97| حساب ثاني للبيع',
        price: '400 درهم',
        emoji: '🔥'
    }
];
// Discord Webhook URL
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1487798887518310401/9HGXMAk3DpVN1YuzpeKM2PYgwZbKcxxejwhWehgIeo55K6V9MYU8nbtvooeIt_dRaBHC';

// Discord Server Link (استبدل هذا برابط خادمك)
const DISCORD_SERVER_LINK = 'https://discord.gg/lakhalstore';

// WhatsApp Number
const WHATSAPP_NUMBER = '964704973576';

// MT Cash Payment Info
const MT_CASH_INFO = {
    name: 'MT CASH',
    description: 'تحويل أموال آمن وسريع',
    icon: '💳'
};

// Log initialization
console.log('%c🔔 متجر ديجيتال ستور جاهز!', 'color: #FFD700; font-size: 16px; font-weight: bold;');
console.log('Webhook URL:', DISCORD_WEBHOOK_URL.substring(0, 50) + '...');

// Favorites and Cart Array
let favorites = [];
let cartItems = [];

// Load Favorites from localStorage
function loadFavorites() {
    const stored = localStorage.getItem('favorites');
    favorites = stored ? JSON.parse(stored) : [];
}

// Load Cart from localStorage
function loadCart() {
    const stored = localStorage.getItem('cart');
    cartItems = stored ? JSON.parse(stored) : [];
    updateCartCount();
}

// Save Favorites to localStorage
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}

// Save Cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartCount();
}

// Update Cart Count
function updateCartCount() {
    const count = cartItems.length;
    document.getElementById('cartCount').textContent = count;
}

// Toggle Favorite
function toggleFavorite(productId, event) {
    event.stopPropagation();
    const index = favorites.indexOf(productId);
    
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(productId);
    }
    
    saveFavorites();
    updateProductCards();
}

// Add to Cart
function addToCart(productId, productName, price) {
    const item = {
        id: productId,
        name: productName,
        price: price,
        timestamp: Date.now()
    };
    cartItems.push(item);
    saveCart();
    
    // Show notification
    showCartNotification(productName);
}

// Show Cart Notification
function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `<span style="font-size: 16px; margin-right: 8px;">✓</span> تم إضافة "${productName}" إلى السلة`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2500);
}

// Live Notifications System
const buyerNames = [
    'أحمد من الرياض',
    'فاطمة من جدة',
    'محمد من الدمام',
    'سارة من الكويت',
    'علي من البحرين',
    'منى من الدوحة',
    'عمر من الإمارات',
    'ليلى من عمّان',
    'يوسف من بغداد',
    'هناء من الرياض'
];

const notificationMessages = [
    'اشترى حساب احترافي',
    'حصل على الباقة الكاملة',
    'أكمل عملية الشراء',
    'اختار أفضل خيار'
];

function createLiveNotification() {
    const container = document.getElementById('liveNotifications');
    if (!container) return;
    
    const buyer = buyerNames[Math.floor(Math.random() * buyerNames.length)];
    const message = notificationMessages[Math.floor(Math.random() * notificationMessages.length)];
    const timeAgo = Math.floor(Math.random() * 5) + 1;
    
    const notification = document.createElement('div');
    notification.className = 'live-notification';
    notification.innerHTML = `
        <div class="notification-header">
            <div class="notification-badge">
                <span>✓</span>
                <span style="font-weight: 700;">مشتري جديد</span>
            </div>
            <span class="notification-time">قبل ${timeAgo}m</span>
        </div>
        <div class="notification-content">
            <div class="notification-buyer">${buyer}</div>
            <div class="notification-product">${message}</div>
            <div class="notification-details">
                <span>💰</span>
                <span>المبلغ المشترى: 400 $</span>
            </div>
        </div>
    `;
    
    container.appendChild(notification);
    
    // Remove after animation completes
    setTimeout(() => {
        notification.remove();
    }, 6000);
}

// Start live notifications
function startLiveNotifications() {
    // Show initial notification
    setTimeout(createLiveNotification, 2000);
    
    // Show new notification every 5-8 seconds
    setInterval(() => {
        if (Math.random() > 0.4) { // 60% chance to show notification
            createLiveNotification();
        }
    }, 5000 + Math.random() * 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('تم تحميل الصفحة - جاري التهيئة...');
    
    // Initialize splash screen
    initSplashScreen();
    
    // Start live notifications
    startLiveNotifications();
    
    loadFavorites();
    loadCart();
    loadProducts();
    createPaymentModal();
    setupContactForm();
    updateWhatsAppLink();
    setupCartButton();
    setupCheckoutForm();
    setupFloatingActionMenu();
    console.log('✅ تم التهيئة بنجاح');
});

// Initialize Splash Screen
function initSplashScreen() {
    const splashScreen = document.getElementById('splashScreen');
    if (splashScreen) {
        // Remove splash screen after animation completes
        setTimeout(() => {
            splashScreen.remove();
            console.log('🎉 تم إغلاق شاشة الترحيب!');
        }, 3500); // 3s animation + 0.5s buffer
    }
}

// Setup Floating Action Menu
function setupFloatingActionMenu() {
    const fabMain = document.getElementById('fabMain');
    const fabMenu = document.querySelector('.floating-action-menu');
    const fabItems = document.querySelectorAll('.fab-item');

    if (fabMain) {
        fabMain.addEventListener('click', () => {
            fabMenu.classList.toggle('active');
            fabMain.classList.toggle('active');
        });

        // Close menu when clicking on items
        fabItems.forEach(item => {
            item.addEventListener('click', () => {
                fabMenu.classList.remove('active');
                fabMain.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!fabMenu.contains(e.target) && !fabMain.contains(e.target)) {
                fabMenu.classList.remove('active');
                fabMain.classList.remove('active');
            }
        });
    }
}

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Close menu
    const fabMenu = document.querySelector('.floating-action-menu');
    const fabMain = document.getElementById('fabMain');
    if (fabMenu) {
        fabMenu.classList.remove('active');
        fabMain.classList.remove('active');
    }
}

// Scroll to Product Function
function scrollToProduct() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Setup Checkout Form
function setupCheckoutForm() {
    const form = document.getElementById('checkoutForm');
    if (form) {
        form.addEventListener('submit', handleCheckoutSubmit);
    }
}

// Setup Cart Button
function setupCartButton() {
    const cartBtn = document.getElementById('cartHeaderBtn');
    if (cartBtn) {
        cartBtn.addEventListener('click', openCartModal);
    }
}

// Open Cart Modal
function openCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.add('active');
        displayCartItems();
        updateCartSummary();
    }
}

// Close Cart Modal
function closeCartModal() {
    const modal = document.getElementById('cartModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Close cart modal when clicking outside
document.addEventListener('click', function(event) {
    const cartModal = document.getElementById('cartModal');
    if (cartModal && cartModal.classList.contains('active')) {
        // If click is on the modal overlay (not on the content), close it
        if (event.target === cartModal) {
            closeCartModal();
        }
    }
});

// Display Cart Items
function displayCartItems() {
    const container = document.getElementById('cartItemsContainer');
    
    if (cartItems.length === 0) {
        container.innerHTML = '<div class="empty-cart"><p>🛒 سلتك فارغة</p><p class="empty-cart-text">ابدأ بإضافة منتجات من المتجر</p></div>';
        return;
    }
    
    container.innerHTML = cartItems.map((item, index) => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price}</div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${index})" title="حذف من السلة">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </div>
    `).join('');
}

// Remove from Cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    saveCart();
    displayCartItems();
    updateCartSummary();
}

// Update Cart Summary
function updateCartSummary() {
    const itemCount = cartItems.length;
    const total = cartItems.reduce((sum, item) => sum + parseInt(item.price), 0);
    
    document.getElementById('cartItemCount').textContent = itemCount;
    document.getElementById('cartTotal').textContent = `$${total}`;
}

// Proceed to Checkout
function proceedToCheckout() {
    if (cartItems.length === 0) {
        alert('سلتك فارغة! أضف منتجات أولاً.');
        return;
    }
    
    closeCartModal();
    openCheckoutModal();
}

// Open Checkout Modal
function openCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.add('active');
        displayCheckoutSummary();
    }
}

// Close Checkout Modal
function closeCheckoutModal() {
    const modal = document.getElementById('checkoutModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// Display Checkout Summary
function displayCheckoutSummary() {
    const container = document.getElementById('checkoutSummary');
    
    container.innerHTML = cartItems.map((item, index) => `
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(0,0,0,0.1);">
            <span>${item.name}</span>
            <span style="font-weight: 800; color: var(--primary-color);">$${item.price}</span>
        </div>
    `).join('') + `
        <div style="display: flex; justify-content: space-between; padding: 12px 0; font-weight: 800; font-size: 18px; color: var(--primary-color); margin-top: 8px;">
            <span>الإجمالي:</span>
            <span>$${cartItems.reduce((sum, item) => sum + parseInt(item.price), 0)}</span>
        </div>
    `;
}

// Load Products
function loadProducts() {
    const container = document.getElementById('productsContainer');
    container.innerHTML = '';

    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Update Product Cards (for favorite status)
function updateProductCards() {
    const container = document.getElementById('productsContainer');
    const cards = container.querySelectorAll('.product-card');
    
    cards.forEach((card, index) => {
        const product = products[index];
        const heartBtn = card.querySelector('.product-heart-btn');
        const heartIcon = heartBtn.querySelector('.heart-icon');
        
        if (favorites.includes(product.id)) {
            heartIcon.classList.add('liked');
        } else {
            heartIcon.classList.remove('liked');
        }
    });
}

// Create Product Card
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    const isFavorited = favorites.includes(product.id);
    
    card.innerHTML = `
        <div class="product-image-wrapper">
            <div class="product-image">${product.emoji}</div>
            <button class="product-heart-btn" onclick="toggleFavorite(${product.id}, event)" title="أضف إلى المفضلة">
                <svg class="heart-icon ${isFavorited ? 'liked' : ''}" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
            <button class="product-cart-btn" onclick="addToCart(${product.id}, '${product.name}', '${product.price}')" title="أضف إلى السلة">
                <svg class="cart-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            </button>
        </div>
        <div class="product-content">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-price">$${product.price}</div>
        </div>
    `;
    return card;

}

// Handle Product Click
function handleProductClick(productName, price) {
    showPaymentModal(productName, price);
}

// Setup Contact Form
function setupContactForm() {
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', handleFormSubmit);
}

// ============================================
// Payment Modal Functions
// ============================================

// Show Payment Modal
function showPaymentModal(productName, price) {
    console.log('فتح Modal للمنتج:', productName, 'السعر:', price);
    
    const modal = document.getElementById('paymentModal');
    if (!modal) {
        console.error('Modal غير موجود!');
        return;
    }

    // تحديث بيانات المنتج في Modal
    document.getElementById('modalProductName').textContent = productName;
    document.getElementById('modalProductPrice').textContent = `$${price}`;
    
    // تخزين بيانات المنتج الحالية
    modal.dataset.productName = productName;
    modal.dataset.productPrice = price;

    // عرض Modal
    modal.style.display = 'flex';
    console.log('✅ تم فتح Modal');
}

// Create Payment Modal
function createPaymentModal() {
    const modalHTML = `
        <div id="paymentModal" class="payment-modal">
            <div class="payment-modal-content">
                <button class="modal-close" onclick="closePaymentModal()">&times;</button>
                
                <div class="modal-header">
                    <h2>💳 تفاصيل الطلب</h2>
                </div>

                <div class="modal-body">
                    <div class="product-summary">
                        <div class="summary-item">
                            <span class="label">المنتج:</span>
                            <span class="value" id="modalProductName">-</span>
                        </div>
                        <div class="summary-item">
                            <span class="label">السعر:</span>
                            <span class="value" id="modalProductPrice">-</span>
                        </div>
                    </div>

                    <div class="payment-methods">
                        <h3>طرق الدفع المتوفرة</h3>
                        <div class="payment-option selected" onclick="selectPaymentMethod(this)">
                            <input type="radio" id="mtcash" name="payment" value="mtcash" checked>
                            <label for="mtcash">
                                <span class="payment-icon">💳</span>
                                <div class="payment-details">
                                    <span class="payment-name">MT CASH</span>
                                    <span class="payment-desc">تحويل أموال آمن وسريع</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    <form id="purchaseForm" class="purchase-form">
                        <div class="form-group">
                            <label for="buyerName">الاسم الكامل *</label>
                            <input type="text" id="buyerName" placeholder="أدخل اسمك" required>
                        </div>

                        <div class="form-group">
                            <label for="buyerEmail">البريد الإلكتروني *</label>
                            <input type="email" id="buyerEmail" placeholder="بريدك الإلكتروني" required>
                        </div>

                        <div class="form-group">
                            <label for="buyerPhone">رقم الهاتف *</label>
                            <input type="tel" id="buyerPhone" placeholder="رقم هاتفك" required>
                        </div>

                        <div class="form-actions">
                            <button type="button" class="btn btn-secondary" onclick="closePaymentModal()">إلغاء</button>
                            <button type="submit" class="btn btn-primary">تأكيد الطلب</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `;

    // إضافة Modal إلى الصفحة
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // إضافة مستمع للنموذج
    document.getElementById('purchaseForm').addEventListener('submit', handlePurchaseSubmit);
    
    // إضافة مستمع للإغلاق عند الضغط خارج المحتوى
    document.getElementById('paymentModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closePaymentModal();
        }
    });
    
    console.log('✅ تم إنشاء Modal بنجاح');
}

// Close Payment Modal
function closePaymentModal() {
    console.log('إغلاق Modal');
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.style.display = 'none';
        // تنظيف النموذج
        const form = document.getElementById('purchaseForm');
        if (form) {
            form.reset();
        }
    }
}

// Select Payment Method
function selectPaymentMethod(element) {
    const options = document.querySelectorAll('.payment-option');
    options.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
}

// Handle Purchase Submit
async function handlePurchaseSubmit(e) {
    e.preventDefault();
    console.log('جاري معالجة الطلب...');

    const modal = document.getElementById('paymentModal');
    const productName = modal.dataset.productName;
    const productPrice = modal.dataset.productPrice;
    const buyerName = document.getElementById('buyerName').value.trim();
    const buyerEmail = document.getElementById('buyerEmail').value.trim();
    const buyerPhone = document.getElementById('buyerPhone').value.trim();
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;

    console.log('البيانات المُدخلة:', {
        productName,
        productPrice,
        buyerName,
        buyerEmail,
        buyerPhone,
        paymentMethod
    });

    // Validation
    if (!buyerName || !buyerEmail || !buyerPhone) {
        console.warn('يرجى ملء جميع الحقول المطلوبة');
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
    }

    if (!isValidEmail(buyerEmail)) {
        console.warn('البريد الإلكتروني غير صحيح');
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return;
    }

    console.log('البيانات صحيحة - جاري الإرسال إلى Discord...');

    // Send to Discord
    const success = await sendPurchaseToDiscord({
        productName,
        productPrice,
        buyerName,
        buyerEmail,
        buyerPhone,
        paymentMethod
    });

    if (success) {
        console.log('✅ تم الإرسال بنجاح');
        alert('✅ تم استقبال طلبك! سيتم التواصل معك قريباً عبر البريد الإلكتروني');
        closePaymentModal();
        document.getElementById('purchaseForm').reset();
    } else {
        console.error('❌ فشل الإرسال');
        alert('❌ حدث خطأ أثناء إرسال الطلب. تحقق من Console (F12) للمزيد من التفاصيل');
    }
}

// Send Purchase to Discord
async function sendPurchaseToDiscord(data) {
    try {
        console.log('جاري إرسال الطلب إلى Discord...', data);
        
        const embed = {
            title: '🛒 طلب شراء جديد!',
            color: 16776960,
            fields: [
                {
                    name: '📦 المنتج',
                    value: data.productName || 'غير محدد',
                    inline: false
                },
                {
                    name: '💰 السعر',
                    value: `$${data.productPrice}` || 'غير محدد',
                    inline: true
                },
                {
                    name: '💳 طريقة الدفع',
                    value: 'MT CASH',
                    inline: true
                },
                {
                    name: '👤 اسم المشتري',
                    value: data.buyerName || 'غير محدد',
                    inline: true
                },
                {
                    name: '📧 البريد الإلكتروني',
                    value: data.buyerEmail || 'غير محدد',
                    inline: true
                },
                {
                    name: '📱 رقم الهاتف',
                    value: data.buyerPhone || 'غير محدد',
                    inline: true
                },
                {
                    name: '⏰ وقت الطلب',
                    value: new Date().toLocaleString('ar-SA') || 'غير محدد',
                    inline: false
                }
            ],
            footer: {
                text: 'نظام المتجر الرقمي - Digital Store'
            },
            timestamp: new Date().toISOString()
        };

        const payload = {
            content: '🔔 **طلب شراء جديد!**',
            embeds: [embed]
        };

        console.log('الـ Payload:', JSON.stringify(payload, null, 2));

        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        console.log('استجابة Discord:', response.status, response.statusText);

        if (!response.ok) {
            console.error('خطأ في الإرسال:', response.status);
            const responseText = await response.text();
            console.error('تفاصيل الخطأ:', responseText);
            return false;
        }

        console.log('✅ تم الإرسال بنجاح إلى Discord');
        return true;
    } catch (error) {
        console.error('❌ خطأ في sendPurchaseToDiscord:', error);
        return false;
    }
}

// Send Checkout to Discord
async function sendCheckoutToDiscord(data) {
    try {
        console.log('جاري إرسال طلب الشراء إلى Discord...', data);
        
        const embed = {
            title: '🎉 طلب شراء جديد من السلة!',
            color: 5763719,
            fields: [
                {
                    name: '👤 اسم المشتري',
                    value: data.buyerName || 'غير محدد',
                    inline: false
                },
                {
                    name: '📧 البريد الإلكتروني',
                    value: data.buyerEmail || 'غير محدد',
                    inline: true
                },
                {
                    name: '📱 رقم الهاتف',
                    value: data.buyerPhone || 'غير محدد',
                    inline: true
                },
                {
                    name: '📦 المنتجات',
                    value: data.items || 'لا توجد منتجات',
                    inline: false
                },
                {
                    name: '💰 الإجمالي',
                    value: `$${data.total}`,
                    inline: true
                },
                {
                    name: '💳 طريقة الدفع',
                    value: 'MT CASH 🔐',
                    inline: true
                },
                {
                    name: '⏰ وقت الطلب',
                    value: new Date().toLocaleString('ar-SA'),
                    inline: false
                }
            ],
            footer: {
                text: 'نظام المتجر الرقمي - Digital Store',
                icon_url: 'https://cdn-icons-png.flaticon.com/512/3143/3143621.png'
            },
            timestamp: new Date().toISOString()
        };

        const payload = {
            content: '🔔 **طلب شراء جديد من السلة!** 🛒',
            embeds: [embed]
        };

        console.log('الـ Payload:', JSON.stringify(payload, null, 2));

        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        console.log('استجابة Discord:', response.status, response.statusText);

        if (!response.ok) {
            console.error('خطأ في الإرسال:', response.status);
            const responseText = await response.text();
            console.error('تفاصيل الخطأ:', responseText);
            return false;
        }

        console.log('✅ تم الإرسال بنجاح إلى Discord');
        return true;
    } catch (error) {
        console.error('❌ خطأ في sendCheckoutToDiscord:', error);
        return false;
    }
}

// Handle Form Submit
async function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validation
    if (!name || !email || !subject || !message) {
        showStatusMessage('يرجى ملء جميع الحقول المطلوبة', 'error');
        return;
    }

    if (!isValidEmail(email)) {
        showStatusMessage('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }

    try {
        // Send to Discord
        const success = await sendToDiscord({
            name,
            email,
            subject,
            message
        });

        if (success) {
            showStatusMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً', 'success');
            document.getElementById('contactForm').reset();
            
            // Optional: Send confirmation email
            await sendToEmail({
                name,
                email,
                subject,
                message
            });
        } else {
            showStatusMessage('حدث خطأ أثناء الإرسال. يرجى المحاولة لاحقاً', 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        showStatusMessage('خطأ في الاتصال. تحقق من الإعدادات والمحاولة مرة أخرى', 'error');
    }
}

// Handle Checkout Submit
async function handleCheckoutSubmit(e) {
    e.preventDefault();
    console.log('جاري معالجة الطلب...');

    const buyerName = document.getElementById('checkoutName').value.trim();
    const buyerEmail = document.getElementById('checkoutEmail').value.trim();
    const buyerPhone = document.getElementById('checkoutPhone').value.trim();

    // Validation
    if (!buyerName || !buyerEmail || !buyerPhone) {
        alert('يرجى ملء جميع الحقول المطلوبة');
        return;
    }

    if (!isValidEmail(buyerEmail)) {
        alert('يرجى إدخال بريد إلكتروني صحيح');
        return;
    }

    const total = cartItems.reduce((sum, item) => sum + parseInt(item.price), 0);
    const itemsList = cartItems.map(item => `• ${item.name} - $${item.price}`).join('\n');

    console.log('البيانات صحيحة - جاري الإرسال إلى Discord...');

    // Send to Discord
    const success = await sendCheckoutToDiscord({
        buyerName,
        buyerEmail,
        buyerPhone,
        items: itemsList,
        total
    });

    if (success) {
        console.log('✅ تم الإرسال بنجاح');
        alert('✅ تم استقبال طلبك! سيتم التواصل معك قريباً عبر البريد الإلكتروني\n\nسيتم تحويلك إلى ديسكورد...');
        
        // Clear cart
        cartItems = [];
        saveCart();
        
        // Close modal
        closeCheckoutModal();
        
        // Open Discord Server
        window.open(DISCORD_SERVER_LINK, '_blank');
    } else {
        console.error('❌ فشل الإرسال');
        alert('❌ حدث خطأ أثناء إرسال الطلب. تحقق من Console (F12) للمزيد من التفاصيل');
    }
}

// Send Message to Discord
async function sendToDiscord(data) {
    try {
        // إذا لم تعيّن Webhook URL، اعرض رسالة توضيحية
        if (DISCORD_WEBHOOK_URL.includes('YOUR_WEBHOOK')) {
            console.warn('⚠️ Discord Webhook لم يتم إعداده. يرجى تعيين DISCORD_WEBHOOK_URL');
            // محاكاة النجاح للاختبار
            return true;
        }

        const embed = {
            title: '📬 رسالة جديدة من موقع المتجر',
            color: 16776960, // Gold color
            fields: [
                {
                    name: '👤 الاسم',
                    value: data.name,
                    inline: true
                },
                {
                    name: '📧 البريد الإلكتروني',
                    value: data.email,
                    inline: true
                },
                {
                    name: '📌 الموضوع',
                    value: data.subject,
                    inline: false
                },
                {
                    name: '💬 الرسالة',
                    value: data.message,
                    inline: false
                }
            ],
            footer: {
                text: 'وقت الرسالة: ' + new Date().toLocaleString('ar-SA')
            },
            thumbnail: {
                url: 'https://cdn-icons-png.flaticon.com/512/747/747376.png'
            }
        };

        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: 'ديجيتال ستور',
                avatar_url: 'https://cdn-icons-png.flaticon.com/512/747/747376.png',
                embeds: [embed]
            })
        });

        return response.ok;
    } catch (error) {
        console.error('Discord Error:', error);
        return false;
    }
}

// Send Confirmation Email (Optional - using email service)
async function sendToEmail(data) {
    try {
        // You can use EmailJS, Formspree, or any email service
        // This is a placeholder for email sending functionality
        console.log('Email sent to:', data.email);
    } catch (error) {
        console.error('Email Error:', error);
    }
}

// Validate Email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show Status Message
function showStatusMessage(message, type) {
    const statusElement = document.getElementById('statusMessage');
    statusElement.textContent = message;
    statusElement.className = `status-message ${type}`;
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        statusElement.className = 'status-message';
    }, 5000);
}

// Update WhatsApp Link
function updateWhatsAppLink() {
    const whatsappBtn = document.querySelector('.btn-whatsapp');
    if (whatsappBtn) {
        const message = encodeURIComponent('مرحباً، أود الاستفسار عن منتجاتكم');
        whatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    }
}

// Add smooth scroll behavior for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});
