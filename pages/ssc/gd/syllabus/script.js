// =======================================================
// GOVT EXAM PREP
// SSC CHSL SYLLABUS ACCORDION
// =======================================================

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".subject-card");
    const contents = document.querySelectorAll(".accordion-content");

    cards.forEach(card => {

        card.addEventListener("click", () => {

            const targetId = card.getAttribute("data-target");
            const targetContent = document.getElementById(targetId);

            const isActive = card.classList.contains("active");

            // Close everything
            cards.forEach(c => c.classList.remove("active"));

            contents.forEach(content => {
                content.classList.remove("active");
            });

            // If it was already open, keep it closed
            if (isActive) return;

            // Open clicked one
            card.classList.add("active");
            targetContent.classList.add("active");

            // Smooth scroll
            setTimeout(() => {

                targetContent.scrollIntoView({

                    behavior: "smooth",
                    block: "start"

                });

            }, 150);

        });

    });

});