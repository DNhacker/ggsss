document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".image-section");

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector("nav");

    const teacherInputs = document.querySelectorAll('.teacher-input');

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

    // Auto Slide Teachers every 10 seconds
    let currentIndex = 0;
    const totalTeachers = teacherInputs.length;

    setInterval(() => {
        // Uncheck all inputs
        teacherInputs.forEach(input => input.checked = false);

        // Check the next one
        teacherInputs[currentIndex].checked = true;

        // Move to next index
        currentIndex = (currentIndex + 1) % totalTeachers;
    }, 10000);

    // Horizontal Scroll Effect (GSAP)
    gsap.registerPlugin(ScrollTrigger);

    const track = document.querySelector(".achievements-track");
    const cards = gsap.utils.toArray(".achievement-card");

    gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: "#achievements-section-wrapper",
            start: "top top",
            end: () => "+=" + track.scrollWidth,
            scrub: 1,
            pin: true,
            anticipatePin: 1
        }
    });

    // Facility Section Pinning
    gsap.registerPlugin(ScrollTrigger);

    // === Pin the Hero Section ===
    ScrollTrigger.create({
        trigger: ".facilities.hero",
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: false
    });

    // === Animate Overlay Sections (Sections 2 to 6) ===
    document.querySelectorAll(".facilities-overlay-wrapper").forEach(wrapper => {
        const overlay = wrapper.querySelector(".facilities-overlay");

        gsap.to(overlay, {
            yPercent: -100,
            ease: "none",
            scrollTrigger: {
                trigger: wrapper,
                start: "top top",
                end: "+=200%",
                scrub: 1,
                pin: true
            }
        });
    });

    // Go to Top Button Functionality
    const goTopBtn = document.querySelector('.go-top-btn');

    // Show/hide button based on scroll position with throttle
    let isScrolling;
    window.addEventListener('scroll', function() {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            if (window.pageYOffset > 300) {
                goTopBtn.classList.add('visible');
            } else {
                goTopBtn.classList.remove('visible');
            }
        }, 100);
    });

    // Smooth scroll to top with multiple methods for compatibility
    goTopBtn.addEventListener('click', function() {
        scrollToTop();
    });

    // Touch support for mobile devices
    goTopBtn.addEventListener('touchend', function(e) {
        e.preventDefault();
        scrollToTop();
    });

    function scrollToTop() {
        // Try native smooth scroll first
        if ('scrollBehavior' in document.documentElement.style) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } 
        // Fallback for older browsers
        else {
            const scrollDuration = 500;
            const scrollStep = -window.scrollY / (scrollDuration / 15);
            const scrollInterval = setInterval(function() {
                if (window.scrollY !== 0) {
                    window.scrollBy(0, scrollStep);
                } else {
                    clearInterval(scrollInterval);
                }
            }, 15);
        }
    }
});
