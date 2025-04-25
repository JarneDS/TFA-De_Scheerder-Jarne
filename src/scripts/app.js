"use strict";

/* Code repris des codes aides fait avec Monsieur Thronte adapté pour le code de mon projet */
var btnTheme = document.querySelector(".switch");

btnTheme.addEventListener("change", themeSelect);

function themeSelect(){
    console.log("color")
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

var activeTheme = localStorage.getItem("theme");
if(activeTheme){
    document.body.setAttribute("data-theme", activeTheme);
}

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
}