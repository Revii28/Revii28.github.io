// Navbar and search functionality
const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');
const searchToggle = document.getElementById('searchToggle');
const searchContainer = document.getElementById('searchContainer');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

// New variables for category functionality
const categoryToggle = document.getElementById('categoryToggle');
const categoryDropdown = document.getElementById('categoryDropdown');

navbarToggle.addEventListener('click', () => {
    navbarMenu.classList.toggle('active');
});

searchToggle.addEventListener('click', () => {
    searchContainer.style.display = searchContainer.style.display === 'block' ? 'none' : 'block';
});

// New category toggle functionality
categoryToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    categoryDropdown.classList.toggle('active');
});

// Close dropdowns when clicking outside
document.addEventListener('click', (event) => {
    if (!categoryToggle.contains(event.target) && !categoryDropdown.contains(event.target)) {
        categoryDropdown.classList.remove('active');
    }
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

let currentModalImageIndex = 0;

// Function to fill modal with product data
function fillModal(product) {
    currentImageIndex = 0;
    currentModalImageIndex = 0;
    modalImage.src = product.imgSrc[currentModalImageIndex];
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

    // Clear history when modal is closed
    history.replaceState({}, document.title, window.location.pathname); 
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

// Function to create product cards
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-index', index);
    card.setAttribute('data-current-image', 0);

    card.innerHTML = `
        <div class="product-card-image-container">
            <img src="${product.imgSrc[0]}" alt="${product.name}">
            <a class="prev" onclick="changeCardImage(${index}, -1)">&#10094;</a>
            <a class="next" onclick="changeCardImage(${index}, 1)">&#10095;</a> 
        </div>
        <div class="product-card-details">
            <h3 class="product-card-title">${product.name}</h3>
            <p class="product-card-price">${formatPriceRange(product.price)}</p>
            <button class="product-card-btn" onclick="openModal(${index})">View Product</button>
        </div>
    `;

    return card;
}

// Function to display products
function displayProducts(productsToDisplay) {
    productCardsContainer.innerHTML = '';
    productsToDisplay.forEach((product, index) => {
        const card = createProductCard(product, index);
        productCardsContainer.appendChild(card);
    });
}

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


// Contact form functionality
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const whatsappMessage = `Hello, Nama saya ${name}\nEmail saya ${email}\ndan Nomer Telepon saya ${phone}.\nPesan saya: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/6285220966923?text=${encodedMessage}`;
    window.location.href = whatsappUrl;
});

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
    searchPopup.classList.toggle('active');
});

closeSearchPopup.addEventListener('click', () => {
    searchPopup.classList.remove('active');
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
            searchResults.style.overflowY = 'auto'; // Enable vertical scrolling
            searchResults.style.maxHeight = '200px';
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
function applySwipeListeners() {
    document.querySelectorAll('.product-card').forEach(addCardSwipeListeners);
}

// Reveal functionality
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 150;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
}

window.addEventListener("scroll", reveal);

// Lazy loading images
document.addEventListener("DOMContentLoaded", function() {
    var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  
    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });
  
      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    }
});

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  });
  
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
  
  // Carousel swipe functionality
  const carousel = document.querySelector('.carousel');
  let isDragging = false;
  let startX;
  let currentX;


  
  function changeModalImage(direction) {
      const product = products[currentProductIndex];
      currentModalImageIndex = (currentModalImageIndex + direction + product.imgSrc.length) % product.imgSrc.length;
      document.getElementById('productModalImage').src = product.imgSrc[currentModalImageIndex];
  }
  
  const modalImageContainer = document.querySelector('.modal-image-container');
  
  modalImageContainer.addEventListener('mousedown', (e) => {
      startX = e.clientX;
  });
  
  modalImageContainer.addEventListener('mousemove', (e) => {
      if (startX) {
          moveX = e.clientX;
      }
  });
  
  modalImageContainer.addEventListener('mouseup', () => {
      if (startX && moveX) {
          const diff = startX - moveX;
          if (Math.abs(diff) > 50) { // threshold for swipe
              changeModalImage(diff > 0 ? 1 : -1);
          }
      }
      startX = moveX = null;
  });
  
  modalImageContainer.addEventListener('mouseleave', () => {
      startX = moveX = null;
  });
  
  // New dropdown and category filtering functionality
  const dropdowns = document.querySelectorAll('.dropdown');
  
  // Function to populate the category dropdown
  function populateCategoryDropdown() {
      const categories = new Set();
      products.forEach(product => {
          product.Category.forEach(category => categories.add(category));
      });
  
      // Clear existing content
      categoryDropdown.innerHTML = '';
  
      // Add "All Products" option
      const allProductsLink = document.createElement('a');
      allProductsLink.href = '#';
      allProductsLink.textContent = 'All Products';
      allProductsLink.addEventListener('click', (e) => {
          e.preventDefault();
          filterProducts('All Products');
      });
      categoryDropdown.appendChild(allProductsLink);
  
      // Add category options
      categories.forEach(category => {
          const link = document.createElement('a');
          link.href = '#';
          link.textContent = category;
          link.addEventListener('click', (e) => {
              e.preventDefault();
              filterProducts(category);
          });
          categoryDropdown.appendChild(link);
      });
  }
  
  // Function to filter and display products
  function filterProducts(category) {
      const filteredProducts = category === 'All Products' 
          ? products 
          : products.filter(product => product.Category.includes(category));
  
      displayProducts(filteredProducts);
      applySwipeListeners();
  
      // Close the dropdown after selection
      categoryDropdown.classList.remove('active');
      // Update category toggle text (optional)
      categoryToggle.textContent = 'Categories: ' + category;
  }
  
  // Call the function to populate the dropdown
  populateCategoryDropdown();
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (event) => {
      if (!event.target.matches('.dropbtn') && !event.target.closest('.dropdown-content')) {
          dropdowns.forEach(dropdown => {
              dropdown.classList.remove('active');
          });
      }
  });
  
  // Close menu and dropdowns when resizing to desktop view
  window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
          navbarMenu.classList.remove('active');
          dropdowns.forEach(dropdown => {
              dropdown.classList.remove('active');
          });
      }
  });
  
  // Initialize the page
  document.addEventListener('DOMContentLoaded', () => {
      displayProducts(products);
      applySwipeListeners();
      populateCategoryDropdown();
  });
  
  // Make sure these functions are available globally
  window.changeCardImage = changeCardImage;
  window.openModal = openModal;
  window.formatPriceRange = formatPriceRange;
  window.filterProducts = filterProducts;
  