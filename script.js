/* ===== REVITAL DAYCARE - MAIN JAVASCRIPT ===== */

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (navMenu && hamburger) {
            const isClickInside = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInside && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    // Contact form opens a mail client with the submitted details
    const contactForm = document.getElementById('contactForm');
    const contactFormStatus = document.getElementById('contactFormStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(contactForm);
            const name = formData.get('name') || 'A parent';
            const email = formData.get('email') || 'revitaldaycare@gmail.com';
            const phone = formData.get('phone') || 'Not provided';
            const program = formData.get('program') || 'General inquiry';
            const message = formData.get('message') || '';

            const subject = encodeURIComponent(`Website inquiry from ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProgram interest: ${program}\n\nMessage:\n${message}`
            );

            window.location.href = `mailto:revitaldaycare@gmail.com?subject=${subject}&body=${body}`;

            if (contactFormStatus) {
                contactFormStatus.textContent = 'Thank you! Your message has been submitted. We will get back to you within 24 hours.';
            }
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to nav links based on current page
    const currentLocation = location.pathname;
    const menuItems = document.querySelectorAll('.nav-menu a');
    menuItems.forEach(item => {
        if (item.getAttribute('href') === currentLocation) {
            item.classList.add('active');
        }
    });
});

// Lazy loading images (optional - for future image optimization)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Scroll animations (optional - adds fade-in effect)
const scrollAnimationElements = document.querySelectorAll('.feature-card, .program-card, .testimonial-card, .team-member');

if ('IntersectionObserver' in window && scrollAnimationElements.length > 0) {
    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-visible');
                elementObserver.unobserve(entry.target);
            }
        });
    });

    scrollAnimationElements.forEach(element => {
        element.classList.add('animate-fade');
        elementObserver.observe(element);
    });
}
