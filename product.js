function previewFile() {
    //bien nhan img
    const preview = document.querySelector("#img_preview");
    //file chon file
    const file = document.querySelector("#image").files[0];

    // tao ra doi tuong doc file
    const reader = new FileReader();
    reader.addEventListener("load", function () {
        //convert image file to base4 string
        preview.src = reader.result;
        document.querySelector("#img_preview").style.display = "block"

    }, false);

    //neu co du lieu thi doc file de gui len tren link 
    if (file) {
        reader.readAsDataURL(file);
    }


}
let productApi = 'https://hanhvo-12.github.io/restaurent-demo/db.json';
let categoryApi = 'http://localhost:3000/categories';

// chay chuong trinh
function startApp() {

    getProduct(renderProduct);
    getProduct(renderPrductPage)
    getCategory(renderCategory);
    getCategory(renderCategoryPage);

    handleCreateProduct();
    handleUpdateProduct();
    handleCreateCategory();
    handleUpdateCategory();
}
startApp();

function resetInput() {
    document.getElementById('name').value = ''
    document.getElementById('price').value = ''
    document.getElementById('description').value = ''
    let e = document.getElementById("category");
    e.options[e.selectedIndex].innerText = 'Select Option';
    document.getElementById('img_preview').setAttribute('src', '')

}


// lay du lieu san pham tu file json
function getProduct(callback) {
    fetch(productApi)
        .then(res => res.json())
        .then(callback)
}

//lay du lieu danh muc tu file json
function getCategory(callback) {
    fetch(categoryApi)
        .then(res => res.json())
        .then(callback)
}

function validateForm() {
    let formElement = document.querySelector(".formContainer");
    let inputElement = formElement.querySelectorAll(".form-input");
    for (let i = 0; i < inputElement.length; i++) {
        if (inputElement[i].value === "") {
            inputElement[i].parentElement.querySelector(".error-message").innerText = `Please enter ${inputElement[i].id}`
        } else {

            inputElement[i].parentElement.querySelector(".error-message").innerText = ''
        }
    }
}



// function getA(callback) {
//     let id = JSON.stringify(document.getElementById("category").value)
//     fetch(categoryApi + '/' + id)
//         .then(res => res.json())
//         .then(callback)
// }
// console.log(getA);


function handleCreateProduct() {
    let btnSave = document.getElementById("saveProduct");
    btnSave.onclick = () => {
        validateForm();
        let formElement = document.querySelector(".formContainer");
        let errorElement = formElement.querySelectorAll(".error-message");
        let arrErrElement = [];
        for (let i = 0; i < errorElement.length; i++) {
            arrErrElement.push(errorElement[i].innerText)
        }
        let checkErr = arrErrElement.every(value => value === '');
        // console.log(checkErr);
        if (checkErr) {
            let name = document.getElementById("name").value;
            let img = document.querySelector("#img_preview").getAttribute('src');
            let category = document.getElementById("category").value;
            let price = document.getElementById("price").value;
            let description = document.getElementById("description").value;

            let objectProducts = {
                nameProduct: name,
                image: img,
                category:category,
                price: Number(price),
                description: description
            }
            
            createProduct(objectProducts, function () {
                
                getProduct(renderProduct);
                getProduct(renderPrductPage);
                document.getElementById("saveProduct").style.display = "block";
                document.getElementById("updateProduct").style.display = "none";
                resetInput()
            })
        }
    }

}



function createProduct(data, callback) {
    let options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    }
    fetch(productApi, options)
        .then(res => res.json())
        .then(callback)
}






//hien thi du lieu danh muc ra man hinh
function renderCategory(categories) {
    let listCategory = categories.map(function (category) {
        return `
        <option class="option" value="${category.nameCategory}" >${category.nameCategory}</option>`
        })

    document.getElementById("category").innerHTML = listCategory.join('');
}

// hien thi du lieu san pham ra man hinh
function renderProduct(products) {
    let listProductAdmin = products.map(function (product) {
        let table = `<tr class="item-${product.id}">
            <td>${product.id}</td>
            <td>${product.nameProduct}</td>
            <td><img class="img_product" src="${product.image}"></td>
            <td>${product.category}</td>
            <td>${product.price} $</td>
            <td>${product.description}</td>
            <td>
                <button onclick="editProduct(${product.id})" class="btn btn-primary">Edit</button>
                <button onclick="handleDeleteProduct(${product.id})" class="btn btn-secondary">Delete</button>
            </td>

        </tr>`;
        return table
    })

    document.getElementById("contentProduct").innerHTML = listProductAdmin.join('');
  
}
function renderPrductPage(products) {
    let listProductPage = products.map(function (product) {
        return `<div class="grid-item grid-item-${product.id}">
                                <div class="grid-2">
                                    <img src="${product.image}" alt="">
                                    <div class="grid-desc-item">
                                        <h6 class="h6">${product.nameProduct}</h6>
                                        <p class="p">${product.category}</p>
                                    </div>
                                </div>
                                
                                <p class="priceStyle p" >${product.price} $</p>
                            </div>
            `
    })
    document.getElementById("page").innerHTML = listProductPage.join('');
}


function handleDeleteProduct(id) {
    if (confirm("Are you sure?")) {
        let object = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }

        fetch(productApi + '/' + id, object)
            .then(res => res.json())
            .then(function () {
                let item = document.querySelector(".item-" + id);
                if (item) {
                    item.remove();
                }
            })
    } else {
        getProduct(renderProduct);
        getProduct(renderPrductPage);
    }
}



function editProduct(id) {
    addModal();
    fetch(productApi + '/' + id)
        .then(res => res.json())
        .then(function (data) {
         
            document.getElementById("name").value = data.nameProduct;
            
            let e = document.getElementById("category");
            e.options[e.selectedIndex].value = data.category;
            e.querySelector('option').text = e.value;

            // console.log(e.value);

            document.getElementById("img_preview").setAttribute('src', data.image);
            document.getElementById("price").value = data.price;
            document.getElementById("description").value = data.description;
            document.getElementById("id").value = id;
            document.getElementById("updateProduct").style.display = "block";
            document.getElementById("saveProduct").style.display = "none";
            
        })
    resetInput()
}
function handleUpdateProduct() {
    let btnUpdate = document.getElementById("updateProduct");
    btnUpdate.onclick = () => {
        let id = JSON.parse(document.getElementById("id").value);

        let data = {
            nameProduct: document.getElementById("name").value,
            image: document.getElementById("img_preview").getAttribute('src'),
            category: document.getElementById("category").value,
            price: document.getElementById("price").value,
            description: document.getElementById("description").value
        }

        let option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(data),
        }
        fetch(productApi + '/' + id, option)
            .then(res => res.json())
            .then(function () {
                getProduct(renderProduct);
                getProduct(renderPrductPage);
            })
    }
}


function renderCategoryPage(categories) {
    let listCategoryPage = categories.map(function (category) {
        return `<tr class="item-${category.id}">
                    <td>${category.id}</td>
                    <td>${category.nameCategory}</td>
                    <td>
                        <button onclick="editCategory(${category.id})" class="btn btn-primary">Edit</button>
                        <button onclick="deleteCategory(${category.id})" class="btn btn-secondary">Delete</button>
                    </td>
                </tr>`
    })
    document.getElementById("contentCategory").innerHTML = listCategoryPage.join('')
}

function valiteFormCategory() {
    let formElement = document.querySelector(".categoryContainer");
    let inputElement = formElement.querySelectorAll(".form-control-category");
    for (let i = 0; i < inputElement.length; i++){
        if (inputElement[i].value === '') {
            inputElement[i].parentElement.querySelector(".error-message-category").innerText = `Please enter ${inputElement[i].placeholder}`
        } else {
            inputElement[i].parentElement.querySelector(".error-message-category").innerText = ''
        }
    }
}


function createCategory(data, callback) {
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
    }
    fetch(categoryApi, option)
        .then(res => res.json())
        .then(callback)
}


function handleCreateCategory() {
    let btnaddCategory = document.getElementById("saveCategory");
    btnaddCategory.onclick = () => {
        valiteFormCategory();
        let formElement = document.querySelector(".categoryContainer");
        let errElement = formElement.querySelectorAll(".error-message-category");
        let arrErrCategory = [];
        for (let i = 0; i < errElement.length; i++){
            arrErrCategory.push(errElement[i].innerText)
        }
        let checkErr = arrErrCategory.every(value => value === '')
        if (checkErr) {
            let objectCategory = {
                nameCategory: document.getElementById("nameCategory").value
            }
            createCategory(objectCategory, function () {
                getCategory(renderCategory);
                getCategory(renderCategoryPage);
            })
        }
    }
}

function deleteCategory(id) {
    if (confirm("Are you sure?")) {
        let option = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
        fetch(categoryApi + '/' + id, option)
            .then(res => res.json())
            .then(function () {
                let itemCategory = document.querySelector("item-"+ id)
                if (itemCategory) {
                    itemCategory.remove()
                }
            })
    } else {
        getCategory(renderCategoryPage);
        getCategory(renderCategory);
        
    }
    
}

function editCategory(id) {
    fetch(categoryApi + '/' + id)
        .then(res => res.json())
        .then(function (data) {
            document.getElementById("nameCategory").value = data.nameCategory; 
            document.getElementById("idCategory").value = id;
            document.getElementById("saveCategory").style.display = "none";
            document.getElementById("updateCategory").style.display = "block";
            document.querySelector(".ti-plus").style.display = "none";
            document.querySelector(".ti-pencil-alt").style.display = "block";
        })
}

function handleUpdateCategory() {
    let btnupdateCategory = document.getElementById("updateCategory");
    btnupdateCategory.onclick = () => {
        let id = JSON.parse(document.getElementById("idCategory").value);

        let dataCategory = {
            nameCategory: document.getElementById("nameCategory").value
        }
        let option = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(dataCategory),
        }
        
        fetch(categoryApi + '/' + id, option)
            .then(res => res.json())
            .then(function () {
                getCategory(renderCategory);
                getCategory(renderCategoryPage);
            })
    }
}
