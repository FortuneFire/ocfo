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
            if (submitBtn.disabled) return; // prevent double click

            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Submitting... ⏳';

            try {
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());

                // 🔒 Honeypot (anti-spam)
                if (data.company_website) {
                    console.warn('Bot detected');
                    return;
                }

                // ✅ JavaScript validation
                const name = (data.name || '').trim();
                const email = (data.email || '').trim();
                const phone = (data.phone || '').trim();

                if (!name) {
                    alert('Please enter your full name.');
                    form.querySelector('#name').focus();
                    throw new Error('Invalid name');
                }

                if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
                    alert('Please enter a valid email address.');
                    form.querySelector('#email').focus();
                    throw new Error('Invalid email');
                }

                if (!phone || !/^[0-9()+ \-]{7,}$/.test(phone)) {
                    alert('Please enter a valid phone number using digits, spaces, parentheses, plus signs, or dashes.');
                    form.querySelector('#phone').focus();
                    throw new Error('Invalid phone');
                }

                // 🧠 Add tracking data
                formData.append('source', 'OCFO Landing Page');
                formData.append('timestamp', new Date().toISOString());
                formData.append('userAgent', navigator.userAgent);

                // ⏱️ Timeout handling (10s)
                const controller = new AbortController();
                const timeout = setTimeout(() => controller.abort(), 10000);

                const response = await fetch('https://hooks.zapier.com/hooks/catch/23918850/uvfetmj/', {
                    method: 'POST',
                    body: formData,
                    signal: controller.signal
                });

                clearTimeout(timeout);

                if (!response.ok) {
                    const errorText = await response.text().catch(() => 'Unable to read response body');
                    console.error('Zapier webhook error body:', errorText);
                    throw new Error('Network response was not ok');
                }

                // 📊 Optional tracking (safe fallback)
                if (typeof gtag === 'function') {
                    gtag('event', 'lead_submit', {
                        method: 'landing_page_form'
                    });
                }

                // ✅ Success state
                form.style.display = 'none';
                if (thankYou) {
                    thankYou.style.display = 'block';
                    thankYou.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }

                const checkInIntro = document.getElementById('checkInIntro');
                if (checkInIntro) checkInIntro.style.display = 'none';

            } catch (error) {
                console.error('Submission failed:', error);

                alert('Something went wrong. Please try again.');

                submitBtn.disabled = false;
                submitBtn.innerText = 'Request Your Free Call';
            }
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