function CreateBubbleWrap() {
    for (let i = 0; i < 10; i++) {
        CreateBubble();

    }
}

let bubbleLayout = document.getElementById("bubblesLayout");

function CreateBubble() {
    let bubble = document.createElement("button");
    bubble.className = "bubble";

    bubbleLayout.appendChild(bubble);

    return bubble;
}

CreateBubbleWrap();