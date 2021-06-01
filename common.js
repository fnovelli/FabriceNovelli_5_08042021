let apiUrl = 'http://localhost:3000/api/teddies';


//Connect to the API
async function getAPI(id) {

    let result;
    
    if (id != null)
        result = await fetch(apiUrl + '/' + id);
    else
        result = await fetch(apiUrl);


       if (result.ok) {
           console.log("connected");
       }

       return result;
}

function addProductInfoToCard(divType, curCard, className) {
    curCard.appendChild(divType);
    divType.classList.add(className);
}

class CartProduct {
    constructor(name, id, quantity, color) {
        this.name = name;
        this.id = id;
        this.quantity = quantity;
        this.color = color;
    }
}