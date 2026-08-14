/* =========================================================
   GOVT EXAM PREP
   JOB DETAILS PAGE
========================================================= */


/* =========================================================
   GET JOB ID FROM URL
========================================================= */

const params =
    new URLSearchParams(window.location.search);

const jobId =
    params.get("id");


console.log("Job ID:", jobId);


/* =========================================================
   CHECK JOB DATA
========================================================= */

if (typeof jobAlerts === "undefined") {

    console.error(
        "jobAlerts is not available. Check jobs.js path."
    );

} else {

    console.log(
        "Total jobs loaded:",
        jobAlerts.length
    );


    const job =
        jobAlerts.find(
            item => item.id === jobId
        );


    console.log(
        "Selected job:",
        job
    );


    /* =====================================================
       JOB NOT FOUND
    ===================================================== */

    if (!job) {

        const container =
            document.querySelector(
                ".details-container"
            );


        if (container) {

            container.innerHTML = `

                <div class="job-not-found">

                    <i class="fa-solid fa-circle-exclamation"></i>

                    <h1>
                        Job Not Found
                    </h1>

                    <p>
                        We could not find the recruitment
                        you are looking for.
                    </p>

                    <a href="index.html">

                        <i class="fa-solid fa-arrow-left"></i>

                        Back To Government Jobs

                    </a>

                </div>

            `;

        }

    } else {


        /* =================================================
           PAGE TITLE
        ================================================= */

        document.title =
            `${job.title} | GOVT EXAM PREP`;


        /* =================================================
           BASIC INFORMATION
        ================================================= */

        setText(
            "breadcrumbTitle",
            job.title
        );


        setText(
            "jobCategory",
            job.category
        );


        setText(
            "jobTitle",
            job.title
        );


        setText(
            "jobSubtitle",
            job.subtitle
        );


        setText(
            "recruitmentBoard",
            job.recruitmentBoard
        );


        /* =================================================
           QUICK INFORMATION
        ================================================= */

        setText(
            "qualification",
            job.qualification
        );


        setText(
            "applicationStart",
            formatDate(job.applicationStart)
        );


        setText(
            "lastDate",
            formatDate(job.lastDate)
        );


        setText(
            "vacancies",
            job.vacancies
        );


        /* =================================================
           TABLE INFORMATION
        ================================================= */

        setText(
            "tableStartDate",
            formatDate(job.applicationStart)
        );


        setText(
            "tableLastDate",
            formatDate(job.lastDate)
        );


        setText(
            "eligibilityQualification",
            job.qualification
        );


        setText(
            "ageLimit",
            job.ageLimit || "As per official notification"
        );


        /* =================================================
           SIDEBAR
        ================================================= */

        setText(
            "sideBoard",
            job.recruitmentBoard
        );


        setText(
            "sideState",
            job.state
        );


        setText(
            "sideAdvertisement",
            job.advertisement || "—"
        );


        /* =================================================
           DESCRIPTION
        ================================================= */

        setText(
            "description",
            job.description || "Details will be updated soon."
        );


        setText(
            "aboutExam",
            job.aboutExam || "Details will be updated soon."
        );


        setText(
            "examPattern",
            job.examPattern || "Please refer to the official notification."
        );


        /* =================================================
           STATUS
        ================================================= */

        const status =
            getJobStatus(job);


        const statusElement =
            document.getElementById(
                "jobStatus"
            );


        if (statusElement) {

            statusElement.textContent =
                status.text;

            statusElement.classList.add(
                status.className
            );

        }


        setText(
            "sidebarStatus",
            status.text
        );


        /* =================================================
           SELECTION PROCESS
        ================================================= */

        const selectionContainer =
            document.getElementById(
                "selectionProcess"
            );


        if (selectionContainer) {

            selectionContainer.innerHTML = "";


            if (
                Array.isArray(
                    job.selectionProcess
                )
                &&
                job.selectionProcess.length
            ) {

                job.selectionProcess.forEach(
                    (step, index) => {

                        selectionContainer.innerHTML += `

                            <div class="process-step">

                                <span>
                                    ${index + 1}
                                </span>

                                <strong>
                                    ${step}
                                </strong>

                            </div>

                        `;

                    }
                );

            } else {

                selectionContainer.innerHTML = `

                    <div class="process-step">

                        <span>✓</span>

                        <strong>
                            Please refer to the official
                            recruitment notification.
                        </strong>

                    </div>

                `;

            }

        }


        /* =================================================
           HOW TO APPLY
        ================================================= */

        const applySteps =
            document.getElementById(
                "howToApply"
            );


        if (applySteps) {

            applySteps.innerHTML = "";


            if (
                Array.isArray(job.howToApply)
                &&
                job.howToApply.length
            ) {

                job.howToApply.forEach(
                    step => {

                        applySteps.innerHTML += `

                            <li>
                                ${step}
                            </li>

                        `;

                    }
                );

            }

        }


        /* =================================================
           LINKS
        ================================================= */

        const officialLink =
            document.getElementById(
                "officialLink"
            );


        const applyLink =
            document.getElementById(
                "applyLink"
            );


        const notificationLink =
            document.getElementById(
                "notificationLink"
            );


        const sidebarApply =
            document.getElementById(
                "sidebarApply"
            );


        /* Official website */

        if (officialLink) {

            officialLink.href =
                job.officialWebsite || "#";

        }


        /* Apply */

        if (applyLink) {

            applyLink.href =
                job.applyLink || "#";

        }


        if (sidebarApply) {

            sidebarApply.href =
                job.applyLink || "#";

        }


        /* Notification */

        const notificationUrl =
            job.officialNotification;


        if (
            notificationLink
        ) {

            if (
                notificationUrl &&
                notificationUrl !== "#"
            ) {

                notificationLink.href =
                    notificationUrl;

            } else {

                notificationLink.style.display =
                    "none";

            }

        }

    }

}


/* =========================================================
   HELPER — SET TEXT
========================================================= */

function setText(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value ?? "—";

    }

}


/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(date) {

    if (
        !date ||
        date === "—" ||
        date === "-" ||
        date === "To be announced"
    ) {

        return date || "—";

    }


    const parsedDate =
        new Date(date);


    if (
        isNaN(
            parsedDate.getTime()
        )
    ) {

        return date;

    }


    return parsedDate.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* =========================================================
   STATUS
========================================================= */

function getJobStatus(job) {

    if (
        job.type === "no-vacancy"
    ) {

        return {

            text:
                "No Active Vacancy",

            className:
                "status-closed"

        };

    }


    if (
        job.status === "upcoming"
    ) {

        return {

            text:
                "Upcoming",

            className:
                "status-upcoming"

        };

    }


    if (
        job.status === "closed"
    ) {

        return {

            text:
                "Closed",

            className:
                "status-closed"

        };

    }


    const daysLeft =
        getDaysLeft(
            job.lastDate
        );


    if (
        daysLeft !== null &&
        daysLeft < 0
    ) {

        return {

            text:
                "Closed",

            className:
                "status-closed"

        };

    }


    if (
        daysLeft !== null &&
        daysLeft <= 7
    ) {

        return {

            text:
                "Closing Soon",

            className:
                "status-warning"

        };

    }


    return {

        text:
            "Applications Open",

        className:
            "status-active"

    };

}


/* =========================================================
   DAYS LEFT
========================================================= */

function getDaysLeft(lastDate) {

    if (
        !lastDate ||
        lastDate === "—" ||
        lastDate === "-"
    ) {

        return null;

    }


    const deadline =
        new Date(lastDate);


    if (
        isNaN(
            deadline.getTime()
        )
    ) {

        return null;

    }


    const today =
        new Date();


    today.setHours(
        0, 0, 0, 0
    );


    deadline.setHours(
        0, 0, 0, 0
    );


    return Math.ceil(

        (
            deadline - today
        )
        /
        (
            1000 *
            60 *
            60 *
            24
        )

    );

}