/* ==========================================
   GOVT EXAM PREP - PDF EBOOK READER
========================================== */

// PDF.js Worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

// PDF Path
const url = "./important commission.pdf";
// Canvas
const canvas = document.getElementById("pdf-render");
const ctx = canvas.getContext("2d");

// Elements
const pageNum = document.getElementById("page-num");
const pageCount = document.getElementById("page-count");
const progress = document.getElementById("progress");
const progressText = document.getElementById("progressText");

const prevBtn = document.getElementById("prev-page");
const nextBtn = document.getElementById("next-page");

// Variables
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let scale = 1.6;
let isRendering = false;
let pendingPage = null;

// Restore last page
const savedPage = localStorage.getItem("computer-book-page");

if(savedPage){
    currentPage = parseInt(savedPage);
}

// ============================
// Render Page
// ============================

function renderPage(num){

    isRendering = true;

    pdfDoc.getPage(num).then(page=>{

        const viewport = page.getViewport({ scale: scale });

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        const renderContext = {

            canvasContext:ctx,
            viewport:viewport

        };

        page.render(renderContext).promise.then(()=>{

            isRendering = false;

            if(pendingPage!==null){

                renderPage(pendingPage);

                pendingPage=null;

            }

        });

        pageNum.textContent=num;

        let percentage=Math.floor((num/totalPages)*100);

        progress.style.width=percentage+"%";

        progressText.textContent=percentage+"%";

        localStorage.setItem(
            "computer-book-page",
            num
        );

    });

}

// ============================
// Queue Render
// ============================

function queueRenderPage(num){

    if(isRendering){

        pendingPage=num;

    }else{

        renderPage(num);

    }

}

// ============================
// Previous
// ============================

function showPrevious(){

    if(currentPage<=1) return;

    currentPage--;

    queueRenderPage(currentPage);

}

// ============================
// Next
// ============================

function showNext(){

    if(currentPage>=totalPages) return;

    currentPage++;

    queueRenderPage(currentPage);

}

// ============================
// Load PDF
// ============================

pdfjsLib.getDocument(url).promise.then(pdf=>{

    pdfDoc=pdf;

    totalPages=pdf.numPages;

    pageCount.textContent=totalPages;

    if(currentPage>totalPages){

        currentPage=1;

    }

    renderPage(currentPage);

});

// ============================
// Buttons
// ============================

prevBtn.addEventListener(
    "click",
    showPrevious
);

nextBtn.addEventListener(
    "click",
    showNext
);

// ============================
// Keyboard Support
// ============================

document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowRight"){

        showNext();

    }

    if(e.key==="ArrowLeft"){

        showPrevious();

    }

});

// ============================
// Mouse Wheel Support
// ============================



const themeBtn = document.getElementById("theme-btn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        themeBtn.innerHTML="☀️";

    }else{

        themeBtn.innerHTML="🌙";

    }

});

const fullBtn=document.getElementById("fullscreen-btn");

fullBtn.onclick=()=>{

if(!document.fullscreenElement){

document.documentElement.requestFullscreen();

}else{

document.exitFullscreen();

}

};

