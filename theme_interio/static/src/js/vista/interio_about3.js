/**
 * Interio About 3 — Premium Editorial
 * - Stats Counter
 * - Image Curtain Reveal
 * - Scroll Parallax
 * - Mouse Parallax
 */
$(document).ready(function () {
    var $window = $(window);
    var $hero = $('.interio_about3');
    if (!$hero.length) return;

    var $stats = $hero.find('.ia3-stat-num');
    var $parallaxImgs = $hero.find('.ia3-parallax-img');
    var $floatingText = $hero.find('.ia3-floating-text');
    var animated = false;

    // --- Stats Counter ---
    function startCounters() {
        if (animated) return;
        animated = true;

        $stats.each(function () {
            var $this = $(this);
            var countTo = parseInt($this.attr('data-count'));

            $({ countNum: 0 }).animate({
                countNum: countTo
            },
                {
                    duration: 2500,
                    easing: 'swing',
                    step: function () {
                        // Add Format (1,000)
                        $this.text(Math.floor(this.countNum).toLocaleString());
                    },
                    complete: function () {
                        $this.text(this.countNum.toLocaleString());
                    }
                });
        });
    }

    // --- Interaction Loop (Parallax) ---
    function updateParallax() {
        var scrollTop = $window.scrollTop();
        var heroTop = $hero.offset().top;
        var heroHeight = $hero.outerHeight();
        var windowHeight = $window.height();

        // Check if section is in viewport
        if (scrollTop + windowHeight > heroTop && scrollTop < heroTop + heroHeight) {

            // Calculate progress (0 to 1)
            var progress = (scrollTop + windowHeight - heroTop) / (windowHeight + heroHeight);

            // Apply to images (Vertical Shift)
            $parallaxImgs.each(function () {
                // Move from -7.5% to +7.5%
                var yPos = (progress - 0.5) * 15;
                $(this).css('transform', 'translateY(' + yPos + '%) scale(1.1)');
            });
        }

        requestAnimationFrame(updateParallax);
    }

    // Start Loop
    requestAnimationFrame(updateParallax);


    // --- Mouse Parallax for Floating Text ---
    $hero.on('mousemove', function (e) {
        if ($window.width() < 991) return; // Disable on mobile

        var x = (e.clientX / $window.width() - 0.5) * 40; // -20 to 20
        var y = (e.clientY / $window.height() - 0.5) * 40;

        var depth = $floatingText.data('depth') || 0.1;

        $floatingText.css('transform', `translate(${x * depth}px, ${y * depth}px)`);
    });


    // --- Intersection Observer for Reveals ---
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                $(entry.target).addClass('ia3-in-view');

                // Trigger mask reveal specifically
                $(entry.target).find('.ia3-reveal-mask').css('transform', 'scaleX(0)');

                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    $hero.each(function () {
        observer.observe(this);
    });
});
