


//let cards = ["😂", "🤣", "😅", "🥰", "😈"];
let cards = ["A", "B", "C", "D", "E", "F", "G", "H"]
let size;
let output;

function logic() {
    let emojis = "";
    for (let i = 0; i < cards.length; i++) {
        emojis += cards[i];
    }
    output = "";
    output = emojis;
    for (let i = 0; i < cards.length; i++) {
        output += cards[i]
    }
    size = Math.sqrt(output.length);
    console.log(output);
}

function html() {
    for (let i = 0; i < size; i++) {
        let name = "row" + i;
        name = document.createElement("div");
        name.setAttribute("id", "name");
    }
}