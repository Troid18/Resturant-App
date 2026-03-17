import { menuArray } from "./data.js"

const contentContainer = document.getElementById("content")


function render(){

    let renderHtml = ""

    menuArray.forEach(menu => {
        let ingredientsList = menu.ingredients.join(", ")

        renderHtml += `
            <div class="container">
                <h1 class="menu-img" > ${menu.emoji} </h1> 
                <div class="info" >

                    <h2> ${menu.name} </h2>
                    <p class="ingredients"> ${ingredientsList} </p>
                    
                    <h3> $${menu.price} </h3>

                </div>
                <button class="increment"> + </button>
            
            </div>

                

        
        `

    })

    contentContainer.innerHTML = renderHtml

}

render()