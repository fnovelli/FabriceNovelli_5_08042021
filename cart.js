let res = document.getElementById('fonctionBlock');
let card = document.getElementsByClassName('bCardDetail');


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

  let cartCont = localStorage.getItem('id');

  if (cartCont) {
    let result = await getAPI(cartCont);
     if (result.ok) {
        let teddies = await result.json();
         await displayCurrentProduct(teddies);
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
function displayCurrentProduct(curTed) {

    if (res) {

       //add current product information (title, image etc.) to the card.
        let img = document.getElementsByClassName('bImg');
        img[0].src = curTed.imageUrl;

        //add name of the product
        let name = document.createElement("div");
        addProductInfoToCard(name, card[0], "bTitle");
        name.textContent = curTed.name;

        //add description of the product
        let desc = document.createElement("div");
        addProductInfoToCard(desc, card[0], "bText");
        desc.textContent = curTed.description;

        //add price of  the product
        let price = document.createElement("div");
        addProductInfoToCard(price, card[0], "bPrice");
        price.textContent = curTed.price / 100 + '€'; //fix price display

        //add button for order
        createCartBtn("btnAddCart", "Commander");

        //add button to clear cart
        createCartBtn("btnClearCart", "Vider le Panier");
        addListenerCartBtn();

    }
}


loadCartProduct();


  

