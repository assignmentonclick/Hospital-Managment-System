// Main site JS
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle?.addEventListener('click', () => {
    navMenu.classList.toggle('open');
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Simple contact form handler
const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent!');
    contactForm.reset();
});
