/**
 * Luxe Services — Stacked Rotating Card Carousel
 * Smooth auto-rotate every 4.5s + click-to-swap
 */

$(document).ready(function () {

    $('.ls-section').each(function () {
        var $section = $(this);
        var $cards = $section.find('.ls-stack-card');
        var $infos = $section.find('.ls-service-info');
        var $dots = $section.find('.ls-nav-dot');
        var totalCards = $cards.length;
        var isSwapping = false;
        var autoInterval = null;
        var AUTO_DELAY = 4500;

        // Position configs: [translateY, translateX, scale, rotate, opacity, zIndex]
        var positions = [
            { ty: 0, tx: 0, s: 1, r: 0, o: 1, z: 4 },
            { ty: 16, tx: 14, s: 0.96, r: 1.5, o: 0.85, z: 3 },
            { ty: 32, tx: 28, s: 0.92, r: 3, o: 0.65, z: 2 },
            { ty: 48, tx: 42, s: 0.88, r: 4.5, o: 0.4, z: 1 }
        ];

        // Track logical order: order[0] = index of card at top, etc.
        var order = [];
        for (var i = 0; i < totalCards; i++) {
            order.push(i);
        }

        // ── Apply transform to a card by position index ──
        function applyPosition($card, posIdx, skipTransition) {
            var p = positions[posIdx];
            if (skipTransition) {
                $card.css('transition', 'none');
            } else {
                $card.css('transition', '');
            }
            $card.css({
                'transform': 'translateY(' + p.ty + 'px) translateX(' + p.tx + 'px) scale(' + p.s + ') rotate(' + p.r + 'deg)',
                'opacity': p.o,
                'z-index': p.z
            });
        }

        // ── Set all card positions from order array ──
        function renderStack(skipTransition) {
            for (var posIdx = 0; posIdx < order.length; posIdx++) {
                var cardIdx = order[posIdx];
                var $card = $cards.filter('[data-index="' + cardIdx + '"]');
                applyPosition($card, posIdx, skipTransition);
            }
        }

        // ── Update service info and dots ──
        function updateActiveInfo(topCardIndex) {
            $infos.removeClass('active');
            $infos.filter('[data-service="' + topCardIndex + '"]').addClass('active');
            $dots.removeClass('active');
            $dots.filter('[data-target="' + topCardIndex + '"]').addClass('active');
        }

        // ── Initial render ──
        renderStack(true);
        // Force reflow then enable transitions
        $cards[0] && $cards[0].offsetHeight;
        setTimeout(function () {
            renderStack(false);
        }, 50);

        // ── Swap: Animate top card out, then reposition ──
        function swapTopCard(callback) {
            if (isSwapping) return;
            isSwapping = true;

            var topCardIdx = order[0];
            var $topCard = $cards.filter('[data-index="' + topCardIdx + '"]');

            // Phase 1: Animate the top card upward and fade it
            $topCard.css('transition', 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1)');
            $topCard.css({
                'transform': 'translateY(-30px) translateX(-20px) scale(0.9) rotate(-6deg)',
                'opacity': '0',
                'z-index': '0'
            });

            // Phase 2: After exit animation, reposition all cards
            setTimeout(function () {
                // Rotate order: top goes to back
                var removed = order.shift();
                order.push(removed);

                // Instantly place old top card at the back position (no transition)
                applyPosition($topCard, totalCards - 1, true);

                // Force reflow
                $topCard[0] && $topCard[0].offsetHeight;

                // Now smoothly transition remaining cards to new positions
                setTimeout(function () {
                    renderStack(false);

                    // Update info panel
                    updateActiveInfo(order[0]);

                    // Allow next swap after transition completes
                    setTimeout(function () {
                        isSwapping = false;
                        if (typeof callback === 'function') callback();
                    }, 650);
                }, 30);

            }, 550);
        }

        // ── Click on stack container ──
        $section.find('.ls-stack-container').on('click', function () {
            resetAutoRotate();
            swapTopCard();
        });

        // ── Nav dot click ──
        $dots.on('click', function (e) {
            e.stopPropagation();
            if (isSwapping) return;

            var targetIndex = parseInt($(this).attr('data-target'), 10);

            // Find how many swaps needed to bring target to top
            var targetOrderPos = -1;
            for (var j = 0; j < order.length; j++) {
                if (order[j] === targetIndex) {
                    targetOrderPos = j;
                    break;
                }
            }

            if (targetOrderPos <= 0) return; // Already on top or not found

            resetAutoRotate();

            // Chain swaps sequentially
            var swapsNeeded = targetOrderPos;
            var swapCount = 0;

            function chainSwap() {
                if (swapCount >= swapsNeeded) return;
                swapCount++;
                swapTopCard(function () {
                    if (swapCount < swapsNeeded) {
                        chainSwap();
                    }
                });
            }

            chainSwap();
        });

        // ── Auto-Rotate ──
        function startAutoRotate() {
            clearInterval(autoInterval);
            autoInterval = setInterval(function () {
                swapTopCard();
            }, AUTO_DELAY);
        }

        function resetAutoRotate() {
            clearInterval(autoInterval);
            startAutoRotate();
        }

        // ── Scroll Reveal ──
        var $container = $section.find('.ls-stack-wrapper');
        var $leftPanel = $section.find('.ls-service-details');

        $container.css({
            'opacity': '0',
            'transform': 'translateY(50px)',
            'transition': 'opacity 1s cubic-bezier(0.23,1,0.32,1) 0.2s, transform 1s cubic-bezier(0.23,1,0.32,1) 0.2s'
        });

        $leftPanel.css({
            'opacity': '0',
            'transform': 'translateY(40px)',
            'transition': 'opacity 1s cubic-bezier(0.23,1,0.32,1) 0.4s, transform 1s cubic-bezier(0.23,1,0.32,1) 0.4s'
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    $container.css({ 'opacity': '1', 'transform': 'translateY(0)' });
                    $leftPanel.css({ 'opacity': '1', 'transform': 'translateY(0)' });
                    startAutoRotate();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        if ($section.find('.ls-main-row').length) {
            observer.observe($section.find('.ls-main-row')[0]);
        }

        // ── Pause on hover ──
        $section.find('.ls-stack-container').on('mouseenter', function () {
            clearInterval(autoInterval);
        }).on('mouseleave', function () {
            startAutoRotate();
        });

        console.log('Luxe Services snippet initialized.');
    });
});
