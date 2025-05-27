"use strict";
const fileName = window.location.pathname.split("/").pop();

if (fileName === "index.html" || fileName === "") {
    console.log("This is the index file!");
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
};

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

if (document.location.href === "index.html") {
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
};

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => link.classList.remove("active"));
            document.querySelectorAll(`nav a[href="#${entry.target.id}"]`).forEach(link => link.classList.add("active"));

        }
    });
}, { threshold: 0.5 });

sections.forEach(section => observer.observe(section));


/* js RUX et Dataplay */
if (window.location.pathname.includes("csDataplay.html") || window.location.pathname.includes("csRUX.html")) {
    // Récupérer les boutons
    var rotatableBtn = document.querySelector(".rotatable");
    var retour = document.querySelector(".retour");

    // Ajouter un event listener sur les bouton principaux
    retour.addEventListener("click", closeSousMenu);

    // Ajouter un event listener sur le bouton rotatable
    rotatableBtn.addEventListener("click", toggleSousMenu);

    // Fonction pour toggle le sous-menu
    function toggleSousMenu(event) {
    event.stopPropagation(); // Empêcher la propagation de l'événement pour éviter la fermeture du menu principal
    var sousMenu = event.target.nextElementSibling;
    if (sousMenu && sousMenu.classList.contains('sous_menu__cs')) {
        sousMenu.classList.toggle('sous_menu--open');
    }
    const rotateElement = event.target.querySelector('.rotate');
    if (rotateElement) {
        rotateElement.classList.toggle('rotated');
    }
    }

    // Fermer le menu principal et le sous-menu lorsque l'un des liens 'a' est cliqué
    document.querySelectorAll('.menu a, .sous_menu__cs a').forEach(link => {
    link.addEventListener('click', () => {
        closeMenus().then(() => {
        console.log('Menus fermés avec succès');
        }).catch(error => {
        console.error('Erreur lors de la fermeture des menus :', error);
        });
    });
    });

    // Fonction pour fermer les menus
    function closeMenus() {
    return new Promise((resolve, reject) => {
        try {
        // Fermer le menu principal
        var menu = document.querySelector(".menu");
        menu.classList.remove("menu--open");

        // Fermer le sous-menu
        var sousMenu = document.querySelector('.sous_menu__cs.sous_menu--open');
        if (sousMenu) {
            sousMenu.classList.remove('sous_menu--open');
            const rotateElement = sousMenu.previousElementSibling.querySelector('.rotate');
            if (rotateElement) {
            rotateElement.classList.remove('rotated');
            }
        }

        resolve(); // Résoudre la promesse si tout se passe bien
        } catch (error) {
        reject(error); // Rejeter la promesse s'il y a une erreur
        }
    });
    }

    function closeSousMenu() {
    var sousMenu = document.querySelector('.sous_menu__cs.sous_menu--open');
    if (retour) {
        sousMenu.classList.remove('sous_menu--open');
        const rotateElement = sousMenu.previousElementSibling.querySelector('.rotate');
        if (rotateElement) {
        rotateElement.classList.remove('rotated');
        }
    }
    }


    // utilisation de copilot + modif personnels pour cette partie
    document.addEventListener('DOMContentLoaded', () => {
        const slices = document.querySelectorAll('.slice');
        const data = [30, 45, 25]; // Les valeurs des portions
        const colors = ['#f44336', '#2196F3', '#4CAF50']; // Les couleurs des portions

        slices.forEach((slice, index) => {
            slice.style.setProperty('--offset', data.slice(0, index).reduce((acc, val) => acc + val, 0));
            slice.style.setProperty('--value', data[index]);
            slice.style.setProperty('--color', colors[index]);
        });
    });
};

if (window.location.pathname.includes("csDataplay.html") || window.location.pathname.includes("csRUX.html") || window.location.pathname.includes("designFiction.html")) {
    document.querySelector('.scroll').addEventListener('click', function() {
    // Trouver le premier élément <h2>
    const firstH2 = document.querySelector('.h2__cs');
    
    if (firstH2) {
        // Calculer la position de défilement ajustée
        const offsetTop = firstH2.getBoundingClientRect().top + window.pageYOffset - 150;
        
        // Faire défiler jusqu'à l'élément avec un décalage de 150px
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    });
};

/* js DF */
// afficher données aide de Copilot pour corriger le code
if (window.location.pathname.includes("testEnergie.html")) {
    window.onload = function() {
        fetch('assets/countries-FR.json')
        .then(response => response.json())
        .then(data => {
            displayPays(data);
        });
    };

    function displayPays(data) {
        const selection = document.getElementById('pays');
        // code de copilot
        for(const code in data) {
            if(data.hasOwnProperty(code)) {
                let option = document.createElement('option');
                option.value = code;
                option.textContent = data[code];
                // Définir "Belgique" comme valeur par défaut
                if(option.textContent === "Belgique") {
                    option.selected = true;
                }
                selection.appendChild(option);
            }
        }
        // fin code copilot
    };

    const envoyer = document.querySelector(".submit");
    envoyer.addEventListener("click", displayResult);

    function displayResult(event) {
        event.preventDefault();

        var montantInput = document.getElementById('quantite');
        var montant = document.getElementById('montant');
        montant.innerHTML = "";

        // afficher la div des résultats
        const divResult = document.querySelector(".resultatsRemerciement");
        divResult.classList.add("div--afficher");

        // afficher les résultats
        var montantValue = parseInt(montantInput.value, 10);

        if (montantValue >= 0 && montantValue <= 200) {
            montant.innerHTML += " trop faible";
        }

        else if (montantValue >= 201 && montantValue <= 400) {
            montant.innerHTML += " faible.";
        }
        else if (montantValue >= 401 && montantValue <= 600) {
            montant.innerHTML += " moyenne.";
        }
        else if (montantValue >= 601 && montantValue <= 800) {
            montant.innerHTML += " bonne.";
        }

        else if (montantValue >= 801 && montantValue <= 1000) {
            montant.innerHTML += " très bonne.";
        }

        else if (montantValue >= 1001) {
            montant.innerHTML += " incroyable !";
        }

        else {
            montant.innerHTML += "";
        }
    }
};

if (window.location.pathname.endsWith("designFiction.html")) {
    /* Code provenant de https://www.youtube.com/watch?v=08hkOS9ssmk&t=933s&ab_channel=%C3%89coleduWeb ajusté à mon site */
    const sectionsDF = document.querySelectorAll("section");

    let options = {
        rootMargin: "-40% 0px",
        threshold: 0
    };

    function handleIntersect(entries) {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
            }
        })
    };

    const observerDF = new IntersectionObserver(handleIntersect, options);

    sectionsDF.forEach(section => {
        observerDF.observe(section)
    });
};