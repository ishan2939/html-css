let btn = document.querySelector(".container .btn button");
let url = '/getQuote';

async function callApi(url) {

    const response = await fetch(url);

    var data = await response.json();

    if (data.quote != undefined)
        document.querySelector('.content .quote .data').innerHTML = data.quote + '<div class="person">- ' + data.quotee + '</div>';
    else
        document.querySelector('.content .quote .data').innerHTML = 'There are no quotes in database please add them first.';
}
window.onload = () => {
    callApi(url);
}

btn.addEventListener('click', () => {
    console.log("hello");
    callApi(url);
});