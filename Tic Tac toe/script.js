console.log("Welcome to Tic Tac Toe");
let music = new Audio("background.mp3");
let audioTurn = new Audio("ting.mp3");
let win = new Audio("win.mp3");
let drawSound = new Audio("a.mp3"); // Define your draw sound
let turn = "X";
let isgameover = false;
let isAiMode = false;  // Flag to indicate if AI mode is active

// Function to change the turn
const changeTurn = () => {
    return turn === "X" ? "0" : "X";
}

// Function to check for a win 
const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2],  // Top row
        [3, 4, 5],  // Middle row
        [6, 7, 8],  // Bottom row
        [0, 3, 6],  // Left column
        [1, 4, 7],  // Middle column
        [2, 5, 8],  // Right column
        [0, 4, 8],  // Diagonal 1
        [2, 4, 6],  // Diagonal 2
    ];
    wins.forEach(e => {
        if ((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && 
            (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && 
            (boxtext[e[0]].innerText !== "")) {
            
            // Show who won
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won";
            isgameover = true;

            // Stop the background music
            music.pause();

            // Play the game over sound
            win.play();

            // Show win animation
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
        }
    });

    // Check for draw
    if (!isgameover) {
        let isDraw = true;
        Array.from(boxtext).forEach(element => {
            if (element.innerText === "") {
                isDraw = false; // Found an empty box, so it's not a draw
            }
        });

        if (isDraw) {
            document.querySelector('.info').innerText = "It's a Draw!";
            isgameover = true;
            music.pause(); // Stop the background music
            drawSound.play(); // Play draw sound
            document.getElementById('drawGif').style.width = "200px";
        }
    }
}

// AI move logic
const aiMove = () => {
    let emptyBoxes = [];
    let boxtext = document.getElementsByClassName('boxtext');
    
    // Collect empty boxes
    Array.from(boxtext).forEach((element, index) => {
        if (element.innerText === "") {
            emptyBoxes.push(index);
        }
    });

    // Choose a random empty box for AI's move
    if (emptyBoxes.length > 0) {
        let randomBoxIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        boxtext[randomBoxIndex].innerText = turn;
        turn = changeTurn();
        audioTurn.play();
        checkWin();
        if (!isgameover) {
            document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
        }
    }
}

// Game Logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', () => {
        if (boxtext.innerText === '' && !isgameover) {
            music.play();
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover) {
                document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
                if (isAiMode && turn === "0") {
                    setTimeout(aiMove, 500); // AI takes a turn with some delay
                }
            } 
        }
    });
});

// Add onclick listener to reset button
document.getElementById('reset').addEventListener('click', () => {
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = "";
    });
    turn = "X"; 
    isgameover = false;
    isAiMode = false;  // Reset to two-player mode
    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px";
    document.getElementById('drawGif').style.width = "0px";
    music.pause();
    music.currentTime = 0;  // Reset background music

    win.pause();
    win.currentTime = 0;  // Reset win sound

    drawSound.pause();
    drawSound.currentTime = 0;
});


// Add listener to AI mode button
document.getElementById('aiMode').addEventListener('click', () => {
    isAiMode = true;
    document.getElementsByClassName("info")[0].innerText = "AI Activated! Turn for X";
    turn = "X";  // Reset turn to X
    isgameover = false;
});




