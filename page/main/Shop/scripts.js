const products = [
    { 
        name: 'Kabel Data Charger Fast Charging 3 in 1 Kabel Lightning Micro USB Type C Black for Android IOS Type-c', 
        price: 'Rp125.000', 
        imgSrc: ['/asset/products/Kabel data 3 in 1/1.png', '/asset/products/Kabel data 3 in 1/2.png', '/asset/products/Kabel data 3 in 1/3.png'], 
        description: '3 in 1 Charger For Samsung Xiaomi Android IOS 1.2M',
        rating: '4.8 (267 Penilaian)',
        protection: 'Melindungi barang belanjaan dari kerusakan hingga 6 bulan',
        shipping: 'Gratis Ongkir',
        colors: ['3in1 Hitam', '3in1&10w Adaptor', '1in1 Hitam', '10w Adaptor', '120w 3in1 Hitam'],
        stock: 13290,
        linkPayment: 'https://rheastore.orderonline.id/kabel-data-charger-fast-charging-3-in-1'
    },
    { 
        name: 'Kabel Data Charger Fast Charging 3 in 1 Kabel Lightning Micro USB Type C Black for Android IOS Type-c', 
        price: 'Rp125.000', 
        imgSrc: ['/asset/products/Kabel data 3 in 1/1.png', '/asset/products/Kabel data 3 in 1/2.png', '/asset/products/Kabel data 3 in 1/3.png'], 
        description: '3 in 1 Charger For Samsung Xiaomi Android IOS 1.2M',
        rating: '4.8 (267 Penilaian)',
        protection: 'Melindungi barang belanjaan dari kerusakan hingga 6 bulan',
        shipping: 'Gratis Ongkir',
        colors: ['3in1 Hitam', '3in1&10w Adaptor', '1in1 Hitam', '10w Adaptor', '120w 3in1 Hitam'],
        stock: 13290,
        linkPayment: 'https://rheastore.orderonline.id/sepatu-sneakers-jintu-pria-bg-115-1'
    },
    // ... (other product entries remain unchanged) ...
];

const productCardsContainer = document.getElementById('productCards');
const modal = document.getElementById('productModal');
const modalTitle = document.getElementById('productModalTitle');
const modalPrice = document.getElementById('productModalPrice');
const modalImage = document.getElementById('productModalImage');
const modalDescription = document.getElementById('productModalDescription');
const modalRating = document.getElementById('productModalRating');
const modalProtection = document.getElementById('productModalProtection');
const modalShipping = document.getElementById('productModalShipping');
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

function openModal(index) {
    const product = products[index];
    currentProductIndex = index;
    currentImageIndex = 0;
    modalTitle.innerText = product.name;
    modalPrice.innerText = product.price;
    modalImage.src = product.imgSrc[0];
    modalDescription.innerText = product.description;
    modalRating.innerText = product.rating;
    modalProtection.innerText = product.protection;
    modalShipping.innerText = product.shipping;
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
    const whatsappMessage = `Hello, Nama saya ${name}. Email saya ${email} and Nomer Telepon saya ${phone}. Pesan saya: ${message}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp API URL
    const whatsappUrl = `https://wa.me/6285220966923?text=${encodedMessage}`;

    // Redirect to WhatsApp
    window.location.href = whatsappUrl;
});