const orderWrapper = document.querySelector('.customers-order');

const createOrderItem = (book, amount) => `
    <li class ="order-item" >Name: ${book.name}, amount: ${amount}, price: ${book.price.toFixed(2)} BYN</li>
`
$(async function k() {
  let url = 'https://localhost:7296/Cart/cart/user/1';
  var total = 0;
  let response = await fetch(url);
  if (response.ok) {
  let order = await response.json();
  order.forEach((order) =>{
    var amount = order.amount
    let url1 = 'https://localhost:7084/Catalogue/books/'+ order.bookId;
    fetch(url1)
    .then((order_books) => order_books.json())
    .then(function (book) {
      orderWrapper.innerHTML += createOrderItem(book, amount);
      total += (+book.price.toFixed(2)) * +amount;
      document.querySelector('.total-value').innerHTML = "TOTAL: "+ total.toFixed(2).toString() + " BYN";
    })
    }); 
  }
  
}); 