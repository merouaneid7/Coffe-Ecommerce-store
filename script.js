document.addEventListener('DOMContentLoaded',async function() {
    getProducts();
    
});

async function getProducts() {
    const res = await fetch("https://fake-coffee-api.vercel.app/api?limit=5");
    products = await res.json();
    return products;
}
