/*=========================================================
        GOVT EXAM PREP
        CONTRIBUTE PAGE SCRIPT
=========================================================*/


/*=========================================================
                    EXAM DATA
=========================================================*/

const examData = {

    "SSC": {

        exams: [
            "CHSL",
            "CGL",
            "MTS",
            "GD",
            "Stenographer",
            "JE",
            "Selection Post",
            "Delhi Police",
            "Other"
        ],

        subjects: [
            "English",
            "Mathematics",
            "Reasoning",
            "General Awareness",
            "Computer",
            "Hindi",
            "Other"
        ]

    },


    "Railway": {

        exams: [
            "NTPC",
            "ALP",
            "Group D",
            "Technician",
            "JE",
            "RPF",
            "Other"
        ],

        subjects: [
            "Mathematics",
            "Reasoning",
            "General Science",
            "General Awareness",
            "Current Affairs",
            "English",
            "Hindi",
            "Other"
        ]

    },


    "Banking": {

        exams: [
            "IBPS PO",
            "IBPS Clerk",
            "SBI PO",
            "SBI Clerk",
            "RBI Grade B",
            "RBI Assistant",
            "Other"
        ],

        subjects: [
            "English",
            "Reasoning",
            "Quantitative Aptitude",
            "Computer",
            "Banking Awareness",
            "General Awareness",
            "Current Affairs",
            "Other"
        ]

    },


    "UPSC": {

        exams: [
            "Civil Services Examination (CSE)",
            "NDA",
            "CDS",
            "CAPF",
            "CMS",
            "IES",
            "IFoS",
            "Other"
        ],

        subjects: [
            "History",
            "Polity",
            "Geography",
            "Economics",
            "Environment",
            "Science",
            "Ethics",
            "Essay",
            "Current Affairs",
            "Optional",
            "Other"
        ]

    },


    "State Exams": {

        exams: [
            "PSC",
            "Police",
            "Teacher",
            "SSC",
            "Group C",
            "Group D",
            "Other"
        ],

        subjects: [
            "English",
            "Mathematics",
            "Reasoning",
            "General Knowledge",
            "General Science",
            "Current Affairs",
            "Other"
        ]

    },


    "Defence": {

        exams: [
            "Agniveer",
            "Navy",
            "Air Force",
            "Territorial Army",
            "Other"
        ],

        subjects: [
            "English",
            "Mathematics",
            "Reasoning",
            "General Knowledge",
            "Science",
            "Current Affairs",
            "Other"
        ]

    },


    "Other": {

        exams: [
            "Other"
        ],

        subjects: [
            "Other"
        ]

    }

};


/*=========================================================
                    GET ELEMENTS
=========================================================*/

const category = document.getElementById("category");

const exam = document.getElementById("exam");

const subject = document.getElementById("subject");

const form = document.getElementById("contributeForm");

const submitBtn = document.querySelector(".submit-btn");

const textarea = document.getElementById("description");


/*=========================================================
            CATEGORY → EXAM + SUBJECT
=========================================================*/

if (category) {

    category.addEventListener("change", function () {

        const selectedCategory = this.value;


        /* Clear existing options */

        exam.innerHTML = "";

        subject.innerHTML = "";


        /* Default Exam */

        const defaultExam = document.createElement("option");

        defaultExam.value = "";

        defaultExam.textContent = "Select Exam";

        exam.appendChild(defaultExam);


        /* Default Subject */

        const defaultSubject = document.createElement("option");

        defaultSubject.value = "";

        defaultSubject.textContent = "Select Subject";

        subject.appendChild(defaultSubject);


        /* If no category selected */

        if (!examData[selectedCategory]) {

            return;

        }


        /* Add Exams */

        examData[selectedCategory].exams.forEach(function (item) {

            const option = document.createElement("option");

            option.value = item;

            option.textContent = item;

            exam.appendChild(option);

        });


        /* Add Subjects */

        examData[selectedCategory].subjects.forEach(function (item) {

            const option = document.createElement("option");

            option.value = item;

            option.textContent = item;

            subject.appendChild(option);

        });

    });

}


/*=========================================================
                DESCRIPTION COUNTER
=========================================================*/

if (textarea) {

    textarea.setAttribute("maxlength", "500");


    const counter = document.createElement("small");

    counter.className = "description-counter";

    counter.textContent =
        `${textarea.value.length} / 500 Characters`;


    textarea.parentNode.appendChild(counter);


    textarea.addEventListener("input", function () {

        counter.textContent =
            `${this.value.length} / 500 Characters`;

    });

}


/*=========================================================
                FORM SUBMISSION
=========================================================*/

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();


        /*=================================================
                    GET FORM VALUES
        =================================================*/

        const name =
            document.getElementById("fullname")
            .value
            .trim();


        const email =
            document.getElementById("email")
            .value
            .trim();


        const categoryValue =
            category.value;


        const examValue =
            exam.value;


        const subjectValue =
            subject.value;


        const chapter =
            document.getElementById("chapter")
            .value
            .trim();


        const resourceType =
            document.getElementById("resourceType")
            .value;


        const title =
            document.getElementById("title")
            .value
            .trim();


        const description =
            document.getElementById("description")
            .value
            .trim();


        /*=================================================
                    BASIC VALIDATION
        =================================================*/

        if (name === "") {

            return;

        }


        if (categoryValue === "") {

            return;

        }


        if (examValue === "") {

            return;

        }


        if (subjectValue === "") {

            return;

        }


        if (chapter === "") {

            return;

        }


        if (resourceType === "") {

            return;

        }


        if (title === "") {

            return;

        }


        /*=================================================
                    CONSENT CHECK
        =================================================*/

        const ownershipConsent =
            document.getElementById("ownershipConsent");


        const submissionConsent =
            document.getElementById("submissionConsent");


        const usageConsent =
            document.getElementById("usageConsent");


        const copyrightConsent =
            document.getElementById("copyrightConsent");


        if (
            !ownershipConsent.checked ||
            !submissionConsent.checked ||
            !usageConsent.checked ||
            !copyrightConsent.checked
        ) {

            return;

        }


        /*=================================================
                    RECEIVER EMAIL
        =================================================*/

        const receiverEmail =
            "raydit.business@gmail.com";


        /*=================================================
                    EMAIL SUBJECT
        =================================================*/

        const emailSubject =
            `[GOVT EXAM PREP CONTRIBUTION] ${categoryValue} - ${examValue} - ${subjectValue}`;


        /*=================================================
                    EMAIL BODY
        =================================================*/

        const emailBody =

`Hello GOVT EXAM PREP Team,

I would like to contribute a study resource to GOVT EXAM PREP.

CONTRIBUTOR DETAILS
-------------------------
Name: ${name}
Email: ${email || "Not provided"}

RESOURCE DETAILS
-------------------------
Exam Category: ${categoryValue}
Exam: ${examValue}
Subject: ${subjectValue}
Chapter / Topic: ${chapter}
Resource Type: ${resourceType}
Resource Title: ${title}

DESCRIPTION
-------------------------
${description || "Not provided"}

CONTRIBUTOR CONSENT
-------------------------
I confirm that this resource belongs to me or I have permission to share it.

I voluntarily share this resource with GOVT EXAM PREP for educational purposes.

I allow GOVT EXAM PREP to use, organize, modify, format, compress, watermark, publish and distribute this resource on its website for educational purposes.

I understand that the resource may be reviewed before publication and may be rejected if it violates copyright or applicable rules.

FILE ATTACHMENT
-------------------------
I will attach my handwritten notes, PDF, PYQs, mock test or other study material to this email manually.

Thank you.

Regards,
${name}`;


        /*=================================================
                    CREATE MAILTO LINK
        =================================================*/

         const gmailURL =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    "&to=" + encodeURIComponent(receiverEmail) +
    "&su=" + encodeURIComponent(emailSubject) +
    "&body=" + encodeURIComponent(emailBody);

window.open(gmailURL, "_blank");

        /*=================================================
                    OPEN EMAIL
        =================================================*/

        window.location.href = mailtoURL;


    });

}