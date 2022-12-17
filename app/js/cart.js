//Cart Data fill
////////////////////////////////////////////////////////

const cartWrapper = document.querySelector('.cart-wrapper');

const createCartItem = (book, amount) => `
    <div class="cart-item">
    <a href="book.html?id=${book.id}">
      <img src="images/dist/cover${book.id}.jpg" alt="" class="cart-item_img"></a>
      <p class="cart-item_name">${book.name}</p>
      <p class="cart-item_author">${book.authors[0].name}</p>
      <div class="number" data-step="1" data-min="1" data-max="100">
        <input class="number-text" type="text" name="count" value="${amount}">
        <a href="#" class="number-minus">−</a>
        <a href="#" class="number-plus">+</a>
        
      </div>
      <p class="cart-item_price">BYN: ${book.price.toFixed(2)}</p>
      <div class="trash_button" id ="${book.id}">
      <svg  width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26.25 7.475c-4.163-.412-8.35-.625-12.525-.625-2.475 0-4.95.125-7.425.375l-2.55.25m6.875-1.262.275-1.638c.2-1.188.35-2.075 2.463-2.075h3.274c2.113 0 2.276.938 2.463 2.088l.275 1.625m4.188 5.212-.813 12.587c-.137 1.963-.25 3.488-3.738 3.488h-8.024c-3.488 0-3.6-1.525-3.738-3.488l-.813-12.587m6.475 9.2h4.163m-5.2-5h6.25" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </div>
`
 

$(async function k() {
  let url = 'https://localhost:7296/Cart/cart/user/1';
  var total = 0;
  let response = await fetch(url);
  if (response.ok) {
  let cart = await response.json();
  cart.forEach((cart) =>{
    var amount = cart.amount
    let url1 = 'https://localhost:7084/Catalogue/books/'+ cart.bookId;
    fetch(url1)
    .then((cart_books) => cart_books.json())
    .then(function (book) {
      cartWrapper.innerHTML += createCartItem(book, amount);
      total += (+book.price.toFixed(2)) * +amount;
      document.querySelector('.total-price').innerHTML = "TOTAL: "+ total.toFixed(2).toString() + " BYN";
    })
    }); 
  }
  
}); 

// Change cart-item amount
///////////////////////////////////////////////////////////////////////////////////////////////////////////

$('body').on('click', '.number-minus, .number-plus', function(){
  var $row = $(this).closest('.number');
  var $input = $row.find('.number-text');
  var step = $row.data('step');
  var val = parseFloat($input.val());
  if ($(this).hasClass('number-minus')) {
    val -= step;
  } else {
    val += step;
  }
  $input.val(val);
  $input.change();
  return false;
});

$('body').on('change', '.number-text', function(){
  var $input = $(this);
  var $row = $input.closest('.number');
  var step = $row.data('step');
  var min = parseInt($row.data('min'));
  var max = parseInt($row.data('max'));
  var val = parseFloat($input.val());
  if (isNaN(val)) {
    val = step;
  } else if (min && val < min) {
    val = min;	
  } else if (max && val > max) {
    val = max;	
  }
  $input.val(val);
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



///Trash button
$(document).on('click', 'div[class^="trash_button"]', function(e) {
  var id = this.id;
  const myDataObject ={ userId: 1, bookId: id}
  let url = 'https://localhost:7296/Cart/cart?userId=1&bookId='+ id
  fetch(url, {
     method: 'DELETE',
     headers: {
      'Content-Type': 'application/json'
      
    },
    body: JSON.stringify(myDataObject)
     });
    location.reload()
});

