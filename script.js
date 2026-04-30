document.addEventListener('DOMContentLoaded', function () {

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Form handling
    const form = document.getElementById('leadForm');
    const thankYou = document.getElementById('thankYouMessage');

    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerText = 'Submitting...';

            try {
                await new Promise(resolve => setTimeout(resolve, 800));
            } catch (error) {
                console.error('Submission failed:', error);
            }

            form.style.display = 'none';
            thankYou.style.display = 'block';

            // Hide the check-in intro text
            var checkInIntro = document.getElementById('checkInIntro');
            if (checkInIntro) checkInIntro.style.display = 'none';

            // Ensure user sees confirmation
            thankYou.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // Scroll-to-top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        const toggleButtonVisibility = () => {
            scrollTopBtn.classList.toggle('visible', window.scrollY > 500);
        };

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        window.addEventListener('scroll', toggleButtonVisibility);
        toggleButtonVisibility();
    }

    // Lazy loading
    const images = document.querySelectorAll('img');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => img.loading = 'lazy');
    } else {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }
});