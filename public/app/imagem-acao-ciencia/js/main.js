loadData = function() {
    d3.csv("./data/biology-cards.csv").then(function(data) {
        BiologyDeck = data;
    });
    d3.csv("./data/neuro-cards.csv").then(function(data) {
        NeuroDeck = data;
    });
    d3.csv("./data/ecology-cards.csv").then(function(data) {
        EcologyDeck = data;
    });
}

generateCard = function() {
    switch (category_select.value) {
    case "biologia":
        var deck = BiologyDeck;
        var max_cats = 5;
        break;
    case "neuro":
        var deck = NeuroDeck;
        var max_cats = 5;
        break;
    case "ecologia":
        var deck = EcologyDeck;
        var max_cats = 4;
        break;
    }

    for (i = 0; i < 5; i++) {
        if (max_cats == 4 && i == 4) {
            pcard[i].innerHTML = "";
            ptitles[i].innerHTML = "";
        } else {
            pcard[i].innerHTML = Object.values(deck[Math.floor(Math.random() * deck.length)])[i];
            ptitles[i].innerHTML = Object.keys(deck[0])[i];
        }
    }

}

window.onload = loadData();

pcard = [
    document.querySelector("#card_text1"),
    document.querySelector("#card_text2"),
    document.querySelector("#card_text3"),
    document.querySelector("#card_text4"),
    document.querySelector("#card_text5")
];

ptitles = [
    document.querySelector("#titles_text1"),
    document.querySelector("#titles_text2"),
    document.querySelector("#titles_text3"),
    document.querySelector("#titles_text4"),
    document.querySelector("#titles_text5")
];

pcategory = document.querySelector("#category_select");
btn_new = document.querySelector("#btn_new_card");

btn_new.addEventListener("click", generateCard);
