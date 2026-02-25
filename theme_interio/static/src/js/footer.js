/**
 * INTERIO FOOTER JS
 * Dynamic year update and back-to-top functionality
 */
$(document).ready(function () {
    'use strict';

    // Dynamic Year Update
    const copyrightYear = document.querySelector('.interio-year-update');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Smooth Scroll To Top (if link exists)
    const backToTopBtn = document.querySelector('.interio-back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
