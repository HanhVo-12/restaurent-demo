let togBtn = document.getElementById('toggle-sidebar');
let logoTitle = document.querySelector('.logo p').textContent = "Admin sidebar"
let modalBtn = document.getElementById('btn-add-list');


togBtn.onclick = function () {
    let v = document.getElementById('sidebar');


    if (v.className == 'active') {
        document.querySelector('.logo p').textContent = "Admin sidebar";
        document.querySelector('.menu li .menu-item').style.padding = "0 0 !important"
        return v.classList.remove('active');

    } else {
        document.querySelector('.logo p').textContent = "Ad";
        return v.classList.add('active');


    }

}
var modalForm = document.getElementById('modal');
var modalUser = document.getElementById('modalUser');



function addModal() {
    modalForm.classList.add('open');
    showModal();
    function showModal() {
        modalForm.classList.add('open');
    }
    let btnCloseModal = document.getElementById('closeModal');
    btnCloseModal.onclick = function () {
        removeModal();

        resetInput()
    };


}
function removeModal() {
    modalForm.classList.remove('open');
}




function addModalUser() {
    modalUser.classList.add('open');
    showModalUser();
    function showModalUser() {
        modalUser.classList.add('open');
    }
    let btnCloseModalUser = document.getElementById('closeModalUser');
    btnCloseModalUser.onclick = function () {
        removeModalUser();

        resetInputUser()
    };


}
function removeModalUser() {
    modalUser.classList.remove('open');
}

showList()

function showList() {
    let btnProduct = document.getElementById('productBtn');
    btnProduct.onclick = () => {
        document.getElementById("userlayout").style.display = "none"
        document.getElementById("categorylayout").style.display = "none"
        document.getElementById("productlayout").style.display = "block"
    }
    let btnCategory = document.getElementById('categoryBtn');
    btnCategory.onclick = () => {
        document.getElementById("userlayout").style.display = "none"
        document.getElementById("categorylayout").style.display = "block"
        document.getElementById("productlayout").style.display = "none"
    }
    let btnAccount = document.getElementById('acountBtn');
    btnAccount.onclick = () => {
        document.getElementById("userlayout").style.display = "block"
        document.getElementById("categorylayout").style.display = "none"
        document.getElementById("productlayout").style.display = "none"
    }
}


let a = document.getElementsByClassName('item-li');

function onClick(e) {
    for (var i = 0; i < a.length; i++) {
        let itemLi = a[i];
        itemLi.className = itemLi.className.replace("active", "");
    }
    e.currentTarget.className += ' active';
}