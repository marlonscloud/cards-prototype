document.addEventListener("DOMContentLoaded", function () {
    CardListeners();
});

function CardListeners() {
    /*When the page loads, get all cards and add the card open event listener to each one*/
    let cards = document.getElementsByClassName("small-card");
    addEventListenerList(cards, 'click', CardOpen);
}

function CardOpen() {
    /*Set styles to expand column*/
    this.parentElement.parentElement.style.width = "55%";
    this.classList.toggle("large-card");

    /*Remove listeners to open card (since it's now open)*/
    this.removeEventListener("click", CardOpen);
    this.removeEventListener("click", window.boundCardOpenFn);

    /*Add event listener to svg (close icon) for closing card*/
    this.firstElementChild.addEventListener("click", CardClose);
}

function CardClose() {
    /*Get current card*/
    var smallCard = this.closest(".small-card");

    /*Set styles to shrink column*/
    smallCard.classList.toggle("large-card");
    smallCard.parentElement.parentElement.style.width = "33%";

    /*Remove any leftover open listener on card and set-up a new one so we can bind 'this'
    - we also need to store the new bound instance of this listener function so we can later remove it on open*/
    smallCard.removeEventListener("click", CardOpen);
    setTimeout(function () {
        smallCard.addEventListener("click", window.boundCardOpenFn = CardOpen.bind(smallCard));
    }.bind(smallCard), 100);
}

/*Utilities START*/
function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}
/*Utilities END*/