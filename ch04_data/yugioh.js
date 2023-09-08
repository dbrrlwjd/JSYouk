
let cardDB = {}, cardData = [], cardDataKeys = [], cardType = [], card_prices = [], card_sets = [];
const v_input = document.querySelector('#inputSearch');
const v_result = document.getElementById("result");
const v_deck = document.querySelector(".deck");
const v_info = document.querySelector(".info");
const v_loading = document.querySelector("#loading");
let decks = {}, tmpDeck = [];

v_loading.style.display = 'block';
let v_ajax = new XMLHttpRequest();
v_ajax.open("GET", "https://db.ygoprodeck.com/api/v7/cardinfo.php");
v_ajax.onload = function () {
    cardDB = JSON.parse(v_ajax.response);
    cardData = cardDB['data'];
    cardDataKeys = Object.keys(cardData[0]);
    for (let i = 0; i < cardData.length; i++) {
        if (cardType.indexOf(cardData[i]['type']) == -1) {
            cardType.push(cardData[i]['type']);
        }
    }
    console.log(cardData);
    console.log(cardType);
    v_loading.style.display = 'none';
}
v_ajax.send();

function f_search() {
    v_result.innerHTML = '';
    for (let i = 0; i < cardData.length; i++) {
        if (cardData[i]['name'].indexOf(v_input.value) != -1 &&
            cardData[i]['frameType'].indexOf('token') == -1 &&
            cardData[i]['frameType'].indexOf('skill') == -1) {
            f_slot(cardData[i]['card_images'][0]['image_url'], cardData[i]['id']);
        }
    }
}

function f_slot(p_src, p_id) {
    let v_img = document.createElement('img');
    v_img.src = p_src;
    v_img.width = 100;
    v_img.id = p_id;
    v_img.addEventListener('contextmenu', () => {
        event.preventDefault();
        event.stopPropagation();
    });
    v_img.addEventListener('mousedown', () => {
        if (event.button == 0) {
            f_info(event.target.id);
        }
        else if (event.button == 1) {
            f_appendCard(event, 2);
        }
        else if (event.button == 2) {
            for (let i = 0; i < cardData.length; i++) {
                if (cardData[i]['id'] == p_id) {
                    if (cardData[i]['frameType'] == 'fusion'
                        || cardData[i]['frameType'] == 'synchro'
                        || cardData[i]['frameType'] == 'xyz'
                        || cardData[i]['frameType'] == 'link') {
                        f_appendCard(event, 1);
                    } else {
                        f_appendCard(event, 0);
                    }
                }
            }
        }
    });
    v_result.appendChild(v_img);
    // v_result.innerHTML += "<img class='card' onmousedown='f_right(this)' width='100px' src='" + v_src + "'>";
}

function f_appendCard(p_event, n) {
    let v_card = document.createElement('img');
    v_card.src = p_event.target.src;
    v_card.width = 50;
    v_card.id = p_event.target.id;
    v_card.addEventListener('mousedown', () => {
        if (event.button == 0) {
            f_info(event.target.id);
        }
        if (event.button == 2) {
            v_deck.children[n].removeChild(event.target);
        }
    });

    let cnt = 0;
    for (let i = 0; i < tmpDeck.length; i++) {
        if (tmpDeck[i] == event.target.id) {
            cnt++;
        }
    }

    if (cnt < 3) {
        if ((n == 0 && v_deck.children[n].childElementCount < 61)
            || n != 0 && v_deck.children[n].childElementCount < 16) {
            v_deck.children[n].appendChild(v_card);
            tmpDeck.push(p_event.target.id);
        }
    }
}

function f_info(p_id) {
    v_info.innerHTML = '';
    let v_card = {};
    for (let i = 0; i < cardData.length; i++) {
        if (cardData[i]['id'] == p_id) {
            v_card = cardData[i];
        }
    }

    let v_img = document.createElement('img');
    v_img.src = v_card['card_images'][0]['image_url'];
    v_img.style.width = '100%';
    v_info.appendChild(v_img);
}

function f_reset(){
    for (let i = 0; i < v_deck.children.length; i++) {
        for (let j = 1; j < v_deck.children[i].children.length; j++) {
            
        }
    }
}

function f_save(){
    
}

function f_enter() {
    if (event.key == 'Enter') {
        f_search();
    }
}