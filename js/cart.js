let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));

const positionPanierVide = document.querySelector('#cartAndFormContainer');
const positionPanierPlein = document.querySelector('#cart__items');
if(produitLocalStorage === null || produitLocalStorage == 0){
const cartVide = `
<div id="cartAndFormContainer">
<h1>Votre panier est vide</h1>
</div>
`
positionPanierVide.innerHTML = cartVide;
} else {
  let cartPlein = [];

  for(let produit in produitLocalStorage){

    cartPlein = cartPlein + `
    <article class="cart__item" data-id="${produitLocalStorage[produit].idProduit}" data-color="${produitLocalStorage[produit].colorProduit}">
              <div class="cart__item__img">
                <img src="${produitLocalStorage[produit].imgProduit}" alt="Photographie d'un canapé">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${produitLocalStorage[produit].nameProduit}</h2>
                  <p>${produitLocalStorage[produit].colorProduit}</p>
                  <p class="priceLigne">${produitLocalStorage[produit].totalPrice} €</p>
                </div>
                <div class="cart__item__content__settings">
                  <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${produitLocalStorage[produit].quantityProduit}">
                  </div>
                  <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                  </div>
                </div>
              </div>
            </article>
    `
    }
    positionPanierPlein.innerHTML = cartPlein;
}

//SUPPRESSION
let supprimer = document.querySelectorAll('.deleteItem');
let supprimerParent = document.querySelectorAll('.cart__item');


for( let s = 0; s < supprimer.length; s++){
  supprimer[s].addEventListener("click" , (event) =>{
    event.preventDefault();

    let idSupprimerProduit = produitLocalStorage[s].idProduit;
    let couleurSupprimerProduit = produitLocalStorage[s].colorProduit;

    produitLocalStorage = produitLocalStorage.filter(del => del.idProduit !== idSupprimerProduit && del.colorProduit !== couleurSupprimerProduit);
    console.log(produitLocalStorage);

    localStorage.setItem('produit', JSON.stringify(produitLocalStorage));
supprimerParent[s].remove();
location.reload();
sumTotal();
qttTotal();
  })
}

//MODIFICATION

let modifier = document.querySelectorAll('.itemQuantity');

for( let m = 0; m < modifier.length; m++){
  modifier[m].addEventListener("change" , (event) =>{

    console.log(modifier[m].value);

     produitLocalStorage[m].quantityProduit = modifier[m].value;
    produitLocalStorage[m].totalPrice = produitLocalStorage[m].price * produitLocalStorage[m].quantityProduit;

    let panierPrix = document.querySelectorAll('.priceLigne');
    panierPrix[m].innerHTML = produitLocalStorage[m].totalPrice +" €";


    localStorage.setItem('produit', JSON.stringify(produitLocalStorage));

    sumTotal();
    qttTotal();

  })

}

//CALCUL PRIX TOTAL

function sumTotal(){

let prixAddition = [];

for (let p = 0; p < produitLocalStorage.length; p++){
  let prixPanier = produitLocalStorage[p].totalPrice;
  prixAddition.push(prixPanier);
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixAddition.reduce(reducer, 0);

let panierPrix = document.getElementById('totalPrice');
panierPrix.innerHTML = prixTotal;
}

//CALCUL QUANTITE TOTALE

function qttTotal(){

let quantiteElement = document.getElementsByClassName('itemQuantity');
quantiteTotal = 0;

for( let q = 0; q < quantiteElement.length; q++){
  quantiteTotal += quantiteElement[q].valueAsNumber;
}

let panierQuantite = document.getElementById('totalQuantity');
panierQuantite.innerHTML = quantiteTotal;
sumTotal();
}
sumTotal();
qttTotal();

//FORMULAIRE
var valideName = false;
var valideLastName = false;
var valideAdress = false;
var valideCity = false;
var valideEmail = false;

function getCommand(){
  let form = document.querySelector(".cart__order__form");

  form.firstName.addEventListener('change', function() {
    valideName = validFirstName(this);
  });

  form.lastName.addEventListener('change', function() {
    valideLastName = validLastName(this);
  });

  form.address.addEventListener('change', function() {
    valideAdress = validAddress(this);
  });

  form.city.addEventListener('change', function() {
    valideCity = validCity(this);
  });

  form.email.addEventListener('change', function() {
    valideEmail = validEmail(this);
  });

  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let basicRegExp = new RegExp('^[a-zA-Z-]{3,25}$');
  let addressRegExp = new RegExp('^[a-zA-Z0-9 ]{5,50}$');

  const validFirstName = function(inputFirstName){

    let FirstNameErrorMsg = inputFirstName.nextElementSibling;

    if (basicRegExp.test(inputFirstName.value)){
      FirstNameErrorMsg.innerHTML = '';
      return true;
    }else{
      FirstNameErrorMsg.innerHTML = 'Veuillez entrer votre prénom';
      return false;
    }
  };

  const validLastName = function(inputLastName){

    let LastNameErrorMsg = inputLastName.nextElementSibling;

    if (basicRegExp.test(inputLastName.value)){
      LastNameErrorMsg.innerHTML = '';
      return true;
    }else{
      LastNameErrorMsg.innerHTML = 'Veuillez entrer votre nom';
      return false;
    }
  };

  const validAddress = function(inputAddress){

    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)){
      addressErrorMsg.innerHTML = '';
      return true;
    }else{
      addressErrorMsg.innerHTML = 'Veuillez entrer votre adresse';
      return false;
    }
  };

  function validCity(inputCity){

    let CityErrorMsg = inputCity.nextElementSibling;

    if (basicRegExp.test(inputCity.value)){
      CityErrorMsg.innerHTML = '';
      return true;
    }else{
      CityErrorMsg.innerHTML = 'Veuillez entrer votre ville';
      return false;
    }
  };

  const validEmail = function(inputEmail){

    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)){
      emailErrorMsg.innerHTML = '';
      return true;
    }else{
      emailErrorMsg.innerHTML = 'Veuillez entrer votre adresse mail';
      return false;
    }
  };
}
getCommand();

function sendCommand(){

  const btnCommander = document.querySelector('#order');

  btnCommander.addEventListener('click', (event) => {
    event.preventDefault();
    if( valideName && valideLastName && valideAdress && valideCity && valideEmail){

    let firstName = document.querySelector('#firstName');
    let lastName = document.querySelector('#lastName');
    let address = document.querySelector('#address');
    let city = document.querySelector('#city');
    let email = document.querySelector('#email');

    let idProduit = [];
    for (let id in produitLocalStorage) {
      idProduit.push(produitLocalStorage[id].idProduit);
    }
    
    let command = {
      contact : {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
      },
      products: idProduit,
    }

      localStorage.setItem("command", JSON.stringify(command));
    
    fetch("http://localhost:3000/api/products/order", {
      headers: {
        "Content-Type" : "application/json"
      },
      method: "POST",
      body: JSON.stringify(command),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem("orderId", data.orderId);
      window.location = "confirmation.html";
    })
    .catch((error) => {
      alert("Erreur avec le serveur : " + error.message);
    })
  }else{
    alert("Veuillez remplir le formulaire")
  }
  })


}
sendCommand();

