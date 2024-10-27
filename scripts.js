const services = [
    { image: "./Images/dry cleaning.jpeg", service: "Dry Cleaning", price: 200.0 },
    { image: "./Images/leather cleaning.jpeg", service: "Leather and Suedo Cleaning", price: 999.0 },
    { image: "./Images/ironing.jpeg", service: "Ironing", price: 30.0 },
    { image: "./Images/wedding dress.jpeg", service: "Wedding Dress Cleaning", price: 2400.0 },
    { image: "./Images/fold.jpeg", service: "Wash and Fold", price: 140.0 },
    { image: "./Images/stain.jpg", service: "Stain Removal", price: 500.0 },
];

const selectedServices = []

const totalAmount = document.getElementById("total-amount");
const warning = document.getElementById("warning");
const bookBtn = document.getElementById("book-btn");
const add = document.getElementById("add");
const skip = document.getElementById("skip");
const noItems = document.querySelector(".no-items");
const itemsList = document.getElementById("items-list");
const service = document.getElementById("service");

let initial = 0;
let serial = 1;
let amount = 0;

function hideElement(ele) {
    ele.lastDisplay = ele.style.display
    ele.style.display = "none"
}

function unhideElement(ele) {
    ele.style.display = ele.lastDisplay
}

if (amount === 0) {
    bookBtn.classList.replace("book-btn", "disabled");
}

function addRow() {
    if (!selectedServices.includes(services[initial])) {
        selectedServices.push(services[initial])
    }
    
}

function imageChange() {
    const image = document.getElementById("image");
    image.src = services[initial + 1].image;
    image.alt = services[initial + 1].service;
    service.innerHTML = services[initial + 1].service;
    document.getElementById("price").innerHTML = "₹ " + services[initial + 1].price;
}

bookBtn.addEventListener("click", function () {
    if (amount === 0) {
        warning.style.display = "block"
    }
})

add.addEventListener("click", () => {
    addRow()
    imageChange()
    serial += 1;
    initial += 1;
    if (amount > 0) {
        bookBtn.classList.replace("disabled", "book-btn");
        warning.style.display = "none"
    }
})

skip.addEventListener("click", function () {
    imageChange()
    initial += 1;
})

function renderAddedItems() {
    amount = selectedServices.reduce((sum, service) => sum + service.price, 0)
    totalAmount.innerHTML = "₹ " + amount
    if (selectedServices.length === 0) {
        unhideElement(noItems)
        hideElement(itemsList)
    } else {
        unhideElement(itemsList)
        hideElement(noItems)
        itemsList.innerHTML = ""
        selectedServices.forEach((service, index) => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `<td>${index + 1}</td> <td>${service.service}</td> <td>₹ ${service.price}</td>`
            itemsList.appendChild(newRow);
        })
    }
}

document.addEventListener("click", () => {
    renderAddedItems()
})