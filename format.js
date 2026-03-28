const cardNumberInput = document.getElementById("card-input")


function formatCardNumber() {
    
    let value = cardNumberInput.value

    let cleanedValue = value.replace(/[^0-9]/g, '')

    let formattedValue = cleanedValue.match(/.{1,4}/g) || []
    formattedValue = formattedValue.join(' ')
    
    
    cardNumberInput.value = formattedValue
}
