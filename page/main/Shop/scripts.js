// Navbar and search functionality
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');
const searchToggle = document.getElementById('searchToggle');
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

searchToggle.addEventListener('click', () => {
    searchContainer.style.display = searchContainer.style.display === 'block' ? 'none' : 'block';
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.navbar')) {
        navbarMenu.classList.remove('active');
        searchContainer.style.display = 'none';
    }
});

// Product cards and modal
const productCardsContainer = document.getElementById('productCards');
const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('productModalTitle');
const modalPrice = document.getElementById('productModalPrice');
const modalImage = document.getElementById('productModalImage');
const modalDescription = document.getElementById('productModalDescription');
const modalRating = document.getElementById('productModalRating');
const modalProtection = document.getElementById('productModalProtection');
const modalColors = document.getElementById('productModalColors');
const modalStock = document.getElementById('productModalStock');
const quantityInput = document.getElementById('quantityInput');

let currentProductIndex = 0;
let currentImageIndex = 0;

// Variables for touch events
let touchStartX = 0;
let touchEndX = 0;

// Function to handle swipe gesture
function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left
        changeImage(currentProductIndex, 1);
    }
    if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right
        changeImage(currentProductIndex, -1);
    }
}

function changeImage(productIndex, delta) {
    const product = products[productIndex];
    currentImageIndex = (currentImageIndex + delta + product.imgSrc.length) % product.imgSrc.length;
    modalImage.src = product.imgSrc[currentImageIndex];
}

// Function to open modal by product ID
function openModalById(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        currentProductIndex = products.indexOf(product);
        fillModal(product);
    }
}

// Function to open modal by index
function openModal(index) {
    const product = products[index];
    currentProductIndex = index;
    fillModal(product);
}

// Function to calculate price range
function formatPriceRange(prices) {
    if (Array.isArray(prices)) {
        const sortedPrices = prices.map(price => parseInt(price)).sort((a, b) => a - b);
        if (sortedPrices.length > 1) {
            return `Rp${sortedPrices[0].toLocaleString()} - Rp${sortedPrices[sortedPrices.length - 1].toLocaleString()}`;
        }
        return `Rp${sortedPrices[0].toLocaleString()}`;
    }
    return prices;
}

// Function to fill modal with product data
function fillModal(product) {
    currentImageIndex = 0;
    modalTitle.innerText = product.name;
    modalPrice.innerText = `Rp${product.price[0].toLocaleString()}`;
    modalImage.src = product.imgSrc[0];
    modalDescription.innerText = product.description;
    modalRating.innerText = product.rating;
    modalProtection.innerText = product.protection;
    modalStock.innerText = `Stock: ${product.stock}`;

    modalColors.innerHTML = '';
    product.colors.forEach((color, i) => {
        const colorOption = document.createElement('span');
        colorOption.className = 'color-option' + (i === 0 ? ' selected' : '');
        colorOption.innerText = color;
        colorOption.onclick = () => selectColor(colorOption, i, product);
        modalColors.appendChild(colorOption);
    });

    // Add touch event listeners
    modalImage.addEventListener('touchstart', handleTouchStart, false);
    modalImage.addEventListener('touchend', handleTouchEnd, false);

    modal.style.display = 'block';
}

// Function to select color and update price
function selectColor(element, colorIndex, product) {
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    modalPrice.innerText = `Rp${product.price[colorIndex].toLocaleString()}`;
}

function closeModal() {
    modal.style.display = 'none';
    // Remove touch event listeners
    modalImage.removeEventListener('touchstart', handleTouchStart);
    modalImage.removeEventListener('touchend', handleTouchEnd);
}

function changeQuantity(delta) {
    let currentQuantity = parseInt(quantityInput.value);
    if (delta === 1 && currentQuantity < stock) {
        currentQuantity += 1;
    } else if (delta === -1 && currentQuantity > 1) {
        currentQuantity -= 1;
    }
    quantityInput.value = currentQuantity;
    modalStock.innerText = `Stock: ${stock - currentQuantity}`;
}

document.querySelector('.modal-close').onclick = closeModal;

document.querySelector('.buy-now-btn').onclick = () => {
    const product = products[currentProductIndex];
    window.location.href = product.linkPayment;
};

// Touch event handlers
function handleTouchStart(event) {
    touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
}

// Display products
products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-index', index);
    card.setAttribute('data-current-image', 0); 

    const imageContainer = document.createElement('div');
    imageContainer.className = 'product-card-image-container';

    const imageElement = document.createElement('img');
    imageElement.src = product.imgSrc[0];
    imageElement.alt = product.name;

    // Add touch event listeners for card image swiping
    imageElement.addEventListener('touchstart', handleTouchStart, false);
    imageElement.addEventListener('touchend', (event) => {
        touchEndX = event.changedTouches[0].clientX;
        const productIndex = parseInt(event.target.closest('.product-card').getAttribute('data-product-index'));
        handleCardSwipe(productIndex);
    }, false);

    imageContainer.appendChild(imageElement);

    card.innerHTML = `
        ${imageContainer.outerHTML} 
        <div class="product-card-details">
            <h3 class="product-card-title">${product.name}</h3>
            <p class="product-card-price">${formatPriceRange(product.price)}</p>
            <button class="product-card-btn" onclick="openModal(${index})">View Product</button>
        </div>
    `;
    productCardsContainer.appendChild(card);
});

function handleCardSwipe(productIndex) {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
        // Swipe left
        changeCardImage(productIndex, 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
        // Swipe right
        changeCardImage(productIndex, -1);
    }
}

function changeCardImage(productIndex, delta) {
    const card = productCardsContainer.querySelector(`[data-product-index="${productIndex}"]`);
    const product = products[productIndex];
    let currentImageIndex = parseInt(card.getAttribute('data-current-image') || 0);
    currentImageIndex = (currentImageIndex + delta + product.imgSrc.length) % product.imgSrc.length;
    card.querySelector('img').src = product.imgSrc[currentImageIndex];
    card.setAttribute('data-current-image', currentImageIndex);
}



// Stock management
let stock = 199;
const stockDisplay = document.getElementById("productModalStock");

function changeQuantity(change) {
    let currentQuantity = parseInt(quantityInput.value);
    if (change === 1 && currentQuantity < stock) {
        currentQuantity += 1;
    } else if (change === -1 && currentQuantity > 1) {
        currentQuantity -= 1;
    }
    quantityInput.value = currentQuantity;
    const remainingStock = stock - currentQuantity;
    stockDisplay.textContent = `Stock: ${remainingStock}`;
}

// Search functionality
const searchPopup = document.getElementById('searchPopup');
const closeSearchPopup = document.getElementById('closeSearchPopup');

searchToggle.addEventListener('click', () => {
    searchPopup.style.top = '0';
});

closeSearchPopup.addEventListener('click', () => {
    searchPopup.style.top = '-100%';
});

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = '';
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.price.some(price => price[0].toString().includes(query))
    );

    if (filteredProducts.length > 0) {
        filteredProducts.forEach(product => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('search-result-item');
            resultItem.innerHTML = `
                <img src="${product.imgSrc[0]}" alt="${product.name}" style="width: 100px; height: 100px;" />
                <p><strong>${product.name}</strong> - <strong>${formatPriceRange(product.price)}</strong></p>
            `;
            resultItem.addEventListener('click', () => {
                openModalById(product.id);
            });
            searchResults.appendChild(resultItem);
        });
    } else {
        searchResults.innerHTML = '<p>Produk tidak ditemukan.</p>';
    }
});

// New functionality for slide gesture on product cards
function addCardSwipeListeners(card) {
    let startX;
    let currentX;
    let isDragging = false;
    const productIndex = parseInt(card.getAttribute('data-product-index'));
    const imageElement = card.querySelector('img');

    card.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });

    card.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentX = e.touches[0].clientX;
        const diff = startX - currentX;
        if (Math.abs(diff) > 5) {
            e.preventDefault(); // Prevent scrolling while swiping
        }
    });

    card.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) { // Threshold for swipe
            changeCardImage(productIndex, diff > 0 ? 1 : -1);
        }
    });
}

// Apply swipe listeners to all product cards
document.querySelectorAll('.product-card').forEach(addCardSwipeListeners);