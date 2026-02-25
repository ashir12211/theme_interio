/**
 * Atelier Project Controller
 * Scroll reveal for overlapping grids
 */
$(document).ready(function () {
    $('.atelier-project-section').each(function () {
        var $anims = $(this).find('.aproj-anim');

        // Apply delay tracking
        $anims.each(function () {
            var delay = $(this).attr('data-delay') || '0s';
            $(this).css('transition-delay', delay);
        });

        // Scroll reveal logic
        function revealProject() {
            var scrollTop = $(window).scrollTop();
            var windowHeight = $(window).height();

            $anims.each(function () {
                var $elem = $(this);
                if ($elem.hasClass('is-visible')) return;
                var elTop = $elem.offset().top;
                if (elTop < scrollTop + windowHeight * 0.9) {
                    $elem.addClass('is-visible');
                }
            });
        }

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        $(entry.target).addClass('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            $anims.each(function () { observer.observe(this); });
        } else {
            $(window).on('scroll.aproj-anim', revealProject);
            revealProject();
        }
    });
});
