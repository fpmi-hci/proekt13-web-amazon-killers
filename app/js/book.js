//Book js
/////////////////////////////////////////////////////////////////////////

//Book data fill

function getGet(name) {
  var s = window.location.search;
  s = s.match(new RegExp(name + '=([^&=]+)'));
  return s ? s[1] : false;
}

const createSlideFor = (book) => `
<div class="book-slider-for_slide"><img src="images/dist/cover${book.id}.jpg" alt=""  class="book-slider-for_slide-img"></div>
<div class="book-slider-for_slide"><img src="images/dist/preview${book.id}.jpg" alt=""  class="book-slider-for_slide-img"></div>
`
const createSlideNav = (book) => `
<div class="book-slider-nav_slide"><img src="images/dist/cover${book.id}.jpg" alt=""  class="book-slider-nav_slide-img"></div>
<div class="book-slider-nav_slide"><img src="images/dist/preview${book.id}.jpg" alt="" class="book-slider-nav_slide-img"></div>
`
const createBookCategories = (category) => `
<li class="book-info_categories_item"><a href="#" class="book-info_categories_link">${category.name}</a></li>
`

$(async function f() {
let url = 'https://localhost:7084/Catalogue/books/' + getGet('id');
let response = await fetch (url);
if (response.ok) {
let book = await response.json();

document.getElementById("book-name-id").innerHTML = book.name.toUpperCase();
document.getElementById("book-author-id").innerHTML ="by " + book.authors[0].name; 
const date= new Date(book.publishingYear);
var options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};
document.getElementById("book-date-id").innerHTML = date.toLocaleString("en-US", options);
document.getElementById("book-annotation-id").innerHTML = book.annotation;
document.getElementById("book-price-id").innerHTML = book.price.toFixed(2);
const BookSliderFor = document.querySelector('.book-slider-for');
const BookSliderNav = document.querySelector('.book-slider-nav');
BookSliderFor.innerHTML += createSlideFor(book);
BookSliderNav.innerHTML += createSlideNav(book);
bookSlider(); 
const BookCategories = document.querySelector('.book-info_categories');
let categories_arr = book.categories;
categories_arr.forEach((category) =>{
  BookCategories.innerHTML += createBookCategories(category);
}); 

} else {
alert("Ошибка HTTP: " + response.status);
}})


//Books_slider 
function bookSlider() {
$('.book-slider-for').slick({
slidesToShow: 1,
slidesToScroll: 1,
arrows: false,
fade: true,
asNavFor: '.book-slider-nav'
});
$('.book-slider-nav').slick({
slidesToShow: 1,
slidesToScroll: 1,
asNavFor: '.book-slider-for',
loop: true,
dots: true,
centerMode: true,
focusOnSelect: true
});
}

// Fill favorite button Book page
$('.book-favorites-button-svg').on("click", function() {
  var id = getGet('id')
if($('#favorite-book').css('fill') == "rgb(212, 85, 85)"){
  const myDataObject ={ userId: 1, bookId: id}
  let url = 'https://localhost:7296/Cart/favourites?userId=1&bookId='+ id
  fetch(url, {
     method: 'DELETE',
     headers: {
      'Content-Type': 'application/json'
      
    },
    body: JSON.stringify(myDataObject)
     });
  $('#favorite-book').css({ fill: "#fff" });
} else{
  $('#favorite-book').css({ fill: "#D45555" });
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


//Cart Button
$('.book-cart-button').on("click", function() {
  var id = getGet('id')
  console.log(id)
  if($('#cart-button').css('background-color') == "rgb(255, 255, 255)"){
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
      
      $('#cart-button').css({ background: "#FFA3A3", color: "#fff", border: "#FFA3A3"})
  }
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
       $('#cart-button').css({ background: "#fff", color: "#D45555", 'border': '2px solid #D45555'})
  }
});

 


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