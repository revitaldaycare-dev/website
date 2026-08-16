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

    const contactForm = document.getElementById('contactForm');
    const contactFormStatus = document.getElementById('contactFormStatus');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = (document.getElementById('contactName') || {}).value || '';
            const email = (document.getElementById('contactEmail') || {}).value || '';
            const phone = (document.getElementById('contactPhone') || {}).value || '';
            const program = (document.getElementById('contactProgram') || {}).value || '';
            const message = (document.getElementById('contactMessage') || {}).value || '';

            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('program', program);
            formData.append('message', message);

            if (contactFormStatus) {
                contactFormStatus.textContent = 'Sending your message…';
            }

            fetch('/api/contact', {
                method: 'POST',
                body: formData
            })
            .then(function(response) {
                if (response.ok) {
                    if (contactFormStatus) {
                        contactFormStatus.textContent = 'Thank you! Your message was sent. We\'ll respond within 24 business hours.';
                    }
                    contactForm.reset();
                } else {
                    throw new Error('Server response was not OK');
                }
            })
            .catch(function() {
                var subject = encodeURIComponent('Tour Request from ' + name + ' — Revital Daycare');
                var body = encodeURIComponent(
                    'Name: ' + name + '\n' +
                    'Email: ' + email + '\n' +
                    'Phone: ' + phone + '\n' +
                    'Program of Interest: ' + program + '\n\n' +
                    'Message:\n' + message
                );
                window.location.href = 'mailto:revitaldaycare@gmail.com?subject=' + subject + '&body=' + body;

                if (contactFormStatus) {
                    contactFormStatus.textContent = 'Opening your email client… If it didn\'t open, please email us directly at revitaldaycare@gmail.com.';
                }
            });
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

// Lazy loading images (deferred until idle)
if ('IntersectionObserver' in window) {
    var requestIdleCallback = window.requestIdleCallback || function(cb) { setTimeout(cb, 1); };
    requestIdleCallback(function() {
        var imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(function(img) {
            imageObserver.observe(img);
        });
    });
}

// Scroll animations (deferred until idle to avoid blocking initial render)
if ('IntersectionObserver' in window) {
    var requestIdleCallback2 = window.requestIdleCallback || function(cb) { setTimeout(cb, 1); };
    requestIdleCallback2(function() {
        var scrollAnimationElements = document.querySelectorAll('.feature-card, .program-card, .testimonial-card, .team-member');
        if (scrollAnimationElements.length === 0) return;

        var elementObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                    elementObserver.unobserve(entry.target);
                }
            });
        });

        scrollAnimationElements.forEach(function(element) {
            element.classList.add('animate-fade');
            elementObserver.observe(element);
        });
    });
}
