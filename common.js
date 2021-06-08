let apiUrl = "http://localhost:3000/api/teddies";

//Connect to the API
async function getAPI(id) {

    let result;
    
    //check if there is an ID requested, if not simply return the api url.
    
    if (id != null)
        result = await fetch(apiUrl + "/" + id);
    else
        result = await fetch(apiUrl);


       if (result.ok) {
           console.log("connected");
       }

       return result;
}

function getUrlOrder() {
    return apiUrl + "/order";
}

function calcFinalprice(price, qty) {
    return price / 100 * qty;
}

function addProductInfoToCard(divType, curCard, className) {
    curCard.appendChild(divType);
    divType.classList.add(className);
}

class CartProduct {
    constructor(name, id, quantity, color, price) {
        this.name = name;
        this.id = id;
        this.quantity = quantity;
        this.color = color;
        this.price = price;
    }
}