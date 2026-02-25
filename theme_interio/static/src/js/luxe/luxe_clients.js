/**
 * Luxe Clients — Infinite Marquee + Counter Animation
 * Scroll reveal, animated counters, and marquee control
 */

$(document).ready(function () {

    $('.luxe_clients').each(function () {
        var $section = $(this);
        var $header = $section.find('.lc-header');
        var $marquees = $section.find('.lc-marquee-wrapper');
        var $statsBar = $section.find('.lc-stats-bar');
        var $statNumbers = $section.find('.lc-stat-number');
        var countersAnimated = false;

        // ── Animated Counter ──
        function animateCounters() {
            if (countersAnimated) return;
            countersAnimated = true;

            $statNumbers.each(function () {
                var $el = $(this);
                var target = parseInt($el.attr('data-target'), 10);
                var duration = 2000;
                var startTime = null;

                function easeOutExpo(t) {
                    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
                }

                function updateCounter(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var elapsed = timestamp - startTime;
                    var progress = Math.min(elapsed / duration, 1);
                    var easedProgress = easeOutExpo(progress);
                    var currentValue = Math.floor(easedProgress * target);

                    $el.text(currentValue);

                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        $el.text(target);
                    }
                }

                requestAnimationFrame(updateCounter);
            });
        }

        // ── Scroll Reveal with Intersection Observer ──
        var revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var $target = $(entry.target);
                    $target.addClass('lc-visible');

                    // Trigger counters when stats bar is visible
                    if ($target.hasClass('lc-stats-bar')) {
                        setTimeout(animateCounters, 500);
                    }
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe elements
        if ($header.length) {
            revealObserver.observe($header[0]);
        }

        $marquees.each(function () {
            revealObserver.observe(this);
        });

        if ($statsBar.length) {
            revealObserver.observe($statsBar[0]);
        }

        // ── Tooltip Effect on Logo Hover ──
        $section.find('.lc-logo-item').each(function () {
            var $item = $(this);
            var $svg = $item.find('.lc-logo-svg text');
            var logoName = $svg.length ? $svg.text() : '';

            $item.on('mouseenter', function () {
                $item.attr('title', logoName);
            });
        });

        console.log('Luxe Clients snippet initialized.');
    });
});
