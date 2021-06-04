class orderContact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }

}



async function getIDFromCart(getIDProduct) {
    let cartCont = JSON.parse(localStorage.getItem("getCartContent"));
    if (cartCont) {
        for (let i = 0; i < cartCont.length; i++) {
            let result = await getAPI(cartCont[i].id);

            if (result.ok) {
                getIDProduct.push(cartCont[i].id);
                console.log("added ID " + cartCont[i].id);
            }
        }
    }
}


    //get contact info from Form.
    let getBtnOrder = document.getElementById("btnOrder");

    getBtnOrder.addEventListener('click', (event) =>{

    getFormContent = [];
    getIDProduct = [];


    let name = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let mail = document.getElementById('email').value;

    let contact = new orderContact(name, lastName, address, city, mail);


    getFormContent.push(contact);
    console.log("PUSHED");
    getIDFromCart(getIDProduct);
    console.log(contact);
    event.preventDefault();


});
        