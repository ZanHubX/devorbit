/* =========================================
   DEVORBIT — NAVIGATION
========================================= */

(() => {

    "use strict";


    /* =========================================
       DOM
    ========================================= */

    const header =
        document.getElementById(
            "siteHeader"
        );


    const menuToggle =
        document.getElementById(
            "menuToggle"
        );


    const mobileMenu =
        document.getElementById(
            "mobileMenu"
        );


    const mobileMenuBack =
        document.getElementById(
            "mobileMenuBack"
        );


    const mobileLinks =
        document.querySelectorAll(
            ".mobile-menu a"
        );


    const themeToggle =
        document.getElementById(
            "themeToggle"
        );


    const themeIcon =
        themeToggle?.querySelector(
            ".theme-icon"
        );


    /* =========================================
       HEADER SCROLL
    ========================================= */

    let headerTicking = false;


    function updateHeader() {

        if (!header) return;


        const shouldScroll =
            window.scrollY > 40;


        header.classList.toggle(
            "scrolled",
            shouldScroll
        );

    }


    function requestHeaderUpdate() {

        if (headerTicking) return;


        headerTicking = true;


        requestAnimationFrame(() => {

            updateHeader();

            headerTicking = false;

        });

    }


    window.addEventListener(
        "scroll",
        requestHeaderUpdate,
        {
            passive: true
        }
    );


    updateHeader();


    /* =========================================
       MOBILE MENU
    ========================================= */

    let menuOpen = false;


    function openMobileMenu() {

        if (
            !menuToggle ||
            !mobileMenu
        ) {
            return;
        }


        menuOpen = true;


        /*
         * Open mobile menu
         */

        mobileMenu.classList.add(
            "open"
        );


        /*
         * Hamburger → X
         */

        menuToggle.classList.add(
            "active"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );


        /*
         * Prevent background page scrolling
         */

        document.body.classList.add(
            "menu-open"
        );


        document.documentElement.classList.add(
            "menu-open"
        );

    }


    function closeMobileMenu() {

        if (
            !menuToggle ||
            !mobileMenu
        ) {
            return;
        }


        menuOpen = false;


        /*
         * Close mobile menu
         */

        mobileMenu.classList.remove(
            "open"
        );


        /*
         * X → Hamburger
         */

        menuToggle.classList.remove(
            "active"
        );


        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );


        /*
         * Restore page scrolling
         */

        document.body.classList.remove(
            "menu-open"
        );


        document.documentElement.classList.remove(
            "menu-open"
        );

    }


    function toggleMobileMenu() {

        if (menuOpen) {

            closeMobileMenu();

        } else {

            openMobileMenu();

        }

    }


    /* =========================================
       MENU TOGGLE
    ========================================= */

    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            toggleMobileMenu
        );

    }


    /* =========================================
       MOBILE MENU BACK BUTTON
    ========================================= */

    if (mobileMenuBack) {

        mobileMenuBack.addEventListener(
            "click",
            () => {

                closeMobileMenu();

                /*
                 * Return keyboard focus
                 * to the menu button.
                 */

                menuToggle?.focus();

            }
        );

    }


    /* =========================================
       MOBILE LINK CLOSE
    ========================================= */

    mobileLinks.forEach(
        link => {

            link.addEventListener(
                "click",
                () => {

                    closeMobileMenu();

                }
            );

        }
    );


    /* =========================================
       ESCAPE KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                menuOpen
            ) {

                closeMobileMenu();

                menuToggle?.focus();

            }

        }
    );


    /* =========================================
       CLOSE MENU ON RESIZE
    ========================================= */

    let previousWidth =
        window.innerWidth;


    window.addEventListener(
        "resize",
        () => {

            const currentWidth =
                window.innerWidth;


            /*
             * Close when crossing
             * from mobile/tablet into
             * desktop mode.
             */

            if (
                previousWidth <= 900 &&
                currentWidth > 900 &&
                menuOpen
            ) {

                closeMobileMenu();

            }


            previousWidth =
                currentWidth;

        },
        {
            passive: true
        }
    );


    /* =========================================
       COLOR THEME
    ========================================= */

    const STORAGE_KEY =
        "devorbit-theme";


    function getSystemTheme() {

        return window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches
            ? "light"
            : "dark";

    }


    function getSavedTheme() {

        const savedTheme =
            localStorage.getItem(
                STORAGE_KEY
            );


        if (
            savedTheme === "light" ||
            savedTheme === "dark"
        ) {

            return savedTheme;

        }


        return getSystemTheme();

    }


    /* =========================================
       APPLY THEME
    ========================================= */

    function applyTheme(
        theme,
        save = true
    ) {

        const isLight =
            theme === "light";


        document.body.classList.toggle(
            "light-theme",
            isLight
        );


        if (save) {

            localStorage.setItem(
                STORAGE_KEY,
                isLight
                    ? "light"
                    : "dark"
            );

        }


        updateThemeUI(
            isLight
        );

    }


    /* =========================================
       THEME UI
    ========================================= */

    function updateThemeUI(
        isLight
    ) {

        if (themeIcon) {

            themeIcon.textContent =
                isLight
                    ? "☼"
                    : "◐";

        }


        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-pressed",
                String(isLight)
            );


            themeToggle.setAttribute(
                "aria-label",
                isLight
                    ? "Switch to dark theme"
                    : "Switch to light theme"
            );


            themeToggle.setAttribute(
                "title",
                isLight
                    ? "Switch to dark theme"
                    : "Switch to light theme"
            );

        }

    }


    /* =========================================
       INITIAL THEME
    ========================================= */

    applyTheme(
        getSavedTheme(),
        false
    );


    /* =========================================
       THEME TOGGLE
    ========================================= */

    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const isCurrentlyLight =
                    document.body.classList.contains(
                        "light-theme"
                    );


                const nextTheme =
                    isCurrentlyLight
                        ? "dark"
                        : "light";


                applyTheme(
                    nextTheme,
                    true
                );


                /*
                 * Premium interaction feedback
                 */

                themeToggle.classList.add(
                    "theme-changing"
                );


                window.setTimeout(
                    () => {

                        themeToggle.classList.remove(
                            "theme-changing"
                        );

                    },
                    500
                );

            }
        );

    }


    /* =========================================
       SYSTEM THEME CHANGES
    ========================================= */

    const systemTheme =
        window.matchMedia(
            "(prefers-color-scheme: light)"
        );


    systemTheme.addEventListener(
        "change",
        event => {

            /*
             * Only follow the system when
             * the user has not manually
             * selected a theme.
             */

            const savedTheme =
                localStorage.getItem(
                    STORAGE_KEY
                );


            if (savedTheme) return;


            applyTheme(
                event.matches
                    ? "light"
                    : "dark",
                false
            );

        }
    );


    /* =========================================
       MENU ACCESSIBILITY
    ========================================= */

    if (menuToggle) {

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );


        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }


    if (mobileMenu) {

        mobileMenu.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    /*
     * Keep aria-hidden synchronized
     * with the .open state.
     */

    const menuObserver =
        mobileMenu
            ? new MutationObserver(
                () => {

                    mobileMenu.setAttribute(
                        "aria-hidden",
                        String(
                            !mobileMenu.classList.contains(
                                "open"
                            )
                        )
                    );

                }
            )
            : null;


    if (
        menuObserver &&
        mobileMenu
    ) {

        menuObserver.observe(
            mobileMenu,
            {
                attributes: true,
                attributeFilter: [
                    "class"
                ]
            }
        );

    }


})();