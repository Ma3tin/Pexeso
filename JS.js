window.onload = init;



let visibleCards = 0;
let firstCard = 0;
let firstElement;
let player = 0;
let playerPoints1 = 0;
let playerPoints2 = 0;
let cards = [];
let pointsP1;
let pointsP2;
let p1;
let p2;
//let emots = ["😅"]
let emots = ["😂", "🤣", "😅", "🥰", "😈", "😆", "😎", "🙄", "😤", "🤩", "🤐", "🤑"];
let visited = 0;

function restartSetup() {
    let button = document.getElementById("restart");
    button.addEventListener("click", restart)
}
function restart() {
    document.getElementById("board").innerHTML = '';
    document.getElementById("idNames").innerHTML = '<h1 id="pla1"><span id="point1"></span></h1><h1 id="pla2"><span id="point2"></span></h1>';
    playerPoints1 = 0;
    playerPoints2 = 0;
    cards = [];
    emots = ["😂", "🤣", "😅", "🥰", "😈", "😆", "😎", "🙄", "😤", "🤩", "🤐", "🤑"];
    //emots = ["😂"];
    visited = 0;
    start();
}


function init() {
    let modal = document.getElementById("myModal");

    let span = document.getElementById("modalClose");

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
    start();
}
function start() {
    restartSetup();
    let size = emots.length;
    for (let i = 0; i < size; i++) emots.push(emots[i]);
    console.log(size)

    size = emots.length;
    let numbers = [];
    let contains = true;
    for (let i = 0; numbers.length !== emots.length; i++) {
        let random = Math.floor(Math.random() * size);
        for (let j = 0; j < size; j++) if (numbers.includes(random)) contains = false;
        if (contains) numbers.push(random);
        contains = true;
    }
    console.log(numbers)

    let divAll = document.createElement("div");

    p1 = document.createElement("span");
    p1.setAttribute("id", "playerOne");
    p1.innerText = "Player One";
    setPlayer(p1)

    pointsP1 = document.getElementById("point1");
    pointsP1.innerText = playerPoints1;

    p2 = document.createElement("span");
    p2.setAttribute("id", "playerTwo");
    p2.innerText = "Player Two"
    document.getElementById("pla1").appendChild(p1)
    document.getElementById("pla2").appendChild(p2)
    unsetPlayer(p2)

    pointsP2 = document.getElementById("point2");
    pointsP2.innerText = playerPoints2;

    for (let i = 0; i < size; i++) {
        let card = {
            "content": emots[numbers[i]],
            "visible": false,
            "solved": false
        }
        let span = document.createElement("span");
        let div = document.createElement("div");
        div.classList = "backwardStart"
        div.setAttribute("id", "card" + (i + 1));
        span.innerText = card.content;

        div.appendChild(span)
        div.addEventListener("click", function (event) {
            let elem = event.target;
            if (elem.getAttribute("id") === null) {
                elem = elem.parentElement;
            }
            toggleCard(elem)
            //alert(elem + " " + elem.getAttribute("id"));
        })
        cards.push(card)
        divAll.appendChild(div)
    }
    divAll.setAttribute("id", "all")
    document.getElementById("board").appendChild(divAll);
    console.log(cards)

}

function toggleCard(cardElement) {
    let index = parseInt(cardElement.getAttribute("id").substring(4)) - 1;

    let card = cards[index];

    if (((visibleCards === 0) || (visibleCards === 1)) && !card.visible) {
        card.visible = true;
        visibleCards++;
        show(cardElement);
        if (visibleCards === 2) {
            if (card.content === cards[firstCard].content) {
                card.solved = true;
                cards[firstCard].solved = true;
                solved(cardElement);
                solved(firstElement);
                visibleCards = 0;
                if (player === 0) {
                    playerPoints1++;
                    pointsP1.innerText = playerPoints1;
                } else {
                    playerPoints2++;
                    pointsP2.innerText = playerPoints2;
                }
                visited+= 2;
                if (visited === emots.length) {
                    let modal = document.getElementById("myModal");
                    modal.style.display = "block";
                }
            } else {
                setTimeout(function () {
                    card.visible = false;
                    cards[firstCard].visible = false;
                    hide(firstElement);
                    hide(cardElement);
                    visibleCards = 0;
                    if (player === 0) {
                        setPlayer(p2)
                        unsetPlayer(p1)
                        player++;
                    } else {
                        setPlayer(p1)
                        unsetPlayer(p2)
                        player--;
                    }

                    // hraje hrac other
                }, 1500);
            }
        } else {
            firstCard = index;
            firstElement = cardElement;
        }
    }


}

function setPlayer(player) {
    player.classList = "play"
}

function unsetPlayer(player) {
    player.classList = "stop"
}

function solved(cardElement) {
    cardElement.classList = "solved";
}

function show(cardElement) {
    cardElement.classList = "forward";
}

function hide(cardElement) {
    cardElement.classList = "backward";
}


