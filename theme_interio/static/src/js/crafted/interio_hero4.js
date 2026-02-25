$(document).ready(function () {
    $('.interio_hero4').each(function () {
        const $hero = $(this);
        if ($hero.data('hero4-init')) return;
        $hero.data('hero4-init', true);

        const data = [
            {
                place: 'Dining',
                title: 'SKYLINE',
                title2: 'PENTHOUSE',
                description: 'A luxurious modern penthouse overlooking the bustling streets of New York. Featuring floor-to-ceiling windows and a minimalist aesthetic that perfectly blends comfort and elite city living.',
                image: '/theme_interio/static/src/img/cc1.png'
            },
            {
                place: 'Kitchen',
                title: 'THE OAK',
                title2: 'RESIDENCE',
                description: 'A sophisticated London townhouse balancing classic architectural details with sleek, contemporary interior design. Rich wood textures and muted tones create a warm, inviting atmosphere.',
                image: '/theme_interio/static/src/img/cc2.png'
            },
            {
                place: 'Bedroom',
                title: 'LUMIÈRE',
                title2: 'LOFT',
                description: 'Sun-drenched spaces and elegant art-deco inspired furnishings define this Parisian loft. It is an ode to refined taste, featuring bespoke lighting and thoughtfully curated decor.',
                image: '/theme_interio/static/src/img/cc3.png'
            },
            {
                place: 'Living',
                title: 'ZEN GARDEN',
                title2: 'STUDIO',
                description: 'Minimalism at its finest. This Tokyo studio seamlessly integrates natural elements, featuring shoji-inspired screens and organic materials that promote tranquility and focus.',
                image: '/theme_interio/static/src/img/cc4.png'
            },
            {
                place: 'Sofas',
                title: 'VILLA',
                title2: 'LUSSO',
                description: 'A true masterpiece of Italian design. Villa Lusso showcases exquisite marble accents, avant-garde furniture pieces, and a bold color palette that exudes confidence and luxury.',
                image: '/theme_interio/static/src/img/cc5.png'
            },
            {
                place: 'Balcony',
                title: 'CANYON',
                title2: 'RETREAT',
                description: 'An open-concept architectural wonder nestled in the Hollywood Hills. Expansive indoor-outdoor living spaces blur the line between nature and home, perfect for entertaining.',
                image: '/theme_interio/static/src/img/cc6.png'
            },
        ];

        const demo = $hero.find('#demo')[0];
        const slideNumbers = $hero.find('#slide-numbers')[0];

        if (!demo || !slideNumbers) return;

        const cards = data.map((i, index) => `<div class="card" id="card${index}" style="background-image:url(${i.image})"></div>`).join('');
        const cardContents = data.map((i, index) => `<div class="card-content" id="card-content-${index}">
        <div class="content-start"></div>
        <div class="content-place">${i.place}</div>
        <div class="content-title-1">${i.title}</div>
        <div class="content-title-2">${i.title2}</div>
        </div>`).join('');
        const sildeNumbersHTML = data.map((_, index) => `<div class="item" id="slide-item-${index}">0${index + 1}</div>`).join('');

        demo.innerHTML = cards + cardContents;
        slideNumbers.innerHTML = sildeNumbersHTML;

        function _(selector) {
            return $hero.find(selector);
        }

        let order = [0, 1, 2, 3, 4, 5];
        let detailsEven = true;

        let offsetTop = 200;
        let offsetLeft = 700;
        let cardWidth = 200;
        let cardHeight = 300;
        let gap = 40;
        let numberSize = 40;
        const ease = "sine.inOut";

        function updateDimensions() {
            const w = $hero.width() || window.innerWidth;
            const h = $hero.height() || window.innerHeight;
            let isMobile = w < 768;
            let isTablet = w >= 768 && w < 1024;

            cardWidth = isMobile ? 130 : isTablet ? 160 : 200;
            cardHeight = isMobile ? 200 : isTablet ? 240 : 300;
            gap = isMobile ? 15 : isTablet ? 20 : 40;
            numberSize = 40;

            offsetTop = isMobile ? h - cardHeight - 80 : h - cardHeight - 130;

            if (isMobile) {
                offsetLeft = w - cardWidth - 20;
            } else if (isTablet) {
                offsetLeft = w - (cardWidth * 2) - gap;
            } else {
                offsetLeft = Math.max(w * 0.45, 600);
            }
        }

        function getCard(index) { return $hero.find(`#card${index}`); }
        function getCardContent(index) { return $hero.find(`#card-content-${index}`); }
        function getSliderItem(index) { return $hero.find(`#slide-item-${index}`); }

        function animate(target, duration, properties) {
            return new Promise((resolve) => {
                gsap.to(target, {
                    ...properties,
                    duration: duration,
                    onComplete: resolve,
                });
            });
        }

        function init() {
            const [active, ...rest] = order;
            const detailsActive = detailsEven ? _("#details-even") : _("#details-odd");
            const detailsInactive = detailsEven ? _("#details-odd") : _("#details-even");

            updateDimensions();
            const width = $hero.width() || window.innerWidth;
            const height = $hero.height() || window.innerHeight;

            gsap.set(_("#pagination"), {
                top: height - ($hero.width() < 768 ? 60 : 100),
                left: $hero.width() < 768 ? 20 : 60,
                y: 200,
                opacity: 0,
                zIndex: 60,
            });

            gsap.set(getCard(active), {
                x: 0,
                y: 0,
                width: width,
                height: height,
            });
            gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
            gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
            gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
            gsap.set(detailsInactive.find(".text"), { y: 100 });
            gsap.set(detailsInactive.find(".title-1"), { y: 100 });
            gsap.set(detailsInactive.find(".title-2"), { y: 100 });
            gsap.set(detailsInactive.find(".desc"), { y: 50 });
            gsap.set(detailsInactive.find(".cta"), { y: 60 });

            gsap.set(_(".progress-sub-foreground"), {
                width: 500 * (1 / order.length) * (active + 1),
            });

            rest.forEach((i, index) => {
                gsap.set(getCard(i), {
                    x: offsetLeft + 400 + index * (cardWidth + gap),
                    y: offsetTop,
                    width: cardWidth,
                    height: cardHeight,
                    zIndex: 30,
                    borderRadius: 10,
                });
                gsap.set(getCardContent(i), {
                    x: offsetLeft + 400 + index * (cardWidth + gap),
                    zIndex: 40,
                    y: offsetTop + cardHeight - 100,
                });
                gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
            });

            gsap.set(_(".indicator"), { x: -width });

            const startDelay = 0.6;

            gsap.to(_(".cover"), {
                x: width + 400,
                delay: 0.5,
                ease,
                onComplete: () => {
                    setTimeout(() => {
                        loop();
                    }, 500);
                },
            });
            rest.forEach((i, index) => {
                gsap.to(getCard(i), {
                    x: offsetLeft + index * (cardWidth + gap),
                    zIndex: 30,
                    delay: startDelay + 0.05 * index,
                    ease
                });
                gsap.to(getCardContent(i), {
                    x: offsetLeft + index * (cardWidth + gap),
                    zIndex: 40,
                    delay: startDelay + 0.05 * index,
                    ease
                });
            });
            gsap.to(_("#pagination"), { y: 0, opacity: 1, ease, delay: startDelay });
            gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
        }

        let clicks = 0;
        let isLooping = true;

        function step() {
            return new Promise((resolve) => {
                order.push(order.shift());
                detailsEven = !detailsEven;

                const detailsActive = detailsEven ? _("#details-even") : _("#details-odd");
                const detailsInactive = detailsEven ? _("#details-odd") : _("#details-even");

                detailsActive.find('.place-box .text').text(data[order[0]].place);
                detailsActive.find('.title-1').text(data[order[0]].title);
                detailsActive.find('.title-2').text(data[order[0]].title2);
                detailsActive.find('.desc').text(data[order[0]].description);

                gsap.set(detailsActive, { zIndex: 22 });
                gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
                gsap.to(detailsActive.find('.text'), { y: 0, delay: 0.1, duration: 0.7, ease });
                gsap.to(detailsActive.find('.title-1'), { y: 0, delay: 0.15, duration: 0.7, ease });
                gsap.to(detailsActive.find('.title-2'), { y: 0, delay: 0.15, duration: 0.7, ease });
                gsap.to(detailsActive.find('.desc'), { y: 0, delay: 0.3, duration: 0.4, ease });
                gsap.to(detailsActive.find('.cta'), { y: 0, delay: 0.35, duration: 0.4, onComplete: resolve, ease });

                gsap.set(detailsInactive, { zIndex: 12 });

                const [active, ...rest] = order;
                const prv = rest[rest.length - 1];

                gsap.set(getCard(prv), { zIndex: 10 });
                gsap.set(getCard(active), { zIndex: 20 });
                gsap.to(getCard(prv), { scale: 1.5, ease });

                gsap.to(getCardContent(active), {
                    y: offsetTop + cardHeight - 10,
                    opacity: 0,
                    duration: 0.3,
                    ease,
                });
                gsap.to(getSliderItem(active), { x: 0, ease });
                gsap.to(getSliderItem(prv), { x: -numberSize, ease });
                gsap.to(_(".progress-sub-foreground"), {
                    width: 500 * (1 / order.length) * (active + 1),
                    ease,
                });

                const width = $hero.width() || window.innerWidth;
                const height = $hero.height() || window.innerHeight;

                gsap.to(getCard(active), {
                    x: 0,
                    y: 0,
                    ease,
                    width: width,
                    height: height,
                    borderRadius: 0,
                    onComplete: () => {
                        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
                        gsap.set(getCard(prv), {
                            x: xNew,
                            y: offsetTop,
                            width: cardWidth,
                            height: cardHeight,
                            zIndex: 30,
                            borderRadius: 10,
                            scale: 1,
                        });

                        gsap.set(getCardContent(prv), {
                            x: xNew,
                            y: offsetTop + cardHeight - 100,
                            opacity: 1,
                            zIndex: 40,
                        });
                        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

                        gsap.set(detailsInactive, { opacity: 0 });
                        gsap.set(detailsInactive.find(".text"), { y: 100 });
                        gsap.set(detailsInactive.find(".title-1"), { y: 100 });
                        gsap.set(detailsInactive.find(".title-2"), { y: 100 });
                        gsap.set(detailsInactive.find(".desc"), { y: 50 });
                        gsap.set(detailsInactive.find(".cta"), { y: 60 });
                        clicks -= 1;
                        if (clicks > 0) {
                            step();
                        }
                    },
                });

                rest.forEach((i, index) => {
                    if (i !== prv) {
                        const xNew = offsetLeft + index * (cardWidth + gap);
                        gsap.set(getCard(i), { zIndex: 30 });
                        gsap.to(getCard(i), {
                            x: xNew,
                            y: offsetTop,
                            width: cardWidth,
                            height: cardHeight,
                            ease,
                            delay: 0.1 * (index + 1),
                        });

                        gsap.to(getCardContent(i), {
                            x: xNew,
                            y: offsetTop + cardHeight - 100,
                            opacity: 1,
                            zIndex: 40,
                            ease,
                            delay: 0.1 * (index + 1),
                        });
                        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
                    }
                });
            });
        }

        async function loop() {
            if (!isLooping) return;
            const width = $hero.width() || window.innerWidth;
            await animate(_(".indicator"), 2, { x: 0 });
            await animate(_(".indicator"), 0.8, { x: width, delay: 0.3 });
            gsap.set(_(".indicator"), { x: -width });
            await step();
            loop();
        }

        async function loadImage(src) {
            return new Promise((resolve, reject) => {
                let img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = src;
            });
        }

        async function loadImages() {
            const promises = data.map(({ image }) => loadImage(image));
            return Promise.all(promises);
        }

        async function start() {
            try {
                if (typeof gsap === 'undefined') {
                    console.log('GSAP not loaded, loading dynamically...');
                    $.getScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js", async function () {
                        if ($hero.closest('.o_editable').length) {
                            isLooping = false;
                        }
                        await loadImages();
                        init();
                    });
                    return;
                }
                if ($hero.closest('.o_editable').length) {
                    isLooping = false; // Do not loop in editor to avoid chaos
                }
                await loadImages();
                init();
            } catch (error) {
                console.error("One or more images failed to load", error);
            }
        }

        start();

        $(window).on('resize.hero4', function () {
            updateDimensions();
        });

        // Arrow controls (Optional codepen additions)
        _('.arrow-left').on('click', function () {
            // In codepen it doesn't seem to hook up previous logic easily based on `order.push` and `shift`. 
            // It just has `step()` built as forward. The user didn't ask to fix backward, just applied the design.
        });
        _('.arrow-right').on('click', function () {
            clicks++;
            if (clicks === 1) {
                step();
            }
        });
    });
});
