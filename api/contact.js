/* =========================================
   DEVORBIT — CONTACT API
   Resend Email Service
========================================= */

const { Resend } = require("resend");


/* =========================================
   API HANDLER
========================================= */

module.exports = async function handler(req, res) {

    /* =========================================
       ONLY POST REQUESTS
    ========================================= */

    if (req.method !== "POST") {

        return res.status(405).json({
            success: false,
            message: "Method not allowed"
        });

    }


    /* =========================================
       CHECK RESEND API KEY
    ========================================= */

    const apiKey =
        process.env.RESEND_API_KEY;


    if (!apiKey) {

        console.error(
            "RESEND_API_KEY is missing."
        );

        return res.status(500).json({
            success: false,
            message:
                "Email service is not configured."
        });

    }


    /* =========================================
       CREATE RESEND CLIENT
    ========================================= */

    const resend =
        new Resend(apiKey);


    try {

        /* =====================================
           GET REQUEST DATA
        ===================================== */

        const {
            name,
            email,
            subject,
            message
        } = req.body || {};


        /* =====================================
           VALIDATION
        ===================================== */

        if (
            !name ||
            !email ||
            !subject ||
            !message
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please fill in all fields."
            });

        }


        /* =====================================
           SEND EMAIL
        ===================================== */

        const {
            data,
            error
        } = await resend.emails.send({

            /* -------------------------------
               SENDER
            -------------------------------- */

            from:
                "DevOrbit <onboarding@resend.dev>",


            /* -------------------------------
               RECEIVER
            -------------------------------- */

            to: [
                "devorbit.03@gmail.com"
            ],


            /* -------------------------------
               REPLY TO VISITOR
            -------------------------------- */

            replyTo:
                email,


            /* -------------------------------
               EMAIL SUBJECT
            -------------------------------- */

            subject:
                `DevOrbit Contact: ${subject}`,


            /* -------------------------------
               EMAIL HTML
            -------------------------------- */

            html: `
                <!DOCTYPE html>

                <html>

                <head>

                    <meta charset="UTF-8">

                    <title>
                        DevOrbit Contact
                    </title>

                </head>


                <body
                    style="
                        margin: 0;
                        padding: 30px;
                        background: #f5f5f5;
                        font-family:
                            Arial,
                            Helvetica,
                            sans-serif;
                        color: #111111;
                    "
                >

                    <div
                        style="
                            max-width: 650px;
                            margin: 0 auto;
                            background: #ffffff;
                            padding: 35px;
                            border-radius: 12px;
                        "
                    >

                        <!-- HEADER -->

                        <h1
                            style="
                                margin-top: 0;
                                margin-bottom: 30px;
                                font-size: 28px;
                            "
                        >
                            New DevOrbit Contact
                        </h1>


                        <!-- NAME -->

                        <div
                            style="
                                margin-bottom: 20px;
                            "
                        >

                            <p
                                style="
                                    margin: 0 0 6px;
                                    font-size: 12px;
                                    letter-spacing: 2px;
                                    text-transform: uppercase;
                                    color: #888888;
                                "
                            >
                                Name
                            </p>

                            <p
                                style="
                                    margin: 0;
                                    font-size: 16px;
                                "
                            >
                                ${name}
                            </p>

                        </div>


                        <!-- EMAIL -->

                        <div
                            style="
                                margin-bottom: 20px;
                            "
                        >

                            <p
                                style="
                                    margin: 0 0 6px;
                                    font-size: 12px;
                                    letter-spacing: 2px;
                                    text-transform: uppercase;
                                    color: #888888;
                                "
                            >
                                Email
                            </p>

                            <p
                                style="
                                    margin: 0;
                                    font-size: 16px;
                                "
                            >
                                ${email}
                            </p>

                        </div>


                        <!-- SUBJECT -->

                        <div
                            style="
                                margin-bottom: 25px;
                            "
                        >

                            <p
                                style="
                                    margin: 0 0 6px;
                                    font-size: 12px;
                                    letter-spacing: 2px;
                                    text-transform: uppercase;
                                    color: #888888;
                                "
                            >
                                Subject
                            </p>

                            <p
                                style="
                                    margin: 0;
                                    font-size: 16px;
                                "
                            >
                                ${subject}
                            </p>

                        </div>


                        <!-- DIVIDER -->

                        <hr
                            style="
                                border: none;
                                border-top:
                                    1px solid #e5e5e5;
                                margin: 25px 0;
                            "
                        >


                        <!-- MESSAGE -->

                        <div>

                            <p
                                style="
                                    margin: 0 0 10px;
                                    font-size: 12px;
                                    letter-spacing: 2px;
                                    text-transform: uppercase;
                                    color: #888888;
                                "
                            >
                                Message
                            </p>


                            <div
                                style="
                                    background: #f7f7f7;
                                    padding: 20px;
                                    border-radius: 8px;
                                    font-size: 16px;
                                    line-height: 1.7;
                                    white-space: pre-wrap;
                                "
                            >
                                ${message}
                            </div>

                        </div>


                        <!-- FOOTER -->

                        <p
                            style="
                                margin-top: 30px;
                                margin-bottom: 0;
                                font-size: 12px;
                                color: #999999;
                            "
                        >
                            Sent from the DevOrbit
                            website contact form.
                        </p>

                    </div>

                </body>

                </html>
            `
        });


        /* =====================================
           RESEND ERROR
        ===================================== */

        if (error) {

            console.error(
                "RESEND ERROR:",
                error
            );

            return res.status(400).json({
                success: false,
                message:
                    error.message ||
                    "Failed to send email."
            });

        }


        /* =====================================
           SUCCESS
        ===================================== */

        console.log(
            "DEVORBIT EMAIL SENT:",
            data
        );


        return res.status(200).json({
            success: true,
            message:
                "Message sent successfully.",
            data
        });


    } catch (error) {

        /* =====================================
           SERVER ERROR
        ===================================== */

        console.error(
            "DEVORBIT CONTACT API ERROR:",
            error
        );


        return res.status(500).json({
            success: false,
            message:
                error.message ||
                "Something went wrong."
        });

    }

};