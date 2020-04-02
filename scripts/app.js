function data() {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const apiKey = "4c7d8f07559342cabe7d120f24568160";
    const api = `${proxy}http://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;

    const fetchTrending = () => {
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(result => {
                const {articles} = result;
                if(result.error) {
                    console.log('error');
                } else {
                    console.log(articles);
                    renderArticle(articles);
                }
            })
    }
    fetchTrending();

    const renderArticle = (articles) => {
        let articleItem = document.querySelector('#article-item');
        articleItem.innerHTML = "";

        articles.forEach(({title, description, author, url}) => {
            articleItem.innerHTML += `
            <article class="card">
                <h2>${title}</h2>
                <p>${description}</p>
                <p class="author">${author}</p>
                <a href=${url} target="_blank">Read more</a>
            </article>
            `;
        })
    }
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

document.addEventListener("DOMContentLoaded", data);