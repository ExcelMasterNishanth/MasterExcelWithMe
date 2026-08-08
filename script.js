/* ==========================================================
   MASTER EXCEL WITH ME
   script.js - Optimized Production Build
========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================================
       DOM ELEMENTS
    ========================================================== */
    const body = document.body;
    const loader = document.querySelector(".loader");
    const progressBar = document.querySelector(".scroll-progress");
    const navbar = document.querySelector(".navbar");
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const themeToggle = document.getElementById("themeToggle");
    const navItems = document.querySelectorAll(".nav-links a");
    const topBtn = document.getElementById("topBtn");
    const heroImage = document.querySelector(".hero-right img");
    const floatingCards = document.querySelectorAll(".floating-card");
    const sections = document.querySelectorAll("section[id]");

    /* ==========================================================
       PAGE LOADER & ENTRANCE
    ========================================================== */
    window.addEventListener("load", () => {
        if (loader) {
            setTimeout(() => {
                loader.classList.add("hidden");
            }, 600);
        }
        body.classList.add("loaded");
    });

    /* ==========================================================
       SCROLL & NAVBAR MANAGEMENT (THROTTLED)
    ========================================================== */
    function updateProgressBar() {
        if (!progressBar) return;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - window.innerHeight;
        const progress = height > 0 ? (scrollTop / height) * 100 : 0;
        progressBar.style.width = `${progress}%`;
    }

    function navbarShadow() {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    }

    function activateMenu() {
        const scrollY = window.scrollY;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute("id");
            const link = document.querySelector(`.nav-links a[href="#${id}"]`);

            if (!link) return;

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        if (topBtn) {
            topBtn.style.display = window.scrollY > 500 ? "flex" : "none";
        }
    }

    // Single Throttled Scroll Listener
    let isScrolling = false;
    window.addEventListener("scroll", () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateProgressBar();
                navbarShadow();
                activateMenu();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    /* ==========================================================
       MOBILE MENU & NAVIGATION
    ========================================================== */
    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navLinks.classList.toggle("active");
        });
    }

    navItems.forEach(link => {
        link.addEventListener("click", () => {
            hamburger?.classList.remove("active");
            navLinks?.classList.remove("active");
        });
    });

    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            hamburger?.classList.remove("active");
            navLinks?.classList.remove("active");
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            hamburger?.classList.remove("active");
            navLinks?.classList.remove("active");
        }
    });

    /* ==========================================================
       SMOOTH SCROLLING & PREVENT EMPTY LINKS
    ========================================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetAttr = this.getAttribute("href");
            if (targetAttr === "#") {
                e.preventDefault();
                return;
            }
            const target = document.querySelector(targetAttr);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    /* ==========================================================
       DARK MODE
    ========================================================== */
    function enableDarkMode() {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    function disableDarkMode() {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    if (localStorage.getItem("theme") === "dark") {
        enableDarkMode();
    }

    themeToggle?.addEventListener("click", () => {
        body.classList.contains("dark-mode") ? disableDarkMode() : enableDarkMode();
    });

    /* ==========================================================
       REVEAL ANIMATIONS
    ========================================================== */
    const revealElements = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right");
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

    /* ==========================================================
       COUNTER ANIMATION
    ========================================================== */
    const counters = document.querySelectorAll("[data-counter]");
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const counter = entry.target;
            const target = Number(counter.dataset.counter);
            let current = 0;
            const increment = Math.ceil(target / 80);

            function updateCounter() {
                current += increment;
                if (current >= target) {
                    counter.textContent = target;
                } else {
                    counter.textContent = current;
                    requestAnimationFrame(updateCounter);
                }
            }

            updateCounter();
            observer.unobserve(counter);
        });
    });

    counters.forEach(counter => counterObserver.observe(counter));

    /* ==========================================================
       ACCORDION
    ========================================================== */
    const accordionHeaders = document.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;
            const content = item.querySelector(".accordion-content");
            const isOpened = content.style.maxHeight;

            document.querySelectorAll(".accordion-content").forEach(panel => {
                panel.style.maxHeight = null;
            });

            document.querySelectorAll(".accordion-header span").forEach(icon => {
                icon.textContent = "+";
            });

            if (!isOpened) {
                content.style.maxHeight = content.scrollHeight + "px";
                const icon = header.querySelector("span");
                if (icon) icon.textContent = "−";
            }
        });
    });

    /* ==========================================================
       BUTTON RIPPLE EFFECT
    ========================================================== */
    document.querySelectorAll(".btn").forEach(button => {
        button.addEventListener("click", function (e) {
            const circle = document.createElement("span");
            const diameter = Math.max(this.clientWidth, this.clientHeight);
            const radius = diameter / 2;

            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - this.getBoundingClientRect().left - radius}px`;
            circle.style.top = `${e.clientY - this.getBoundingClientRect().top - radius}px`;
            circle.classList.add("ripple");

            const existingRipple = this.querySelector(".ripple");
            if (existingRipple) existingRipple.remove();

            this.appendChild(circle);
        });
    });

    /* ==========================================================
       TESTIMONIAL AUTO SLIDER
    ========================================================== */
    const testimonials = document.querySelectorAll(".testimonial-card");
    let currentSlide = 0;

    function showTestimonial(index) {
        testimonials.forEach((card, i) => {
            if (i === index) {
                card.style.opacity = "1";
                card.style.transform = "scale(1)";
                card.style.display = "block";
            } else {
                card.style.opacity = "0";
                card.style.transform = "scale(0.95)";
                card.style.display = "none";
            }
        });
    }

    if (testimonials.length > 0) {
        showTestimonial(currentSlide);
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonials.length;
            showTestimonial(currentSlide);
        }, 4000);
    }

    /* ==========================================================
       BACK TO TOP BUTTON
    ========================================================== */
    topBtn?.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    /* ==========================================================
       HERO & FLOATING CARDS PARALLAX (COMBINED)
    ========================================================== */
    window.addEventListener("mousemove", e => {
        const mouseX = (window.innerWidth / 2 - e.clientX);
        const mouseY = (window.innerHeight / 2 - e.clientY);

        if (heroImage) {
            heroImage.style.transform = `translate(${mouseX / 45}px, ${mouseY / 45}px)`;
        }

        floatingCards.forEach(card => {
            card.style.transform = `translate(${mouseX / 70}px, ${mouseY / 70}px)`;
        });
    });

    /* ==========================================================
       NEWSLETTER SUBSCRIPTION (GOOGLE APPS SCRIPT)
    ========================================================== */
    const newsletterForm = document.getElementById("newsletterForm");

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            const emailInput = document.getElementById("subscriberEmail");
            const message = document.getElementById("subscribeMessage");
            const button = newsletterForm.querySelector("button");

            if (!emailInput || !emailInput.value.trim()) return;

            button.disabled = true;
            button.textContent = "Submitting...";

            const formData = new URLSearchParams();
            formData.append("email", emailInput.value.trim());

            try {
                await fetch(
                    "https://script.google.com/macros/s/AKfycbyOksXKmYNaSyE-m6RSM17Hjl1OMAQOnYGXrO4IniTA15o52egAwADQeetFPKXxKTGm/exec",
                    {
                        method: "POST",
                        body: formData,
                        mode: "no-cors"
                    }
                );

                if (message) {
                    message.textContent = "✓ Thanks for subscribing!";
                    message.style.marginTop = "15px";
                }
                newsletterForm.reset();
            } catch (error) {
                if (message) {
                    message.textContent = "Something went wrong. Please try again.";
                }
                console.error("Subscription Error:", error);
            } finally {
                button.disabled = false;
                button.textContent = "Subscribe";
            }
        });
    }

    /* ==========================================================
       ACCESSIBILITY ENHANCEMENTS
    ========================================================== */
    document.querySelectorAll("button").forEach(button => {
        if (!button.getAttribute("aria-label")) {
            button.setAttribute("aria-label", button.textContent.trim() || "Button");
        }
    });

    document.querySelectorAll("img").forEach(img => {
        if (!img.hasAttribute("loading")) {
            img.setAttribute("loading", "lazy");
        }
    });

    // Initial Trigger on Load
    updateProgressBar();
    navbarShadow();
    activateMenu();

    console.log("%c🚀 Master Excel With Me - Production Ready", "color:#0078D4;font-size:16px;font-weight:bold;");
});
document.querySelector(".newsletter-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = this.querySelector("input").value;

    alert("Thanks for subscribing! 🎉");

    this.reset();
});