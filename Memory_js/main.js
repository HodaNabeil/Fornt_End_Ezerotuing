/////////////////////////

/*
// function shuffle(array) {
 array.sort(() => Math.random() - 0.5);
    return array;
}
//////////
ل es6

const shuffle = () => {
    for (let i = arr.length - 1; i > 0; i--) {
        const random = Math.floor(Math.random() * i);
        [arr[i], arr[random]] = [arr[random], arr[i]];
    }
};

/////////////////
م تعديله)
لو في حد مستصعب الموضوع في ميزة في es6 بتبدل فيها قيمة متغيريين بدون متحتاج الى متغير وسيط (temp) و هي 
[second variable , first variable] = [first variable , second variable]
و في هذه الحالة هتكون
[array[current], array[random]] = [array[random], array[current]];
يعني هتشيل ال3 خطوات اللي حاطتهم البشمهندس و تحط فقط السطر ده*/

// Select The Start Game Button

document.querySelector(".control-buttons span ").onclick = function () {
    // Prompt Window To Ask For Name
    let youNme = prompt("Whats Your Name?");

    // If Name Is Empty
    if (youNme == "" || youNme == null) {
        // Set Name To Unknown
        document.querySelector(".info-container .name span ").innerHTML = "Unknown";
    } else {
        // Name Is Not Empty
        document.querySelector(".info-container .name span ").innerHTML = youNme;
    }
    // Remove Splash Screen
    document.querySelector(".control-buttons").remove();
};
// Effect Duration
let duration = 1000;

// Select Blocks Container

let blocksCantainer = document.querySelector(".memory-game-blocks");

// Create Array From Game Blocks

let blocks = Array.from(blocksCantainer.children);

// Create Range Of Keys
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);
// let orderRange = Array.from(Array(blocks.length).keys());

// console.log(shuffle(orderRange));

// Add Order Css Property To Game Blocks

blocks.forEach((block, index) => {
    // Add CSS Order Property
    block.style.order = orderRange[index];
    // block.style.order = index;

    block.addEventListener("click", function () {
        // Trigger The Flip Block Function
        flipBlock(block);
    });
});

// Flip Block Function
function flipBlock(selectedBlock) {
    //add class
    selectedBlock.classList.add("is-flipped");
    let allFlippedBlocks = blocks.filter((flippedBlock) => flippedBlock.classList.contains("is-flipped"));
    if (allFlippedBlocks.length === 2) {
        stopClicking();
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }
}

// Check Matched Block
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span");

    if (firstBlock.dataset.nuture === secondBlock.dataset.nuture) {
        firstBlock.classList.remove("is-flipped");
        secondBlock.classList.remove("is-flipped");

        firstBlock.classList.add("has-match");
        secondBlock.classList.add("has-match");
    } else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove("is-flipped");
            secondBlock.classList.remove("is-flipped");
        }, duration);
    }
}
// Shuffle Function
function shuffle(array) {
    // Settings Vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        // Get Random Number
        random = Math.floor(Math.random() * current);
        // Decrease Length By One
        current--;
        // [1] Save Current Element in Stash
        temp = array[current];

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }
    return array;
}
// Stop Clicking Function

function stopClicking() {
    // Add Class No Clicking on Main Container
    blocksCantainer.classList.add("no-clicking");

    // Wait Duration
    setTimeout(() => {
        // Add Class No Clicking on Main Container
        blocksCantainer.classList.remove("no-clicking");
    }, duration);
}
