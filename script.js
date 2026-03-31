// Clover Heart Studio - Main JavaScript File

// Navigation scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar.bg-transparent');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Product Data
const products = [
    {
        id: 1,
        name: "Elegant Rose Quartz Bracelet",
        price: 29.99,
        salePrice: 39.99,
        image: "Products/1/variant-image-1.jpeg",
        images: [
            "Products/1/variant-image-1.jpeg",
            "Products/1/variant-image-2.jpeg",
            "Products/1/variant-image-3.jpeg",
            "Products/1/variant-image-4.jpeg",
            "Products/1/variant-image-5.jpeg",
            "Products/1/variant-image-6.jpeg"
        ],
        description: "Beautiful rose quartz bracelet with delicate silver accents. Perfect for everyday wear.",
        category: "new",
        variants: ["#FF69B4", "#FFB6C1", "#FFC0CB"]
    },
    {
        id: 2,
        name: "Turquoise Dream Bracelet",
        price: 34.99,
        salePrice: 44.99,
        image: "Products/2/variant-image-1.jpeg",
        images: [
            "Products/2/variant-image-1.jpeg",
            "Products/2/variant-image-2.jpeg",
            "Products/2/variant-image-3.jpeg",
            "Products/2/variant-image-4.jpeg",
            "Products/2/variant-image-5.jpeg",
            "Products/2/variant-image-6.jpeg"
        ],
        description: "Stunning turquoise bracelet with silver charms. A statement piece for any occasion.",
        category: "sale",
        variants: ["#40E0D0", "#48D1CC", "#00CED1"]
    },
    {
        id: 3,
        name: "Crystal Harmony Bracelet",
        price: 49.99,
        salePrice: 59.99,
        image: "Products/3/main-image-1.jpeg",
        images: [
            "Products/3/main-image-1.jpeg",
            "Products/3/main-image-2.jpeg",
            "Products/3/main-image-3.jpeg",
            "Products/3/main-image-4.jpeg",
            "Products/3/main-image-5.jpeg",
            "Products/3/main-image-6.jpeg",
            "Products/3/main-image-7.jpeg",
            "Products/3/main-image-8.jpeg",
            "Products/3/main-image-9.jpeg"
        ],
        description: "Multi-crystal bracelet with healing properties. Balance your energy with this beautiful piece.",
        category: "featured",
        variants: ["#E6E6FA", "#D8BFD8", "#DDA0DD"]
    },
    {
        id: 4,
        name: "Bohemian Spirit Bracelet",
        price: 39.99,
        salePrice: 49.99,
        image: "Products/4/main-image-1.jpeg",
        images: [
            "Products/4/main-image-1.jpeg",
            "Products/4/main-image-2.jpeg",
            "Products/4/main-image-3.jpeg",
            "Products/4/main-image-4.jpeg",
            "Products/4/main-image-5.jpeg",
            "Products/4/main-image-6.jpeg",
            "Products/4/main-image-7.jpeg"
        ],
        description: "Free-spirited bohemian style bracelet with mixed beads and charms.",
        category: "new",
        variants: ["#DEB887", "#D2691E", "#BC8F8F"]
    },
    {
        id: 5,
        name: "Ocean Waves Bracelet",
        price: 44.99,
        salePrice: 54.99,
        image: "Products/5/variant-image-1.jpeg",
        images: [
            "Products/5/variant-image-1.jpeg",
            "Products/5/variant-image-2.jpeg",
            "Products/5/variant-image-3.jpeg",
            "Products/5/variant-image-4.jpeg"
        ],
        description: "Ocean-inspired bracelet with blue and green beads. Bring the beach vibes with you.",
        category: "sale",
        variants: ["#4682B4", "#5F9EA0", "#6495ED"]
    },
    {
        id: 6,
        name: "Mystic Moon Bracelet",
        price: 54.99,
        salePrice: 64.99,
        image: "Products/6/variant-image-1.jpeg",
        images: [
            "Products/6/variant-image-1.jpeg",
            "Products/6/variant-image-2.jpeg",
            "Products/6/variant-image-3.jpeg",
            "Products/6/variant-image-4.jpeg",
            "Products/6/variant-image-5.jpeg",
            "Products/6/variant-image-6.jpeg",
            "Products/6/variant-image-7.jpeg",
            "Products/6/variant-image-8.jpeg",
            "Products/6/variant-image-9.jpeg",
            "Products/6/variant-image-10.jpeg",
            "Products/6/variant-image-11.jpeg"
        ],
        description: "Mystical moon phase bracelet with dark crystals. Perfect for night owls and dreamers.",
        category: "featured",
        variants: ["#191970", "#483D8B", "#6A5ACD"]
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cloverHeartCart')) || [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    loadProducts();
    loadFeaturedProducts();
    loadCartItems();
    setupEventListeners();
    
    // Load product detail if on product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        loadProductDetail();
    }
});

// Load products on products page
function loadProducts(filter = 'all', sort = 'default') {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;
    
    let filteredProducts = [...products];
    
    // Apply filter
    if (filter !== 'all') {
        filteredProducts = products.filter(product => product.category === filter);
    }
    
    // Apply sort
    switch(sort) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Load featured products on home page
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (!featuredContainer) return;
    
    const featuredProducts = products.filter(product => product.category === 'featured').slice(0, 3);
    
    featuredContainer.innerHTML = '';
    
    featuredProducts.forEach(product => {
        const productCard = createProductCard(product);
        featuredContainer.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const col = document.createElement('div');
    col.className = 'col-md-6 col-lg-4';
    
    const discount = Math.round(((product.salePrice - product.price) / product.salePrice) * 100);
    
    col.innerHTML = `
        <div class="product-card card h-100">
            <div class="product-image position-relative">
                <img src="${product.image}" alt="${product.name}" class="card-img-top">
                ${discount > 0 ? `<span class="badge bg-danger product-badge">${discount}% OFF</span>` : ''}
            </div>
            <div class="card-body d-flex flex-column">
                <h5 class="product-title">${product.name}</h5>
                <p class="card-text text-muted">${product.description}</p>
                <div class="mt-auto">
                    <div class="d-flex align-items-center mb-3">
                        <span class="product-price">$${product.price}</span>
                        ${product.salePrice > product.price ? `<span class="product-old-price ms-2">$${product.salePrice}</span>` : ''}
                    </div>
                    <div class="d-flex gap-2">
                        <button class="btn btn-success flex-grow-1" onclick="addToCart(${product.id})">
                            <i class="fas fa-shopping-cart me-2"></i>Add to Cart
                        </button>
                        <a href="product-detail.html?id=${product.id}" class="btn btn-outline-success">
                            <i class="fas fa-eye"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// Load product detail page
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) return;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Update product information
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-price').textContent = `$${product.price}`;
    document.getElementById('product-sale-price').textContent = `$${product.salePrice}`;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-name-breadcrumb').textContent = product.name;
    document.getElementById('main-product-image').src = product.image;
    
    // Load thumbnails
    const thumbnailContainer = document.getElementById('thumbnail-container');
    if (thumbnailContainer) {
        thumbnailContainer.innerHTML = '';
        product.images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image;
            thumbnail.alt = `${product.name} - Image ${index + 1}`;
            thumbnail.className = index === 0 ? 'active' : '';
            thumbnail.onclick = () => changeMainImage(image, thumbnail);
            thumbnailContainer.appendChild(thumbnail);
        });
    }
    
    // Load variants
    const variantsContainer = document.getElementById('product-variants');
    if (variantsContainer) {
        variantsContainer.innerHTML = '';
        product.variants.forEach((variant, index) => {
            const variantOption = document.createElement('div');
            variantOption.className = 'variant-option';
            variantOption.style.backgroundColor = variant;
            variantOption.onclick = () => selectVariant(variantOption);
            if (index === 0) variantOption.classList.add('selected');
            variantsContainer.appendChild(variantOption);
        });
    }
    
    // Setup add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.onclick = () => {
            const quantity = parseInt(document.getElementById('quantity').value);
            addToCart(productId, quantity);
        };
    }
    
    // Load related products
    loadRelatedProducts(productId);
}

// Change main image in product detail
function changeMainImage(imageSrc, thumbnail) {
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = imageSrc;
    
    // Update active thumbnail
    document.querySelectorAll('.thumbnail-images img').forEach(img => {
        img.classList.remove('active');
    });
    thumbnail.classList.add('active');
}

// Select variant
function selectVariant(variantElement) {
    document.querySelectorAll('.variant-option').forEach(option => {
        option.classList.remove('selected');
    });
    variantElement.classList.add('selected');
}

// Load related products
function loadRelatedProducts(currentProductId) {
    const relatedContainer = document.getElementById('related-products');
    if (!relatedContainer) return;
    
    const relatedProducts = products
        .filter(p => p.id !== currentProductId)
        .slice(0, 4);
    
    relatedContainer.innerHTML = '';
    
    relatedProducts.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-md-6 col-lg-3';
        
        col.innerHTML = `
            <div class="card h-100">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" class="card-img-top">
                </div>
                <div class="card-body">
                    <h6 class="product-title">${product.name}</h6>
                    <div class="d-flex align-items-center mb-2">
                        <span class="product-price">$${product.price}</span>
                        ${product.salePrice > product.price ? `<span class="product-old-price ms-2">$${product.salePrice}</span>` : ''}
                    </div>
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline-success btn-sm w-100">
                        View Details
                    </a>
                </div>
            </div>
        `;
        
        relatedContainer.appendChild(col);
    });
}

// Add to cart function
function addToCart(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            ...product,
            quantity: quantity
        });
    }
    
    saveCart();
    updateCartCount();
    showSuccessMessage(`${product.name} added to cart!`);
    
    // Redirect to cart if on product detail page
    if (window.location.pathname.includes('product-detail.html')) {
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 1000);
    }
}

// Load cart items
function loadCartItems() {
    const cartContainer = document.getElementById('cart-items-container');
    const emptyCart = document.getElementById('empty-cart');
    
    if (!cartContainer) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '';
        emptyCart.classList.remove('d-none');
        updateOrderSummary();
        return;
    }
    
    emptyCart.classList.add('d-none');
    cartContainer.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = createCartItem(item);
        cartContainer.appendChild(cartItem);
    });
    
    updateOrderSummary();
}

// Create cart item element
function createCartItem(item) {
    const cartItem = document.createElement('div');
    cartItem.className = 'cart-item';
    
    cartItem.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-2">
                <img src="${item.image}" alt="${item.name}" class="img-fluid rounded">
            </div>
            <div class="col-md-4">
                <h5>${item.name}</h5>
                <p class="text-muted mb-0">${item.description}</p>
            </div>
            <div class="col-md-2">
                <div class="quantity-control">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span class="mx-2">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
            <div class="col-md-2">
                <h5>$${(item.price * item.quantity).toFixed(2)}</h5>
            </div>
            <div class="col-md-2">
                <button class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    return cartItem;
}

// Update quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartCount();
        loadCartItems();
    }
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    loadCartItems();
    showSuccessMessage('Item removed from cart');
}

// Update order summary
function updateOrderSummary() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Update cart count
function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cloverHeartCart', JSON.stringify(cart));
}

// Setup event listeners
function setupEventListeners() {
    // Newsletter forms
    const newsletterForms = document.querySelectorAll('#newsletter-form, #footer-newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            showSuccessMessage(`Thank you for subscribing with ${email}!`);
            form.reset();
        });
    });
    
    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showSuccessMessage('Your message has been sent successfully! We will contact you soon.');
            contactForm.reset();
        });
    }
    
    // Product filters
    const filterButtons = document.querySelectorAll('[data-filter]');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            loadProducts(this.dataset.filter);
        });
    });
    
    // Product sort
    const sortSelect = document.getElementById('sort-products');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const activeFilter = document.querySelector('[data-filter].active');
            const filter = activeFilter ? activeFilter.dataset.filter : 'all';
            loadProducts(filter, this.value);
        });
    }
    
    // Quantity controls on product detail page
    const quantityDecrease = document.getElementById('quantity-decrease');
    const quantityIncrease = document.getElementById('quantity-increase');
    const quantityInput = document.getElementById('quantity');
    
    if (quantityDecrease && quantityIncrease && quantityInput) {
        quantityDecrease.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        quantityIncrease.addEventListener('click', () => {
            const currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                showErrorMessage('Your cart is empty!');
                return;
            }
            showSuccessMessage('Proceeding to checkout... (This would redirect to payment page)');
        });
    }
    
    // Promo code
    const applyPromo = document.getElementById('apply-promo');
    if (applyPromo) {
        applyPromo.addEventListener('click', function() {
            const promoCode = document.getElementById('promo-code').value;
            if (promoCode) {
                showSuccessMessage(`Promo code "${promoCode}" applied successfully!`);
                document.getElementById('promo-code').value = '';
            }
        });
    }
}

// Show success message
function showSuccessMessage(message) {
    const modal = new bootstrap.Modal(document.getElementById('successModal'));
    document.getElementById('success-message').textContent = message;
    modal.show();
}

// Show error message
function showErrorMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-danger alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-3';
    alertDiv.style.zIndex = '9999';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add to cart button animation
document.addEventListener('click', function(e) {
    if (e.target.matches('button[onclick*="addToCart"]')) {
        e.target.classList.add('animate__animated', 'animate__pulse');
        setTimeout(() => {
            e.target.classList.remove('animate__animated', 'animate__pulse');
        }, 1000);
    }
});

// Wishlist functionality
const wishlist = JSON.parse(localStorage.getItem('cloverHeartWishlist')) || [];

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showSuccessMessage('Item removed from wishlist');
    } else {
        wishlist.push(productId);
        showSuccessMessage('Item added to wishlist');
    }
    localStorage.setItem('cloverHeartWishlist', JSON.stringify(wishlist));
}

// Search functionality
function searchProducts(query) {
    const results = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    return results;
}

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize tooltips
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
});

// Initialize popovers
var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl)
});
