"use strict";

/*Code repris des codes aides fait avec Monsieur Thronte*/
var btnTheme = document.querySelector(".btn--darkMode");

btnTheme.addEventListener("click", themeSelect);

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

var activeTheme = localStorage.getItem("theme");
if(activeTheme){
    document.body.setAttribute("data-theme", activeTheme);
}

/* menu */

var menuBtn = document.querySelector(".menu__btn");

menuBtn.addEventListener("click", toggleMenu);

function toggleMenu() {
    var menu = document.querySelector(".menu");
    menu.classList.toggle("menu--open");
}