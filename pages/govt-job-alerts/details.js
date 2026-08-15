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
   SEO — PAGE TITLE + META + CANONICAL
================================================= */

const seoTitle =
    `${job.title} | GOVT EXAM PREP`;

document.title = seoTitle;


/* =================================================
   SEO DESCRIPTION
================================================= */

const cleanDescription =
    String(
        job.description ||
        job.aboutExam ||
        `${job.title} government recruitment details, eligibility, vacancies, important dates and application information.`
    )
    .replace(/\s+/g, " ")
    .trim();

const seoDescription =
    cleanDescription.length > 160
        ? cleanDescription.substring(0, 157).trimEnd() + "..."
        : cleanDescription;


/* =================================================
   SEO URL
================================================= */

const seoUrl =
    `https://governmentexamprep.online/pages/govt-job-alerts/details.html?id=${encodeURIComponent(job.id)}`;


/* =================================================
   HELPER — CREATE / UPDATE META
================================================= */

function setMeta(name, content) {

    let meta =
        document.querySelector(`meta[name="${name}"]`);

    if (!meta) {

        meta =
            document.createElement("meta");

        meta.setAttribute("name", name);

        document.head.appendChild(meta);
    }

    meta.setAttribute("content", content);
}


/* =================================================
   HELPER — CREATE / UPDATE PROPERTY META
================================================= */

function setPropertyMeta(property, content) {

    let meta =
        document.querySelector(`meta[property="${property}"]`);

    if (!meta) {

        meta =
            document.createElement("meta");

        meta.setAttribute("property", property);

        document.head.appendChild(meta);
    }

    meta.setAttribute("content", content);
}


/* =================================================
   META ROBOTS
================================================= */

setMeta(
    "robots",
    "index, follow"
);


/* =================================================
   META DESCRIPTION
================================================= */

setMeta(
    "description",
    seoDescription
);


/* =================================================
   CANONICAL URL
================================================= */

let canonical =
    document.querySelector(
        'link[rel="canonical"]'
    );

if (!canonical) {

    canonical =
        document.createElement("link");

    canonical.setAttribute(
        "rel",
        "canonical"
    );

    document.head.appendChild(
        canonical
    );
}

canonical.setAttribute(
    "href",
    seoUrl
);


/* =================================================
   OPEN GRAPH
================================================= */

setPropertyMeta(
    "og:title",
    seoTitle
);

setPropertyMeta(
    "og:description",
    seoDescription
);

setPropertyMeta(
    "og:type",
    "article"
);

setPropertyMeta(
    "og:url",
    seoUrl
);

setPropertyMeta(
    "og:site_name",
    "GOVT EXAM PREP"
);


/* =================================================
   TWITTER / X
================================================= */

setMeta(
    "twitter:card",
    "summary"
);

setMeta(
    "twitter:title",
    seoTitle
);

setMeta(
    "twitter:description",
    seoDescription
);


/* =================================================
   WEBPAGE STRUCTURED DATA
================================================= */

const existingSchema =
    document.getElementById(
        "jobPageSchema"
    );

if (existingSchema) {
    existingSchema.remove();
}

const schema =
    document.createElement("script");

schema.id =
    "jobPageSchema";

schema.type =
    "application/ld+json";

schema.textContent =
    JSON.stringify({

        "@context":
            "https://schema.org",

        "@type":
            "WebPage",

        "name":
            seoTitle,

        "description":
            seoDescription,

        "url":
            seoUrl,

        "isPartOf": {

            "@type":
                "WebSite",

            "name":
                "GOVT EXAM PREP",

            "url":
                "https://governmentexamprep.online/"

        },

        "about": {

            "@type":
                "Thing",

            "name":
                job.title

        }

    });

document.head.appendChild(
    schema
);

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