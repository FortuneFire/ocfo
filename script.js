document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Form submission handling
    const form = document.getElementById('leadForm');
    const thankYou = document.getElementById('thankYouMessage');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            // Here you could send the data to a CRM or endpoint
            form.style.display = 'none';
            thankYou.style.display = 'block';
        });
    }

    // Lazy load images for performance
    const images = document.querySelectorAll('img');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Form submission handling
    const form = document.getElementById('leadForm');
    const thankYou = document.getElementById('thankYouMessage');

    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            // Here you could send the data to a CRM or endpoint
            form.style.display = 'none';
            thankYou.style.display = 'block';
        });
    }

    // Lazy load images for performance
    const images = document.querySelectorAll('img');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});