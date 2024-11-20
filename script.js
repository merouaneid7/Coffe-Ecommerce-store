
async function run() {
    var p = await getProducts();
    displayProducts(p);    
    addProductsToDB(p);
    

    
    
    
   
}
run();

async function getProducts() {
    try {
        const res = await fetch("https://fake-coffee-api.vercel.app/api");
        products = await res.json();
        return products;
    }
    catch(error) {
        console.error("Erreur lors de la récupération des produits:",error);
        loadProductsFromDB();
       };
    
    
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.classList.add('product-card');

    title= document.createElement("h1");
    title.textContent = `${product.name}`;
    image=document.createElement("img");
    image.src=`${product.image_url}`;
    price=document.createElement("h2");
    price.textContent=`${product.price} Dhs`;
    description=document.createElement("p");
    description.textContent=`${product.description}`;
    description.classList.add('product-info');
    add_to_cart_btn = document.createElement("button");
    add_to_cart_btn.textContent ="Add To Cart";
    add_to_cart_btn.classList.add('atc_button');
    add_to_cart_btn.addEventListener("click",()=>{addToCart(product.id)});

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(price);
    card.appendChild(description);
    card.appendChild(add_to_cart_btn);
   
    return card;
}


async function displayProducts(products) {
    var product_content = document.getElementById("product_content"); 
    products.forEach(product => {
        var card = createProductCard(product);
        product_content.appendChild(card);
    });
    
}


async function filterProducts(){
    var input = document.getElementById("search-input").value;
    var filtred_products=[] ;
    var products = await getProducts();
    products.forEach(product => {
        if(product.name.includes(input)){
            filtred_products.push(product);
            
        }
        return filtred_products;
          
    });
    var product_content = document.getElementById("product_content"); 
    product_content.innerHTML="";
    displayProducts(filtred_products);
    console.log(filtred_products);
    btn=document.getElementById("clear_btn");
    btn.style.visibility="visible"

}

let product_content = document.getElementById("product_content");  
let listView=document.getElementById("list");
let gridView=document.getElementById("grid");
let product_card=document.querySelector(".product-card")

function setGridView(){
    product_content.style.display="grid";
    product_card.style.width="100%";
    


    
}
function setListView(){
    product_content.style.display="flex";
}

function clearBtn(){
    run();
    btn=document.getElementById("clear_btn");
    btn.style.visibility="hidden"
    var input = document.getElementById("search-input").value="";
}

function openDB() {
    let request = indexedDB.open("CoffeeShopDB", 1);
   
    request.onupgradeneeded =  () => {
        let res = request.result;
        res.createObjectStore("products", { keyPath: "id" });
        console.log("upgrade done");
    }
    return request;
}

function addProductsToDB(products){
    let request = openDB();
    request.onsuccess = () => {
        let res = request.result;
        let tx = res.transaction("products","readwrite");
        let store = tx.objectStore("products");
        products.forEach(product => {
            store.add(product);
        });
        console.log("success");
        
    }
} 


function loadProductsFromDB(){
    let request = openDB();
    
    request.onsuccess = () => {
        let res=request.result;
        let tx = res.transaction("products","readwrite");
        let store = tx.objectStore("products");
        newres=store.getAll()
        newres.onsuccess = () =>{
            products = newres.result;
            displayProducts(products);
            console.log("load products succes")
        }
    }
}

async function  addToCart(productId){
    let products = await getProducts(); 
    let product_detail= products.find(p => p.id == productId);
    console.log(product_detail);
    let cartItem = {
        id: productId,
        image_url: product_detail.image_url,
        name:product_detail.name,
        price: product_detail.price,
        quantity: 1
    };
    console.log(cartItem);
    let request = openDB();
    
    request.onsuccess = () => {
        let res=request.result;
        let tx = res.transaction("cart","readwrite");
        let store = tx.objectStore("cart");
        store.add(cartItem);
        console.log(`produit  ${cartItem.id} ajoutee a la carte avec succe`);
        
    }

}



