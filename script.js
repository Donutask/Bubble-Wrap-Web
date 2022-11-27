let bubbleLayout = document.getElementById("bubblesLayout");
let popCounter = document.getElementById("popCount");

const bubbleSize = 64;

//same as createbubblewrap
function Refresh() {
    CreateBubbleWrap();
}

//Makes bubbles to try and fill screen
function CreateBubbleWrap() {
    bubbleLayout.innerHTML = "";

    let columns = Math.round(((bubbleLayout.clientWidth - 50) / (bubbleSize + 10)));
    let rows = Math.round((bubbleLayout.clientHeight - 50 - 50) / (bubbleSize + 10));

    bubbleLayout.style.gridTemplateColumns = `repeat(${columns}, ${bubbleSize + 10}px)`;
    bubbleLayout.style.gridTemplateRows = `repeat(${rows}, ${bubbleSize + 10}px)`;

    bubblesCreated = columns * rows;

    for (let i = 0; i < bubblesCreated; i++) {
        CreateBubble();
    }

    bubblesPopped = 0;

    Save();
}

let bubblesCreated = 0;
let bubblesPopped = 0;
let totalBubblesPopped = 0;

//Creates a bubble element and append to grid
function CreateBubble() {
    let bubble = document.createElement("button");
    bubble.className = "bubble";
    //pop with pointer
    // bubble.onmouseenter = function() { PopBubble(bubble) };
    bubble.onpointerenter = function() { PopBubble(bubble) };
    // bubble.onclick = function() { PopBubble(bubble) };

    bubbleLayout.appendChild(bubble);

    return bubble;
}

//Play sound, change appearance and add to counter
function PopBubble(bubble) {
    //don't pop twice
    if (bubble.classList.contains("poppedBubble")) {
        return;
    }
    bubble.classList.add("poppedBubble");
    bubblesPopped++;

    totalBubblesPopped++;
    popCounter.innerHTML = totalBubblesPopped;

    PopSound();

    if (bubblesPopped >= bubblesCreated) {
        CreateBubbleWrap();
    }
}

//SFX
let audioClips = [
    new Audio("Pops/Pop1.wav"),
    new Audio("Pops/Pop2.wav"),
    new Audio("Pops/Pop3.wav"),
    new Audio("Pops/Pop4.wav"),
    new Audio("Pops/Pop5.wav"),
]

function PopSound() {
    audioClips[getRandomInt(0, 4)].play();
}


//Save & Load
function Save() {
    localStorage.setItem("pops", totalBubblesPopped);
}

function Load() {
    //make pop count a positive integer
    totalBubblesPopped = Number.parseInt(localStorage.getItem("pops"));
    if (!Number.isInteger(totalBubblesPopped)) {
        totalBubblesPopped = 0;
    }

    if (totalBubblesPopped < 0) {
        totalBubblesPopped = 0;
    }

    //first time? say what it is
    if (totalBubblesPopped == 0) {
        popCounter.innerHTML = "Bubble Wrap";
    } else {
        popCounter.innerHTML = totalBubblesPopped;
    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 * https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


Load();
CreateBubbleWrap();