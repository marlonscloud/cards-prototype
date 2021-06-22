document.addEventListener("DOMContentLoaded", function () {
    CardListeners();
});

function CardListeners() {
    let cards = document.getElementsByClassName("small-card");
    addEventListenerList(cards, 'click', CardOpen);
}

function CardOpen() {
    this.parentElement.parentElement.style.width = "55%";
    this.classList.toggle("large-card");
    this.removeEventListener("click", CardOpen);
    this.removeEventListener("click", window.boundCardOpenFn);
    this.firstElementChild.addEventListener("click", CardClose);
}

function CardClose() {
    var smallCard = this.closest(".small-card");
    smallCard.classList.toggle("large-card");
    smallCard.parentElement.parentElement.style.width = "33%";
    smallCard.removeEventListener("click", CardOpen);
    setTimeout(function () {
        smallCard.addEventListener("click", window.boundCardOpenFn = CardOpen.bind(smallCard));
    }.bind(smallCard), 550);
}

/*Utilities START*/
function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}
/*Utilities END*/