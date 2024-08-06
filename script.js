let bubbleLayout = document.getElementById("bubblesLayout");
let popCounter = document.getElementById("popCount");

const bubbleSize = 64;
const unpoppedClass = "bubble";
const poppedClass = "poppedBubble";

//create bubble wrap with sound
function Refresh() {
    let clip = audioClips[getRandomInt(5, 7)];
    clip.volume = 0.75;
    clip.play();

    CreateBubbleWrap();
}

//Makes bubbles to try and fill screen
function CreateBubbleWrap() {
    bubbleLayout.innerHTML = "";

    let columns = Math.round(((bubbleLayout.clientWidth - 50) / (bubbleSize + 10)));
    let rows = Math.round((bubbleLayout.clientHeight - 50) / (bubbleSize + 10));

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
    bubble.className = unpoppedClass;

    //Events to pop the bubble
    // Mouse down and over bubble
    bubble.onmouseenter = function () {
        if (mouseDown) {
            PopBubble(bubble)
        }
    };
    // Otherwise the first clicked bubble doesn't pop
    bubble.onmousedown = function () {
        if (!mouseDown) {
            PopBubble(bubble)
        }
    };
    // Using tab and enter counts as a 'click'. 
    bubble.onclick = function () {
        PopBubble(bubble)
    };

    bubbleLayout.appendChild(bubble);

    return bubble;
}

//Play sound, change appearance and add to counter
function PopBubble(bubble) {
    //don't pop twice
    if (bubble.classList.contains(poppedClass)) {
        return;
    }
    bubble.classList.add(poppedClass);
    bubblesPopped++;

    totalBubblesPopped++;
    popCounter.innerHTML = totalBubblesPopped;

    PopSound();

    if (bubblesPopped >= bubblesCreated) {
        Refresh();
    }
}

//SFX
let audioClips = [
    new Audio("Sounds/Pops/Pop1.wav"),
    new Audio("Sounds/Pops/Pop2.wav"),
    new Audio("Sounds/Pops/Pop3.wav"),
    new Audio("Sounds/Pops/Pop4.wav"),
    new Audio("Sounds/Pops/Pop5.wav"),
    new Audio("Sounds/Swoosh 1.mp3"),
    new Audio("Sounds/Swoosh 2.mp3"),
    new Audio("Sounds/Swoosh 3.mp3"),
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

let mouseDown = false;
document.onmousedown = function () {
    mouseDown = true;
}

document.onmouseup = function () {
    mouseDown = false;
}

window.onload = function () {
    Load();
    CreateBubbleWrap();
}