async function loadComponent(id, file) {
    try {
        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
        }

        const html = await response.text();

        document.getElementById(id).innerHTML = html;

    } catch (error) {
        console.error("Component not loaded:", error);
    }
}


/* ================================
   HEADER
================================ */

loadComponent("header", "/govt-exam-prep/components/header.html");


/* ================================
   FOOTER
================================ */

loadComponent("footer", "/govt-exam-prep/components/footer.html");