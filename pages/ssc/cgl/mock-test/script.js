// ==========================================
// SSC CGL MOCK TEST DASHBOARD
// ==========================================
// This JavaScript handles:
// 1. Completed mock tests
// 2. Progress counter
// 3. Progress bar
// 4. Completed button appearance
//
// IMPORTANT:
// Test page links are controlled directly
// from index.html using href="".
// ==========================================


const progressText = document.getElementById("progressText");
const progressFill = document.getElementById("progressFill");

const testButtons = document.querySelectorAll(".mock-btn");


// ==========================================
// GET COMPLETED TESTS
// ==========================================

function getCompletedTests() {

    try {

        return JSON.parse(
            localStorage.getItem("sscCglCompletedTests")
        ) || [];

    } catch (error) {

        return [];

    }

}


// ==========================================
// SAVE COMPLETED TESTS
// ==========================================

function saveCompletedTests(tests) {

    localStorage.setItem(
        "sscCglCompletedTests",
        JSON.stringify(tests)
    );

}


// ==========================================
// MARK A TEST AS COMPLETED
// ==========================================
//
// Example:
//
// markTestCompleted(1);
//
// This will mark Mock Test 1 as completed.
// ==========================================

function markTestCompleted(testNumber) {

    const completedTests = getCompletedTests();

    if (!completedTests.includes(testNumber)) {

        completedTests.push(testNumber);

        saveCompletedTests(completedTests);

    }

    updateUI();

}


// ==========================================
// UPDATE PROGRESS UI
// ==========================================

function updateUI() {

    const completedTests = getCompletedTests();


    // ------------------------------
    // Progress text
    // ------------------------------

    progressText.textContent =
        `${completedTests.length} / 10`;


    // ------------------------------
    // Progress bar
    // ------------------------------

    progressFill.style.width =
        `${completedTests.length * 10}%`;


    // ------------------------------
    // Update test buttons
    // ------------------------------

    testButtons.forEach(button => {

        const testNumber =
            Number(button.dataset.test);


        if (completedTests.includes(testNumber)) {

            button.textContent = "✓ Completed";

            button.classList.add("completed");

            button.setAttribute(
                "aria-disabled",
                "true"
            );

        } else {

            button.textContent = "Start Test";

            button.classList.remove("completed");

            button.removeAttribute(
                "aria-disabled"
            );

        }

    });

}


// ==========================================
// INITIALIZE
// ==========================================

updateUI();