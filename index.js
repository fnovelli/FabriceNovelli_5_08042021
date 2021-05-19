let apiUrl = 'http://localhost:3000/api/';


function listProduct(teddies) {
    let res = document.getElementById('fonctionBlock');

    if (res) {

        for (let i = 0; i < teddies.length; i++) {

            let card = document.createElement("a");
            res.appendChild(card);
            card.classList.add("bCard");
            card.href = "products.html?id=" + teddies[i]._id;


            let img = document.createElement("img");
            card.appendChild(img);
            img.classList.add("bImg");
            img.src = teddies[i].imageUrl;

            
            let name = document.createElement("div");
            card.appendChild(name);
            name.classList.add("bTitle");
            name.textContent = teddies[i].name;

            let desc = document.createElement("div");
            card.appendChild(desc);
            desc.classList.add("bText");
            desc.textContent = teddies[i].description;


            let price = document.createElement("div");
            card.appendChild(price);
            price.classList.add("bPrice");     
            price.textContent = teddies[i].price / 100 + '€';

        }
    }
}


async function getAPI() {
    let result = await fetch(apiUrl + 'teddies');
       if (result.ok) {
           let teddies = await result.json();
           listProduct(teddies);
       }
}


getAPI();