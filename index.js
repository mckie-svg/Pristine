const navBarRow = document.getElementById('nav-bar-row');
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
/** Quote page opts out: add class `nav-no-auto-hide` on <body> */
const navAutoHideOnScroll =
    typeof document !== 'undefined' && !document.body.classList.contains('nav-no-auto-hide');
let lastScrollY = window.scrollY;
let scrollRafPending = false;

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('menu-open');
        mobileMenu.classList.toggle('translate-x-full');
        mobileMenu.classList.toggle('translate-x-0');
        document.body.classList.toggle('overflow-hidden');
        if (navBarRow) {
            navBarRow.classList.remove('nav-hidden');
        }
    });

    document.querySelectorAll('#mobile-menu a').forEach((link) => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('menu-open');
            mobileMenu.classList.add('translate-x-full');
            mobileMenu.classList.remove('translate-x-0');
            document.body.classList.remove('overflow-hidden');
        });
    });
}

function updateNavOnScroll() {
    const currentScrollY = window.scrollY;

    if (!navAutoHideOnScroll || !navBarRow) {
        lastScrollY = currentScrollY;
        scrollRafPending = false;
        return;
    }

    const menuOpen = menuBtn && menuBtn.classList.contains('menu-open');
    if (!menuOpen) {
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
            navBarRow.classList.add('nav-hidden');
        } else {
            navBarRow.classList.remove('nav-hidden');
        }
    }
    lastScrollY = currentScrollY;
    scrollRafPending = false;
}

window.addEventListener(
    'scroll',
    () => {
        if (!navAutoHideOnScroll || !navBarRow) {
            lastScrollY = window.scrollY;
            return;
        }
        if (!scrollRafPending) {
            scrollRafPending = true;
            requestAnimationFrame(updateNavOnScroll);
        }
    },
    { passive: true }
);

/**
 * PROFESSIONAL CLEAN URL RESOLVER
 * Maps clean names (/home, /services, /inquiry) to actual files,
 * ensuring a professional aesthetic without "Cannot GET" errors.
 */
(function() {
    const routeMap = {
        '/home': '/index.html',
        '/services': '/src/services.html',
        '/inquiry': '/src/inquiry.html'
    };

    function cleanAddressBar() {
        const path = window.location.pathname;
        
        // If at root or index.html, show /home
        if (path === '/' || path.endsWith('/index.html')) {
            window.history.replaceState(null, '', '/home' + window.location.search + window.location.hash);
            return;
        }

        // Check if current path matches any of our file targets
        for (const [route, file] of Object.entries(routeMap)) {
            if (path.endsWith(file)) {
                window.history.replaceState(null, '', route + window.location.search + window.location.hash);
                return;
            }
        }
    }

    document.addEventListener('click', (e) => {
        const a = e.target.closest('a');
        if (!a) return;

        const href = a.getAttribute('href');
        
        // Handle mapped routes
        if (routeMap[href]) {
            e.preventDefault();
            window.location.href = routeMap[href];
        } else if (href === '/') {
            e.preventDefault();
            window.location.href = '/index.html';
        }
    });

    if (document.readyState === 'complete') cleanAddressBar();
    else window.addEventListener('load', cleanAddressBar);
})();
