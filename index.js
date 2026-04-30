const nav = document.getElementById('main-nav');
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let lastScrollY = window.scrollY;

// Toggle Menu and Animation
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('menu-open');
    mobileMenu.classList.toggle('translate-x-full');
    mobileMenu.classList.toggle('translate-x-0');
    document.body.classList.toggle('overflow-hidden');
});

// Close menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('menu-open');
        mobileMenu.classList.add('translate-x-full');
        document.body.classList.remove('overflow-hidden');
    });
});

// Hide/Show Nav on Scroll
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Prevent hiding if mobile menu is open
    if (!menuBtn.classList.contains('menu-open')) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
    }
    lastScrollY = currentScrollY;
});

const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    // This triggers the CSS Morph (top, middle, bottom lines)
    menuBtn.classList.toggle('menu-open');
    
    // This triggers the Sidebar visibility
    mobileMenu.classList.toggle('translate-x-full');
    mobileMenu.classList.toggle('translate-x-0');
    
    // Prevents the background from scrolling when menu is open
    document.body.classList.toggle('overflow-hidden');
});

// Close menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('menu-open');
        mobileMenu.classList.add('translate-x-full');
        mobileMenu.classList.remove('translate-x-0');
        document.body.classList.remove('overflow-hidden');
    });
});