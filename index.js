import { menuArray } from "./data.js"

const payBtn = document.getElementById("pay-btn")
const contentContainer = document.getElementById("content")
const formDetails = document.getElementById("card-details")
const orderSummary = document.getElementById("order-summary")
const nameInput = document.getElementById("name-input")
const cardInput = document.getElementById("card-input")
const cvvInput = document.getElementById("cvv-input")

let orderDetails = []



function checkFormValidity() {
    const name = nameInput.value.trim()
    const card = cardInput.value.trim()
    const cvv = cvvInput.value.trim()
    payBtn.disabled = !(name && card && cvv)
}

nameInput.addEventListener('input', checkFormValidity)
cardInput.addEventListener('input', checkFormValidity)
cvvInput.addEventListener('input', checkFormValidity)



function render(){
    let renderHtml = ""

    menuArray.forEach(menu => {
        let ingredientsList = menu.ingredients.join(", ")

        renderHtml += `
            <div class="container">
                <h1 class="menu-img">${menu.emoji}</h1>
                <div class="info">
                    <h2>${menu.name}</h2>
                    <p class="ingredients">${ingredientsList}</p>
                    <h3>$${menu.price}</h3>
                </div>
                <button class="increment" id="increment-${menu.id}" aria-label="Add ${menu.name}">+</button>
            </div>`
    })

    contentContainer.innerHTML = renderHtml
}

function renderOrder(){
    if (orderDetails.length === 0){
        orderSummary.innerHTML = ""
        return
    }

    const addTotal = orderDetails.reduce((total,item) =>{
        return total + item.price
    },0)

    const itemsHtml = orderDetails.map((order, index) => {
        return `
            <div class="order-detail" data-index="${index}">
                <div class="remove">
                    <h2>${order.name}</h2>
                    <button class="remove-btn" data-index="${index}" type="button">remove</button>
                </div>
                <h3 class="order-price">$${order.price.toFixed(2)}</h3>
                
            </div>`
    }).join("")

    orderSummary.innerHTML = `
        <div class="order-container">
            <h1 class="order-head">Your order</h1>
            ${itemsHtml}
            <div class="total-order"> 
                <h2>Total</h2>
                <h3>$${addTotal.toFixed(2)}</h3>
            </div>
            <button id="checkout-btn" type="button">Complete Order</button>
        </div>
    `
}

render()

contentContainer.addEventListener("click", function(e){
    if(e.target.classList.contains("increment")){
        const id = Number(e.target.id.replace("increment-", ""))
        const menuItem = menuArray.find((item) => item.id === id)

        if (menuItem) {
            orderDetails.push(menuItem)
            renderOrder()
        }
    }
})

orderSummary.addEventListener("click", function(e){
    if (e.target.classList.contains("remove-btn")){
        const idx = Number(e.target.dataset.index)
        orderDetails.splice(idx, 1)
        renderOrder()
        return
    }

    if (e.target.id === "checkout-btn") {
        setTimeout(() => {
            formDetails.style.display = "flex"
        }, 2000);


        
        
    }
})

payBtn.addEventListener("click", function(e){
    e.preventDefault()
    payBtn.style.background = 'none'
    payBtn.innerHTML = `<img src="./images/fade-stagger-circles.svg" alt="Loading svg" class="pay-btn">`
    

    setTimeout(() => {
    formDetails.style.display = "none"
    alert("Order completed!")
    orderDetails = []
    renderOrder()
}, 5000);
})

