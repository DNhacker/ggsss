document.addEventListener('DOMContentLoaded', () => {
    // --- DO NOT MODIFY: Mobile menu toggle ---
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    function toggleMenu() {
        navMenu.classList.toggle("active");
        menuToggle.innerHTML = navMenu.classList.contains("active") ? "✖" : "☰";
    }

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", toggleMenu);
        document.getElementById("closeMenu").addEventListener("click", toggleMenu);
    }

    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Header animation
    gsap.to('.contact-header', {
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });

    // Hero section animations
    gsap.to('.hero-title', {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        ease: 'back.out(1)'
    });

    gsap.to('.hero-subtitle', {
        y:0,
        opacity:1,
        duration:1,
        delay:0.6,
        ease:'back.out(1)'
    });

    // Form and info cards animation
    gsap.to('.form-container', {
        scrollTrigger: {
            trigger: '.contact-form-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1)'
    });

    gsap.to('.info-card', {
        scrollTrigger: {
            trigger: '.contact-form-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'back.out(1)'
    });

    // Map animation
    gsap.to('.map-container', {
        scrollTrigger: {
            trigger: '.map-section',
            start: 'top 70%',
            toggleActions: 'play none none none'
        },
        scale: 1,
        opacity: 1,
        duration: 0.8,
        ease: 'back.out(1)'
    });

    // Form input animations
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(input => {
        input.addEventListener('focus', function() {
            gsap.to(this.nextElementSibling.nextElementSibling, {
                width: '100%',
                duration: 0.3
            });
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                gsap.to(this.nextElementSibling.nextElementSibling, {
                    width: 0,
                    duration: 0.3
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;

            // Loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Simulate form submission
            setTimeout(() => {
                // Success animation
                gsap.to(submitBtn, {
                    backgroundColor: '#2ecc71',
                    duration: 0.3
                });

                submitBtn.textContent = 'Message Sent!';

                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    gsap.to(submitBtn, {
                        backgroundColor: '#2c5fa8',
                        duration: 0.3
                    });
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;

                    // Reset labels
                    document.querySelectorAll('.form-group label').forEach(label => {
                        if (!label.previousElementSibling.value) {
                            gsap.to(label, {
                                top: '1rem',
                                fontSize: '1rem',
                                color: '#999',
                                duration: 0.3
                            });
                        }
                    });
                }, 2000);
            }, 1500);
        });
    }

    // Floating animation for info cards
    gsap.to('.info-card', {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // --- Go to Top Button Functionality ---
    const goTopBtn = document.querySelector('.go-top-btn');
    if (goTopBtn) {
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

        function scrollToTop() {
            if ('scrollBehavior' in document.documentElement.style) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
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

        goTopBtn.addEventListener('click', function() {
            scrollToTop();
        });

        goTopBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            scrollToTop();
        });
    }
});