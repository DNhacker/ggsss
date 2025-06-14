document.addEventListener('DOMContentLoaded', function() {
    // --- Menu JS ---
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector("nav");
    const sections = document.querySelectorAll("section");

    // Scroll Reveal
    function revealOnScroll() {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                section.classList.add("show");
            } else {
                section.classList.remove("show");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // Mobile Menu Toggle
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");
            // Toggle icon
            menuToggle.innerHTML = navMenu.classList.contains("active") ? "✖" : "☰";
        });

        // Close menu when clicking outside
        document.addEventListener("click", function (event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.innerHTML = "☰";
            }
        });

        // Reset menu icon on desktop resize
        window.addEventListener("resize", () => {
            if (window.innerWidth > 1024) {
                navMenu.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.innerHTML = "☰";
            }
        });
    }
    // --- End Menu JS ---

    // ... your existing GSAP and animation code below ...
    // (No changes to your animation code)
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

    // Set up responsive path scaling
    const rx = window.innerWidth < 1000 ? window.innerWidth / 1200 : 1;
    const ry = window.innerHeight < 700 ? window.innerHeight / 1200 : 1;

    // Define the fish's motion path
    const path = [
        { x: 800, y: 200 },
        { x: 900, y: 20 },
        { x: 1100, y: 100 },
        { x: 1000, y: 200 },
        { x: 900, y: 20 },
        { x: 10, y: 500 },
        { x: 100, y: 300 },
        { x: 500, y: 400 },
        { x: 1000, y: 200 },
        { x: 1100, y: 300 },
        { x: 400, y: 400 },
        { x: 200, y: 250 },
        { x: 100, y: 300 },
        { x: 500, y: 450 },
        { x: 1100, y: 500 }
    ];

    // Scale path based on viewport size
    const scaledPath = path.map(({ x, y }) => {
        return {
            x: x * rx,
            y: y * ry
        }
    });

    // Select elements
    const fish = document.querySelector('.fish');
    const fishHeadAndBody = [
        ...document.querySelectorAll('.fish__head'),
        ...document.querySelectorAll('.fish__body')
    ];
    const lights = [...document.querySelectorAll('[data-lights]')];
    const rays = document.querySelector('[data-rays]');
    const structureCards = document.querySelectorAll('.structure-card');
    const processSteps = document.querySelectorAll('.process-step');
    const gradingScale = document.querySelector('.grading-scale');

    // Set up bubbles animation
    const bubbles = gsap.timeline();
    bubbles.set('.bubbles__bubble', {
        y: 100,
    });
    bubbles.to('.bubbles__bubble', {
        scale: 1.2,
        y: -300,
        opacity: 1,
        duration: 2,
        stagger: 0.2,
    });
    bubbles.to('.bubbles__bubble', {
        scale: 1,
        opacity: 0,
        duration: 1,
    }, '-=1');
    bubbles.pause();

    // Main fish animation timeline
    const tl = gsap.timeline({
        scrollTrigger: {
            scrub: 1.5,
        },
    });

    // Fish follows the motion path
    tl.to(fish, {
        motionPath: {
            path: scaledPath,
            align: 'self',
            alignOrigin: [0.5, 0.5],
            autoRotate: true
        },
        duration: 10,
        immediateRender: true,
    });

    // Hide scroll indicator
    tl.to('.indicator', {
        opacity: 0
    }, 0);

    // Fish rotations and depth changes
    tl.to(fish, {
        rotateX: 180
    }, 1);
    tl.to(fish, {
        rotateX: 0
    }, 2.5);
    tl.to(fish, {
        z: -500,
        duration: 2,
    }, 2.5);
    tl.to(fish, {
        rotateX: 180
    }, 4);
    tl.to(fish, {
        rotateX: 0
    }, 5.5);
    tl.to(fish, {
        z: -50,
        duration: 2,
    }, 5);
    tl.to(fish, {
        rotate: 0,
        duration: 1,
    }, '-=1');

    // Fish skeleton flash effect
    tl.to('.fish__skeleton', {
        opacity: 0.6,
        duration: 0.1,
        repeat: 4
    }, '-=3');

    // Fish head and body flash effect
    tl.to(fishHeadAndBody, {
        opacity: 0,
        duration: 0.1,
        repeat: 4
    }, '-=3');

    // Fish fade out at end
    tl.to('.fish__inner', {
        opacity: 0.1,
        duration: 1
    }, '-=1');
    tl.to('.fish__skeleton', {
        opacity: 0.1,
        duration: 1
    }, '-=1');

    // Play bubbles animation initially
    bubbles.play();
    tl.pause();

    // Lights animation
    const lightsTl = gsap.timeline({
        scrollTrigger: {
            scrub: 6
        }
    });
    lightsTl.from(lights[0], {
        x: window.innerWidth * -1,
        y: window.innerHeight,
        ease: 'power4.out',
        duration: 80
    }, 0);
    lightsTl.to(lights[0], {
        x: window.innerWidth,
        y: window.innerHeight * -1,
        ease: 'power4.out',
        duration: 80
    }, '-=5');

    // Function to trigger bubbles when entering sections
    const makeBubbles = (p, i) => {
        const { top, left } = fish.getBoundingClientRect();
        gsap.to(p, { opacity: 1, duration: 1 });
        gsap.set('.bubbles', {
            x: left,
            y: top
        });
        if (bubbles.paused) {
            bubbles.restart();
        }
        if (i > 6) {
            gsap.to('.bubbles', {
                opacity: 0
            });
        }
    };

    // Rotate fish based on scroll direction
    const rotateFish = (self) => {
        if (self.direction === -1) {
            gsap.to(fish, { rotationY: 180, duration: 0.4 });
        } else {
            gsap.to(fish, { rotationY: 0, duration: 0.4 });
        }
    };

    // Hide text when leaving sections
    const hideText = (p) => {
        gsap.to(p, { opacity: 0, duration: 1 });
    };

    // Animate exam content elements
    gsap.from("#exam-decoration1", {
        duration: 1.5,
        x: -200,
        y: -100,
        opacity: 0,
        ease: "power2.out"
    });

    gsap.from("#exam-decoration2", {
        duration: 1.5,
        x: 200,
        y: 100,
        opacity: 0,
        delay: 0.3,
        ease: "power2.out"
    });

    // Text animations
    gsap.from(".exam-main-title", {
        duration: 1,
        y: -30,
        opacity: 0,
        ease: "back.out(1.2)"
    });

    gsap.from(".exam-subtitle", {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.3,
        ease: "back.out(1.2)"
    });

    // Optional: Add scroll animation
    gsap.to(".exam-header", {
        scrollTrigger: {
            trigger: ".exam-header",
            start: "top top",
            scrub: true
        },
        backgroundPosition: "50% 100%"
    });
});