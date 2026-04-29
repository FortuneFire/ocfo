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

    // Scroll-to-top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        const toggleButtonVisibility = () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        };

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', toggleButtonVisibility);
        toggleButtonVisibility();
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

import imagemin from 'imagemin';
import webp from 'imagemin-webp';

await imagemin(['images/*.{jpg,png,jpeg}'], {
  destination: 'images-webp',
  plugins: [
    webp({ quality: 80 })
  ]
});

console.log('All images converted to WebP');import imagemin from 'imagemin';
import webp from 'imagemin-webp';

await imagemin(['images/*.{jpg,png,jpeg}'], {
  destination: 'images-webp',
  plugins: [
    webp({ quality: 80 })
  ]
});

console.log('All images converted to WebP');