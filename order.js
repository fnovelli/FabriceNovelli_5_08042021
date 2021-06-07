//get contact info from Form.
let getBtnOrder = document.getElementById("btnOrder");
//create list and array to store information
let contact = {};
let products = [];

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

    let cartCont = JSON.parse(localStorage.getItem("getCartContent"));
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
        