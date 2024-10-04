// Swap images every 10 seconds
const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
let isImg1Visible = true;
function toggleImages() {
    if (isImg1Visible) {
        img1.classList.remove('active');
        img1.classList.add('hidden');
        img2.classList.remove('hidden');
        img2.classList.add('active', 'glitch'); // Apply glitch effect when img2 becomes visible
        // Remove glitch effect after 0.3 seconds
        setTimeout(() => {
            img2.classList.remove('glitch');
        }, 300);
    } else {
        img2.classList.remove('active');
        img2.classList.add('hidden');
        img1.classList.remove('hidden');
        img1.classList.add('active', 'glitch'); // Apply glitch effect when img1 becomes visible

        // Remove glitch effect after 0.3 seconds
        setTimeout(() => {
            img1.classList.remove('glitch');
        }, 300);
    }
    isImg1Visible = !isImg1Visible;
}
img1.classList.add('active');
setInterval(toggleImages, 10000);

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}
const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
});
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach(el => observer.observe(el));
});