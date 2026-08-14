/* =========================================
   JOB ALERT SYSTEM
========================================= */

const jobsContainer =
    document.getElementById("jobsContainer");

const noResults =
    document.getElementById("noResults");

const resultCount =
    document.getElementById("resultCount");

const searchInput =
    document.getElementById("jobSearch");

const clearSearch =
    document.getElementById("clearSearch");

const stateFilter =
    document.getElementById("stateFilter");

const sortJobs =
    document.getElementById("sortJobs");

const categoryButtons =
    document.querySelectorAll(".category-btn");


let currentCategory = "All";

let currentState = "All";

let currentSearch = "";


/* =========================================
   FORMAT DATE
========================================= */

function formatDate(date) {

    if (!date || date === "To be announced") {
        return date;
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate)) {
        return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}


/* =========================================
   DAYS LEFT
========================================= */

function getDaysLeft(lastDate) {

    if (
        !lastDate ||
        lastDate === "To be announced" ||
        lastDate === "—" ||
        lastDate === "-"
    ) {
        return null;
    }

    const deadline = new Date(lastDate);

    if (isNaN(deadline.getTime())) {
        return null;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);
    deadline.setHours(0, 0, 0, 0);

    const difference = deadline - today;

    return Math.ceil(
        difference / (1000 * 60 * 60 * 24)
    );
}


/* =========================================
   STATUS
========================================= */

function getStatus(job) {

    if (job.status === "upcoming") {

        return {
            text: "Upcoming",
            className: "status-upcoming"
        };

    }

    if (job.status === "closed") {

        return {
            text: "Closed",
            className: "status-closed"
        };

    }

    const daysLeft =
        getDaysLeft(job.lastDate);

    if (daysLeft !== null && daysLeft < 0) {

        return {
            text: "Closed",
            className: "status-closed"
        };

    }

    if (daysLeft !== null && daysLeft <= 7) {

        return {
            text: "Closing Soon",
            className: "status-warning"
        };

    }

    return {
        text: "Applications Open",
        className: "status-active"
    };
}


/* =========================================
   CREATE JOB CARD
========================================= */

function createJobCard(job) {

    const status =
        getStatus(job);

    const daysLeft =
        getDaysLeft(job.lastDate);

    let deadlineText = "";

    if (daysLeft !== null && daysLeft >= 0) {

        deadlineText =
            `<span class="deadline-count">
                ${daysLeft} days left
            </span>`;

    }


    return `

        <article class="job-card">

            <div class="job-card-top">

                <div class="job-category">

                    <span class="category-badge ${job.category.toLowerCase()}">

                        ${job.category}

                    </span>

                    <span class="job-post-date">

                        <i class="fa-regular fa-calendar"></i>

                        Posted recently

                    </span>

                </div>

                <span class="job-status ${status.className}">

                    ${status.text}

                </span>

            </div>


            <div class="job-card-content">

                <div class="job-main-info">

                    <h3>
                        ${job.title}
                    </h3>

                    <p class="job-subtitle">
                        ${job.subtitle}
                    </p>

                    <p class="recruitment-board">

                        <i class="fa-solid fa-building-columns"></i>

                        ${job.recruitmentBoard}

                    </p>

                </div>


                <div class="job-details-grid">


                    <div class="job-detail">

                        <span class="detail-label">

                            <i class="fa-solid fa-graduation-cap"></i>

                            Qualification

                        </span>

                        <strong>
                            ${job.qualification}
                        </strong>

                    </div>


                    <div class="job-detail">

                        <span class="detail-label">

                            <i class="fa-solid fa-calendar-plus"></i>

                            Application Start

                        </span>

                        <strong>
                            ${formatDate(job.applicationStart)}
                        </strong>

                    </div>


                    <div class="job-detail">

                        <span class="detail-label">

                            <i class="fa-solid fa-calendar-xmark"></i>

                            Last Date

                        </span>

                        <strong>
                            ${formatDate(job.lastDate)}
                        </strong>

                        ${deadlineText}

                    </div>


                    <div class="job-detail">

                        <span class="detail-label">

                            <i class="fa-solid fa-users"></i>

                            Vacancies

                        </span>

                        <strong>
                            ${job.vacancies}
                        </strong>

                    </div>


                </div>

            </div>


            <div class="job-card-footer">

                <div class="job-meta">

                    <span>

                        <i class="fa-solid fa-location-dot"></i>

                        ${job.state}

                    </span>

                    <span>

                        <i class="fa-solid fa-file-lines"></i>

                        ${job.advertisement}

                    </span>

                </div>


                <a
                    href="details.html?id=${job.id}"
                    class="job-details-btn">

                    Know More

                    <i class="fa-solid fa-arrow-right"></i>

                </a>

            </div>

        </article>

    `;
}


/* =========================================
   FILTER JOBS
========================================= */
function filterJobs() {

    let filteredJobs = [...jobAlerts];


    /* =========================================
       CATEGORY FILTER
    ========================================== */

    if (currentCategory !== "All") {

        filteredJobs = filteredJobs.filter(job =>
            job.category === currentCategory
        );

    }


    /* =========================================
       STATE FILTER
    ========================================== */

    if (currentState !== "All") {

        filteredJobs = filteredJobs.filter(job =>
            job.state === currentState
        );

    }


    /* =========================================
       SEARCH
    ========================================== */

    if (currentSearch.trim() !== "") {

        const search =
            currentSearch.toLowerCase().trim();

        filteredJobs = filteredJobs.filter(job => {

            return (

                job.title
                    .toLowerCase()
                    .includes(search)

                ||

                job.subtitle
                    .toLowerCase()
                    .includes(search)

                ||

                job.recruitmentBoard
                    .toLowerCase()
                    .includes(search)

                ||

                job.qualification
                    .toLowerCase()
                    .includes(search)

                ||

                job.category
                    .toLowerCase()
                    .includes(search)

            );

        });

    }


    /* =========================================
       IMPORTANT
       "NO VACANCY" RECORDS ARE NOT REAL JOBS
       ========================================== */

    const actualJobs = filteredJobs.filter(
        job => job.type !== "no-vacancy"
    );


    /* =========================================
       SORT ONLY REAL JOBS
    ========================================== */

    if (sortJobs.value === "latest") {

        actualJobs.sort((a, b) => {

            const dateA =
                new Date(a.applicationStart);

            const dateB =
                new Date(b.applicationStart);

            return dateB - dateA;

        });

    }


    if (sortJobs.value === "deadline") {

        actualJobs.sort((a, b) => {

            const dateA =
                new Date(a.lastDate);

            const dateB =
                new Date(b.lastDate);

            return dateA - dateB;

        });

    }


    if (sortJobs.value === "title") {

        actualJobs.sort((a, b) =>
            a.title.localeCompare(b.title)
        );

    }


    /* =========================================
       ALL JOBS
       → ONLY REAL JOBS
    ========================================== */

    if (
        currentCategory === "All" &&
        currentState === "All"
    ) {

        renderJobs(actualJobs);

        return;
    }


    /* =========================================
       SPECIFIC CATEGORY / STATE
    ========================================== */

    if (actualJobs.length > 0) {

        renderJobs(actualJobs);

        return;
    }


    /* =========================================
       NO REAL JOB
       → FIND NO-VACANCY MESSAGE
    ========================================== */

    const noVacancyJob =
        filteredJobs.find(
            job => job.type === "no-vacancy"
        );


    if (noVacancyJob) {

        jobsContainer.innerHTML =
            createNoVacancyCard(noVacancyJob);

        resultCount.textContent = "0";

        noResults.style.display = "none";

        return;

    }


    /* =========================================
       NOTHING FOUND
    ========================================== */

    renderJobs([]);

}

/* =========================================
   RENDER JOBS
========================================= */
function createNoVacancyCard(job) {

    return `

        <article class="no-vacancy-card">

            <div class="no-vacancy-icon">

                <i class="fa-solid fa-circle-info"></i>

            </div>

            <div class="no-vacancy-content">

                <span class="category-badge ${job.category.toLowerCase()}">
                    ${job.category}
                </span>

                <h3>
                    ${job.title}
                </h3>

                <p>
                    ${job.message}
                </p>

                <a
                    href="${job.officialWebsite}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="official-site-btn">

                    Visit Official Website

                    <i class="fa-solid fa-arrow-up-right-from-square"></i>

                </a>

            </div>

        </article>

    `;
}

function renderJobs(jobs) {

    if (!jobsContainer) {
        console.error("jobsContainer not found!");
        return;
    }

    jobsContainer.innerHTML = "";

    resultCount.textContent = jobs.length;

    if (jobs.length === 0) {

        noResults.style.display = "block";

        return;
    }

    noResults.style.display = "none";


    const cards = jobs.map(job => {

        try {

            if (job.type === "no-vacancy") {

                return createNoVacancyCard(job);

            }

            return createJobCard(job);

        } catch (error) {

            console.error(
                "Error rendering job:",
                job,
                error
            );

            return "";

        }

    }).join("");


    jobsContainer.innerHTML = cards;
}

/* =========================================
   CATEGORY BUTTONS
========================================= */

categoryButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            categoryButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            currentCategory =
                button.dataset.category;

            filterJobs();

        }
    );

});


/* =========================================
   SEARCH
========================================= */

searchInput.addEventListener(
    "input",
    () => {

        currentSearch =
            searchInput.value;

        filterJobs();

    }
);


/* =========================================
   CLEAR SEARCH
========================================= */

clearSearch.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        currentSearch = "";

        filterJobs();

        searchInput.focus();

    }
);


/* =========================================
   STATE FILTER
========================================= */

stateFilter.addEventListener(
    "change",
    () => {

        currentState =
            stateFilter.value;

        filterJobs();

    }
);


/* =========================================
   SORT
========================================= */

sortJobs.addEventListener(
    "change",
    filterJobs
);


/* =========================================
   INITIAL LOAD
========================================= */

filterJobs();