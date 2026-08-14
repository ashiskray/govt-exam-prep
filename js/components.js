async function loadComponent(id, file) {
    const element = document.getElementById(id);

    if (!element) {
        console.error(`Element #${id} not found.`);
        return;
    }

    try {
        const response = await fetch(file, {
            cache: "no-cache"
        });

        if (!response.ok) {
            throw new Error(
                `${file} returned ${response.status} ${response.statusText}`
            );
        }

        const html = await response.text();

        element.innerHTML = html;

    } catch (error) {
        console.error(`Failed to load ${file}:`, error);
    }
}


// Load Header
loadComponent("header", "/components/header.html");

// Load Footer
loadComponent("footer", "/components/footer.html");