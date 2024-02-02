var inputName = document.querySelector('#bookName')
var inputUrl = document.querySelector('#bookUrl')
var tbody = document.getElementById('tbody')
var btnAdd = document.querySelector('form .button')
var btnDelete = document.querySelector('.delete')
var modal = document.querySelector('.modal__container')
var closeBtn = document.querySelector(".btn-close")


var bookMarkList = [];
if (localStorage.getItem("book") != null) {
    bookMarkList = JSON.parse(localStorage.getItem("book"))
    displayBook()
}


function validationInputs(x, y) {
    // ******* X Input **********
    var regexName = /^\w{3,50}$/
    x.addEventListener("keyup", function () {
        if (regexName.test(x.value)) {
            x.setAttribute("class", "input form-control mb-3 mt-1 is-valid")
        } else {
            x.setAttribute("class", "input form-control mb-3 mt-1 is-invalid")
        }
    })
    // ******** Y Input ************
    var regexUrl = /^(http:\/\/|https:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/
    y.addEventListener("keyup", function () {
        if (regexUrl.test(y.value)) {
            y.setAttribute("class", "input form-control mb-3 mt-1 is-valid")
        }else {
            y.setAttribute("class", "input form-control mb-3 mt-1 is-invalid")
        }
    })
}
validationInputs(inputName, inputUrl)

btnAdd.addEventListener('click', addBook)
function addBook() {
    if (inputName.getAttribute("class").includes("is-valid") && inputUrl.getAttribute("class").includes("is-valid")) {
        inputUrl.value = inputUrl.value.toLowerCase()
        if (inputUrl.value.substr(0, 4) == "www." ) {
            inputUrl.value = "https://" + inputUrl.value
        }
        // else if (inputUrl.value.substr(0, 4) != "www."){
        //     inputUrl.value = "https://www." + inputUrl.value
        // }
        var bookMark = {
            name: inputName.value,
            url: inputUrl.value,
        }
        bookMarkList.push(bookMark)
        displayBook()
        localStorage.setItem("book", JSON.stringify(bookMarkList))
        clearInput()
    } else {
        modal.style.display = "flex"
        modal.style.opacity = 1
        modal.addEventListener('click', function (e) {
            if (e.target.getAttribute("class") == "modal__container") {
                modal.style.display = "none"
                modal.style.opacity = 0
            }
        })
        closeBtn.addEventListener('click', function () {
            modal.style.display = "none"
            modal.style.opacity = 0
        })
    }


}

function displayBook() {
    var result = "";
    for (var i = 0; i < bookMarkList.length; i++) {
        result += `<tr>
        <td>${i + 1}</td>
        <td>${bookMarkList[i].name}</td>
        <td><a href="${bookMarkList[i].url}" target="_blank"><button class=" button btn btn-success"><i class="fa-regular fa-eye"></i> Visit</button></a></td>
        <td><button onclick="DeleteProduct(${i})" class="delete btn btn-danger"><i class="fa-solid fa-trash"></i> Delete</button></td>
    </tr>`
    }
    tbody.innerHTML = result
}

function clearInput() {
    inputName.value = ''
    inputUrl.value = ""
    inputName.focus()

    inputName.setAttribute("class", "input form-control mb-3 mt-1")
    inputUrl.setAttribute("class", "input form-control mb-3 mt-1")
}


function DeleteProduct(inx) {
    bookMarkList.splice(inx, 1)
    displayBook()
    localStorage.setItem("book", JSON.stringify(bookMarkList))
}
