let apiUrl = 'http://localhost:3000/api/';
let stock = 30;

function getTeddyID() { //get the ID from the product from the URL page.
    return new URL(window.location.href).searchParams.get('id')
  }

async function getAPI() {
    let result = await fetch(apiUrl + 'teddies/' + getTeddyID());
       if (result.ok) {
           let teddies = await result.json();
           displayCurrentProduct(teddies);
       }
}

  //Display product according to its current ID.
function displayCurrentProduct(curTed) {
    let res = document.getElementById('fonctionBlock');

    if (res) {
            let card = document.createElement("div");
            res.appendChild(card);
            card.classList.add("bCardDetail");

            let img = document.createElement("img");
            card.appendChild(img);
            img.classList.add("bImg");
            img.src = curTed.imageUrl;

            
            let name = document.createElement("div");
            card.appendChild(name);
            name.classList.add("bTitle");
            name.textContent = curTed.name;

            let desc = document.createElement("div");
            card.appendChild(desc);
            desc.classList.add("bText");
            desc.textContent = curTed.description;


            let price = document.createElement("div");
            card.appendChild(price);
            price.classList.add("bPrice");     
            price.textContent = "Prix: " + curTed.price / 100 + " €";

            //Add an option to customize the product
            let form = document.createElement("label");
            let texForm = document.createElement("div");  
            //create label for color choice
            let color = document.createElement("select");
            form.classList.add("bText");

            card.appendChild(form);
            form.appendChild(texForm);
            form.appendChild(color);
      

            texForm.textContent = "Couleur: ";
            
            //add each color to the label
            for (let i = 0; i < curTed.colors.length; i++) {
                let colorChoice = document.createElement("option");
                colorChoice.setAttribute("value", curTed.colors[i])
                colorChoice.innerHTML = curTed.colors[i];
                color.appendChild(colorChoice);
            }


            //Add an option to select the quantity
            let form2 = document.createElement("label");
            let texForm2 = document.createElement("div");  
            //create label for color choice
            let qty = document.createElement("select");
            form2.classList.add("bText");

            card.appendChild(form2);
            form2.appendChild(texForm2);
            form2.appendChild(qty);
      

            texForm2.textContent = "Quantité: ";
            
            //add the quantity to the label
            for (let i = 1; i < stock + 1; i++) { //We want to start with 1 and not 0
                let curQty = document.createElement("option");
                curQty.setAttribute("value", [i]) 
                curQty.innerHTML = [i];
                qty.appendChild(curQty);
            }

    
            //Add a button to add to the cart
            let btnCart = document.createElement("a");
            card.appendChild(btnCart);
            btnCart.setAttribute("id", "btnAddCart");
            let btnText = document.createElement("div");
            btnCart.appendChild(btnText);
            btnText.classList.add("btnText");
            btnText.textContent = "Ajouter au Panier";
            
            //add the product if user click on the button
            let getCart = document.getElementById("btnAddCart");
             getCart.addEventListener('click', (event) =>{
                let cartQty = document.getElementById("cartQty");
                cartQty.classList.add("bText");
                cartQty.innerHTML = qty.value;
          });
        }
}




getAPI();


  

