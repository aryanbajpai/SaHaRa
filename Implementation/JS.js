
//fetch API func
function fetchAPI() {
  fetch("https://dummyjson.com/products")
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      //function processes data and returns
      displayPrdts(data);
       
      const addToCart = document.getElementById('addCart')
       addToCart.addEventListener('click', function (event) {
        if(event.target.id === 'addCart') {  //AddToCart btn
            const prdtID = event.target.dataset.productID;
            const selectedItem = data.products.find( (item) => item.id == prdtID);
            //Adding selected item to Cart
            cart.push(selectedItem)
            //Cart Count
            updateCart();
        }
    });
    })
    .catch((err) => {
      console.error("Error while fetching products: ", err);
    });
}

//func to display Dynamic Data t opg1 from API
function displayPrdts(data) {
  const product = document.getElementById("prdt");
  product.innerHTML = "";

  if (Array.isArray(data.products)) {
    data.products.forEach((elem) => {
      const prdtElem = document.createElement("div");
      prdtElem.innerHTML = `
      <div class="p-3 border rounded-md h-auto border-black">
      <button class="mx-[14px] w-[90%] h-[350px] md:h-[300px] lg:h-[270px]" onclick="redirectToPg2(${elem.id})">
          <img src="${elem.images[0]}" class="w-full m-auto h-full">
      </button>
      <p class="font-semibold text-lg h-[33px] overflow-hidden lg:text-md text-gray-400">${elem.title}</p>
      <div class="text-xl lg:text-lg h-[53px] overflow-hidden">${elem.description}</div>
      <div class="flex gap-1 my-1 text-xl lg:text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>                              
          <p class="font-semibold">${elem.price}</p>
      </div>
      <button class="flex gap-1 text-lg bg-green-700 hover:bg-green-500 p-1 px-2 rounded-md text-white">
          <div class="text-xl lg:text-md">${elem.rating}</div>
          <svg class="m-auto w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
          </svg>                              
      </button>
      <button id="addCart" class="bg-orange-500 px-2 py-2 mt-2 rounded-md text-white text-xl font-semibold w-full" data-product-id="${elem.id}">Add to Cart</button>
  </div>
      `;
      product.appendChild(prdtElem);
    });
  } else {
      console.error("Invalid data format: products is not an array");
  }
} 

//Func that redirects to pg2 when button clicked
function redirectToPg2(itemId) {
  window.location.href = `pg2.html?id=${itemId}`;
}

//getting ID from URL param another API fetched
const itemID = (new URLSearchParams(window.location.search)).get('id');
//fetch ID of items for pg2
function itemDetails( itemID ){
  fetch("https://dummyjson.com/products")
    .then( (resp) => resp.json() )
    .then( (data) => {
      console.log(data);
        //match item ID
        let selectedItem = data.products.find( (item) => item.id == itemID);
        if( selectedItem ) {
            let pg2Item = document.getElementById('pg2');
              pg2Item.innerHTML = `
            <div>
            <div class="grid grid-cols-[20%_minmax(80%,_1fr)] pr-4 p-1 gap-3">
                <div class=" w-[95%]">
                    <button class="lg:h-[95px] w-full overflow-hidden my-2 hover:border-[2px] border-blue-800">
                        <img src="${selectedItem.images[1]}" class="m-auto w-[90%] h-[90%]">
                    </button>
                    <button class="lg:h-[95px] w-full overflow-hidden my-2 hover:border-[2px] border-blue-800">
                        <img src="${selectedItem.images[2]}" class="m-auto w-[90%] h-[90%]">
                    </button>
                    <button class="lg:h-[95px] w-full overflow-hidden my-2 hover:border-[2px] border-blue-800">
                        <img src="${selectedItem.images[3]}" class="m-auto w-[90%] h-[90%]">
                    </button>
                    <button class="lg:h-[95px] w-full overflow-hidden my-2 hover:border-[2px] border-blue-800">
                        <img src="${selectedItem.images[4]}" class="m-auto w-[90%] h-[90%]">
                    </button>
                </div>
                <div id="picMain">
                    <img src="${selectedItem.images[0]}" class="w-full h-[388px] md:h-[360px] lg:h-[445px]">
                </div>
            </div>
            <div class="flex-col grid gap-y-3 md:grid-cols-2 my-3">
                <button class="bg-yellow-500 m-auto h-12 w-[95%] border border-yellow-700 hover:bg-yellow-400 text-white font-bold flex gap-2 pt-[9px]">
                    <svg class="ml-[103px] xl:ml-[80px] lg:ml-[38px] md:ml-[20px] w-[25px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                    </svg>                                  
                    BUY NOW
                </button> 
                <button class="bg-orange-500 m-auto h-12 w-[95%] border border-orange-700 hover:bg-orange-400 text-white font-bold flex gap-2 pt-[9px]">
                    <svg class="ml-[92px] xl:ml-[80px] lg:ml-[25px] md:ml-[5px] w-[25px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>                                  
                    ADD TO CART
                </button>
            </div>
        </div>

        <div class="p-2">
            <p class="text-gray-400 font-bold pt-1">${selectedItem.brand}</p>
            <p class="font-semibold pt-1">${selectedItem.title}</p>
            <p class="text-gray-500 pt-1">${selectedItem.category}</p>
            <p class="w-[94%] pt-1">${selectedItem.description}</p>
            <div class="flex gap-2 font-semibold pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>                              
                <p>${selectedItem.price}</p>
            </div>
            <button class=" mt-2 flex gap-1 text-lg bg-green-700 hover:bg-green-500 p-1 px-2 rounded-md text-white">
                <div class="text-xl lg:text-md">${selectedItem.rating}</div>
                <svg class="m-auto w-[25px] h-[25px]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>                              
            </button>
            <div class="mt-6 flex gap-3">
                <p class="text-gray-500 mt-1">Size:</p>
                <div class="flex gap-2">
                    <button class="border border-black p-1 w-[40px]">M</button>
                    <button class="border border-black p-1 w-[40px]">L</button>
                    <button class="border border-black p-1 w-[40px]">XL</button>
                    <button class="border border-black p-1 w-[40px]">XXL</button>
                </div>
            </div>
        </div>
            `;
        } else {
            console.log("Item not found for ID: ", itemID);
        }
    })
    .catch( (err) => {
       console.log("Error while fetching item details: ", err);
    })
}


// Increment COUNT on Cart button
//Array tat stores items and count
let cart = [];
const cartCountElem = document.getElementById('cartCount');

function updateCart() {
    cartCountElem.innerHTML = cart.length;
}


fetchAPI();
itemDetails(itemID);
updateCart();