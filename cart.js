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
    price.textContent=`${product.price}dh`;
    price_td=document.createElement("td");
    price_td.appendChild(price);
    table_row.appendChild(price_td);

    minbut=document.createElement("span");
    minbut.textContent="-";
    minbut.classList.add("minbut")
    minbut.addEventListener("click",()=>{updateQuantity(product.id,product.quantity-1)});
    quantity=document.createElement("p");
    quantity.textContent=`${product.quantity}`;
    plusbut=document.createElement("span");
    plusbut.classList.add("plusbut")
    plusbut.textContent="+";
    plusbut.addEventListener("click",()=>{updateQuantity(product.id,product.quantity+1)});
    manage_quantity_td=document.createElement("td");
    manage_quantity_td.appendChild(minbut);
    manage_quantity_td.appendChild(quantity);
    manage_quantity_td.appendChild(plusbut);
    manage_quantity_td.classList.add("manage_quantity_td")
    table_row.appendChild(manage_quantity_td);

    total=document.createElement("p");
    total.textContent=`${product.quantity * product.price}dh`;
    total_td=document.createElement("td");
    total_td.appendChild(total);
    table_row.appendChild(total_td);

    delbut=document.createElement("p");
    delbut.textContent="x";
    delbut.classList.add("delbut")
    delbut.addEventListener("click",()=>{removeFromCart(product.id)})
    delbut_td=document.createElement("td");
    delbut_td.appendChild(delbut);
    table_row.appendChild(delbut_td);



    table.appendChild(table_row);
    
    return table;
    
}


async function displayProducts(products) {
    let total = 0;
    table = document.getElementById("table");
    products.forEach(product => {
        createProductCard(product);
        total+=(product.price*product.quantity);
        

        

    });
        total_div=document.createElement("div");
        total_div.classList.add("total_div")
        total_div.append("le Total est : ",total,"dh");
        table.appendChild(total_div)
    
    
}


function updateQuantity(itemId, newQuantity){
    let request= indexedDB.open("CoffeeShopDB",1);
    
    request.onsuccess=()=>{
        let res=request.result
        let tx = res.transaction("cart","readwrite");
        let store = tx.objectStore("cart")
        newres=store.get(itemId);
        newres.onsuccess=()=>{
            product=newres.result;
            if (newQuantity < 1 ) {
                alert("impossible")
            }
            else{
                
                product.quantity = newQuantity;
                let updateRequest = store.put(product);
                updateRequest.onsuccess = () => {
                    console.log(`quantte modifie pour ${product.id}`);
                    location.reload()
                };
                console.log(product);
            }
            

        }
       
       
    }
}

function removeFromCart(itemId){
    let request= indexedDB.open("CoffeeShopDB",1);
    request.onsuccess=()=>{
        let res=request.result
        let tx = res.transaction("cart","readwrite");
        let store = tx.objectStore("cart")
        newres=store.get(itemId);
        newres.onsuccess=()=>{
            product=newres.result;
            let delRequest = store.delete(product.id);
            delRequest.onsuccess = () => {
                location.reload()
            };

        }
    }
    
}
