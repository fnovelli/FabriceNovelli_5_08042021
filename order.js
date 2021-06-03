class orderContact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

        //get contact info from Form.
            let getBtnOrder = document.getElementById("btnOrder");

             getBtnOrder.addEventListener('click', (event) =>{
  
            getFormContent = [];
            let name = document.getElementById('firstName').value;
            let lastName = document.getElementById('lastName').value;
            let address = document.getElementById('address').value;
            let city = document.getElementById('city').value;
            let mail = document.getElementById('email').value;

            let contact = new orderContact(name, lastName, address, city, mail);
            getFormContent.push(contact);

              console.log(contact);
              
              event.preventDefault();

          });

        