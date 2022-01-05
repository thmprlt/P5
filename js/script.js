//Récupération de la réponse émise par l'API
fetch("http://localhost:3000/api/products")
.then(function(response){
    console.log('je passe là')
    return response.json()
})
.then(function(data){
   for(var i = 0; data.length>i; i++){
       display(data[i]);
   }
}).catch((error) =>{
    console.log(error);
})

//Intégration des produits

function display(product){
    let items = document.getElementById('items');
    items.innerHTML += `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`
}

