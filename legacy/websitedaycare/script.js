/* ===== REVITAL DAYCARE - MAIN JAVASCRIPT ===== */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

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
        });
    }
});
