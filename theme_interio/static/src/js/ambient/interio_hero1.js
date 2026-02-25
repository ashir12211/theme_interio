/**
 * Interio Hero 1 — Video Background
 * Slider logic removed.
 */
$(document).ready(function () {
    // Video background setup if needed
    $('.interio_hero1').each(function () {
        var $hero = $(this);
        var $video = $hero.find('video');

        // Ensure video plays
        if ($video.length) {
            $video.get(0).play().catch(function (e) {
                console.log("Autoplay failed, likely due to browser policy:", e);
            });
        }

        // Text Slider Logic
        var $contents = $hero.find('.ih1-content');
        var currentIndex = 0;
        var totalContents = $contents.length;

        if (totalContents > 1) {
            setInterval(function () {
                var previousIndex = currentIndex;
                currentIndex = (currentIndex + 1) % totalContents;

                $contents.eq(previousIndex).removeClass('active');
                $contents.eq(currentIndex).addClass('active');
            }, 3000);
        }
    });
});
