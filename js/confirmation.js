function idCommand(){
    const idTexte = document.getElementById("orderId");
    idTexte.innerHTML = localStorage.getItem("orderId");
    localStorage.clear();
}
idCommand();