/* =========================================
   DEVORBIT — MAIN
========================================= */

(() => {

    "use strict";


    /* =========================================
       PAGE LOADER
    ========================================= */

    const loader =
        document.getElementById("pageLoader");


    if (loader) {

        const minimumDisplayTime = 700;

        const pageStartTime =
            performance.now();


        function hideLoader() {

            const elapsed =
                performance.now() -
                pageStartTime;


            const remainingTime =
                Math.max(
                    0,
                    minimumDisplayTime - elapsed
                );


            setTimeout(() => {

                document.body.classList.add(
                    "page-ready"
                );


                loader.classList.add(
                    "hidden"
                );


                setTimeout(() => {

                    loader.setAttribute(
                        "aria-hidden",
                        "true"
                    );


                    loader.style.pointerEvents =
                        "none";

                }, 900);

            }, remainingTime);

        }


        if (
            document.readyState === "complete"
        ) {

            hideLoader();

        } else {

            window.addEventListener(
                "load",
                hideLoader,
                {
                    once: true
                }
            );

        }


        setTimeout(() => {

            if (
                !loader.classList.contains(
                    "hidden"
                )
            ) {

                hideLoader();

            }

        }, 5000);

    }


    /* =========================================
       CONTACT FORM
    ========================================= */

    const contactForm =
        document.getElementById(
            "contactForm"
        );


    if (!contactForm) {
        return;
    }


    const contactButton =
        document.getElementById(
            "contactSubmit"
        );


    if (!contactButton) {

        console.error(
            "DevOrbit: contactSubmit not found."
        );

        return;
    }


    const buttonText =
        contactButton.querySelector(
            "span"
        );


    if (!buttonText) {

        console.error(
            "DevOrbit: button text not found."
        );

        return;
    }


    /* =========================================
       FORM SUBMIT
    ========================================= */

    contactForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /* =====================================
               FORM DATA
            ===================================== */

            const formData =
                new FormData(
                    contactForm
                );


            const data = {

                name:
                    formData.get("Name"),

                email:
                    formData.get("Email"),

                subject:
                    formData.get("Subject"),

                message:
                    formData.get("Message")

            };


            /* =====================================
               VALIDATION
            ===================================== */

            if (
                !data.name ||
                !data.email ||
                !data.subject ||
                !data.message
            ) {

                buttonText.textContent =
                    "Fill All Fields";

                return;
            }


            /* =====================================
               LOADING
            ===================================== */

            buttonText.textContent =
                "Sending...";

            contactButton.disabled =
                true;


            try {

                /* =================================
                   SEND REQUEST
                ================================= */

                const response =
                    await fetch(
                        "/api/contact",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json",
                                "Accept":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(
                                    data
                                )
                        }
                    );


                /* =================================
                   GET RAW RESPONSE FIRST
                ================================= */

                const rawResponse =
                    await response.text();


                console.log(
                    "API Status:",
                    response.status
                );


                console.log(
                    "API Response:",
                    rawResponse
                );


                /* =================================
                   CHECK EMPTY RESPONSE
                ================================= */

                if (!rawResponse) {

                    throw new Error(
                        `Server returned an empty response. Status: ${response.status}`
                    );

                }


                /* =================================
                   PARSE JSON
                ================================= */

                let result;

                try {

                    result =
                        JSON.parse(
                            rawResponse
                        );

                } catch (jsonError) {

                    console.error(
                        "Invalid JSON response:",
                        rawResponse
                    );

                    throw new Error(
                        `Server returned invalid JSON. Status: ${response.status}`
                    );

                }


                /* =================================
                   CHECK HTTP ERROR
                ================================= */

                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        `Request failed with status ${response.status}`
                    );

                }


                /* =================================
                   SUCCESS
                ================================= */

                console.log(
                    "DevOrbit Contact Success:",
                    result
                );


                buttonText.textContent =
                    "Message Sent ✓";


                contactForm.reset();


                /* Reset button */
                setTimeout(() => {

                    buttonText.textContent =
                        "Send Message";

                }, 3000);


            } catch (error) {

                console.error(
                    "DevOrbit Contact Error:",
                    error
                );


                buttonText.textContent =
                    "Try Again";


            } finally {

                contactButton.disabled =
                    false;

            }

        }
    );

})();