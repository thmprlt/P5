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
        alert("Erreur avec le serveur : " + error.message);
    })
}

function getPost(produit){
    
    let productImg = document.createElement('img');
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = produit.imageUrl;

    let productName = document.getElementById('title');
    productName.innerHTML = `${produit.name}`;

    let productPrice = document.getElementById('price');
    productPrice.innerHTML = `${produit.price}`;

    let productDescription = document.getElementById('description');
    productDescription.innerHTML = `${produit.description}`;

    let productColors = document.getElementById('colors');
    produit.colors.forEach(color => {
        var opt = document.createElement('option');
        opt.value = color;
        opt.innerText = color;
        productColors.appendChild(opt);
    });
    ajouterPanier(produit);
}

const Confirmation = () => {
    if (window.confirm(`L'article a été ajouté au panier. Cliquez sur OK pour être redirigé vers le panier.`)){
        window.location.href = "cart.html";
    }else{
        window.location.href = "index.html";
    }
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
            imgProduit : produit.imageUrl,
            quantityProduit : nbCanape.value,
            colorProduit : couleurChoix.value,
            price : produit.price,
            totalPrice : 0
        };
        let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));

        if (produitLocalStorage){
            let produitExist =  produitLocalStorage.find(x => x.idProduit == optionsProduit.idProduit &&  x.colorProduit == optionsProduit.colorProduit);
            if(produitExist != null){
                // on incremente la quantité
                let indexTab = produitLocalStorage.indexOf(produitExist);
                produitLocalStorage[indexTab].quantityProduit = parseInt(produitExist.quantityProduit) + parseInt(optionsProduit.quantityProduit);   
                produitLocalStorage[indexTab].totalPrice = parseInt(produitExist.totalPrice)  + (parseInt(optionsProduit.price ) * parseInt(optionsProduit.quantityProduit ));  
                Confirmation();

            }else{
                optionsProduit.totalPrice = (parseInt(optionsProduit.price ) * parseInt(optionsProduit.quantityProduit ))
                produitLocalStorage.push(optionsProduit);
                Confirmation();

            }            
            localStorage.setItem('produit', JSON.stringify(produitLocalStorage));

            
        }
        else{
            produitLocalStorage = [];
            optionsProduit.totalPrice = (parseInt(optionsProduit.price ) * parseInt(optionsProduit.quantityProduit ))
            produitLocalStorage.push(optionsProduit);
            localStorage.setItem('produit', JSON.stringify(produitLocalStorage));
            Confirmation();
        }
        }
    })
}