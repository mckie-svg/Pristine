const navBarRow = document.getElementById('nav-bar-row');
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let lastScrollY = window.scrollY;

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

const desktopNavMq = window.matchMedia('(min-width: 768px)');

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (!desktopNavMq.matches || !navBarRow || !menuBtn) {
        lastScrollY = currentScrollY;
        return;
    }

    if (!menuBtn.classList.contains('menu-open')) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navBarRow.classList.add('nav-hidden');
        } else {
            navBarRow.classList.remove('nav-hidden');
        }
    }
    lastScrollY = currentScrollY;
});


