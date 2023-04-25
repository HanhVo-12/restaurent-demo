
function handleLogin() {
    window.location.href = "../login.html";
    window.location.href = "/components/login.html"
}

function addAbout() {
    window.location.href = "/components/about.html"
}



let header = document.querySelector(".header");

let btnMenuMobile = document.getElementById("menu-mobile");
let iIcon = document.querySelector(".ti-menu")
let menu = document.querySelector("#menu");
let currentHeight = header.clientHeight;
btnMenuMobile.addEventListener('click', function () {
    let isClosed = header.clientHeight == currentHeight
    if (isClosed) {
        document.querySelector("ul#menu").style.display = "block"
        iIcon.className = iIcon.className.replace("ti-menu", "ti-close");
        document.querySelector(".header .btn-item").style.display = "none";
        header.style.display = "block";
        header.style.height = "auto";

    } else {
        document.querySelector("ul#menu").style.display = "none";
        header.style.height = null;
        header.style.display = "flex";
        iIcon.className = iIcon.className.replace("ti-close", "ti-menu");
        document.querySelector(".header .btn-item").style.display = "block";

    }
})
