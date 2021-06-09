//get contact info from Form.
let getBtnOrder = document.getElementById("btnOrder");

//create list and array to store information later
let contact = {};
let products = [];

//used to get cart content
let cartCont = JSON.parse(localStorage.getItem("getCartContent"));
let finalPrice = 0;

class orderContact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

//check the current cart content and store the id
async function getIDFromCart() {

    if (cartCont) { 
        for (let i = 0; i < cartCont.length; i++) {
            products.push(cartCont[i].id); 
        }
    }
}

//check and store contact info
async function getContactInfo() {

    let name = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let mail = document.getElementById('email').value;

    contact = new orderContact(name, lastName, address, city, mail);
}


async function deleteForm() {
    
    let form = document.getElementById('formBlock');

    if (form) {
        form.remove();

    }
}

async function getFinalPrice() {
 
    for (let i =0; i < cartCont.length; i++) {

        finalPrice += calcFinalprice(cartCont[i].price, cartCont[i].quantity);
    }
}

function DisplayOrderID(json) {
    return json.orderId;
}

async function CreateDivMessage(json) {
    
    let block = document.getElementById("articles");

    //create div and a message to thanks  the user.
    let desc = document.createElement("div");
    desc.classList.add("bText");
    block.appendChild(desc);
    desc.textContent = "Merci, votre commande a été validée!"

    //create another div to add the final price
    let DivPrice = document.createElement("div");
    DivPrice.classList.add("bText");
    block.appendChild(DivPrice);
    DivPrice.textContent = "Prix total: " + finalPrice + "€";

    //create one more div to display the order ID.
    let DivOrder = document.createElement("div");
    DivOrder.classList.add("bText");
    block.appendChild(DivOrder);
    DivOrder.textContent = "Numéro de commande: " + DisplayOrderID(json);
}



async function DisplayOrderConfirmation(json) {

    await getFinalPrice();
    await CreateDivMessage(json);
    localStorage.clear();

}

//send order to backend
async function CheckAndSendOrder() {

    let OrderObject = JSON.stringify({contact, products});
    console.log(OrderObject);

    try {
        let response = await fetch(getUrlOrder(), {
            method: 'POST',
          headers: {
                'content-type': 'application/json'
            },
            body: OrderObject,
        });

        if (response.ok) {
            let json = await response.json();
 
            await deleteForm();
            await DisplayOrderConfirmation(json);
            console.log('Order completed and sent!');

        } else {
            console.error('Error: ', response.status);
        }
    } catch (e) {
        console.log(e);
    }

}

getBtnOrder.addEventListener('click', async function (event) {

    event.preventDefault(); //prevent auto refresh

    //get and create 2 objects to store contact and product id information
    await getContactInfo();
    await getIDFromCart();

    //if all the information are correct, send to the backend.
    await CheckAndSendOrder(); 
});
        