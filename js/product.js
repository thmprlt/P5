var str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");
console.log(id);

getProduit();

function getProduit() {
    fetch("http://localhost:3000/api/products/" + id)
    .then(function(response){
        return response.json()
    })
    .then((data) => {
        
        if (data){
            getPost(data);
        }
    })
    .catch((error) =>{
        console.log(error);
    })
}

function getPost(produit){
    
    let productImg = document.createElement('img');
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = produit.imageUrl;

    let productName = document.getElementById('title');
    productName.innerHTML = `<h1 id="title">${produit.name}</h1>`;

    let productPrice = document.getElementById('price');
    productPrice.innerHTML = `<span id="price">${produit.price}</span>`;

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = `<p id="description">${produit.description}</p>`;

    let productColors = document.getElementById('colors');
    produit.colors.forEach(color => {
        var opt = document.createElement('option');
        opt.value = color;
        opt.innerText = color;
        productColors.appendChild(opt);
    });
    ajouterPanier(produit);
}

function ajouterPanier(produit){

    const btnPanier = document.querySelector('#addToCart');
    const nbCanape = document.querySelector('#quantity');
    const couleurChoix = document.querySelector('#colors');
    btnPanier.addEventListener('click', (event) => {
        event.preventDefault();
        if (nbCanape.value >0 && nbCanape.value <=100 && nbCanape.value !=0){

        let optionsProduit = {
            nameProduit : produit.name,
            idProduit : id,
            quantityProduit : nbCanape.value,
            colorProduit : couleurChoix.value
        };
        let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));

        if (produitLocalStorage){
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem('produit', JSON.stringify(produitLocalStorage));
            console.log(produitLocalStorage);
        }
        else{
            produitLocalStorage = [];
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem('produit', JSON.stringify(produitLocalStorage));
            console.log(produitLocalStorage);
        }
        }
        
    })
}