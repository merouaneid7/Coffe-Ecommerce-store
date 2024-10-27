document.addEventListener('DOMContentLoaded',async function() {
    getProducts();
    var products  = await getProducts();
    displayProducts(products);
});

async function getProducts() {
    const res = await fetch("https://fake-coffee-api.vercel.app/api");
    products = await res.json();
    return products;
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



