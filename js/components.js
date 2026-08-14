async function loadComponent(id, file) {

    try {

        const basePath = "/govt-exam-prep/";

        const response = await fetch(basePath + file);

        if (!response.ok) {
            throw new Error(`Failed to load ${file}`);
        }

        const html = await response.text();

        const element = document.getElementById(id);

        if (element) {
            element.innerHTML = html;
        }

    } catch (error) {

        console.error("Component not loaded:", error);

    }

}

loadComponent("header", "components/header.html");
loadComponent("footer", "components/footer.html");