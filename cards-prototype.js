document.addEventListener("DOMContentLoaded", function () {
    CardListeners();
    HeartIconListeners();
    window.cardListeners = [];
});

function CardListeners() {
    /*When the page loads, get all cards and add the card open event listener to each one*/
    let cards = document.getElementsByClassName("small-card");
    addEventListenerList(cards, 'click', CardOpen);
}

function HeartIconListeners() {
    let hearts = document.getElementsByClassName("heart-icon");

    for (var i = 0; i < hearts.length; i++) {
        hearts[i].addEventListener('click', function (e) {
            e = e || window.event;
            HeartIconClickHandler(e);
        }, false);
    }
}

function CardOpen() {
    var occupationsColumn = this.closest(".occupations-columns").querySelector(".omaps-occupations--empty-column");
    HandleClicks(occupationsColumn);

    /*Add listeners back into any other cards that were closed above*/
    let cards = document.getElementsByClassName("small-card");
    addEventListenerList(cards, 'click', CardOpen);

    /*Set omaps-occupations column (flex column) to expand*/
    this.parentElement.parentElement.classList.toggle("omaps-occupations__wide");
    /*Set padding on the occupations-text paragraph so that it doesn't take up the new larger width of the column*/
    this.previousSibling.previousSibling.firstElementChild.classList.toggle("occupations-text__padding-right");
    this.classList.toggle("large-card");

    /*Remove listeners to open card (since it's now open)*/
    this.removeEventListener("click", CardOpen);
    this.removeEventListener("click", CardOpen);
    this.removeEventListener("click", window.cardListeners[0]);

    /*Add event listener to svg (close icon) for closing card*/
    this.firstElementChild.addEventListener("click", CardClose);
}

function CardClose() {
    /*Get current card*/
    var smallCard = this.closest(".small-card");

    /*Set padding on the occupations-text paragraph so that it doesn't take up the new larger width of the column*/
    var openCardsParagraph = document.querySelectorAll(".occupations-text__padding-right");
    for (i = 0; i < openCardsParagraph.length; i++) {
        openCardsParagraph[i].classList.remove("occupations-text__padding-right");
    }

    var wideColumns = document.querySelectorAll(".omaps-occupations__wide");
    for (i = 0; i < wideColumns.length; i++) {
        wideColumns[i].classList.remove("omaps-occupations__wide");
    }

    /*show the last empty column*/
    smallCard.closest(".occupations-columns").querySelector(".omaps-occupations--empty-column").classList.toggle("omaps-occupations--empty-column__hidden");

    /*Set styles to shrink column*/
    smallCard.classList.toggle("large-card");
    smallCard.parentElement.parentElement.classList.toggle("omaps-occupations__narrow");

    /*Remove any leftover open listener on card and set-up a new one so we can bind 'this'
    - we also need to store the new bound instance of this listener function so we can later remove it on open*/
    smallCard.removeEventListener("click", CardOpen);
    smallCard.removeEventListener("click", CardOpen);

    for (var l = 0; l < window.cardListeners.length; l++) {
        smallCard.removeEventListener("click", window.cardListeners[l]);
    }

    window.cardListeners.splice(0);

    //Remove leftover event listeners
    var new_card = smallCard.cloneNode(true);
    smallCard.parentNode.replaceChild(new_card, smallCard);

    setTimeout(function () {
        var temp;
        new_card.addEventListener("click", temp = CardOpen.bind(new_card));
        window.cardListeners.push(temp);
    }.bind(new_card), 100);
}

function HandleClicks(occupationsColumn) {
    /*When any card is opened, all other cards should close (only one open at a time)*/
    var openCards = document.querySelectorAll(".large-card");
    var openCardsParagraph = document.querySelectorAll(".occupations-text__padding-right");
    var wideColumns = document.querySelectorAll(".omaps-occupations__wide");

    for (i = 0; i < openCards.length; i++) {
        openCards[i].classList.remove("large-card");
    }

    for (i = 0; i < openCardsParagraph.length; i++) {
        openCardsParagraph[i].classList.remove("occupations-text__padding-right");
    }

    for (i = 0; i < wideColumns.length; i++) {
        wideColumns[i].classList.remove("omaps-occupations__wide");
    }

    /*Hide the last empty column if it's not already hidden*/

    if (!occupationsColumn.classList.contains("omaps-occupations--empty-column__hidden")) {
        occupationsColumn.classList.toggle("omaps-occupations--empty-column__hidden");
    }
}

function HeartIconClickHandler(e) {
    // var testy = e.currentTarget.querySelector(".heart-icon--path");
    e.currentTarget.querySelector(".heart-icon--path").classList.toggle("heart-icon__clicked");
}

/*Utilities START*/
function addEventListenerList(list, event, fn) {
    for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
    }
}
/*Utilities END*/