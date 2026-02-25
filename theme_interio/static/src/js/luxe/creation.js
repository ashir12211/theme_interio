/**
 * Interio Creation — Luxe Category
 * Animation Logic (jQuery/Vanilla Fallback)
 * Features: Scroll Reveal, Drag-to-Scroll, Auto-Slide on Idle
 */
$(document).ready(function () {
    // Only run if the snippet exists on the page
    const $creationSection = $('.interio_creation');
    if (!$creationSection.length) return;

    // ——— Scroll Reveal Logic ———
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.interio_creation .ic-reveal');
    revealElements.forEach(el => revealObserver.observe(el));

    // ——— Slider Logic (Drag + Auto-Slide) ———
    const slider = document.querySelector('.interio_creation .ic-slider-container');
    const track = document.querySelector('.interio_creation .ic-slider-track');

    if (slider && track) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let isHovering = false;
        let animationFrameId;

        const autoSlideSpeed = 0.3; // Pixels per frame — keep this between 0.1 and 1.0
        let accumulated = 0;        // Fractional pixel accumulator (fixes sub-pixel stopping bug)

        // Duplicate the cards inside the track for infinite loop effect
        const originalCards = Array.from(track.children);
        originalCards.forEach(card => {
            const cloneCard = card.cloneNode(true);
            cloneCard.classList.add('cloned');
            track.appendChild(cloneCard);
        });

        // Function to handle auto-sliding
        const animate = () => {
            if (!isDown && !isHovering) {
                // Accumulate fractional pixels to avoid browser sub-pixel rounding stopping movement
                accumulated += autoSlideSpeed;

                if (accumulated >= 1) {
                    const steps = Math.floor(accumulated);
                    slider.scrollLeft += steps;
                    accumulated -= steps;
                }

                // Reset scroll position for seamless loop
                if (slider.scrollLeft >= (slider.scrollWidth / 2)) {
                    slider.scrollLeft = 0;
                    accumulated = 0;
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        // Start animation
        animationFrameId = requestAnimationFrame(animate);

        // ——— Event Listeners ———

        // Pause on Hover
        slider.addEventListener('mouseenter', () => {
            isHovering = true;
        });

        slider.addEventListener('mouseleave', () => {
            isHovering = false;
        });

        // Drag Functionality
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            isHovering = true; // Ensure auto-slide is paused during drag
            slider.classList.add('active');
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = 'grabbing';
        });

        slider.addEventListener('mouseleave', () => {
            isDown = false;
            isHovering = false;
            slider.style.cursor = 'grab';
        });

        slider.addEventListener('mouseup', () => {
            isDown = false;
            isHovering = true; // Still hovering if mouse up inside
            slider.style.cursor = 'grab';
        });

        // Global mouseup to catch drags ending outside
        window.addEventListener('mouseup', () => {
            if (isDown) {
                isDown = false;
                isHovering = false;
                slider.style.cursor = 'grab';
            }
        });

        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Drag speed multiplier
            slider.scrollLeft = scrollLeft - walk;
        });
    }
});