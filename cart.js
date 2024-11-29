loadProductsFromCart();

function loadProductsFromCart (){
    let request = indexedDB.open("CoffeeShopDB", 1);
    request.onsuccess=()=>{
        let res = request.result;
        let tx = res.transaction("cart","readwrite");
        let store = tx.objectStore("cart");
        getres=store.getAll();
        getres.onsuccess=()=>{
            let products=getres.result;
            console.log(products);
            displayProducts(products)
            
            
            
        }
        
    }
}


function createProductCard(product) {
    table=document.getElementById("table");
    table_row=document.createElement("tr");
    

    image=document.createElement("img");
    image.src=`${product.image_url}`;
    image.width="80";
    p_name=document.createElement("h5");
    p_name.textContent=`${product.name}`;
    image_name_td=document.createElement("td");
    image_name_td.appendChild(image);
    image_name_td.appendChild(p_name);
    image_name_td.classList.add("image_name_td")
    table_row.appendChild(image_name_td);

    price=document.createElement("p");
    price.textContent=`${product.price}`;
    price_td=document.createElement("td");
    price_td.appendChild(price);
    table_row.appendChild(price_td);

    minbut=document.createElement("span");
    minbut.textContent="-";
    minbut.classList.add("minbut")
    quantity=document.createElement("p");
    quantity.textContent=`${product.quantity}`;
    plusbut=document.createElement("span");
    plusbut.classList.add("plusbut")
    plusbut.textContent="+";
    manage_quantity_td=document.createElement("td");
    manage_quantity_td.appendChild(minbut);
    manage_quantity_td.appendChild(quantity);
    manage_quantity_td.appendChild(plusbut);
    manage_quantity_td.classList.add("manage_quantity_td")
    table_row.appendChild(manage_quantity_td);

    total=document.createElement("p");
    total.textContent=`${product.quantity * product.price}`;
    total_td=document.createElement("td");
    total_td.appendChild(total);
    table_row.appendChild(total_td);

    delbut=document.createElement("p");
    delbut.textContent="X";
    delbut_td=document.createElement("td");
    delbut_td.appendChild(delbut);
    table_row.appendChild(delbut_td);

    
    
    
    
    
    
    table.appendChild(table_row);
    
    return table;
    
}


async function displayProducts(products) {
     
    products.forEach(product => {
        createProductCard(product);
    });
    
}
