function toggleAccordion(header){

    const content = header.nextElementSibling;

    const arrow = header.querySelector("span:last-child");

    if(content.style.display === "block"){

        content.style.display = "none";

        arrow.innerHTML = "▼";

    }else{

        content.style.display = "block";

        arrow.innerHTML = "▲";

    }

}