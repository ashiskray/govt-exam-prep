async function loadComponent(id, file) {

    try {

        const response = await fetch(file);

        const html = await response.text();

        document.getElementById(id).innerHTML = html;

    }

    catch(error){

        console.error("Component not loaded:", error);

    }

}

loadComponent("header","/components/header.html");
loadComponent("footer","/components/footer.html");