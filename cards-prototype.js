document.addEventListener("DOMContentLoaded", function () {
    CardListeners();
});

function CardListeners() {
    let cards = document.getElementsByClassName("small-card");
    addEventListenerList(cards, 'click', CardOpen);
}


/*Utilities START*/
function CardOpen() {
    this.parentElement.parentElement.style.width = "55%";
    this.classList.toggle("large-card");
}

function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}
/*Utilities END*/