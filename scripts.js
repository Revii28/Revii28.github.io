// scripts.js

// Function to handle Add to Cart button clicks
function addToCart(productName) {
    alert(productName + " has been added to your cart!");
}

// Smooth scroll for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
