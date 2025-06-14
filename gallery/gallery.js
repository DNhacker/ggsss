document.addEventListener("DOMContentLoaded", function () {
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
 // images-section-nav buttons
const navButtons = document.querySelectorAll('.images-section-nav button');
const sections = document.querySelectorAll('[id$="-section"]'); // Get all sections with IDs ending in "-section"

// Add click event to each button
navButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            // Scroll to the section smoothly
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --- GSAP ScrollTrigger Horizontal Scroll ---
if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
    gsap.registerPlugin(ScrollTrigger);

    function initHorizontalScroll(sectionId, direction = 'left') {
        const section = document.getElementById(sectionId);
        if (!section) return;

        const track = section.querySelector(".showcase-track");
        const cards = track ? track.querySelectorAll(".showcase-card") : [];
        const navButton = document.querySelector(`.images-section-nav button[data-target="${sectionId}"]`);

        if (!track || cards.length === 0) return;

        const scrollLength = (cards.length - 1) * window.innerWidth;
        
        // Set initial position based on direction
        if (direction === 'right') {
            gsap.set(track, { x: `-${scrollLength}` });
        }

        const animation = gsap.to(track, {
            x: direction === 'left' ? `-${scrollLength}` : 0,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${scrollLength * 1.5}`,
                scrub: 1.5,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                markers: false,
                onEnter: () => {
                    // Add active class to corresponding nav button
                    navButtons.forEach(btn => btn.classList.remove('active'));
                    if (navButton) navButton.classList.add('active');
                },
                onEnterBack: () => {
                    // Add active class to corresponding nav button
                    navButtons.forEach(btn => btn.classList.remove('active'));
                    if (navButton) navButton.classList.add('active');
                },
                onLeave: () => {
                    // Remove active class when leaving section
                    if (navButton) navButton.classList.remove('active');
                },
                onLeaveBack: () => {
                    // Remove active class when leaving section
                    if (navButton) navButton.classList.remove('active');
                }
            }
        });
    }

    // List of all horizontal scroll sections with their directions
    const horizontalSections = [
        { id: "school-section", direction: "left" },
        { id: "function-section", direction: "right" },
        { id: "memory-section", direction: "left" },
        { id: "playtime-section", direction: "right" }
    ];

    horizontalSections.forEach(section => {
        initHorizontalScroll(section.id, section.direction);
    });

    // Add IntersectionObserver for non-GSAP sections or fallback
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const sectionId = entry.target.id;
            const navButton = document.querySelector(`.images-section-nav button[data-target="${sectionId}"]`);
            
            if (entry.isIntersecting) {
                navButtons.forEach(btn => btn.classList.remove('active'));
                if (navButton) navButton.classList.add('active');
            }
        });
    }, { threshold: 0.5 });

    // Observe all sections
    sections.forEach(section => {
        observer.observe(section);
    });

    ScrollTrigger.refresh();
}
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
