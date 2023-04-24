let userApi = 'http://localhost:3000/users';

function validateForm() {
    let formElement = document.querySelector(".form");
    let inputElement = formElement.querySelectorAll(".form-input");
    for (let i = 0; i < inputElement.length; i++){
        if (inputElement[i].value === '') {
            inputElement[i].parentElement.querySelector(".error-message").innerText = `Please enter ${inputElement[i].id} `;
        } else {
            inputElement[i].parentElement.querySelector(".error-message").innerText = '';
        }
    }

}
// function start() {
//      getData(renderAddmin)
    
// }
// start();

// function getData(callback) {
//     fetch(userApi)
//         .then(res => res.json())
//         .then(callback)
// }
// function renderAddmin(users) {
//     let listUser = document.getElementById("content");
//     let htmls = users.map((user) => {
//         return `<p>${user.username}</p>
//                 <p>${user.password}</p>
//         `
//     });
//     listUser.innerHTML = htmls.join('')
// }

function loginForm() {
    validateForm();
    let formElement = document.querySelector(".form");
    let errorElement = formElement.querySelectorAll(".error-message");
    let arrErrElement = [];
    for (let i = 0; i < errorElement.length; i++){
        arrErrElement.push(errorElement[i].innerText)
    }
    let checkErr = arrErrElement.every(value => value === '');
    if (checkErr) {
       
        fetch(userApi)
            .then(res => res.json())
            .then(function (users) {
                let username = document.getElementById("username").value;
                let password = document.getElementById("password").value;
                let checkData = users.some(
                    value => value.username == username && value.password == password
                    
                );
                if (checkData) {
                    window.location.href = "admin.html"
                } else {
                    alert("Please enter again!")
                }
            })
    }


    
}