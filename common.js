let apiUrl = 'http://localhost:3000/api/';


//Connect to the API
async function getAPI(id) {

    let result;
    
    if (id != null)
        result = await fetch(apiUrl + 'teddies/' + id);
    else
        result = await fetch(apiUrl + 'teddies');


       if (result.ok) {
           console.log("connected");
       }

       return result;
}

