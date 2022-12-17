// // Import vendor jQuery plugin example
// import '~/app/libs/mmenu/dist/mmenu.js'


document.addEventListener('DOMContentLoaded', () => {


})






// Data fill slider
const newBooksSlider = document.querySelector('.new-books-slider');
const state = {
  newBooks: []
}

const createNewBook = (newBook, index) => `
  <div class="slide">
    <a href="book.html?id=${newBook.id}" >
    <img src="images/dist/cover${newBook.id}.jpg" alt="" class="new-books-slider_image"></a>
    <h4 class="new-books-slider_prise">${newBook.price} BYN</h4>
    <h5 class="new-books-slider_bookname">${newBook.name}</h5>
    <h6 class="new-books-slider_authname">${newBook.authors[0].name}</h6>
    <div class="new-books-slider_wrapper">
      <button class="new-books-slider_cart-button" id="${newBook.id}">To cart</button>
      <div class="new-books-slider_favotite" id="${newBook.id}">
        <svg class="new-books-slider_favotite_button" id="${newBook.id}" width="28" height="45" fill="none" xmlns="http://www.w3.org/2000/svg"><path id="favorite-book${newBook.id}" d="M6.46 1A5.367 5.367 0 0 0 2.6 2.656 5.757 5.757 0 0 0 1 6.654v27.999c0 .247.067.49.192.701.125.212.303.383.516.496a1.262 1.262 0 0 0 1.353-.107L14 27.565l10.94 8.18a1.261 1.261 0 0 0 1.353.106 1.31 1.31 0 0 0 .517-.496c.124-.211.19-.454.19-.702v-28a5.752 5.752 0 0 0-1.6-3.997A5.367 5.367 0 0 0 21.54 1H6.46Z" stroke="#D45555" stroke-width="2"/></svg>
      </div>
    </div>
  </div>
`

const fillNewBooksSlider = (newBooks) => {
  newBooksSlider.innerHTML = "";
  if (newBooks.length) { 
     newBooks.forEach((newBook, index) =>{
      newBooksSlider.innerHTML += createNewBook(newBook, index);
    }); 
  }
  
}


function getNewBooksRequest() {
  return fetch('https://localhost:7084/Catalogue/categories/6')
  .then((res) => res.json())
  .then((bookArr) => bookArr.books)
  .then((newBooks) => state.newBooks = state.newBooks.concat(newBooks))
}

$(async function m() {
await getNewBooksRequest();
fillNewBooksSlider(state.newBooks);
slider()
})

  //Preloader
  let preloader = document.querySelector('.preloader');
  function preloaderHidden () {
    preloader.style.visibility = 'hidden';
    preloader.style.opacity = '0';
  }
  setTimeout(preloaderHidden, 4000);

  // Opening Right Bar
  let rightBar = document.querySelector('.right-bar');
  let rightBarIconClose = document.querySelector('.right-bar_close');
  let rightBarIconOpen = document.querySelector('.main-header_auth_button');
  
  rightBarIconOpen.addEventListener('click', () => {
    if(rightBar){
    rightBar.classList.add('open-right-bar');}
  });
  
  rightBarIconClose.addEventListener('click', () => {
    if(rightBar){
    rightBar.classList.remove('open-right-bar');}
  });

  // Main page slider
  function slider() {
    $('.new-books-slider').slick({
      slidesToShow: 5,
      slidesToScroll: 2,
      arrows: true,
      dots: true,
    })
  }


  ///Cart button
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
  




  ///Favorite button
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
