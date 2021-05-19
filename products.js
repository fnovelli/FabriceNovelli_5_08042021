let apiUrl = 'http://localhost:3000/api/';

function getTeddyID() {
    return new URL(window.location.href).searchParams.get('id')
  }

async function getAPI() {
    let result = await fetch(apiUrl + 'teddies/' + getTeddyID());
       if (result.ok) {
           let teddies = await result.json();
           displayCurrentProduct(teddies);
       }
}

function displayCurrentProduct(curTed) {
    let res = document.getElementById('fonctionBlock');

    if (res) {
            let card = document.createElement("a");
            res.appendChild(card);
            card.classList.add("bCard");


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
            price.textContent = curTed.price / 100 + '€';

            let color = document.createElement("div");
            card.appendChild(color);
            color.classList.add("bText");
            color.textContent = "Color: " + curTed.colors;
    }
}


getAPI();