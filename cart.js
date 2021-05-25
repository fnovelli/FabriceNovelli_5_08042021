
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
}

loadCartProduct();


  

