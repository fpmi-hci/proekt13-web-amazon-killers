///Book Fill

function getGet(name) {
  var s = window.location.search;
  s = s.match(new RegExp(name + '=([^&=]+)'));
  return s ? s[1] : false;
}

const catalogueWrapper = document.querySelector('.catalog-books-wrapper');

const createCatalogItem = (catalog) => `
       <div class="catalog-books-item">
      <a href="book.html?id=${catalog.id}">
       <img src="images/dist/cover${catalog.id}.jpg" alt="" class="new-books-slider_image"></a>
       <h4 class="new-books-slider_prise">${catalog.price} BYN</h4>
       <h5 class="new-books-slider_bookname">${catalog.name}</h5>
       <h6 class="new-books-slider_authname">${catalog.authors[0].name}</h6>
       <div class="new-books-slider_wrapper">
         <button class="new-books-slider_cart-button" id="${catalog.id}">To cart</button>
         <div class="new-books-slider_favotite">
           <svg class="new-books-slider_favotite_button" id="${catalog.id}" width="28" height="45" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="favorite-book${catalog.id}" d="M6.46 1A5.367 5.367 0 0 0 2.6 2.656 5.757 5.757 0 0 0 1 6.654v27.999c0 .247.067.49.192.701.125.212.303.383.516.496a1.262 1.262 0 0 0 1.353-.107L14 27.565l10.94 8.18a1.261 1.261 0 0 0 1.353.106 1.31 1.31 0 0 0 .517-.496c.124-.211.19-.454.19-.702v-28a5.752 5.752 0 0 0-1.6-3.997A5.367 5.367 0 0 0 21.54 1H6.46Z" stroke="#D45555" stroke-width="2"/></svg>
         </div>
       </div>
     </div>
`
 

$(async function k() {
  if (getGet('id') == false){
  let url = 'https://localhost:7084/Catalogue/books?pageSize=10&pageIndex=0&minPrice=0&maxPrice=1000&minPages=0&maxPages=2147483647&sortingBy=name&isDescending=false';
  let response = await fetch(url);
  if (response.ok) {
  let catalogue = await response.json();
  catalogue.forEach((catalog) =>{
    catalogueWrapper.innerHTML += createCatalogItem(catalog);
    }); 
  } 
} else {
  let url = 'https://localhost:7084/Catalogue/books?pageSize=10&pageIndex=0&categoryIds='+getGet('id')+'&minPrice=0&maxPrice=1000&minPages=0&maxPages=2147483647&sortingBy=name&isDescending=false';
  let response = await fetch(url);
  if (response.ok) {
  let catalogue = await response.json();
  catalogue.forEach((catalog) =>{
    catalogueWrapper.innerHTML += createCatalogItem(catalog);
    }); 
  } 
}
}); 

//Cart Button
$(document).on('click', 'button[class^="new-books-slider_cart-button"]', function(e) {
  var id = this.id;
  button = "#"+id;
  if ($(button).css('background-color') == "rgb(212, 85, 85)"){
  const myDataObject ={ 
    "bookId": id,
    "amount": 1,
    "userId": "1"
  }
  let url = 'https://localhost:7296/Cart/cart'
  fetch(url, {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json'
      
    },
    body: JSON.stringify(myDataObject)
     });
    this.style.backgroundColor = "#FFA3A3"}
    else{
      const myDataObject ={ userId: 1, bookId: id}
      let url = 'https://localhost:7296/Cart/cart?userId=1&bookId='+ id
      fetch(url, {
         method: 'DELETE',
         headers: {
          'Content-Type': 'application/json'
          
        },
        body: JSON.stringify(myDataObject)
         });
         this.style.backgroundColor = "rgb(212, 85, 85)"
    }
});

//Favorite Button
$(document).on('click', 'svg[class^="new-books-slider_favotite_button"]', function(e) {
  var id = this.id;
  let fav = "#favorite-book" + id
  if($(fav).css('fill') == "rgb(212, 85, 85)"){
    $(fav).css({ fill: "#fff" });
    const myDataObject ={ userId: 1, bookId: id}
    let url = 'https://localhost:7296/Cart/favourites?userId=1&bookId='+ id
    fetch(url, {
       method: 'DELETE',
       headers: {
        'Content-Type': 'application/json'
        
      },
      body: JSON.stringify(myDataObject)
       });
  } else{
    $(fav).css({ fill: "#D45555" });
  const myDataObject ={ 
    "bookId": id,
    "userId": "1"
  }
  let url = 'https://localhost:7296/Cart/favourites'
  fetch(url, {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json'
      
    },
    body: JSON.stringify(myDataObject)
     });
  }
});
