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