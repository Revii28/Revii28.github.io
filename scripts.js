
// Navbar and search functionality

const navbarToggle = document.getElementById('navbarToggle');
const navbarMenu = document.getElementById('navbarMenu');
const searchToggle = document.getElementById('searchToggle');
const searchContainer = document.getElementById('searchContainer');

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
// const modalShipping = document.getElementById('productModalShipping');
const modalColors = document.getElementById('productModalColors');
const modalStock = document.getElementById('productModalStock');
const quantityInput = document.getElementById('quantityInput');

let currentProductIndex = 0;
let currentImageIndex = 0;

function changeImage(productIndex, delta) {
    const product = products[productIndex];
    currentImageIndex = (currentImageIndex + delta + product.imgSrc.length) % product.imgSrc.length;
    const imgElement = document.querySelector(`[data-product-index="${productIndex}"] img`);
    if (imgElement) {
        imgElement.src = product.imgSrc[currentImageIndex];
    }
    if (productIndex === currentProductIndex) {
        modalImage.src = product.imgSrc[currentImageIndex];
    }
}

// Fungsi untuk membuka modal berdasarkan ID produk
function openModalById(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        currentProductIndex = products.indexOf(product);
        fillModal(product);
    }
}

// Fungsi untuk membuka modal berdasarkan index
function openModal(index) {
    const product = products[index];
    currentProductIndex = index;
    fillModal(product);
}

// Fungsi untuk mengisi modal dengan data produk
function fillModal(product) {
    currentImageIndex = 0;
    modalTitle.innerText = product.name;
    modalPrice.innerText = product.price;
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
        colorOption.onclick = () => selectColor(colorOption);
        modalColors.appendChild(colorOption);
    });

    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function selectColor(element) {
    document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
}

function changeQuantity(delta) {
    quantityInput.value = Math.max(1, parseInt(quantityInput.value) + delta);
}

document.querySelector('.close').onclick = closeModal;

document.querySelector('.buy-now-btn').onclick = () => {
    const product = products[currentProductIndex];
    window.location.href = product.linkPayment;
};
// Display products
products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-index', index);
    card.innerHTML = `
        <div class="product-card-image-container">
            <img src="${product.imgSrc[0]}" alt="${product.name}">
            <span class="image-nav-prev" onclick="changeImage(${index}, -1)">&#10094;</span>
            <span class="image-nav-next" onclick="changeImage(${index}, 1)">&#10095;</span>
        </div>
        <h3>${product.name}</h3>
        <p>${product.price}</p>
        <button onclick="openModal(${index})">Details</button>
    `;
    productCardsContainer.appendChild(card);
});

const modalImageContainer = document.createElement('div');
modalImageContainer.className = 'modal-image-container';
modalImageContainer.innerHTML = `
    <img id="productModalImage" src="" alt="" class="modal-image">
    <span class="image-nav prev" onclick="changeImage(currentProductIndex, -1)">&#10094;</span>
    <span class="image-nav next" onclick="changeImage(currentProductIndex, 1)">&#10095;</span>
`;
document.querySelector('.modal-body').insertBefore(modalImageContainer, document.querySelector('.modal-details'));

// Function to display carousel slides
let slideIndex = 0;
showSlides();

function plusSlides(n) {
    slideIndex += n;
    showSlides();
}

function showSlides() {
    const slides = document.querySelectorAll('.carousel-slide');
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    slideIndex = (slideIndex + slides.length) % slides.length;
    slides[slideIndex].classList.add('active');
}

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;

    // Create WhatsApp message
    const whatsappMessage = `Hello, Nama saya ${name}\nEmail saya ${email}\ndan Nomer Telepon saya ${phone}.\nPesan saya: ${message}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp API URL
    const whatsappUrl = `https://wa.me/6285220966923?text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
});

let stock = 199;  // Initial stock value
const stockDisplay = document.getElementById("productModalStock");

// Function to change the quantity and update the stock
function changeQuantity(change) {
    let currentQuantity = parseInt(quantityInput.value);
    
    // Update quantity within bounds
    if (change === 1 && currentQuantity < stock) {
        currentQuantity += 1;
    } else if (change === -1 && currentQuantity > 1) {
        currentQuantity -= 1;
    }
    
    // Update input field
    quantityInput.value = currentQuantity;
    
    // Update stock
    const remainingStock = stock - currentQuantity;
    stockDisplay.textContent = `Stock: ${remainingStock}`;
}

// Toggle search popup

const searchPopup = document.getElementById('searchPopup');
const closeSearchPopup = document.getElementById('closeSearchPopup');

searchToggle.addEventListener('click', () => {
    searchPopup.style.top = '0';
});

closeSearchPopup.addEventListener('click', () => {
    searchPopup.style.top = '-100%';
});

// Pencarian produk dan membuka modal berdasarkan ID produk yang diklik
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = ''; // Bersihkan hasil pencarian sebelumnya
  
    const filteredProducts = products.filter(product => 
      product.name.toLowerCase().includes(query) || product.price.toLowerCase().includes(query)
    );
  
    if (filteredProducts.length > 0) {
      filteredProducts.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('search-result-item');
        resultItem.innerHTML = `
          <img src="${product.imgSrc[0]}" alt="${product.name}" style="width: 100px; height: 100px;" />
          <p>${product.name} - ${product.price}</p>
        `;
  
        // Menambahkan event listener untuk membuka modal saat produk diklik
        resultItem.addEventListener('click', () => {
          openModalById(product.id); // Membuka modal berdasarkan ID produk
        });
  
        searchResults.appendChild(resultItem);
      });
    } else {
      searchResults.innerHTML = '<p>No products found.</p>';
    }
  });