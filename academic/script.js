document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".image-section");

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.querySelector("nav");
    
  const dropdown = document.querySelector('.custom-dropdown');
  const selected = dropdown.querySelector('.dropdown-selected');
  const list = dropdown.querySelector('.dropdown-list');
  const options = list.querySelectorAll('li');
  const selectedText = dropdown.querySelector('.selected-text');
  const button = document.querySelector('.download-button');


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
    // Parallax zoom effect
gsap.to(".overview-section", {
  scale: 1.1,
  scrollTrigger: {
    trigger: ".overview-section",
    start: "top top",
    end: "bottom top",
    scrub: true
  }
});

// Text fade and rise
gsap.to("#textContent", {
  opacity: 1,
  y: 0,
  duration: 1.5,
  ease: "power2.out",
  scrollTrigger: {
    trigger: "#textContent",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});
// Animate subject cards on scroll
gsap.utils.toArray(".subject-card").forEach((card, i) => {
  gsap.to(card, {
    opacity: 1,
    y: 0,
    delay: i * 0.2,
    duration: 0.8,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });

  // Optional bounce rotate on icon
  const icon = card.querySelector("img");
  gsap.fromTo(icon, {
    rotation: -5
  }, {
    rotation: 5,
    duration: 1,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true
  });
});
// Animate calendar entries on scroll
// Academic Calendar Animations (added code)
gsap.from(".school-logo", {
  duration: 1.5,
  scale: 0,
  opacity: 0,
  ease: 'back.out(1.7)'
});

gsap.from(".school-name", {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 0.5,
  ease: 'power3.out'
});

gsap.from(".calendar-title", {
  duration: 1,
  y: 50,
  opacity: 0,
  delay: 0.8,
  ease: 'power3.out'
});

const scrollDownAnim = gsap.to(".scroll-down", {
  y: 10,
  duration: 1,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

document.querySelector(".scroll-down")?.addEventListener("click", () => {
  gsap.to(window, {
    duration: 1.5,
    scrollTo: ".container",
    ease: 'power2.inOut'
  });
});

gsap.from(".academic-year", {
  scrollTrigger: {
    trigger: ".academic-year",
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
});

gsap.utils.toArray(".month-card").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    x: i % 2 === 0 ? -100 : 100,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
  });
});

gsap.from(".footer-logo", {
  scrollTrigger: {
    trigger: ".footer",
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  y: 50,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
});

gsap.from(".footer-contact", {
  scrollTrigger: {
    trigger: ".footer",
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  y: 50,
  opacity: 0,
  duration: 1,
  delay: 0.3,
  ease: 'power3.out'
});

gsap.from(".social-icon", {
  scrollTrigger: {
    trigger: ".footer",
    start: 'top 80%',
    toggleActions: 'play none none none'
  },
  y: 50,
  opacity: 0,
  duration: 0.5,
  delay: 0.6,
  stagger: 0.1,
  ease: 'power3.out'
});

document.querySelectorAll(".month-card").forEach(card => {
  card.addEventListener("mouseenter", () => {
    gsap.to(card, {
      scale: 1.03,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  card.addEventListener("mouseleave", () => {
    gsap.to(card, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

ScrollTrigger.create({
  start: "top top",
  end: "max",
  onUpdate: (self) => {
    if (self.direction === -1 && self.scroll() < 100) {
      scrollDownAnim.restart();
      gsap.from(".school-logo", {
        duration: 1.5,
        scale: 0,
        opacity: 0,
        ease: 'back.out(1.7)'
      });
      gsap.from(".school-name", {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.5,
        ease: 'power3.out'
      });
      gsap.from(".calendar-title", {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.8,
        ease: 'power3.out'
      });
    }
  }
});

// Animate infographic items on scroll
gsap.utils.toArray(".infographic-item").forEach((item, i) => {
  gsap.to(item, {
    opacity: 1,
    y: 0,
    delay: i * 0.3,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});

// Chart fade-in with zoom-in effect
gsap.from("#evaluationChart", {
  opacity: 0,
  scale: 0.5,
  duration: 1.5,
  ease: "power3.out",
  scrollTrigger: {
    trigger: "#evaluationChart",
    start: "top 75%",
    toggleActions: "play none none reverse"
  }
});
// Animate the syllabus button hover effect
gsap.from(".download-button", {
  scale: 0.8,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: {
    trigger: ".download-button",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});
// Map subject value to file URL (update as needed)
  const syllabusFiles = {
    math: 'test.html',
    science: 'syllabus-science.pdf',
    english: 'syllabus-english.pdf',
    history: 'syllabus-history.pdf',
    computer: 'syllabus-computer-science.pdf'
  };

  // Dropdown open/close
  dropdown.addEventListener('click', function(e) {
    dropdown.classList.toggle('open');
  });

  // Keyboard accessibility
  dropdown.addEventListener('keydown', function(e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      dropdown.classList.toggle('open');
    }
    if (e.key === "Escape") {
      dropdown.classList.remove('open');
    }
  });

  options.forEach(option => {
    option.addEventListener('click', function(e) {
      e.stopPropagation();
      selectedText.textContent = option.textContent;
      dropdown.classList.remove('open');
      button.disabled = false;
      button.setAttribute('data-file', syllabusFiles[option.dataset.value]);
    });
  });

  // Download button logic
  button.addEventListener('click', function() {
    const file = button.getAttribute('data-file');
    if (file) {
      // Download logic: open file in new tab or trigger download
      window.open(file, '_blank');
      // Or, for forced download:
      // const link = document.createElement('a');
      // link.href = file;
      // link.download = file.split('/').pop();
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    }
  });

  // Close dropdown on clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });

// Animate sliding panel reveal effect
gsap.from(".download-panel::after", {
  width: 0,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".download-panel",
    start: "top 75%",
    toggleActions: "play none none reverse"
  }
});
// Animate topper cards with pop-up and sparkle-like entry
gsap.utils.toArray(".topper-card").forEach((card, i) => {
  gsap.to(card, {
    opacity: 1,
    scale: 1,
    duration: 1,
    delay: i * 0.2,
    ease: "back.out(1.7)",
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
      toggleActions: "play none none reverse"
    }
  });
});

// performance chart

const ctx = document.getElementById("performanceChart").getContext("2d");

const performanceChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
    datasets: [{
      label: "Average Score (%)",
      data: [68, 72, 75, 78, 84, 89],
      borderColor: "#cb9a59",
      backgroundColor: "rgba(203, 154, 89, 0.1)",
      fill: true,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 8
    }]
  },
  options: {
    responsive: true,
    animation: {
      duration: 2000,
      easing: "easeOutQuart"
    },
    plugins: {
      legend: {
        display: true,
        labels: {
          color: "#412812",
          font: {
            size: 14
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { color: "#2d2d2d" },
        grid: { display: false }
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#2d2d2d" },
        grid: { color: "#eaeaea" }
      }
    }
  }
});

// Optional parallax background scroll animation
gsap.to(".chart-bg img", {
  scale: 1.1,
  y: 20,
  duration: 2,
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".chart-container",
    start: "top 80%",
    scrub: true
  }
});
//timetable 
// ✅ Animate background image on scroll (parallax fade)
gsap.to(".timetable-bg img", {
  opacity: 0.1,
  scale: 1.05,
  ease: "power1.out",
  scrollTrigger: {
    trigger: ".timetable-section",
    start: "top bottom",
    scrub: true
  }
});

// ✅ Animate timetable rows on scroll for all visible sets
gsap.utils.toArray(".timetable-set").forEach(set => {
  gsap.utils.toArray(set.querySelectorAll(".timetable-row:not(.header)")).forEach((row, i) => {
    gsap.from(row, {
      x: -50,
      opacity: 0,
      duration: 1,
      delay: i * 0.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: row,
        start: "top 90%",
        toggleActions: "play none none reverse"
      }
    });
  });
});

// ✅ Filter logic for switching between Class 10 and Class 12
const buttons = document.querySelectorAll(".filter-btn");
const sets = document.querySelectorAll(".timetable-set");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const selectedClass = btn.getAttribute("data-class");

    // Toggle active button
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    // Show the selected timetable set, hide others
    sets.forEach(set => {
      if (set.getAttribute("data-class") === selectedClass) {
        set.classList.remove("hidden");

        // Animate rows for the visible set
        gsap.utils.toArray(set.querySelectorAll(".timetable-row:not(.header)")).forEach((row, i) => {
          gsap.fromTo(row,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.6,
              delay: i * 0.15,
              ease: "power2.out"
            }
          );
        });

      } else {
        set.classList.add("hidden");
      }
    });
  });
});
//policy
// Animate background image dimming on scroll
gsap.to(".policies-bg img", {
  opacity: 0.1,
  scale: 1.05,
  scrollTrigger: {
    trigger: ".policies-section",
    start: "top bottom",
    scrub: true
  }
});

// Animate each policy item (icon slide/flip + text fade)
gsap.utils.toArray(".policy-item").forEach((item, i) => {
  const icon = item.querySelector(".policy-icon");

  gsap.from(icon, {
    rotateY: 90,
    opacity: 0,
    duration: 0.6,
    delay: i * 0.2,
    scrollTrigger: {
      trigger: item,
      start: "top 90%",
      toggleActions: "play none none reverse"
    }
  });

  gsap.from(item.querySelector("p"), {
    x: 50,
    opacity: 0,
    duration: 0.8,
    delay: i * 0.2 + 0.1,
    scrollTrigger: {
      trigger: item,
      start: "top 90%",
      toggleActions: "play none none reverse"
    }
  });
});
//scholar-section
// Animate scholar cards on scroll (fade + slight glow)
gsap.utils.toArray(".scholar-card").forEach((card, i) => {
  gsap.from(card, {
    opacity: 0,
    scale: 0.9,
    boxShadow: "0 0 0 rgba(0,0,0,0)",
    duration: 1,
    delay: i * 0.2,
    scrollTrigger: {
      trigger: card,
      start: "top 90%",
      toggleActions: "play none none reverse"
    }
  });

  gsap.to(card.querySelector(".scholar-img"), {
    boxShadow: "0 0 30px rgba(255, 223, 0, 0.7)",
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: card,
      start: "top 80%",
      toggleActions: "play none none reverse"
    }
  });
});

// Optional: Auto scroll carousel horizontally every few seconds
let scrollAmount = 0;
const carousel = document.querySelector('.scholar-carousel');

setInterval(() => {
  if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth) {
    carousel.scrollLeft = 0;
  } else {
    carousel.scrollLeft += 250;
  }
}, 4000);

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





