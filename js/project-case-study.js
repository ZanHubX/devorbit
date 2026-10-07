/* =========================================
   DEVORBIT — PREMIUM PROJECT CASE STUDY
========================================= */

(() => {

    "use strict";


    /* =========================================
       STATE
    ========================================= */

    let activeModal = null;
    let previousFocusedElement = null;


    /* =========================================
       MODALS
    ========================================= */

    const modals =
        document.querySelectorAll(
            "[data-case-study-modal]"
        );


    if (!modals.length) return;


    /* =========================================
       OPEN
    ========================================= */

    function openCaseStudy(modal, trigger) {

        if (!modal) return;


        previousFocusedElement =
            trigger ||
            document.activeElement;


        activeModal = modal;


        modal.classList.add(
            "is-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "case-study-open"
        );


        const panel =
            modal.querySelector(
                ".case-study-panel"
            );


        if (panel) {

            panel.scrollTop = 0;

            updateProgress(panel);

        }


        const closeButton =
            modal.querySelector(
                ".case-study-close"
            );


        requestAnimationFrame(() => {

            closeButton?.focus();

        });

    }


    /* =========================================
       CLOSE
    ========================================= */

    function closeCaseStudy(modal) {

        if (!modal) return;


        modal.classList.remove(
            "is-open"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "case-study-open"
        );


        if (
            previousFocusedElement &&
            typeof previousFocusedElement.focus ===
                "function"
        ) {

            previousFocusedElement.focus();

        }


        activeModal = null;

    }


    /* =========================================
       OPEN TRIGGERS
    ========================================= */

    document.addEventListener(
        "click",
        event => {

            const trigger =
                event.target.closest(
                    "[data-case-study]"
                );


            if (!trigger) return;


            const caseStudy =
                trigger.dataset.caseStudy;


            if (!caseStudy) return;


            const modal =
                document.querySelector(
                    `[data-case-study-modal="${caseStudy}"]`
                );


            if (!modal) return;


            event.preventDefault();


            event.stopPropagation();


            openCaseStudy(
                modal,
                trigger
            );

        },
        true
    );


    /* =========================================
       CLOSE BUTTONS
    ========================================= */

    document.addEventListener(
        "click",
        event => {

            const closeButton =
                event.target.closest(
                    ".case-study-close"
                );


            if (!closeButton) return;


            const modal =
                closeButton.closest(
                    ".case-study-modal"
                );


            if (!modal) return;


            event.preventDefault();


            event.stopPropagation();


            closeCaseStudy(modal);

        },
        true
    );


    /* =========================================
       BACKDROP
    ========================================= */

    modals.forEach(modal => {

        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal ||
                    event.target.classList.contains(
                        "case-study-backdrop"
                    )
                ) {

                    closeCaseStudy(modal);

                }

            }
        );

    });


    /* =========================================
       ESCAPE
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Escape" ||
                !activeModal
            ) {
                return;
            }


            closeCaseStudy(
                activeModal
            );

        }
    );


    /* =========================================
       THEME
    ========================================= */

    function applyTheme(
        panel,
        theme
    ) {

        if (!panel) return;


        const validTheme =
            theme === "light"
                ? "light"
                : "dark";


        panel.dataset.caseTheme =
            validTheme;


        const icon =
            panel.querySelector(
                ".case-theme-icon"
            );


        if (icon) {

            icon.textContent =
                validTheme === "light"
                    ? "☼"
                    : "◐";

        }


        const toggle =
            panel.querySelector(
                "[data-case-theme-toggle]"
            );


        if (toggle) {

            toggle.setAttribute(
                "aria-label",
                validTheme === "light"
                    ? "Switch to dark theme"
                    : "Switch to light theme"
            );

        }

    }


    function getSavedTheme(caseName) {

        return localStorage.getItem(
            `devorbit-case-theme-${caseName}`
        );

    }


    function saveTheme(
        caseName,
        theme
    ) {

        localStorage.setItem(
            `devorbit-case-theme-${caseName}`,
            theme
        );

    }


    modals.forEach(modal => {

        const caseName =
            modal.dataset.caseStudyModal;


        const panel =
            modal.querySelector(
                ".case-study-panel"
            );


        if (!panel) return;


        const savedTheme =
            getSavedTheme(caseName);


        if (savedTheme) {

            applyTheme(
                panel,
                savedTheme
            );

        } else {

            const siteIsLight =
                document.body.classList.contains(
                    "light-theme"
                );


            applyTheme(
                panel,
                siteIsLight
                    ? "light"
                    : "dark"
            );

        }

    });


    document.addEventListener(
        "click",
        event => {

            const toggle =
                event.target.closest(
                    "[data-case-theme-toggle]"
                );


            if (!toggle) return;


            const panel =
                toggle.closest(
                    ".case-study-panel"
                );


            if (!panel) return;


            const modal =
                panel.closest(
                    ".case-study-modal"
                );


            const caseName =
                modal?.dataset.caseStudyModal ||
                "default";


            const currentTheme =
                panel.dataset.caseTheme;


            const nextTheme =
                currentTheme === "light"
                    ? "dark"
                    : "light";


            applyTheme(
                panel,
                nextTheme
            );


            saveTheme(
                caseName,
                nextTheme
            );

        }
    );


    /* =========================================
       SCROLL PROGRESS
    ========================================= */

    function updateProgress(panel) {

        const progress =
            panel.querySelector(
                "[data-case-progress]"
            );


        if (!progress) return;


        const scrollTop =
            panel.scrollTop;


        const scrollHeight =
            panel.scrollHeight -
            panel.clientHeight;


        if (scrollHeight <= 0) {

            progress.style.width =
                "100%";

            return;

        }


        const percentage =
            (scrollTop / scrollHeight) *
            100;


        progress.style.width =
            `${Math.min(
                100,
                Math.max(
                    0,
                    percentage
                )
            )}%`;

    }


    modals.forEach(modal => {

        const panel =
            modal.querySelector(
                ".case-study-panel"
            );


        if (!panel) return;


        panel.addEventListener(
            "scroll",
            () => {

                updateProgress(
                    panel
                );

            },
            {
                passive: true
            }
        );

    });


    /* =========================================
       KEYBOARD FOCUS TRAP
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Tab" ||
                !activeModal
            ) {
                return;
            }


            const focusable =
                activeModal.querySelectorAll(
                    "button, a, input, textarea, select, [tabindex]:not([tabindex='-1'])"
                );


            if (!focusable.length) return;


            const first =
                focusable[0];


            const last =
                focusable[focusable.length - 1];


            if (
                event.shiftKey &&
                document.activeElement === first
            ) {

                event.preventDefault();

                last.focus();

            } else if (
                !event.shiftKey &&
                document.activeElement === last
            ) {

                event.preventDefault();

                first.focus();

            }

        }
    );


    /* =========================================
       PREVENT BACKGROUND INTERACTION
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !activeModal ||
                event.key !== " "
            ) {
                return;
            }


            const tag =
                document.activeElement?.tagName;


            if (
                tag === "BUTTON" ||
                tag === "A"
            ) {
                return;
            }

        }
    );


})();