document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.slider-button.next');
    const prevButton = document.querySelector('.slider-button.prev');
    const dotsNav = document.querySelector('.slider-nav');
    const dots = Array.from(dotsNav.children);

    if (slides.length === 0) return;

    let slideWidth = slides[0].getBoundingClientRect().width;
    let currentSlide = 0;

    window.addEventListener('resize', () => {
        slideWidth = slides[0].getBoundingClientRect().width;
        gsap.set(track, { x: -slideWidth * currentSlide });
    });

    const moveToSlide = (targetSlide) => {
        gsap.to(track, {
            duration: 0.6,
            x: -slideWidth * targetSlide,
            ease: "power2.inOut"
        });
        currentSlide = targetSlide;
        updateDots(targetSlide);
        updateNavButtons(targetSlide);
    };

    const updateDots = (targetIndex) => {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[targetIndex].classList.add('active');
    };

    const updateNavButtons = (targetIndex) => {
        prevButton.classList.toggle('hidden', targetIndex === 0);
        nextButton.classList.toggle('hidden', targetIndex === slides.length - 1);
    };

    nextButton.addEventListener('click', () => {
        if (currentSlide < slides.length - 1) moveToSlide(currentSlide + 1);
    });

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) moveToSlide(currentSlide - 1);
    });

    dotsNav.addEventListener('click', (e) => {
        const targetDot = e.target.closest('button.slider-dot');
        if (!targetDot) return;
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        moveToSlide(targetIndex);
    });

    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    const handleSwipe = () => {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            if (currentSlide < slides.length - 1) moveToSlide(currentSlide + 1);
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            if (currentSlide > 0) moveToSlide(currentSlide - 1);
        }
    };

    gsap.fromTo('.site-container', {opacity: 0}, {duration: 1, opacity: 1});
    gsap.fromTo('.splash-slide h3', {y: 20, opacity: 0}, {y: 0, opacity: 1, duration: 1, delay: 0.5});

    updateNavButtons(0);

    // Interactive Background Animation
    const body = document.body;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100 + '%';
            const y = (e.clientY / window.innerHeight) * 100 + '%';

            gsap.to(body, {
                '--mouse-x': x,
                '--mouse-y': y,
                duration: 1.2,
                ease: "power2.out"
            });
        });
    }

    window.addEventListener('mousedown', () => {
        gsap.to(body, {
            '--grad-size': '110%',
            duration: 0.2,
            ease: "power2.out",
            onComplete: () => {
                gsap.to(body, {
                    '--grad-size': '80%',
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        });
    });
});
