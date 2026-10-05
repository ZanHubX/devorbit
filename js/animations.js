/* =========================================
   DEVORBIT — PREMIUM ANIMATIONS
========================================= */

(() => {

    "use strict";


    /* =========================================
       MOTION PREFERENCE
    ========================================= */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (prefersReducedMotion) {

        document.documentElement.classList.add(
            "reduced-motion"
        );

        return;

    }


    /* =========================================
       GLOBAL MOTION STATE
    ========================================= */

    let isPageVisible = true;


    document.addEventListener(
        "visibilitychange",
        () => {

            isPageVisible =
                !document.hidden;

        }
    );


    /* =========================================
       HERO PARALLAX
    ========================================= */

    const hero =
        document.querySelector(".hero");

    const heroVisual =
        document.getElementById(
            "heroVisual"
        );


    if (hero && heroVisual) {

        let mouseX = 0;
        let mouseY = 0;

        let currentX = 0;
        let currentY = 0;


        window.addEventListener(
            "mousemove",
            event => {

                const normalizedX =
                    event.clientX /
                    window.innerWidth -
                    0.5;


                const normalizedY =
                    event.clientY /
                    window.innerHeight -
                    0.5;


                mouseX =
                    normalizedX * 2;

                mouseY =
                    normalizedY * 2;

            },
            { passive: true }
        );


        function animateHero() {

            if (isPageVisible) {

                currentX +=
                    (mouseX - currentX) *
                    0.045;


                currentY +=
                    (mouseY - currentY) *
                    0.045;


                heroVisual.style.setProperty(
                    "--mouse-x",
                    `${currentX * 18}px`
                );


                heroVisual.style.setProperty(
                    "--mouse-y",
                    `${currentY * 18}px`
                );


                heroVisual.style.setProperty(
                    "--mouse-rotate",
                    `${currentX * 1.5}deg`
                );

            }


            requestAnimationFrame(
                animateHero
            );

        }


        animateHero();

    }


    /* =========================================
       HERO DEPTH LAYERS
    ========================================= */

    const heroLayers =
        document.querySelectorAll(
            "[data-parallax]"
        );


    if (heroLayers.length) {

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;


        window.addEventListener(
            "mousemove",
            event => {

                targetX =
                    (event.clientX /
                        window.innerWidth -
                        0.5) * 2;


                targetY =
                    (event.clientY /
                        window.innerHeight -
                        0.5) * 2;

            },
            { passive: true }
        );


        function animateLayers() {

            currentX +=
                (targetX - currentX) *
                0.035;


            currentY +=
                (targetY - currentY) *
                0.035;


            heroLayers.forEach(layer => {

                const depth =
                    parseFloat(
                        layer.dataset.parallax
                    ) || 1;


                layer.style.transform =
                    `translate3d(
                        ${currentX * depth}px,
                        ${currentY * depth}px,
                        0
                    )`;

            });


            requestAnimationFrame(
                animateLayers
            );

        }


        animateLayers();

    }


    /* =========================================
       SCROLL REVEAL
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            "[data-reveal]"
        );


    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const element =
                                entry.target;


                            const delay =
                                element.dataset
                                    .revealDelay ||
                                0;


                            setTimeout(
                                () => {

                                    element.classList.add(
                                        "revealed"
                                    );

                                },
                                Number(delay)
                            );


                            observer.unobserve(
                                element
                            );

                        }
                    );

                },
                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -8% 0px"
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

            }
        );

    }


    /* =========================================
       STAGGERED GROUP REVEALS
    ========================================= */

    const revealGroups =
        document.querySelectorAll(
            "[data-reveal-group]"
        );


    if (revealGroups.length) {

        const groupObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const children =
                                entry.target.children;


                            Array.from(children)
                                .forEach(
                                    (child, index) => {

                                        child.style.setProperty(
                                            "--reveal-delay",
                                            `${index * 90}ms`
                                        );


                                        child.classList.add(
                                            "revealed"
                                        );

                                    }
                                );


                            observer.unobserve(
                                entry.target
                            );

                        }
                    );

                },
                {
                    threshold: 0.15
                }
            );


        revealGroups.forEach(
            group => {

                groupObserver.observe(
                    group
                );

            }
        );

    }


    /* =========================================
       SERVICE HOVER
    ========================================= */

    const services =
        document.querySelectorAll(
            "[data-service]"
        );


    services.forEach(service => {

        service.addEventListener(
            "mouseenter",
            () => {

                services.forEach(
                    item => {

                        if (
                            item !== service
                        ) {

                            item.classList.add(
                                "dimmed"
                            );

                        }

                    }
                );

            }
        );


        service.addEventListener(
            "mouseleave",
            () => {

                services.forEach(
                    item => {

                        item.classList.remove(
                            "dimmed"
                        );

                    }
                );

            }
        );

    });


    /* =========================================
       PROJECT MOUSE PARALLAX
    ========================================= */

    const project =
        document.querySelector(
            ".featured-project"
        );


    const projectFrame =
        document.querySelector(
            ".project-frame"
        );


    if (project && projectFrame) {

        let targetRotateX = 0;
        let targetRotateY = 0;

        let currentRotateX = 0;
        let currentRotateY = 0;

        let targetScale = 1;
        let currentScale = 1;


        project.addEventListener(
            "mousemove",
            event => {

                const rect =
                    project.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    0.5;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    0.5;


                targetRotateY =
                    x * 3;


                targetRotateX =
                    y * -3;


                targetScale =
                    1.012;

            },
            { passive: true }
        );


        project.addEventListener(
            "mouseleave",
            () => {

                targetRotateX = 0;
                targetRotateY = 0;
                targetScale = 1;

            }
        );


        function animateProject() {

            currentRotateX +=
                (targetRotateX -
                    currentRotateX) *
                0.08;


            currentRotateY +=
                (targetRotateY -
                    currentRotateY) *
                0.08;


            currentScale +=
                (targetScale -
                    currentScale) *
                0.08;


            projectFrame.style.transform =
                `perspective(1400px)
                 rotateX(${currentRotateX}deg)
                 rotateY(${currentRotateY}deg)
                 scale(${currentScale})`;


            requestAnimationFrame(
                animateProject
            );

        }


        animateProject();

    }


    /* =========================================
       MAGNETIC BUTTONS
    ========================================= */

    const magneticElements =
        document.querySelectorAll(
            ".magnetic"
        );


    magneticElements.forEach(
        element => {

            let targetX = 0;
            let targetY = 0;

            let currentX = 0;
            let currentY = 0;


            element.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        element.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    targetX =
                        x * 0.18;


                    targetY =
                        y * 0.18;

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    targetX = 0;
                    targetY = 0;

                }
            );


            function animateMagnetic() {

                currentX +=
                    (targetX - currentX) *
                    0.12;


                currentY +=
                    (targetY - currentY) *
                    0.12;


                element.style.setProperty(
                    "--magnetic-x",
                    `${currentX}px`
                );


                element.style.setProperty(
                    "--magnetic-y",
                    `${currentY}px`
                );


                requestAnimationFrame(
                    animateMagnetic
                );

            }


            animateMagnetic();

        }
    );


    /* =========================================
       TECH / CHIP HOVER
    ========================================= */

    const chips =
        document.querySelectorAll(
            ".tech-chip"
        );


    chips.forEach(chip => {

        chip.addEventListener(
            "mouseenter",
            () => {

                chip.classList.add(
                    "chip-active"
                );

            }
        );


        chip.addEventListener(
            "mouseleave",
            () => {

                chip.classList.remove(
                    "chip-active"
                );

            }
        );

    });


    /* =========================================
       SMOOTH ANCHOR SCROLL
    ========================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".site-header"
                    );


                const headerOffset =
                    header
                        ? header.offsetHeight + 20
                        : 20;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerOffset;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

            }
        );

    });


    /* =========================================
       ACTIVE SECTION DETECTION
    ========================================= */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            '.nav-links a[href^="#"]'
        );


    if (
        sections.length &&
        navigationLinks.length
    ) {

        const sectionObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const id =
                                entry.target.id;


                            navigationLinks.forEach(
                                link => {

                                    const isActive =
                                        link.getAttribute(
                                            "href"
                                        ) ===
                                        `#${id}`;


                                    link.classList.toggle(
                                        "active",
                                        isActive
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    threshold: 0.35
                }
            );


        sections.forEach(
            section => {

                sectionObserver.observe(
                    section
                );

            }
        );

    }


    /* =========================================
       BUTTON RIPPLE
    ========================================= */

    document
        .querySelectorAll(
            ".button,"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    const rect =
                        button.getBoundingClientRect();


                    const ripple =
                        document.createElement(
                            "span"
                        );


                    ripple.className =
                        "button-ripple";


                    ripple.style.left =
                        `${event.clientX -
                            rect.left}px`;


                    ripple.style.top =
                        `${event.clientY -
                            rect.top}px`;


                    button.appendChild(
                        ripple
                    );


                    ripple.addEventListener(
                        "animationend",
                        () => {

                            ripple.remove();

                        }
                    );

                }
            );

        });


    /* =========================================
       IMAGE / VISUAL TILT
    ========================================= */

    const visualCards =
        document.querySelectorAll(
            "[data-tilt]"
        );


    visualCards.forEach(card => {

        let targetX = 0;
        let targetY = 0;

        let currentX = 0;
        let currentY = 0;


        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width -
                    0.5;


                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height -
                    0.5;


                targetX = y * -4;
                targetY = x * 4;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                targetX = 0;
                targetY = 0;

            }
        );


        function animateTilt() {

            currentX +=
                (targetX - currentX) *
                0.08;


            currentY +=
                (targetY - currentY) *
                0.08;


            card.style.transform =
                `perspective(1200px)
                 rotateX(${currentX}deg)
                 rotateY(${currentY}deg)`;


            requestAnimationFrame(
                animateTilt
            );

        }


        animateTilt();

    });


    /* =========================================
       PAGE LOAD
    ========================================= */

    window.addEventListener(
        "load",
        () => {

            document.body.classList.add(
                "page-ready"
            );

        }
    );

})();