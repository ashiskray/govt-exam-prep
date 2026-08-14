document.addEventListener("DOMContentLoaded", function () {

    const email = "raydit.business@gmail.com";

    /*
    ==========================================
    EMAIL BUTTON HANDLER
    ==========================================
    */

    const emailButtons = document.querySelectorAll(
        'a[href^="mailto:"]'
    );

    emailButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();

            const subject = button.getAttribute("data-subject") || "";

            let mailtoURL = "mailto:" + email;

            if (subject) {
                mailtoURL += "?subject=" + encodeURIComponent(subject);
            }

            window.location.href = mailtoURL;

        });

    });


    /*
    ==========================================
    CONTACT CARD HOVER EFFECT
    ==========================================
    */

    const contactCards = document.querySelectorAll(".contact-card");

    contactCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {
            card.classList.add("active");
        });

        card.addEventListener("mouseleave", function () {
            card.classList.remove("active");
        });

    });


    /*
    ==========================================
    EMAIL COPY FEATURE
    ==========================================
    */

    const officialEmail = document.querySelector(".email-box p");

    if (officialEmail) {

        officialEmail.style.cursor = "pointer";

        officialEmail.title = "Click to copy email";

        officialEmail.addEventListener("click", function () {

            navigator.clipboard.writeText(email)
                .then(function () {

                    showMessage("Email copied successfully!");

                })
                .catch(function () {

                    showMessage("Email: " + email);

                });

        });

    }


    /*
    ==========================================
    SMALL NOTIFICATION
    ==========================================
    */

    function showMessage(message) {

        const oldMessage = document.querySelector(".contact-toast");

        if (oldMessage) {
            oldMessage.remove();
        }

        const toast = document.createElement("div");

        toast.className = "contact-toast";

        toast.textContent = message;

        document.body.appendChild(toast);


        setTimeout(function () {

            toast.classList.add("show");

        }, 50);


        setTimeout(function () {

            toast.classList.remove("show");

            setTimeout(function () {

                toast.remove();

            }, 300);

        }, 2500);

    }

});