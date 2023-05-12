
// function handleLogin() {
//     window.location.href = "./components/login.html";
//     window.location.href = "../components/login.html"
// }

//khai báo biến slideIndex đại diện cho slide hiện tại
var slideIndex;
// KHai bào hàm hiển thị slide
function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex].style.display = "block";
    dots[slideIndex].className += " active";
    //chuyển đến slide tiếp theo
    slideIndex++;
    //nếu đang ở slide cuối cùng thì chuyển về slide đầu
    if (slideIndex > slides.length - 1) {
        slideIndex = 0
    }
    //tự động chuyển đổi slide sau 5s
    setTimeout(showSlides, 2000);
}
//mặc định hiển thị slide đầu tiên 
showSlides(slideIndex = 0);


function currentSlide(n) {
    showSlides(slideIndex = n);
}



function addAbout() {
    window.location.href = "components/about.html"
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
