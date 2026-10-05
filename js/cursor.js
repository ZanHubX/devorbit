/* =========================================
   DEVORBIT — PREMIUM CUSTOM CURSOR
========================================= */

(() => {

    const cursor = document.getElementById("customCursor");

    if (!cursor) return;


    /* =========================================
       DEVICE CHECK
    ========================================= */

    const finePointer = window.matchMedia(
        "(pointer: fine)"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    if (!finePointer.matches || reducedMotion.matches) {
        cursor.style.display = "none";
        return;
    }


    /* =========================================
       CURSOR STATE
    ========================================= */

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    let cursorX = mouseX;
    let cursorY = mouseY;

    let velocityX = 0;
    let velocityY = 0;

    let previousMouseX = mouseX;
    let previousMouseY = mouseY;

    let isInside = false;
    let isHovering = false;


    /* =========================================
       INTERACTIVE ELEMENTS
    ========================================= */

    const interactiveSelector = [
        "a",
        "button",
        "[role='button']",
        "input",
        "textarea",
        "select",
        ".service-item",
        ".team-member",
        ".project-visual",
        ".technology-row"
    ].join(",");


    /* =========================================
       MOUSE POSITION
    ========================================= */

    document.addEventListener(
        "mousemove",
        event => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            velocityX =
                mouseX - previousMouseX;

            velocityY =
                mouseY - previousMouseY;

            previousMouseX = mouseX;
            previousMouseY = mouseY;


            if (!isInside) {

                isInside = true;

                cursor.classList.add(
                    "active"
                );

            }

        },
        { passive: true }
    );


    /* =========================================
       ENTER / LEAVE WINDOW
    ========================================= */

    document.addEventListener(
        "mouseenter",
        () => {

            isInside = true;

            cursor.classList.add(
                "active"
            );

        }
    );


    document.addEventListener(
        "mouseleave",
        () => {

            isInside = false;

            cursor.classList.remove(
                "active"
            );

            cursor.classList.remove(
                "hover"
            );

            cursor.classList.remove(
                "pressed"
            );

            cursor.removeAttribute(
                "data-cursor-type"
            );

        }
    );


    /* =========================================
       INTERACTION DETECTION
    ========================================= */

    document.addEventListener(
        "mouseover",
        event => {

            const target =
                event.target.closest(
                    interactiveSelector
                );


            if (!target) {

                if (isHovering) {

                    isHovering = false;

                    cursor.classList.remove(
                        "hover"
                    );

                    cursor.removeAttribute(
                        "data-cursor-type"
                    );

                }

                return;
            }


            if (target === cursor) return;


            isHovering = true;

            cursor.classList.add(
                "hover"
            );


            /* -----------------------------------------
               CUSTOM CURSOR TYPE
            ----------------------------------------- */

            const cursorType =
                target.dataset.cursor;


            if (cursorType) {

                cursor.setAttribute(
                    "data-cursor-type",
                    cursorType
                );

            } else {

                cursor.setAttribute(
                    "data-cursor-type",
                    "interactive"
                );

            }

        },
        { passive: true }
    );


    /* =========================================
       CLICK FEEDBACK
    ========================================= */

    document.addEventListener(
        "mousedown",
        () => {

            cursor.classList.add(
                "pressed"
            );

        }
    );


    document.addEventListener(
        "mouseup",
        () => {

            cursor.classList.remove(
                "pressed"
            );

        }
    );


    /* =========================================
       CURSOR ANIMATION
    ========================================= */

    function animateCursor() {

        /*
         * Smooth follow.
         * Higher value = faster cursor response.
         */

        const followSpeed =
            isHovering
                ? 0.22
                : 0.16;


        cursorX +=
            (mouseX - cursorX) *
            followSpeed;


        cursorY +=
            (mouseY - cursorY) *
            followSpeed;


        /*
         * Calculate movement velocity.
         * Used for subtle dynamic rotation/stretch.
         */

        const speed =
            Math.min(
                Math.sqrt(
                    velocityX * velocityX +
                    velocityY * velocityY
                ),
                35
            );


        const angle =
            Math.atan2(
                velocityY,
                velocityX
            ) *
            (180 / Math.PI);


        const stretch =
            1 +
            (speed * 0.006);


        const scale =
            isHovering
                ? 1.45
                : 1;


        /*
         * Render cursor.
         */

        cursor.style.transform = `
            translate3d(
                ${cursorX}px,
                ${cursorY}px,
                0
            )
            translate(-50%, -50%)
            rotate(${angle}deg)
            scaleX(${stretch})
            scaleY(${1 / stretch})
            scale(${scale})
        `;


        /*
         * Slowly reduce velocity
         * for smoother motion.
         */

        velocityX *= 0.78;
        velocityY *= 0.78;


        requestAnimationFrame(
            animateCursor
        );

    }


    animateCursor();


    /* =========================================
       RESET ON SCROLL
    ========================================= */

    window.addEventListener(
        "scroll",
        () => {

            /*
             * Prevent the cursor from getting
             * stuck in a hover state when the
             * DOM moves underneath it.
             */

            const element =
                document.elementFromPoint(
                    mouseX,
                    mouseY
                );


            if (!element) return;


            const target =
                element.closest(
                    interactiveSelector
                );


            if (!target) {

                isHovering = false;

                cursor.classList.remove(
                    "hover"
                );

                cursor.removeAttribute(
                    "data-cursor-type"
                );

            }

        },
        { passive: true }
    );


    /* =========================================
       TAB / KEYBOARD SAFETY
    ========================================= */

    document.addEventListener(
        "focusin",
        event => {

            const target =
                event.target.closest(
                    interactiveSelector
                );


            if (!target) return;


            cursor.classList.add(
                "hover"
            );

            const cursorType =
                target.dataset.cursor;


            cursor.setAttribute(
                "data-cursor-type",
                cursorType || "interactive"
            );

        }
    );


    document.addEventListener(
        "focusout",
        event => {

            const target =
                event.target.closest(
                    interactiveSelector
                );


            if (!target) return;


            cursor.classList.remove(
                "hover"
            );

            cursor.removeAttribute(
                "data-cursor-type"
            );

        }
    );


})();