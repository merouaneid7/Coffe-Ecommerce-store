// Lancer l'application quand le DOM est chargé
document.addEventListener('onload', getProducts());

//Question 2 : 
// récupérer les données des produits depuis l'API
function getProducts() {
   






}



//Question 3 : 
// Créer une carte de produit
function createProductCard(product) {
    const card = document.createElement('div');
    










    return card;
}

// Afficher les produits
function displayProducts(products) {
   



    products.forEach(product => {
        
    });
}


//Question 4 :
// Mode view
// Ajouter les écouteurs d'événements aux icônes





// Fonction pour passer en vue grille
function setGridView() {
    







    
    document.querySelectorAll('.product-card').forEach(card => {
        


    });


}

// Fonction pour passer en vue liste
function setListView() {
    

    
    document.querySelectorAll('.product-card').forEach(card => {
        
        

        
    });

    document.querySelectorAll('.product-card img ').forEach(img => {
        img.style.maxWidth="200px";
    });
    
    document.querySelectorAll('.product-card button').forEach(btn => {
        btn.style.alignSelf  = 'flex-end';
    });

}


// Initialiser la vue par défaut (grille)
setGridView();



//Question 5:
// Fonction pour filtrer les produits
function filterProducts() {

    const filteredProducts = products.filter(product => 
        
    );
    
}

// Écouteur d'événement pour le champ de recherche
document.getElementById('search-input').addEventListener('input', filterProducts);




