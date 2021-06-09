let stock = 30;
let colorForm = 2;
let qtyForm = 4;

function getTeddyID() { //get the ID from the product from the URL page.
    return new URL(window.location.href).searchParams.get('id')
  }

function AddColorOption(curTed, curClass) {
  for (let i = 0; i < curTed.colors.length; i++) {
    let colorChoice = document.createElement("option");
    colorChoice.setAttribute("value", curTed.colors[i])
    colorChoice.innerHTML = curTed.colors[i];
    curClass.appendChild(colorChoice); 
  }
}

function AddQtyOption(stock, curClass) {
  for (let i = 1; i < stock + 1; i++) { //We want to start with 1 and not 0
    let curQty = document.createElement("option");
    curQty.setAttribute("value", [i]) 
    curQty.innerHTML = [i];
    curClass.appendChild(curQty); 
  }
}

function StoreProductInCart(curTed, getOpt) {
  let getCartContent = JSON.parse(localStorage.getItem("getCartContent"));

  if (!getCartContent ) {
    getCartContent = [];
  }

  let product = new CartProduct(curTed.name, curTed._id, getOpt[1].value, getOpt[0].value, curTed.price);
  getCartContent.push(product);
  localStorage.setItem("getCartContent", JSON.stringify(getCartContent));
  alert("Le produit " + curTed.name + " a été ajouté à votre panier.")
  console.log("added " + curTed.name + "with QTY: " + getOpt[0].value);
}

  //Display product according to its current ID.
function displayCurrentProduct(curTed) {

    //add current product information (title, image etc.) to the card.
    let img = document.getElementsByClassName('bImg');
    img[0].src = curTed.imageUrl;
        
    let name = document.getElementsByClassName('bTitle');
    name[0].textContent = curTed.name;
 
    let getText = document.getElementsByClassName('bText');
    getText[0].textContent = curTed.description;

    let price = document.getElementsByClassName('bPrice');
    price[0].textContent = curTed.price / 100 + " €";

    let getOpt = document.getElementsByClassName('bOption');

    //Add options to customize the product
    AddColorOption(curTed, getOpt[0]);            
    AddQtyOption(stock, getOpt[1]);

    //add the product if user click on the add product button
    let getCart = document.getElementById("btnAddCart");
    getCart.addEventListener('click', () =>{

      StoreProductInCart(curTed, getOpt);       
    });
        
}

//connect to api then display the product selected
async function LoadSelectedProduct() {
  let result = await getAPI(getTeddyID());

     if (result.ok) {
        let curTed = await result.json();
        displayCurrentProduct(curTed);
     }


}

LoadSelectedProduct();


  

