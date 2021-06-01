let res = document.getElementById('fonctionBlock');


function displayEmptyCart() {
  if (res) {
    let msg = document.getElementById('message');
    if (msg)
    {
      msg.innerHTML = "Votre panier est vide. Commencer à ajouter des articles dès maintenant!"
    }

  }
}

async function loadCartProduct() {

  let cartCont = JSON.parse(localStorage.getItem("getCartContent"));

  if (cartCont) {

    console.log("found the cart content");

      //add button for order
      createCartBtn("btnAddCart", "Commander");

      //add button to clear cart
      createCartBtn("btnClearCart", "Vider le Panier");
      addListenerCartBtn();

    
    for (let i =0; i < cartCont.length; i++) {
      let result = await getAPI(cartCont[i].id);
      if (result.ok) {
         let teddies = await result.json();

      displayCurrentProduct(teddies, cartCont[i]);
    }
 
  }
}
  else {
      await displayEmptyCart(); 
  }
}

function addListenerCartBtn() {
let getCart = document.getElementById("btnClearCart");

if (getCart) {
getCart.addEventListener('click', (event) =>{

   localStorage.clear();
   location.reload();
});

}
}

function createCartBtn(type, text) 
{
  let btnType = document.getElementById(type);
  let div = document.createElement("div");
 
  btnType.appendChild(div);
  div.innerHTML = text;
  div.classList.add('btnText');
}

//Display product according to its current ID.
function displayCurrentProduct(tedAPI, tedCart) {

    if (res) {

       //add current product information (title, image etc.) to the card.
       let card = document.createElement("div");
       addProductInfoToCard(card, res, "bCardDetail");
    
       let img = document.createElement("img");
       addProductInfoToCard(img, card, "bImg");
       img.src = tedAPI.imageUrl;

        //add name of the product
        let name = document.createElement("div");
        addProductInfoToCard(name, card, "bTitle");
        name.textContent = tedAPI.name;

        //add description of the product
        let desc = document.createElement("div");
        addProductInfoToCard(desc, card, "bText");
        desc.textContent = tedAPI.description;

        let qty = document.createElement("div");
        addProductInfoToCard(qty, card, "bPrice");
        qty.textContent = "Quantité: " + tedCart.quantity;

        //add price of  the product
        let price = document.createElement("div");
        addProductInfoToCard(price, card, "bPrice");
        price.textContent = "Prix Total: " + tedAPI.price / 100 * tedCart.quantity + '€'; //fix price display*/

    }
}


loadCartProduct();


  

