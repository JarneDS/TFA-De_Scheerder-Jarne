"use strict";

/* Code repris des codes aides fait avec Monsieur Thronte adapté pour le code de mon projet */
var btnTheme = document.querySelector(".switch");

btnTheme.addEventListener("change", themeSelect);

function themeSelect(){
    var currentMode = document.body.getAttribute("data-theme");
    var systemThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if((!currentMode && systemThemeDark) || currentMode == "dark"){
        document.body.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    
    } else{
        document.body.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }
}

/* code de Copilot pour que quand le thème du browser est dark, que le switch affiche que le mode dark est allumé */
/* comment est-ce que je peux ajouter le fait que quand la couleur système est dark que le input devient input:checked ? */
var activeTheme = localStorage.getItem("theme");
if(activeTheme){
    document.body.setAttribute("data-theme", activeTheme);
}

var systemThemeDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
var activeTheme = localStorage.getItem("theme");
var themeSwitch = document.querySelector(".switch input");

if ((systemThemeDark && !activeTheme) || activeTheme === "dark") {
    themeSwitch.checked = true;
} else {
    themeSwitch.checked = false;
}


/* fin du code repris */

/* menu */

var menuBtn = document.querySelector(".menu__btn");
var menuElements = document.querySelectorAll(".menu__li");

menuBtn.addEventListener("click", toggleMenu);
menuElements.forEach((element) => {
    element.addEventListener("click", toggleMenu);
});

function toggleMenu() {
    var menu = document.querySelector(".menu");
    menu.classList.toggle("menu--open");
};

/* Back to top */

var backToTopButton = document.querySelector(".backToTop");

backToTopButton.addEventListener("click", backToTop);

function backToTop(){
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Side nav */

var sideNav = document.querySelector(".sideNav");

function toggleSideNav() {
    if (window.innerWidth >= 1250){
        sideNav.classList.remove("invisible");
    }
    else {
        sideNav.classList.add("invisible");
    }
}

/* Provient de copilot, discussion dans credits */

// Run the function on page load to ensure the correct state is set initially
toggleSideNav();

// Listen for window resize events and update visibility accordingly
window.addEventListener("resize", toggleSideNav);
/* fin code provenant de Copilot */

const btnCredits = document.querySelector(".credits");
const btnFermee = document.querySelectorAll(".close");
const creditsBlock = document.querySelector(".credits__section");

btnCredits.addEventListener("click", openCredits);
btnFermee.forEach((btn) => {
    btn.addEventListener("click", closeCredits);
});


function openCredits() {
    creditsBlock.classList.add("credits__section--active");
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
    document.body.style.overflow = "hidden";
}

function closeCredits() {
    creditsBlock.classList.remove("credits__section--active");
    document.body.style.overflow = "";
}

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove("active"));
            document.querySelector(`nav a[href="#${entry.target.id}"]`).classList.add("active");
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));
