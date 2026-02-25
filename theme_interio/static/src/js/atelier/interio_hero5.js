/**
 * Atelier Hero Snippet Controller
 * Mouse Parallax & Interaction Effects
 */
$(document).ready(function () {
    $('.atelier-hero-section').each(function () {
        var $el = $(this);
        var $grid = $el.find('.ah-bg-grid');
        var $floatingWrapper = $el.find('.ah-img-floating-wrapper');

        // Mouse Parallax Effect
        $el.on('mousemove', function (e) {
            var rect = $el[0].getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;

            var xPercent = x / rect.width - 0.5;
            var yPercent = y / rect.height - 0.5;

            // Move the grid opposite to mouse
            var gridX = xPercent * -25;
            var gridY = yPercent * -25;
            $grid.css('transform', 'translate(' + gridX + 'px, ' + gridY + 'px)');

            // Move floating wrapper towards the mouse
            var floatX = xPercent * 40;
            var floatY = yPercent * 40;
            $floatingWrapper.css('transform', 'translate(' + floatX + 'px, ' + floatY + 'px)');
        });

        // Reset positions smoothly on mouse leave
        $el.on('mouseleave', function () {
            $grid.css({
                'transform': 'translate(0px, 0px)',
                'transition': 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            });
            $floatingWrapper.css({
                'transform': 'translate(0px, 0px)',
                'transition': 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
            });

            // Remove transition after it finished so mousemove works instantly again
            setTimeout(function () {
                $grid.css('transition', 'none');
                $floatingWrapper.css('transition', 'none');
            }, 800);
        });

        // Initial transition clearing
        $grid.css('transition', 'none');
        $floatingWrapper.css('transition', 'none');
    });
});
