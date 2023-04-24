let userApi = 'http://localhost:3000/users';

function startApp() {
    getUser(renderUser);
    handleCreateUser();
    handleUpdateUser()

}
startApp()

function resetInputUser() {
    document.getElementById("nameUser").value = ''
    document.getElementById("username").value = ''
    document.getElementById("password").value = ''
    document.getElementById("age").value = ''
    document.getElementById("phone").value = ''
}

function getUser(callback) {
    fetch(userApi)
        .then(res => res.json())
        .then(callback)
}
function renderUser(users) {
    let listUsers = users.map(function (user) {
        let tableUser = `<tr class="item-user-${user.id}">
                        <td>${user.id}</td>
                        <td>${user.name}</td>
                        <td>${user.username}</td>
                        <td>${user.age}</td>
                        <td>${user.phone}</td>
                        <td>
                            <button onclick="editUser(${user.id})" class="btn btn-primary">Edit</button>
                            <button onclick="deleteUser(${user.id})" class="btn btn-secondary">Delete</button>
                        </td>
        </tr>`;
        return tableUser
    })
    document.getElementById("contentAcount").innerHTML = listUsers.join('')
}



function validateFormUser() {
    let formElement = document.querySelector(".formContainUser");
    let inputElement = formElement.querySelectorAll(".form-input-user")
    for (let i = 0; i < inputElement.length; i++){
        if (inputElement[i].value === "") {
            inputElement[i].parentElement.querySelector(".error-message-user").innerText = `Please enter ${inputElement[i].placeholder}`
        } else {
            inputElement[i].parentElement.querySelector(".error-message-user").innerText = ''
        }
    }
}

function handleCreateUser() {
    let btnUser = document.getElementById("saveUser")
    btnUser.onclick = () => {
        validateFormUser();
        let formElement = document.querySelector(".formContainUser");
        let errorElement = formElement.querySelectorAll(".error-message-user");
        let arrErr = [];
        for (let i = 0; i < errorElement.length; i++){
            arrErr.push(errorElement[i].innerText)
        }
        let checkErr = arrErr.every(value => value === '');
        if (checkErr) {
            let objectUser = {
                name: document.getElementById("nameUser").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                age: document.getElementById("age").value,
                phone: document.getElementById("phone").value
            }
            createUser(objectUser, function () {
                getUser(renderUser);
                resetInputUser()
            })
        }
    }
}

function createUser(data, callback) {
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),

    }
    fetch(userApi, option)
        .then(res => res.json())
        .then(callback)
}

function deleteUser(id) {
    if (confirm("Are you sure?")) {
        let option = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
        fetch(userApi + '/' + id, option)
            .then(res => res.json())
            .then(function () {
                let itemUser = document.querySelector(".item-user-" + id)
                if (itemUser) {
                    itemUser.remove()
                }
            })
    } else {
        getUser(renderUser)
    }
}


function editUser(id) {
    addModalUser();
    fetch(userApi + '/' + id)
        .then(res => res.json())
        .then(function (data) {
            document.getElementById("nameUser").value = data.name,
            document.getElementById("username").value = data.username,
            document.getElementById("password").value = data.password,
            document.getElementById("age").value = data.age,
            document.getElementById("phone").value = data.phone,
            document.getElementById("idUser").value = id;
            document.getElementById("saveUser").style.display = "none";
            document.getElementById("updateUser").style.display = "block";

        })

}
function handleUpdateUser() {
    let btnUpdate = document.getElementById("updateUser");
    btnUpdate.onclick = () => {
        let id = JSON.parse(document.getElementById("idUser").value);
        let dataUser = {
            name: document.getElementById("nameUser").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
            age: document.getElementById("age").value,
            phone: document.getElementById("phone").value,

        }
        let option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(dataUser),
        }
        fetch(userApi + '/' + id, option)
            .then(res => res.json())
            .then(function () {
                getUser(renderUser);
                resetInputUser();
            })
    }
    
}