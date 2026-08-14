/*=========================================================
                GOVT EXAM PREP
                EXAM SCRIPT.JS
=========================================================*/



// ========================================
// SUBJECT CARD -> ACCORDION
// ========================================

const subjectCards=document.querySelectorAll(".subject-card");

const accordions=document.querySelectorAll(".accordion");

subjectCards.forEach(card=>{

card.addEventListener("click",()=>{

const target=card.dataset.target;

subjectCards.forEach(c=>{

c.classList.remove("active");

});

card.classList.add("active");

accordions.forEach(acc=>{

if(acc.id===target){

acc.open=true;

acc.scrollIntoView({

behavior:"smooth",

block:"start"

});

}else{

acc.open=false;

}

});

});

});



// ========================================
// ONLY ONE ACCORDION OPEN
// ========================================

accordions.forEach(acc=>{

acc.addEventListener("toggle",()=>{

if(acc.open){

accordions.forEach(other=>{

if(other!==acc){

other.open=false;

}

});

}

});

});



// ========================================
// SCROLL ANIMATION
// ========================================

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("fade-up");

}

});

},{

threshold:.15

});



document.querySelectorAll(

".subject-card,.accordion,.summary-card,.strategy-card,.chapter-card,.download-card,.official-note"

).forEach(el=>{

observer.observe(el);

});



// ========================================
// DARK MODE
// ========================================

const themeBtn=document.getElementById("theme-btn");

if(themeBtn){

themeBtn.onclick=()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");

themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

}else{

localStorage.setItem("theme","light");

themeBtn.innerHTML='<i class="fa-solid fa-moon"></i>';

}

};

}



if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark");

if(themeBtn){

themeBtn.innerHTML='<i class="fa-solid fa-sun"></i>';

}

}



// ========================================
// BACK TO TOP BUTTON
// ========================================

const topBtn=document.createElement("button");

topBtn.innerHTML='<i class="fa-solid fa-arrow-up"></i>';

topBtn.className="top-btn";

document.body.appendChild(topBtn);



window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.classList.add("show");

}else{

topBtn.classList.remove("show");

}

});



topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};



// ========================================
// ACTIVE NAVIGATION
// ========================================

window.addEventListener("scroll",()=>{

let current="";

accordions.forEach(section=>{

const top=section.offsetTop-200;

if(pageYOffset>=top){

current=section.id;

}

});



subjectCards.forEach(card=>{

card.classList.remove("active");

if(card.dataset.target===current){

card.classList.add("active");

}

});

});



// ========================================
// CTA BUTTON RIPPLE EFFECT
// ========================================

document.querySelectorAll(

".primary-btn,.secondary-btn,.download-btn"

).forEach(btn=>{

btn.addEventListener("click",function(e){

let circle=document.createElement("span");

circle.className="ripple";

this.appendChild(circle);



const x=e.clientX-this.offsetLeft;

const y=e.clientY-this.offsetTop;



circle.style.left=x+"px";

circle.style.top=y+"px";



setTimeout(()=>{

circle.remove();

},600);

});

});



// ========================================
// END
// ========================================