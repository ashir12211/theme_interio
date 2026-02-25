/**
 * Vista Gallery — Mouse Move Parallax
 */
$(document).ready(function () {
    var $gallery = $('.vh-gallery');

    if (!$gallery.length) return;

    // --- Mouse Parallax ---
    var $items = $gallery.find('.vh-gallery-item[data-parallax]');
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    // Only enable on desktop
    if (windowWidth > 991) {
        $gallery.on('mousemove', function (e) {
            // Get mouse position relative to center of screen ( -0.5 to 0.5 )
            var x = (e.clientX / windowWidth) - 0.5;
            var y = (e.clientY / windowHeight) - 0.5;

            $items.each(function () {
                var $this = $(this);
                // Get sensitivity factor from data attribute (e.g. 0.04)
                var factor = parseFloat($this.attr('data-parallax')) || 0.02;

                // Calculate movement (opposite direction for depth)
                var moveX = x * windowWidth * factor * -1;
                var moveY = y * windowHeight * factor * -1;

                $this.css('transform', `translate(${moveX}px, ${moveY}px)`);
            });
        });
    }

    // Update window size on resize for calculation accuracy
    $(window).on('resize', function () {
        windowWidth = $(window).width();
        windowHeight = $(window).height();
    });
});
