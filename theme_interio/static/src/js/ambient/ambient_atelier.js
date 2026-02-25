/**
 * Ambient Atelier — Cinematic Editorial Section
 * Scroll-reveal, Counter Animation, Image Parallax
 */

$(document).ready(function () {

    $('.aa-section').each(function () {
        var $section = $(this);

        // =====================
        // 1. Scroll Reveal
        // =====================
        var revealSelectors = [
            '.aa-editorial-inner',
            '.aa-hero-image',
            '.aa-section-label',
            '.aa-pillar-card',
            '.aa-quote-block'
        ];

        var revealElements = [];
        revealSelectors.forEach(function (sel) {
            $section.find(sel).each(function () {
                $(this).css({
                    'opacity': '0',
                    'transform': 'translateY(50px)',
                    'transition': 'opacity 0.9s cubic-bezier(0.23,1,0.32,1), transform 0.9s cubic-bezier(0.23,1,0.32,1)'
                });
                revealElements.push(this);
            });
        });

        if (revealElements.length) {
            var revealObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var idx = revealElements.indexOf(entry.target);
                        var delay = Math.min(idx * 150, 600);
                        setTimeout(function () {
                            $(entry.target).css({
                                'opacity': '1',
                                'transform': 'translateY(0)'
                            });
                        }, delay);
                        revealObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            revealElements.forEach(function (el) {
                revealObserver.observe(el);
            });
        }

        // =====================
        // 2. Counter Animation
        // =====================
        var counterAnimated = false;
        var $statsRow = $section.find('.aa-stats-row');

        if ($statsRow.length) {
            // Build counter data from class names like aa-counter-147
            var counterData = [];
            $section.find('.aa-stat-number').each(function () {
                var el = this;
                var classes = el.className.split(/\s+/);
                for (var i = 0; i < classes.length; i++) {
                    var match = classes[i].match(/^aa-counter-(\d+)$/);
                    if (match) {
                        counterData.push({
                            el: el,
                            target: parseInt(match[1], 10)
                        });
                        break;
                    }
                }
            });

            if (counterData.length) {
                var counterObserver = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting && !counterAnimated) {
                            counterAnimated = true;

                            counterData.forEach(function (item) {
                                var duration = 2200;
                                var startTime = null;

                                function animateCounter(timestamp) {
                                    if (!startTime) startTime = timestamp;
                                    var progress = Math.min((timestamp - startTime) / duration, 1);
                                    // Ease-out cubic
                                    var ease = 1 - Math.pow(1 - progress, 3);
                                    var current = Math.floor(ease * item.target);
                                    item.el.textContent = current;
                                    if (progress < 1) {
                                        requestAnimationFrame(animateCounter);
                                    } else {
                                        item.el.textContent = item.target + '+';
                                    }
                                }

                                requestAnimationFrame(animateCounter);
                            });

                            counterObserver.disconnect();
                        }
                    });
                }, { threshold: 0.2 });

                counterObserver.observe($statsRow[0]);
            }
        }

        // =====================
        // 3. Subtle Image Parallax
        // =====================
        var $parallaxImg = $section.find('.aa-image-mask img');
        if ($parallaxImg.length) {
            var sectionEl = $section[0];

            function onScroll() {
                var rect = sectionEl.getBoundingClientRect();
                var windowH = window.innerHeight;
                if (rect.top < windowH && rect.bottom > 0) {
                    var scrollProgress = (windowH - rect.top) / (windowH + rect.height);
                    var translateY = (scrollProgress - 0.5) * 40;
                    $parallaxImg[0].style.transform = 'scale(1.05) translateY(' + translateY + 'px)';
                }
            }

            $(window).on('scroll', onScroll);
            onScroll();
        }

        console.log('Ambient Atelier snippet initialized.');
    });
});
