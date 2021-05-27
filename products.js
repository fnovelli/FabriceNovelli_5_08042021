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

  //Display product according to its current ID.
function displayCurrentProduct(curTed) {
    let res = document.getElementById('fonctionBlock');

    if (res) {

            //add current product information (title, image etc.) to the card.
            let img = document.getElementsByClassName('bImg');
            img[0].src = curTed.imageUrl;
        
            let name = document.getElementsByClassName('bTitle');
            name[0].textContent = curTed.name;
 
            let getText = document.getElementsByClassName('bText');
            getText[0].textContent = curTed.description;

            let price = document.getElementsByClassName('bPrice');
            price[0].textContent = curTed.price / 100 + " €";

            //Add options to customize the product
            AddColorOption(curTed, getText[colorForm]);            
            AddQtyOption(stock, getText[qtyForm]);

            //add the product if user click on the add product button
            let getCart = document.getElementById("btnAddCart");
             getCart.addEventListener('click', (event) =>{
              let getCartContent = JSON.parse(localStorage.getItem("getCartContent"));

              if (!getCartContent ) {
                getCartContent = [];
              }
              let product = new CartProduct(curTed.name, curTed._id, 1);
              getCartContent.push(product);
              localStorage.setItem("getCartContent", JSON.stringify(getCartContent));
              console.log("added " + curTed.name);

          });
        }
}

//connect to api then display the product selected
async function loadSelectedProduct() {
  let result = await getAPI(getTeddyID());
     if (result.ok) {
        let teddies = await result.json();
         await displayCurrentProduct(teddies);
     }   
}

loadSelectedProduct();


  

