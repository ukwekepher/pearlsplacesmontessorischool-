
/* ==========================================================
   PEARLS PLACES MONTESSORI SCHOOL
   PREMIUM WEBSITE JAVASCRIPT
   ========================================================== */


/* ==========================================================
   1. WEBSITE CONFIGURATION
   ========================================================== */

// Enter the school's WhatsApp number.
// International format, without + or spaces.
// Example: 2348012345678

const SCHOOL_WHATSAPP_NUMBER = "2348064169711";


/* ==========================================================
   2. MAIN WEBSITE INITIALIZATION
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /* ======================================================
       3. MOBILE NAVIGATION
       ====================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        function closeMenu() {

            navLinks.classList.remove("open");

            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }

        function openMenu() {

            navLinks.classList.add("open");

            menuToggle.setAttribute("aria-expanded", "true");
            menuToggle.setAttribute(
                "aria-label",
                "Close navigation"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-xmark"></i>';
        }

        menuToggle.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen =
                navLinks.classList.contains("open");

            isOpen ? closeMenu() : openMenu();

        });

        // Close menu after clicking a link.

        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", closeMenu);

        });

        // Close when clicking outside the navigation.

        document.addEventListener("click", function (event) {

            if (
                navLinks.classList.contains("open") &&
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }

        });

        // Close with Escape.

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        });

        // Close mobile menu when returning to desktop.

        window.addEventListener("resize", function () {

            if (window.innerWidth > 900) {
                closeMenu();
            }

        });

    }


    /* ======================================================
       4. BACK TO TOP BUTTON
       ====================================================== */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {

        function updateBackToTop() {

            const scrollable =
                document.documentElement.scrollHeight -
                window.innerHeight;

            const progress = scrollable > 0
                ? window.scrollY / scrollable
                : 0;

            backToTop.classList.toggle(
                "visible",
                progress >= 0.35
            );

        }

        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );

        window.addEventListener(
            "resize",
            updateBackToTop
        );

        updateBackToTop();

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth"
            });

        });

    }


    /* ======================================================
       5. FLOATING WHATSAPP BUTTON
       ====================================================== */

    const whatsappFloat =
        document.getElementById("whatsappFloat");

    if (whatsappFloat) {

        const phone = SCHOOL_WHATSAPP_NUMBER.trim();

        if (/^\d{10,15}$/.test(phone)) {

            const message = encodeURIComponent(
                "Hello Pearls Places Montessori School. " +
                "I would like to make an enquiry about your school."
            );

            whatsappFloat.href =
                `https://wa.me/${phone}?text=${message}`;

            whatsappFloat.target = "_blank";
            whatsappFloat.rel = "noopener noreferrer";

            whatsappFloat.style.display = "flex";

        } else {

            whatsappFloat.href = "#contact";

            whatsappFloat.title =
                "Contact the school to make an enquiry.";

        }

    }


    /* ======================================================
       6. COPY SCHOOL ACCOUNT NUMBER
       ====================================================== */

    const copyAccount =
        document.getElementById("copyAccount");

    if (copyAccount) {

        copyAccount.addEventListener("click", async function () {

            const accountElement =
                document.getElementById("accountNumber");

            const accountNumber =
                accountElement?.textContent.trim();

            if (!accountNumber) {

                alert("Account number not found.");

                return;
            }

            try {

                if (!navigator.clipboard?.writeText) {
                    throw new Error("Clipboard unavailable.");
                }

                await navigator.clipboard.writeText(accountNumber);

                copyAccount.innerHTML =
                    '<i class="fa-solid fa-check"></i> Copied';

                copyAccount.classList.add("copied");

            } catch (error) {

                console.error("Clipboard error:", error);

                window.prompt(
                    "Copy the account number below:",
                    accountNumber
                );

            }

            window.setTimeout(function () {

                copyAccount.innerHTML =
                    '<i class="fa-regular fa-copy"></i> Copy';

                copyAccount.classList.remove("copied");

            }, 2500);

        });

    }


    /* ======================================================
       7. ROCK PAPER SCISSORS GAME
       ====================================================== */

    let playerScore = 0;
    let computerScore = 0;
    let rounds = 0;

    const scoreEls = {

        player: document.getElementById("playerScore"),

        computer: document.getElementById("computerScore"),

        rounds: document.getElementById("roundCount"),

        result: document.getElementById("gameResult")

    };

    const gameCard = document.querySelector(".game-card");
    const gameCelebration = document.getElementById("gameCelebration");

    const icons = {

        rock: "✊",

        paper: "✋",

        scissors: "✌️"

    };

    const choices = [
        "rock",
        "paper",
        "scissors"
    ];

    function updateGameScores() {

        if (scoreEls.player) {
            scoreEls.player.textContent = playerScore;
        }

        if (scoreEls.computer) {
            scoreEls.computer.textContent = computerScore;
        }

        if (scoreEls.rounds) {
            scoreEls.rounds.textContent = rounds;
        }

    }

    function clearGameCelebration() {

        if (gameCard) {
            gameCard.classList.remove("celebrating");
        }

        if (gameCelebration) {
            gameCelebration.replaceChildren();
        }

    }

    function celebrateGameWin() {

        if (!gameCard || !gameCelebration || prefersReducedMotion) return;

        const colors = ["#d6a844", "#6c32a0", "#f06b8d", "#55b8a5", "#f2c94c"];
        const effects = document.createDocumentFragment();

        for (let i = 0; i < 32; i++) {
            const particle = document.createElement("span");
            const angle = Math.random() * Math.PI * 2;
            const distance = 90 + Math.random() * 190;

            particle.className = "game-confetti";
            particle.style.setProperty(
                "--confetti-x",
                Math.cos(angle) * distance + "px"
            );
            particle.style.setProperty(
                "--confetti-y",
                Math.sin(angle) * distance - 70 + "px"
            );
            particle.style.setProperty(
                "--confetti-turn",
                Math.round(Math.random() * 720 - 360) + "deg"
            );
            particle.style.setProperty(
                "--confetti-color",
                colors[i % colors.length]
            );
            particle.style.setProperty(
                "--confetti-delay",
                Math.random() * 0.2 + "s"
            );

            effects.appendChild(particle);
        }

        for (let i = 0; i < 5; i++) {
            const balloon = document.createElement("span");

            balloon.className = "game-balloon";
            balloon.style.setProperty("--balloon-left", (7 + i * 20) + "%");
            balloon.style.setProperty(
                "--balloon-color",
                colors[(i + 1) % colors.length]
            );
            balloon.style.setProperty("--balloon-delay", (i * 0.12) + "s");
            balloon.style.setProperty(
                "--balloon-drift",
                (Math.random() * 80 - 40) + "px"
            );

            effects.appendChild(balloon);
        }

        gameCelebration.replaceChildren(effects);
        gameCard.classList.add("celebrating");
    }

    function playGame(player) {

        if (!choices.includes(player)) return;

        clearGameCelebration();

        const computer =
            choices[Math.floor(Math.random() * choices.length)];

        rounds++;

        let message = "";

        if (player === computer) {

            message =
                `You chose ${icons[player]} and the computer chose ${icons[computer]}. It's a draw!`;

        } else if (

            (player === "rock" && computer === "scissors") ||

            (player === "paper" && computer === "rock") ||

            (player === "scissors" && computer === "paper")

        ) {

            playerScore++;
            celebrateGameWin();

            message =
                `You chose ${icons[player]} and the computer chose ${icons[computer]}. You win this round!`;

        } else {

            computerScore++;

            message =
                `You chose ${icons[player]} and the computer chose ${icons[computer]}. Computer wins this round. Try again!`;

        }

        updateGameScores();

        if (scoreEls.result) {
            scoreEls.result.textContent = message;
        }

    }

    document.querySelectorAll(".game-choice").forEach(function (button) {

        button.addEventListener("click", function () {

            playGame(button.dataset.choice);

        });

    });


    /* RESET GAME */

    const resetGame =
        document.getElementById("resetGame");

    if (resetGame) {

        resetGame.addEventListener("click", function () {

            clearGameCelebration();

            playerScore = 0;
            computerScore = 0;
            rounds = 0;

            updateGameScores();

            if (scoreEls.result) {

                scoreEls.result.textContent =
                    "Choose a hand to start playing.";

            }

        });

    }


    /* ======================================================
       8. SCHOOL CONTACT / ENQUIRY FORM
       WHATSAPP INTEGRATION
       ====================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formStatus =
        document.getElementById("formStatus");

    if (contactForm && formStatus) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {

                contactForm.reportValidity();

                return;
            }

            const formData = new FormData(contactForm);
            const enquiry = [
                "Hello Pearls Places Montessori School,",
                "I would like to make an enquiry.",
                "",
                `Name: ${formData.get("name")}`,
                `Email: ${formData.get("email")}`,
                `Phone: ${formData.get("phone") || "Not provided"}`,
                `Enquiry about: ${formData.get("subject")}`,
                "",
                "Message:",
                formData.get("message")
            ].join("\n");
            const whatsappUrl =
                `https://wa.me/${SCHOOL_WHATSAPP_NUMBER}?text=${encodeURIComponent(enquiry)}`;

            const whatsappWindow = window.open(whatsappUrl, "_blank");

            if (whatsappWindow) {
                whatsappWindow.opener = null;
            }

            formStatus.textContent =
                "Your enquiry is ready in WhatsApp. Review the message and tap Send.";

            formStatus.style.color = "#21804b";

        });

    }


    /* ======================================================
       9. AUTOMATIC FOOTER YEAR
       ====================================================== */

    const currentYear = new Date().getFullYear();

    [
        "year",
        "ppms-footer-year"
    ].forEach(function (id) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = currentYear;
        }

    });


    /* ======================================================
       10. FOUNDER IMAGE PREVIEW
       ====================================================== */

    const uploadInput =
        document.getElementById("founderImageUpload");

    const founderPhoto =
        document.getElementById("founderPhoto");

    if (uploadInput && founderPhoto) {

        uploadInput.addEventListener("change", function (event) {

            const file = event.target.files?.[0];

            if (!file) return;

            if (!file.type.startsWith("image/")) {

                alert("Please select a valid image.");

                uploadInput.value = "";

                return;
            }

            // Maximum preview image size: 5 MB.

            if (file.size > 5 * 1024 * 1024) {

                alert("Please select an image smaller than 5 MB.");

                uploadInput.value = "";

                return;
            }

            const reader = new FileReader();

            reader.onload = function (e) {

                if (typeof e.target.result === "string") {
                    founderPhoto.src = e.target.result;
                }

            };

            reader.onerror = function () {

                alert(
                    "Unable to preview this image. Please try another."
                );

            };

            reader.readAsDataURL(file);

        });

    }


    /* ======================================================
       11. ACADEMIC PROGRAMME FILTERS
       ====================================================== */

    const filterButtons =
        document.querySelectorAll(".academic-filter");

    const academicCards =
        document.querySelectorAll(".academic-card");

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedLevel = button.dataset.filter;

            if (!selectedLevel) return;

            filterButtons.forEach(function (btn) {

                const active = btn === button;

                btn.classList.toggle("active", active);

                btn.setAttribute(
                    "aria-pressed",
                    String(active)
                );

            });

            academicCards.forEach(function (card) {

                const matches =
                    selectedLevel === "all" ||
                    card.dataset.level === selectedLevel;

                card.classList.toggle("is-hidden", !matches);

                card.setAttribute(
                    "aria-hidden",
                    String(!matches)
                );

            });

        });

    });


    /* ======================================================
       12. SCHOOL IMAGE SLIDESHOWS
       ACADEMIC AND SPORTS GALLERIES
       ====================================================== */

    const galleries =
        document.querySelectorAll(".school-gallery");

    const galleryControllers = [];

    galleries.forEach(function (gallery, galleryIndex) {

        const images = Array.from(
            gallery.querySelectorAll(":scope > img")
        );

        const dotsContainer =
            gallery.querySelector(".gallery-dots");

        if (!images.length || !dotsContainer) return;

        let currentIndex = 0;
        let slideTimer = null;
        let isPaused = false;
        let touchStartX = 0;

        gallery.setAttribute(
            "aria-roledescription",
            "carousel"
        );

        gallery.setAttribute(
            "aria-label",
            gallery.getAttribute("aria-label") ||
            `School photo gallery ${galleryIndex + 1}`
        );

        dotsContainer.innerHTML = "";

        // Create image indicators.

        const dots = images.map(function (image, index) {

            const dot = document.createElement("button");

            dot.type = "button";

            dot.className = "gallery-dot";

            dot.setAttribute(
                "aria-label",
                `Show image ${index + 1}`
            );

            dot.addEventListener("click", function () {

                showImage(index);

                restartSlideshow();

            });

            dotsContainer.appendChild(dot);

            return dot;

        });


        // Previous button.

        const previousButton =
            document.createElement("button");

        previousButton.type = "button";

        previousButton.className =
            "gallery-arrow gallery-prev";

        previousButton.innerHTML = "&#8249;";

        previousButton.setAttribute(
            "aria-label",
            "Previous image"
        );


        // Next button.

        const nextButton =
            document.createElement("button");

        nextButton.type = "button";

        nextButton.className =
            "gallery-arrow gallery-next";

        nextButton.innerHTML = "&#8250;";

        nextButton.setAttribute(
            "aria-label",
            "Next image"
        );

        gallery.appendChild(previousButton);

        gallery.appendChild(nextButton);


        // Display selected image.

        function showImage(index) {

            currentIndex =
                (index + images.length) % images.length;

            images.forEach(function (image, i) {

                const active = i === currentIndex;

                image.classList.toggle(
                    "gallery-active",
                    active
                );

                image.setAttribute(
                    "aria-hidden",
                    String(!active)
                );

            });

            dots.forEach(function (dot, i) {

                const active = i === currentIndex;

                dot.classList.toggle("active", active);

                dot.setAttribute(
                    "aria-pressed",
                    String(active)
                );

            });

        }


        function nextImage() {
            showImage(currentIndex + 1);
        }


        function previousImage() {
            showImage(currentIndex - 1);
        }


        function stopSlideshow() {

            if (slideTimer !== null) {

                window.clearInterval(slideTimer);

                slideTimer = null;

            }

        }


        function startSlideshow() {

            stopSlideshow();

            if (
                isPaused ||
                document.hidden ||
                prefersReducedMotion ||
                images.length <= 1
            ) {
                return;
            }

            slideTimer = window.setInterval(
                nextImage,
                5000
            );

        }


        function restartSlideshow() {
            startSlideshow();
        }


        // Navigation buttons.

        nextButton.addEventListener("click", function () {

            nextImage();

            restartSlideshow();

        });

        previousButton.addEventListener("click", function () {

            previousImage();

            restartSlideshow();

        });


        // Pause when visitor hovers.

        gallery.addEventListener("mouseenter", function () {

            isPaused = true;

            stopSlideshow();

        });

        gallery.addEventListener("mouseleave", function () {

            isPaused = false;

            startSlideshow();

        });


        // Pause during keyboard interaction.

        gallery.addEventListener("focusin", function () {

            isPaused = true;

            stopSlideshow();

        });

        gallery.addEventListener("focusout", function (event) {

            if (!gallery.contains(event.relatedTarget)) {

                isPaused = false;

                startSlideshow();

            }

        });


        // Touch/swipe support.

        gallery.addEventListener(
            "touchstart",
            function (event) {

                touchStartX = event.changedTouches[0].screenX;

            },
            { passive: true }
        );

        gallery.addEventListener(
            "touchend",
            function (event) {

                const touchEndX =
                    event.changedTouches[0].screenX;

                const difference =
                    touchStartX - touchEndX;

                if (Math.abs(difference) > 50) {

                    difference > 0
                        ? nextImage()
                        : previousImage();

                    restartSlideshow();

                }

            },
            { passive: true }
        );


        // Initialize gallery.

        showImage(0);

        startSlideshow();

        galleryControllers.push({

            start: startSlideshow,

            stop: stopSlideshow

        });

    });


    // Pause galleries when the browser tab is hidden.

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

                galleryControllers.forEach(function (gallery) {
                    gallery.stop();
                });

            } else {

                galleryControllers.forEach(function (gallery) {
                    gallery.start();
                });

            }

        }
    );


    /* ======================================================
       13. INTERACTIVE IMAGE VIEWER / LIGHTBOX
       ====================================================== */

    const lightbox =
        document.getElementById("schoolImageLightbox");

    if (lightbox) {

        const viewerImage =
            lightbox.querySelector("figure img");

        const caption =
            lightbox.querySelector("figcaption");

        const closeButton =
            lightbox.querySelector(".school-lightbox-close");

        const previousButton =
            lightbox.querySelector(".school-lightbox-prev");

        const nextButton =
            lightbox.querySelector(".school-lightbox-next");

        if (
            viewerImage &&
            caption &&
            closeButton &&
            previousButton &&
            nextButton
        ) {

            let activeGallery = null;
            let activeImageIndex = 0;
            let previousFocus = null;
            let previousBodyOverflow = "";


            function getGalleryImages() {

                if (!activeGallery) return [];

                return Array.from(
                    activeGallery.querySelectorAll(":scope > img")
                );

            }


            function displayViewerImage(index) {

                const images = getGalleryImages();

                if (!images.length) return;

                activeImageIndex =
                    (index + images.length) % images.length;

                const image = images[activeImageIndex];

                viewerImage.src =
                    image.currentSrc || image.src;

                viewerImage.alt =
                    image.alt || "School activity";

                caption.textContent =
                    image.alt || "School activity photograph";

            }


            function openViewer(gallery, image) {

                activeGallery = gallery;

                previousFocus = document.activeElement;

                const images = getGalleryImages();

                const imageIndex = images.indexOf(image);

                if (imageIndex < 0) return;

                // Pause slideshow while viewer is open.

                galleryControllers.forEach(function (controller) {
                    controller.stop();
                });

                displayViewerImage(imageIndex);

                lightbox.classList.add("is-open");

                lightbox.setAttribute("aria-hidden", "false");

                previousBodyOverflow =
                    document.body.style.overflow;

                document.body.style.overflow = "hidden";

                closeButton.focus();

            }


            function closeViewer() {

                lightbox.classList.remove("is-open");

                lightbox.setAttribute("aria-hidden", "true");

                viewerImage.removeAttribute("src");

                document.body.style.overflow =
                    previousBodyOverflow;

                activeGallery = null;

                if (previousFocus?.focus) {
                    previousFocus.focus();
                }

                // Resume galleries when appropriate.

                galleryControllers.forEach(function (controller) {
                    controller.start();
                });

            }


            // Make gallery photographs accessible.

            document.querySelectorAll(".school-gallery").forEach(
                function (gallery) {

                    gallery.querySelectorAll(":scope > img").forEach(
                        function (image) {

                            image.style.cursor = "zoom-in";

                            image.setAttribute("tabindex", "0");

                            image.setAttribute("role", "button");

                            image.addEventListener("click", function () {

                                openViewer(gallery, image);

                            });

                            image.addEventListener("keydown", function (event) {

                                if (
                                    event.key === "Enter" ||
                                    event.key === " "
                                ) {

                                    event.preventDefault();

                                    openViewer(gallery, image);

                                }

                            });

                        }
                    );

                }
            );


            // Viewer buttons.

            closeButton.addEventListener(
                "click",
                closeViewer
            );

            previousButton.addEventListener("click", function () {

                displayViewerImage(activeImageIndex - 1);

            });

            nextButton.addEventListener("click", function () {

                displayViewerImage(activeImageIndex + 1);

            });


            // Close on background click.

            lightbox.addEventListener("click", function (event) {

                if (event.target === lightbox) {
                    closeViewer();
                }

            });


            // Keyboard controls.

            document.addEventListener("keydown", function (event) {

                if (!lightbox.classList.contains("is-open")) return;

                if (event.key === "Escape") {

                    closeViewer();

                } else if (event.key === "ArrowLeft") {

                    displayViewerImage(activeImageIndex - 1);

                } else if (event.key === "ArrowRight") {

                    displayViewerImage(activeImageIndex + 1);

                }

            });

        } else {

            console.warn(
                "Image viewer HTML is incomplete. Check its buttons, figure image and caption."
            );

        }

    }


    /* ======================================================
       14. SCROLL REVEAL ANIMATIONS
       ====================================================== */

    const animatedElements = document.querySelectorAll(
        ".intro-image, .intro-copy, .founder-image-column, " +
        ".founder-details, .wow-row, .purpose-card, .learning-card, " +
        ".value-item, .academic-card, .sports-card, .event-card, " +
        ".sc-stat-card, .sl-feature-card, .news-card"
    );

    const revealDirections = [
        { x: "-36px", y: "0px" },
        { x: "36px", y: "0px" },
        { x: "0px", y: "-28px" },
        { x: "0px", y: "28px" }
    ];

    animatedElements.forEach(function (element) {

        let direction;

        if (element.classList.contains("intro-image")) {
            direction = revealDirections[0];
        } else if (element.classList.contains("intro-copy")) {
            direction = revealDirections[1];
        } else if (element.classList.contains("founder-image-column")) {
            direction = revealDirections[0];
        } else if (element.classList.contains("founder-details")) {
            direction = revealDirections[1];
        } else {
            direction = revealDirections[
                Math.floor(Math.random() * revealDirections.length)
            ];
        }

        element.style.setProperty("--ppms-card-x", direction.x);
        element.style.setProperty("--ppms-card-y", direction.y);
        element.classList.add("pp-card-reveal");

    });

    if (prefersReducedMotion) {

        animatedElements.forEach(function (element) {

            element.classList.add("pp-card-visible");

        });

    } else if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("pp-card-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                root: null,
                rootMargin: "0px 0px -40px 0px",
                threshold: 0.1
            }

        );

        animatedElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        animatedElements.forEach(function (element) {

            element.classList.add("pp-card-visible");

        });

    }


    /* ======================================================
       15. STATISTICS COUNTER ANIMATION
       ====================================================== */

    const statNumbers = document.querySelectorAll(
        ".sc-stat-number[data-target]"
    );

    const statsGrid =
        document.querySelector(".sc-stats-grid");

    if (
        statsGrid &&
        statNumbers.length &&
        "IntersectionObserver" in window &&
        !prefersReducedMotion
    ) {

        let countersStarted = false;

        function animateCounter(element) {

            const target = Number(
                element.getAttribute("data-target")
            );

            if (!Number.isFinite(target)) return;

            const duration = 1500;

            const startTime = performance.now();

            function updateCount(currentTime) {

                const elapsed = currentTime - startTime;

                const progress = Math.min(
                    elapsed / duration,
                    1
                );

                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                const currentValue = Math.floor(
                    easedProgress * target
                );

                element.textContent =
                    currentValue.toLocaleString();

                if (progress < 1) {

                    requestAnimationFrame(updateCount);

                } else {

                    element.textContent =
                        target.toLocaleString();

                }

            }

            requestAnimationFrame(updateCount);

        }


        const statsObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (
                        entry.isIntersecting &&
                        !countersStarted
                    ) {

                        countersStarted = true;

                        statNumbers.forEach(animateCounter);

                        observer.disconnect();

                    }

                });

            },

            {
                root: null,
                threshold: 0.4
            }

        );

        statsObserver.observe(statsGrid);

    } else {

        statNumbers.forEach(function (element) {

            const target = Number(
                element.getAttribute("data-target")
            );

            if (Number.isFinite(target)) {

                element.textContent =
                    target.toLocaleString();

            }

        });

    }


    /* ======================================================
       16. EVENTS FILTER
       FILTER BY MONTH AND CATEGORY
       ====================================================== */

    const monthFilter =
        document.getElementById("monthFilter");

    const categoryFilter =
        document.getElementById("categoryFilter");

    const eventCards =
        document.querySelectorAll(".event-card");


    function filterEvents() {

        const selectedMonth =
            monthFilter?.value || "all";

        const selectedCategory =
            categoryFilter?.value || "all";

        eventCards.forEach(function (card) {

            const cardMonth =
                card.getAttribute("data-month");

            const cardCategory =
                card.getAttribute("data-category");

            const matchesMonth =
                selectedMonth === "all" ||
                cardMonth === selectedMonth;

            const matchesCategory =
                selectedCategory === "all" ||
                cardCategory === selectedCategory;

            const isVisible =
                matchesMonth && matchesCategory;

            card.style.display =
                isVisible ? "" : "none";

        });

    }


    if (monthFilter) {

        monthFilter.addEventListener(
            "change",
            filterEvents
        );

    }

    if (categoryFilter) {

        categoryFilter.addEventListener(
            "change",
            filterEvents
        );

    }


    /* ======================================================
       17. ACTIVE NAVIGATION LINK
       ====================================================== */

    const sections = document.querySelectorAll(
        "main section[id], section[id]"
    );

    const pageLinks = document.querySelectorAll(
        '#navLinks a[href^="#"]'
    );

    if (
        sections.length &&
        pageLinks.length &&
        "IntersectionObserver" in window
    ) {

        const sectionObserver = new IntersectionObserver(

            function (entries) {

                entries.forEach(function (entry) {

                    if (!entry.isIntersecting) return;

                    const sectionId = entry.target.id;

                    pageLinks.forEach(function (link) {

                        const active =
                            link.getAttribute("href") ===
                            `#${sectionId}`;

                        link.classList.toggle(
                            "active",
                            active
                        );

                        if (active) {
                            link.setAttribute(
                                "aria-current",
                                "location"
                            );
                        } else {
                            link.removeAttribute("aria-current");
                        }

                    });

                });

            },

            {
                rootMargin: "-30% 0px -60% 0px",
                threshold: 0
            }

        );

        sections.forEach(function (section) {

            sectionObserver.observe(section);

        });

    }


    /* ======================================================
       18. PAGE LOADER
       ====================================================== */

    const loader =
        document.getElementById("page-loader");

    if (loader) {

        let loaderRemoved = false;

        function removeLoader() {

            if (loaderRemoved) return;

            loaderRemoved = true;

            loader.classList.add("fade-out");

            window.setTimeout(function () {

                loader.style.display = "none";

            }, 600);

        }

        // Remove loader after the page has loaded.

        if (document.readyState === "complete") {

            removeLoader();

        } else {

            window.addEventListener(
                "load",
                removeLoader,
                { once: true }
            );

        }

        // Safety fallback if an external resource loads slowly.

        window.setTimeout(removeLoader, 8000);

    }


    /* ======================================================
       19. WEBSITE INITIALIZATION
       ====================================================== */

    console.log(
        "Pearls Places Montessori School website loaded successfully."
    );

});

  (function () {
    const adOverlay = document.getElementById('ppms-ad-overlay');
    const closeBtn = document.getElementById('ppms-close-btn');
    const ctaLink = document.getElementById('ppms-cta-link');

    // Function to trigger the drop-down ad
    window.showPpmsAd = function () {
      if (!adOverlay) return;
      // Optional: Prevent showing more than once per browser session
      if (sessionStorage.getItem('ppmsAdShown')) return;

      adOverlay.classList.add('active');
      adOverlay.setAttribute('aria-hidden', 'false');
      sessionStorage.setItem('ppmsAdShown', 'true');
    };

    // Function to close the ad
    function closePpmsAd() {
      if (adOverlay.contains(document.activeElement)) {
        document.activeElement.blur();
      }

      adOverlay.classList.remove('active');
      adOverlay.setAttribute('aria-hidden', 'true');
    }

    // Close on X click, CTA click, outside backdrop click, or Escape key
    closeBtn.addEventListener('click', closePpmsAd);
    ctaLink.addEventListener('click', closePpmsAd);
    adOverlay.addEventListener('click', function (e) {
      if (e.target === adOverlay) closePpmsAd();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && adOverlay.classList.contains('active')) {
        closePpmsAd();
      }
    });

    function checkMidpointScroll() {
      const pageHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight
      );
      const scrollableDistance = pageHeight - window.innerHeight;

      if (scrollableDistance <= 0 || window.scrollY < scrollableDistance * 0.5) {
        return;
      }

      window.removeEventListener('scroll', checkMidpointScroll);
      window.showPpmsAd();
    }

    window.addEventListener('scroll', checkMidpointScroll, { passive: true });
    window.addEventListener('load', checkMidpointScroll, { once: true });
  })();



  /* ==========================================
   PEARLS PLACE TESTIMONIAL ENGINE
========================================== */

(function () {

  const section = document.querySelector(
    "#parent-testimonials"
  );

  if (!section) return;

  const track = section.querySelector(
    ".pp-testimonial-track"
  );

  const originalCards = Array.from(
    track.querySelectorAll(".pp-testimonial-card")
  );

  // Duplicate cards for seamless looping.
  originalCards.forEach((card) => {

    const clone = card.cloneNode(true);

    clone.setAttribute("aria-hidden", "true");

    clone.querySelectorAll("*").forEach((element) => {
      element.setAttribute("tabindex", "-1");
    });

    track.appendChild(clone);

  });

  // Reveal the section smoothly when it enters the viewport.
  if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            section.classList.add("pp-visible");

          }

        });

      },
      { threshold: 0.1 }
    );

    observer.observe(section);

  } else {

    section.classList.add("pp-visible");

  }

})();