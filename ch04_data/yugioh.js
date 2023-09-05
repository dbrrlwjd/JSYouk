const v_input = document.querySelector('input');
const v_result = document.querySelector("#result");
let cardDB = {};
let cardData = [];

let v_ajax = new XMLHttpRequest();
v_ajax.open("GET", "https://db.ygoprodeck.com/api/v7/cardinfo.php");
v_ajax.onload = function () {
    cardDB = JSON.parse(v_ajax.response);
    cardData = cardDB['data'];
}
v_ajax.send();
console.log(v_result);
function f_search() {
    v_result.innerHTML = '';
    for (let i = 0; i < cardData.length; i++) {
        if (cardData[i]['name'].indexOf(v_input.value) != -1) {                  
            f_slot(cardData[i]['card_images'][0]['image_url']);
        }
    }
}

function f_slot(v_src) {
    // let v_img = document.createElement('img');
    // v_img.src = v_src;
    // v_result.innerHTML += v_img;
    v_result.innerHTML += "<img width='100' height='150' src='" + v_src + "'>";
}