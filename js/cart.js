let produitLocalStorage = JSON.parse(localStorage.getItem('produit'));

const positionPanierVide = document.querySelector('#cartAndFormContainer');
const positionPanierPlein = document.querySelector('#cart__items');
const positionTotal = document.querySelector('#totalPrice');
const PositionQuantite = document.querySelector('#totalQuantity');
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
                  <p>${produitLocalStorage[produit].totalPrice} €</p>
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

//CALCUL PRIX TOTAL

let prixAddition = [];

for (let p = 0; p < produitLocalStorage.length; p++){
  let prixPanier = produitLocalStorage[p].price;

  prixAddition.push(prixPanier);

}

const reducer = (accumulator, currentValue) => accumulator + currentValue;
const prixTotal = prixAddition.reduce(reducer, 0);

const prixAffichage = `<span id="totalPrice">${prixTotal}</span>`
positionTotal.innerHTML = prixAffichage;

let quantiteAddition = [];

for (let q = 0; q < produitLocalStorage.length; q++){
  let quantitePanier = produitLocalStorage[q].quantityProduit;

  quantiteAddition.push(quantitePanier);
}

const quantiteTotal = quantiteAddition.reduce(reducer, 0);

const quantiteAffichage = `<span id="totalQuantity">${quantiteTotal}</span>`

PositionQuantite.innerHTML = quantiteAffichage;

//SUPPRESSION
let supprimer = document.querySelectorAll('.deleteItem');

for( let s = 0; s < supprimer.length; s++){
  supprimer[s].addEventListener("click" , (event) =>{
    event.preventDefault();

    let idSupprimerProduit = produitLocalStorage[s].idProduit;

    produitLocalStorage = produitLocalStorage.filter(del => del.idProduit !== idSupprimerProduit);
    console.log(produitLocalStorage);

    localStorage.setItem('produit', JSON.stringify(produitLocalStorage));

    window.location.href = "cart.html";
  })
}