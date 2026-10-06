/* =========================================
   DEVORBIT — PROJECT CASE STUDY
========================================= */

(function () {

    "use strict";


    console.log(
        "DevOrbit Case Study JS loaded."
    );


    /* =========================================
       GET MODAL
    ========================================= */

    const modal =
        document.getElementById(
            "aloteCaseStudy"
        );


    if (!modal) {

        console.error(
            "Case Study modal not found."
        );

        return;
    }


    /* =========================================
       OPEN CASE STUDY
    ========================================= */

    function openCaseStudy() {

        console.log(
            "Opening ALote Case Study..."
        );


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

        }

    }


    /* =========================================
       CLOSE CASE STUDY
    ========================================= */

    function closeCaseStudy() {

        console.log(
            "Closing ALote Case Study..."
        );


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

    }


    /* =========================================
       OPEN BUTTON
    ========================================= */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    '[data-case-study="alote"]'
                );


            if (!button) {
                return;
            }


            event.preventDefault();


            event.stopPropagation();


            openCaseStudy();

        },
        true
    );


    /* =========================================
       CLOSE BUTTON
    ========================================= */

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(
                    ".case-study-close"
                );


            if (!button) {
                return;
            }


            event.preventDefault();


            event.stopPropagation();


            closeCaseStudy();

        },
        true
    );


    /* =========================================
       BACKDROP
    ========================================= */

    modal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === modal ||
                event.target.classList.contains(
                    "case-study-backdrop"
                )
            ) {

                closeCaseStudy();

            }

        }
    );


    /* =========================================
       ESC KEY
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "is-open"
                )
            ) {

                closeCaseStudy();

            }

        }
    );


})();