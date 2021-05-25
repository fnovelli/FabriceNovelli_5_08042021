function addProductInfoToCard(divType, curCard, className) {
    curCard.appendChild(divType);
    divType.classList.add(className);
}

  //Check and display all the products available
function listProduct(teddies) {
    let res = document.getElementById('fonctionBlock');

    if (res) {

        for (let i = 0; i < teddies.length; i++) {

            //create original card 
            let card = document.createElement("a");
            addProductInfoToCard(card, res, "bCard");
            card.href = "products.html?id=" + teddies[i]._id;     //add the product ID to the URL so we can use it after

            //add picture of the product
            let img = document.createElement("img");
            addProductInfoToCard(img, card, "bImg");
            img.src = teddies[i].imageUrl;
        
            //add name of the product
            let name = document.createElement("div");
            addProductInfoToCard(name, card, "bTitle");
            name.textContent = teddies[i].name;

            //add description of the product
            let desc = document.createElement("div");
            addProductInfoToCard(desc, card, "bText");
            desc.textContent = teddies[i].description;

            //add price of  the product
            let price = document.createElement("div");
            addProductInfoToCard(price, card, "bText");
            price.textContent = teddies[i].price / 100 + '€'; //fix price display
        }
    }
}

//Connect to the API then display the products
async function loadProducts() {
    let result = await getAPI(null);
       if (result.ok) {
           let teddies = await result.json();
           await listProduct(teddies);

       }
}


loadProducts();