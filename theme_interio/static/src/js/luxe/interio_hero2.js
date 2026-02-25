/**
 * Interio Hero 2 — Premium Interactive Controller
 * Split-Screen Showcase with Auto-Slide, Counter Animation & Reveal Effects
 */
$(document).ready(function () {
    $('.interio_hero2').each(function () {
        const $hero = $(this);
        const $slides = $hero.find('.ih2-img-main');
        const $thumbs = $hero.find('.ih2-thumb');
        const $progressBar = $hero.find('.ih2-progress-bar');
        const $currentCounter = $hero.find('.ih2-nav-current');
        const $prevBtn = $hero.find('.ih2-nav-prev');
        const $nextBtn = $hero.find('.ih2-nav-next');
        const $statNumbers = $hero.find('.ih2-stat-number');
        const $reveals = $hero.find('.ih2-reveal');

        let currentIndex = 0;
        let slideTimer = null;
        const totalSlides = $slides.length;
        const autoPlayDuration = 6000; // 6 seconds per slide
        let isAnimating = false;

        // ——— Slide Logic ———
        function goToSlide(index, direction) {
            if (isAnimating || index === currentIndex) return;
            isAnimating = true;

            // Normalize
            if (index >= totalSlides) index = 0;
            if (index < 0) index = totalSlides - 1;

            // Update main slides
            $slides.removeClass('active');
            $slides.eq(index).addClass('active');

            // Update thumbnails
            $thumbs.removeClass('active');
            $thumbs.eq(index).addClass('active');

            // Update counter
            $currentCounter.text(String(index + 1).padStart(2, '0'));

            currentIndex = index;

            // Reset progress
            resetProgress();

            // Allow next transition after animation completes
            setTimeout(function () {
                isAnimating = false;
            }, 800);
        }

        function nextSlide() {
            goToSlide(currentIndex + 1, 'next');
        }

        function prevSlide() {
            goToSlide(currentIndex - 1, 'prev');
        }

        // ——— Progress Bar ———
        function resetProgress() {
            $progressBar.removeClass('animating');
            // Trigger reflow to restart animation
            void $progressBar[0].offsetWidth;
            $progressBar.addClass('animating');
        }

        // ——— Auto Play ———
        function startAutoPlay() {
            stopAutoPlay();
            resetProgress();
            slideTimer = setInterval(nextSlide, autoPlayDuration);
        }

        function stopAutoPlay() {
            if (slideTimer) {
                clearInterval(slideTimer);
                slideTimer = null;
            }
        }

        // ——— Event Bindings ———
        $nextBtn.on('click', function () {
            stopAutoPlay();
            nextSlide();
            startAutoPlay();
        });

        $prevBtn.on('click', function () {
            stopAutoPlay();
            prevSlide();
            startAutoPlay();
        });

        $thumbs.on('click', function () {
            const idx = $(this).data('index');
            stopAutoPlay();
            goToSlide(idx);
            startAutoPlay();
        });

        // Pause on hover over gallery
        $hero.find('.ih2-gallery').hover(
            function () { stopAutoPlay(); $progressBar.css('animation-play-state', 'paused'); },
            function () { startAutoPlay(); }
        );

        // ——— Stat Counter Animation ———
        function animateCounters() {
            $statNumbers.each(function () {
                const $el = $(this);
                const target = parseInt($el.data('count'), 10);
                if ($el.data('animated')) return;
                $el.data('animated', true);

                const duration = 2000;
                const start = performance.now();

                function update(now) {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // Ease out quad
                    const ease = 1 - (1 - progress) * (1 - progress);
                    const current = Math.floor(ease * target);
                    $el.text(current);
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        $el.text(target);
                    }
                }

                requestAnimationFrame(update);
            });
        }

        // ——— Scroll Reveal ———
        function checkReveals() {
            $reveals.each(function () {
                const $el = $(this);
                if ($el.hasClass('revealed')) return;
                const elTop = $el.offset().top;
                const scrollTop = $(window).scrollTop();
                const windowHeight = $(window).height();
                if (elTop < scrollTop + windowHeight * 0.88) {
                    $el.addClass('revealed');
                }
            });
        }

        // ——— Intersection Observer Fallback ———
        function initObserver() {
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            // Start auto play when hero is in view
                            startAutoPlay();
                            animateCounters();
                            checkReveals();
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.15 });

                observer.observe($hero[0]);
            } else {
                // Fallback: just start immediately
                startAutoPlay();
                animateCounters();
                $reveals.addClass('revealed');
            }
        }

        // ——— Keyboard Navigation ———
        $(document).on('keydown', function (e) {
            // Only if hero is in viewport
            const heroTop = $hero.offset().top;
            const heroBottom = heroTop + $hero.outerHeight();
            const scrollTop = $(window).scrollTop();
            const windowHeight = $(window).height();

            if (scrollTop + windowHeight > heroTop && scrollTop < heroBottom) {
                if (e.key === 'ArrowRight') {
                    stopAutoPlay();
                    nextSlide();
                    startAutoPlay();
                } else if (e.key === 'ArrowLeft') {
                    stopAutoPlay();
                    prevSlide();
                    startAutoPlay();
                }
            }
        });

        // ——— Scroll Listener for Reveals ———
        $(window).on('scroll.ih2', function () {
            checkReveals();
        });

        // ——— Init ———
        initObserver();
        checkReveals(); // Initial check on load
    });
});
