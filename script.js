function LogicController() {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
}

GameController.prototype.resetGame = function() {
    gameboard = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
}

GameController.prototype.getCurrentPlayer = function() {
    return currentPlayer;
}

GameController.prototype.isMoveLegal = function(index) {
    return gameboard[index] === "";
}

GameController.prototype.updateGameboard = function(index) {
    gameboard[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    return currentPlayer;
}

GameController.prototype.getWinnerAndString = function() {
    const winnerStrings = ["012", "345", "678", "036", "147", "258", "048", "246"];

    let XString = "";
    let OString = "";

    for (let i = 0; i < gameboard.length; i++) {
        if (gameboard[i] === "X") { XString += i; }
        else if (gameboard[i] === "O") { OString += i; }
    }

    const winnerXStringIndex = winnerStrings.indexOf(XString);
    const winnerOStringIndex = winnerStrings.indexOf(OString);

    if (winnerXStringIndex !== -1) { 
        return { 
            winner: "X", 
            winnerString: winnerStrings[winnerXStringIndex] 
        }; 
    } else if (winnerOStringIndex !== -1) { 
        return { 
            winner: "O", 
            winnerString: winnerStrings[winnerOStringIndex] 
        }; 
    } else { return { winner: null, winnerString: null }; }
}

GameController.prototype.getWinner = function() {
    return getWinnerAndString.winner;
}

GameController.prototype.getWinnerString = function() {
    return getWinnerAndString.winnerString;
}

function DisplayController() {}

DisplayController.prototype.displayIllegal = function(target) {
    setTimeout(function(){
        target.style.backgroundColor = "red";
   },1000);
}

DisplayController.prototype.displayTurn = function(nextPlayer) {
    let yourTurnText = document.querySelector(".content p:first-child");

    if (nextPlayer === "X") {
        yourTurnText.innerHTML = "Your turn: <img src=\"./window-close.svg\" alt=\"X icon\">";
    } else {
        yourTurnText.innerHTML = "Your turn: <img src=\"./circle-outline.svg\" alt=\"O icon\">";
    }
}

DisplayController.prototype.displayWin = function(winnerString) {
    for (let i = 0; i < winnerString.length; i++) {
        let gameBoxIndex = +winnerString.charAt(i);
        let gameBox = document.querySelector(`div[data-index=${gameBoxIndex}]`);

        gameBox.style.backgroundColor = "green";
    }
}

DisplayController.prototype.displayMark = function(target, currentPlayer) {
    if (currentPlayer === "X") {
        target.innerHTML = "<img src=\"./window-close.svg\" alt=\"X icon\">";
    } else {
        target.innerHTML = "<img src=\"./circle-outline.svg\" alt=\"O icon\">";
    }
}

DisplayController.prototype.displayReset = function() {
    this.displayTurn("X");

    for(child of document.querySelectorAll(".grid")) {
        child.innerHTML = "";
    }
}
