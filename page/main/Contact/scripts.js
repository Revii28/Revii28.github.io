const products = [
    { 
        name: 'Kabel Data Charger Fast Charging 3 in 1 Kabel Lightning Micro USB Type C Black for Android IOS Type-c', 
        price: 'Rp125.000', 
        imgSrc: ['/asset/products/Kabel data 3 in 1/1.png', '/asset/products/Kabel data 3 in 1/2.png', '/asset/products/Kabel data 3 in 1/3.png'], 
        description: `Fitur:（Dapat digunakan untuk mengisi daya laptop）

        ①Output daya penuh 100W, luar biasa cepat. Dapat mengisi daya 90% dalam 30 menit. Kabel data dapat memenuhi semua tingkat daya pengisian cepat yang ada di pasaran dan kompatibel dengan 88w, 66w, 40w, dan 22,5w.
        
        ②Antarmuka USB 3.0, standar, kecepatan transfer file hingga 480MB/S
        
        ③5 baterai super-i tebal, tidak panas, pengisian lebih stabil dan lebih aman.
        
        ④Kualitasnya tahan uji, bantalan uji ayun 40KG 20000 kali
        
        ⑤Bahan silikon asli, lembut dan elastis, tepi dilapisi listrik, tidak mudah kusut dan bebas debu
        
        ⑥Port bundar logam satu bagian kuat dan tahan aus, dan konektor paduan seng seluruh logam dapat dipasang dan dicabut 1.000 kali sesuka hati.Ini akan terlihat seperti baru setelah penggunaan jangka panjang dan tidak akan mudah rusak.
        
        ⑦Kompatibel dengan IOS dan Android, transfer file hingga 480MB/s`,
        rating: '4.8 (267 Penilaian)',
        protection: 'Melindungi barang belanjaan dari kerusakan hingga 6 bulan',
        // shipping: 'Gratis Ongkir',
        colors: ['3in1 Hitam'],
        stock: 199,
        linkPayment: 'https://rheastore.orderonline.id/kabel-data-charger-fast-charging-3-in-1'
    },
    { 
        name: 'kabel data 4in1 fast charging kabel cas 4in1 type c usb lightning tipe c', 
        price: 'Rp66.000', 
        imgSrc: ['/asset/products/Kabel data 4 in 1/gambar1.jpg', '/asset/products/Kabel data 4 in 1/gambar2.jpg', '/asset/products/Kabel data 4 in 1/gambar3.jpg'], 
        description: `Kabel Super Fast Charge PD65W | Kabel 4 in 1 Fast Charge USB C USB A Multiple Charging | Charge Iphone dan Android

        Kabel Data portable multifungsi dengan pengisian data super cepat
        
        Detail produk :
        
        - Cocok untuk ponsel, tablet, komputer, HP
        
        - Type Kabel : 4 in 1
        
        - USB to Lightning
        
        - USB to type C
        
        - Type C to Type C
        
        - Type C to Lightning
        
        - Panjang : 1 m
        
        - Daya : 65W fast charge
        
        - Lighting 27W + Android 65W anti kusut
        
        - Data transfer speed : <480mbps
        
        Produk sebelum dikirim sudah ditest dengan kondisi yang dipastikan aman, jika ada kerusakan kemungkinan dari pengiriman, karena paket yang terbanting.`,
        rating: '4.7 (586 Penilaian)',
        protection: 'Melindungi barang belanjaan dari kerusakan hingga 6 bulan',
        // shipping: 'Gratis Ongkir',
        colors: ['4in1 Gold-Hitam'],
        stock: 199,
        linkPayment: 'https://rheastore.orderonline.id/kabel-data-4in1-fast-charging-kabel-cas-4in1-type-c-usb-lightning-tipe-c'
    },
    { 
        name: 'Sepatu Sneakers Keren PRIA/WANITA', 
        price: 'Rp93.500', 
        imgSrc: ['/asset/products/Sepatu Jepang/gambar1.jpg', '/asset/products/Sepatu Jepang/gambar2.jpg', '/asset/products/Sepatu Jepang/gambar3.jpg'], 
        description: `DESKRIPSI PRODUK

        Sepatu Sneakers Kualitas Bagus Harga Terjangkau
        
        Sepatu Jogger Musim Panas
        
        Sepatu Casual Kaki Bisa Bergerak Dengan Santai
        
        Sepatu Karet Lembut Didalam Nyaman Saat Dipakai
        
        Sepatu Sport Model Simple Elegan Trend Fashion
        
        Rincian Ukuran :
        
        39 = 24.5 cm
        
        40 = 25 cm
        
        41 = 25.5 cm
        
        42 = 26 cm
        
        43 = 26.5 cm
        
        warna:
        
        -kuning
        
        -putih
        
        -hitam
        
        Mohon Untuk Diperhatikan :
        
        - Warna Sesuai Dengan Gambar
        
        - Ukuran Sesuai Dengan Kaki
        
        - Gambar Sesuai Asli Barang Yang Difotokan
        
        Catatan : Kami haya mengirim barang sesuai dengan yang dimasukan ke keranjang belanja. Jika ingin complain barang WAJIB ada video Unboxing. Membeli berarti menyetujui , Terima Kasih.
        
        Happy shopping..`,
        rating: '4.9 (846 Penilaian)',
        protection: 'Melindungi barang belanjaan dari kerusakan hingga 6 bulan',
        // shipping: 'Gratis Ongkir',
        colors: [
        'kuning - 39', 'kuning - 40', 'kuning - 41', 'kuning - 42', 'kuning - 43',
        'putih - 39', 'putih - 40', 'putih - 41', 'putih - 42', 'putih - 43',
        'hitam - 39', 'hitam - 40', 'hitam - 41', 'hitam - 42', 'hitam - 43',
    ],
        stock: 199,
        linkPayment: 'https://rheastore.orderonline.id/sepatu-sneakers-jintu-pria-bg-115-1'
    },
    // ... (other product entries remain unchanged) ...
];

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
    // modalShipping.innerText = product.shipping;
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

// Search functionality with regex
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    const nameRegex = new RegExp(query, 'i');
    const priceRegex = new RegExp(`\\b${query}\\b`, 'i'); // Modify as needed to handle price ranges

    // Example data (replace with actual data from your app)
    const items = [
        { 
            name: 'Kabel Data Charger Fast Charging 3 in 1 Kabel Lightning Micro USB Type C Black for Android IOS Type-c', 
            price: 'Rp125.000', 
            imgSrc: ['/asset/products/Kabel data 3 in 1/1.png', '/asset/products/Kabel data 3 in 1/2.png', '/asset/products/Kabel data 3 in 1/3.png'], 
            description: `Fitur:（Dapat digunakan untuk mengisi daya laptop）
    
            ①Output daya penuh 100W, luar biasa cepat. Dapat mengisi daya 90% dalam 30 menit. Kabel data dapat memenuhi semua tingkat daya pengisian cepat yang ada di pasaran dan kompatibel dengan 88w, 66w, 40w, dan 22,5w.
            
            ②Antarmuka USB 3.0, standar, kecepatan transfer file hingga 480MB/S
            
            ③5 baterai super-i tebal, tidak panas, pengisian lebih stabil dan lebih aman.
            
            ④Kualitasnya tahan uji, bantalan uji ayun 40KG 20000 kali
            
            ⑤Bahan silikon asli, lembut dan elastis, tepi dilapisi listrik, tidak mudah kusut dan bebas debu
            
            ⑥Port bundar logam satu bagian kuat dan tahan aus, dan konektor paduan seng seluruh logam dapat dipasang dan dicabut 1.000 kali sesuka hati.Ini akan terlihat seperti baru setelah penggunaan jangka panjang dan tidak akan mudah rusak.
            
            ⑦Kompatibel dengan IOS dan Android, transfer file hingga 480MB/s`,
            rating: '4.8 (267 Penilaian)',
            protection: 'Melindungi barang belanjaan dari kerusakan hingga 6 bulan',
            // shipping: 'Gratis Ongkir',
            colors: ['3in1 Hitam'],
            stock: 199,
            linkPayment: 'https://rheastore.orderonline.id/kabel-data-charger-fast-charging-3-in-1'
        },
        { 
            name: 'kabel data 4in1 fast charging kabel cas 4in1 type c usb lightning tipe c', 
            price: 'Rp66.000', 
            imgSrc: ['/asset/products/Kabel data 4 in 1/gambar1.jpg', '/asset/products/Kabel data 4 in 1/gambar2.jpg', '/asset/products/Kabel data 4 in 1/gambar3.jpg'], 
            description: `Kabel Super Fast Charge PD65W | Kabel 4 in 1 Fast Charge USB C USB A Multiple Charging | Charge Iphone dan Android
    
            Kabel Data portable multifungsi dengan pengisian data super cepat
            
            Detail produk :
            
            - Cocok untuk ponsel, tablet, komputer, HP
            
            - Type Kabel : 4 in 1
            
            - USB to Lightning
            
            - USB to type C
            
            - Type C to Type C
            
            - Type C to Lightning
            
            - Panjang : 1 m
            
            - Daya : 65W fast charge
            
            - Lighting 27W + Android 65W anti kusut
            
            - Data transfer speed : <480mbps
            
            Produk sebelum dikirim sudah ditest dengan kondisi yang dipastikan aman, jika ada kerusakan kemungkinan dari pengiriman, karena paket yang terbanting.`,
            rating: '4.7 (586 Penilaian)',
            protection: 'Melindungi barang belanjaan dari kerusakan hingga 6 bulan',
            // shipping: 'Gratis Ongkir',
            colors: ['4in1 Gold-Hitam'],
            stock: 199,
            linkPayment: 'https://rheastore.orderonline.id/kabel-data-4in1-fast-charging-kabel-cas-4in1-type-c-usb-lightning-tipe-c'
        },
        { 
            name: 'Sepatu Sneakers Keren PRIA/WANITA', 
            price: 'Rp93.500', 
            imgSrc: ['/asset/products/Sepatu Jepang/gambar1.jpg', '/asset/products/Sepatu Jepang/gambar2.jpg', '/asset/products/Sepatu Jepang/gambar3.jpg'], 
            description: `DESKRIPSI PRODUK
    
            Sepatu Sneakers Kualitas Bagus Harga Terjangkau
            
            Sepatu Jogger Musim Panas
            
            Sepatu Casual Kaki Bisa Bergerak Dengan Santai
            
            Sepatu Karet Lembut Didalam Nyaman Saat Dipakai
            
            Sepatu Sport Model Simple Elegan Trend Fashion
            
            Rincian Ukuran :
            
            39 = 24.5 cm
            
            40 = 25 cm
            
            41 = 25.5 cm
            
            42 = 26 cm
            
            43 = 26.5 cm
            
            warna:
            
            -kuning
            
            -putih
            
            -hitam
            
            Mohon Untuk Diperhatikan :
            
            - Warna Sesuai Dengan Gambar
            
            - Ukuran Sesuai Dengan Kaki
            
            - Gambar Sesuai Asli Barang Yang Difotokan
            
            Catatan : Kami haya mengirim barang sesuai dengan yang dimasukan ke keranjang belanja. Jika ingin complain barang WAJIB ada video Unboxing. Membeli berarti menyetujui , Terima Kasih.
            
            Happy shopping..`,
            rating: '4.9 (846 Penilaian)',
            protection: 'Melindungi barang belanjaan dari kerusakan hingga 6 bulan',
            // shipping: 'Gratis Ongkir',
            colors: [
            'kuning - 39', 'kuning - 40', 'kuning - 41', 'kuning - 42', 'kuning - 43',
            'putih - 39', 'putih - 40', 'putih - 41', 'putih - 42', 'putih - 43',
            'hitam - 39', 'hitam - 40', 'hitam - 41', 'hitam - 42', 'hitam - 43',
        ],
            stock: 199,
            linkPayment: 'https://rheastore.orderonline.id/sepatu-sneakers-jintu-pria-bg-115-1'
        },
        // ... (other product entries remain unchanged) ...
    ];

    // Search through the items
    const filteredItems = items.filter(item => 
        nameRegex.test(item.name) || priceRegex.test(item.price)
    );

    // Display the results
    searchResults.innerHTML = '';
    if (filteredItems.length > 0) {
        filteredItems.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.textContent = `${item.name} - $${item.price}`;
            searchResults.appendChild(resultItem);
        });
    } else {
        searchResults.textContent = 'No results found';
    }
});


