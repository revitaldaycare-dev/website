// Submits the tour form to Web3Forms via fetch; shows success/error without a page reload.
(function () {
    var form = document.getElementById('tour-form-el');
    if (!form) return;
    var submitBtn = document.getElementById('submit-btn');
    var success = document.getElementById('success-message');
    var error = document.getElementById('error-message');
    var originalLabel = submitBtn.innerHTML;

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        success.classList.add('hidden');
        error.classList.add('hidden');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2" aria-hidden="true"></i> Sending\u2026';
        try {
            var res = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });
            if (res.ok) {
                form.reset();
                success.classList.remove('hidden');
                success.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                error.classList.remove('hidden');
            }
        } catch (err) {
            error.classList.remove('hidden');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalLabel;
        }
    });
})();

// Uses images/facility.jpg when present; falls back to a stock photo until the owner adds theirs.
(function () {
    var heroImg = document.querySelector('.hero-facility-photo');
    if (!heroImg) return;
    heroImg.onerror = function () {
        this.onerror = null;
        this.src = 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1200&auto=format&fit=crop';
    };
})();

// Opens/closes the mobile navigation panel; swaps the hamburger icon to an X.
(function () {
    var toggle = document.getElementById('menu-toggle');
    var menu = document.getElementById('mobile-menu');
    var icon = document.getElementById('menu-icon');
    if (!toggle || !menu) return;
    toggle.addEventListener('click', function () {
        var open = menu.classList.toggle('hidden') === false;
        toggle.setAttribute('aria-expanded', String(open));
        icon.className = open ? 'fas fa-xmark text-lg' : 'fas fa-bars text-lg';
    });
})();