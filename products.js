let apiUrl = 'http://localhost:3000/api/';


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
            card.appendChild(form);
            form.appendChild(texForm);
            form.appendChild(color);
            texForm.classList.add("bText");
            texForm.textContent = "Color: ";
            
            //add each color to the label
            for (let i = 0; i < curTed.colors.length; i++) {
                let colorChoice = document.createElement("option");
                colorChoice.setAttribute("value", curTed.colors[i])
                colorChoice.innerHTML = curTed.colors[i];
                color.appendChild(colorChoice);
            }

    
            //Add a button to add to the cart
            let btnCart = document.createElement("a");
            card.appendChild(btnCart);
            btnCart.classList.add("btnAddCart");
            let btnText = document.createElement("div");
            btnCart.appendChild(btnText);
            btnText.classList.add("btnText");
            btnText.textContent = "Ajouter au Panier";
        }
}


getAPI();