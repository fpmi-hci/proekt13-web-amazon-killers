//News Data fill
////////////////////////////////////////////////////////



const NewsWrapper = document.querySelector('.small-news-wrapper');

var options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const createNewsItem = (newsItem, pub_name, date) => `
   <div class="small-news_item">
        <div class="small-news-info-wrapper">
        <div class="small-news-item-info">
          <p class="small-news-item-info_headline">${newsItem.headline}</p>
          <p class="small-news-item-info_text">${newsItem.text}</p>
        </div>
        <img style="margin-left: 30px;" class="small-news-img" src="images/dist/news${newsItem.id}.jpg" alt="">
        </div>
        <div class="news-item-buttons_wrapper">
            <p class="publisher-name">${pub_name}</p>
            <p class="publish-time">${date.toLocaleString("en-US", options)}</p>
            <div class="share">
              <svg  width="26" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.854 12.367v8.038c0 .533.216 1.044.6 1.421a2.07 2.07 0 0 0 1.45.589h12.297a2.07 2.07 0 0 0 1.449-.589c.384-.377.6-.888.6-1.42v-8.04m-4.099-6.028L13.052 2.32 8.953 6.34m4.1-4.021v13.062" stroke="#D45555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <p style="margin-left: 10px;">Share</p>
            </div>
            <div class="read-later">
              <svg width="26" height="25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.822 3.324h16.396a2.07 2.07 0 0 1 1.449.588c.384.377.6.888.6 1.421v6.03a9.95 9.95 0 0 1-3.001 7.104 10.352 10.352 0 0 1-7.246 2.943c-1.346 0-2.678-.26-3.922-.765a10.263 10.263 0 0 1-3.324-2.178 9.95 9.95 0 0 1-3.002-7.105V5.333c0-.533.216-1.044.6-1.42a2.07 2.07 0 0 1 1.45-.59v0Z" stroke="#D45555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="m8.92 10.357 4.1 4.02 4.099-4.02" stroke="#D45555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <p style="margin-left: 10px;">Read Later</p>
            </div>
        </div>
      </div>
`
 

$(async function k() {
  document.getElementById('button_1').style.backgroundColor = "rgb(212, 85, 85)"
  let url = 'https://localhost:7054/News/subscriptions/user/1';
  var pub_name;
  var newsItems;
  let response = await fetch(url);
  if (response.ok) {
  let subscriptions = await response.json();
  subscriptions.forEach((subscriptions, index) =>{
    var pub_id = subscriptions.publisherId
    let url1 = 'https://localhost:7054/News/publishers/'+ pub_id;
    fetch(url1)
    .then((news_arr) => news_arr.json())
    .then(function (news) {
      pub_name = news.name;
      newsItems = news.news
      newsItems.forEach((newsItem)=> {
        const date= new Date(newsItem.publishingDate);
        NewsWrapper.innerHTML += createNewsItem(newsItem, pub_name, date)
      });
    })
    }); 
  
  }
  
}); 

  $(document).on('click', 'button[class^="news-buttons_item"]', function(e) {
  if (this.innerHTML != "Your News"){
  var elements = document.getElementsByClassName("news-buttons_item")
  Array.from(elements).forEach((element)=>{element.style.backgroundColor = "#fff"})
  this.style.backgroundColor = "rgb(212, 85, 85)"
  document.querySelector('.small-news-wrapper').innerHTML = "";
  var id = this.id;
  let url1 = 'https://localhost:7054/News/publishers/'+ id;
  let name = this.innerHTML;
  fetch(url1)
    .then((news_arr) => news_arr.json())
    .then(function (news) {
      newsItems = news.news
      newsItems.forEach((newsItem)=> {
        const date= new Date(newsItem.publishingDate);
        NewsWrapper.innerHTML += createNewsItem(newsItem, name, date)
      });
    })
  } else {
    var elements = document.getElementsByClassName("news-buttons_item")
    Array.from(elements).forEach((element)=>{element.style.backgroundColor = "#fff"})
    document.querySelector('.small-news-wrapper').innerHTML = "";
    m();
  }
});

async function m() {
  document.getElementById('button_1').style.backgroundColor = "rgb(212, 85, 85)"
  let url = 'https://localhost:7054/News/subscriptions/user/1';
  var pub_name;
  var newsItems;
  let response = await fetch(url);
  if (response.ok) {
  let subscriptions = await response.json();
  subscriptions.forEach((subscriptions, index) =>{
    var pub_id = subscriptions.publisherId
    let url1 = 'https://localhost:7054/News/publishers/'+ pub_id;
    fetch(url1)
    .then((news_arr) => news_arr.json())
    .then(function (news) {
      pub_name = news.name;
      newsItems = news.news
      newsItems.forEach((newsItem)=> {
        const date= new Date(newsItem.publishingDate);
        NewsWrapper.innerHTML += createNewsItem(newsItem, pub_name, date)
      });
    })
    }); 
  
  }
  
}

////Follow Buttons
$(document).on('click', 'button[class^="publisher-button"]', function(e) {
  var id = this.id;
  button = "#"+id;
  console.log(id)
  const myDataObject ={ 
    "subscriberId": "1",
    "publisherId": id
  }
  let url = 'https://localhost:7054/News/subscriptions'
  fetch(url, {
     method: 'POST',
     headers: {
      'Content-Type': 'application/json'     
    },
    body: JSON.stringify(myDataObject)
     });
    this.style.backgroundColor = "#FFA3A3"
});