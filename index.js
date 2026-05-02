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



