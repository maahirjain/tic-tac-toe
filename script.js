function LogicController() {
    this.gameboard = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
}

LogicController.prototype.resetGame = function() {
    this.gameboard = ["", "", "", "", "", "", "", "", ""];
    this.currentPlayer = "X";
}

LogicController.prototype.isMoveIllegal = function(index) {
    return this.gameboard[index] !== "";
}

LogicController.prototype.updateGameboard = function(index) {
    this.gameboard[index] = this.currentPlayer;
    this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    return this.currentPlayer;
}

LogicController.prototype.getWinnerAndString = function() {
    const winnerStrings = ["012", "345", "678", "036", "147", "258", "048", "246"];

    let XString = "";
    let OString = "";

    for (let i = 0; i < this.gameboard.length; i++) {
        if (this.gameboard[i] === "X") { XString += i; }
        else if (this.gameboard[i] === "O") { OString += i; }
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
    } else { return null; }
}

LogicController.prototype.getWinner = function() {
    return this.getWinnerAndString().winner;
}

LogicController.prototype.getWinnerString = function() {
    return this.getWinnerAndString().winnerString;
}

LogicController.prototype.isWinner = function() {
    return this.getWinnerAndString() !== null;
}

function DisplayController() {}

DisplayController.prototype.targetToIndex = function(target) {
    return target.dataset.index;
}

DisplayController.prototype.displayIllegal = function(target) {
    setTimeout(function(){
        target.style.backgroundColor = "red";
   },1000);
}

DisplayController.prototype.displayTurn = function(nextPlayer) {
    let yourTurnImg = document.querySelector(".content img");

    if (nextPlayer === "X") {
        yourTurnImg.setAttribute("src", "./window-close.svg");
        yourTurnImg.setAttribute("alt", "X icon");
    } else {
        yourTurnImg.setAttribute("src", "./circle-outline.svg");
        yourTurnImg.setAttribute("alt", "O icon");
    }
}

DisplayController.prototype.displayWin = function(winner, winnerString) {
    for (let i = 0; i < winnerString.length; i++) {
        let gameBoxIndex = +winnerString.charAt(i);
        let gameBox = document.querySelector(`div[data-index=${gameBoxIndex}]`);

        gameBox.style.backgroundColor = "green";
    }

    let img = document.querySelector("dialog img");

    if (winner === "X") {
        img.setAttribute("src", "./window-close.svg");
        img.setAttribute("alt", "X icon");
    } else {
        img.setAttribute("src", "./circle-outline.svg");
        img.setAttribute("alt", "O icon");
    }

    document.querySelector("dialog").showModal();
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

    for(child of Array.from(document.querySelectorAll(".grid div"))) {
        child.innerHTML = "";
    }
}

DisplayController.prototype.closeModal = function() {
    document.querySelector("dialog").close();
}

function GameController() {
    this.logicObj = new LogicController();
    this.displayObj = new DisplayController();
}

GameController.prototype.gameBoxClicked = function(e) {
    let target = e.target;

    let index = this.displayObj.targetToIndex(target);
    let currentPlayer = this.logicObj.currentPlayer;

    if (this.logicObj.isMoveIllegal(index)) {
        this.displayObj.displayIllegal(target);
    } else {
        this.displayObj.displayMark(target, currentPlayer);
        let nextPlayer = this.logicObj.updateGameboard(index);

        if (this.logicObj.isWinner()) {
            this.displayObj.displayWin
            (this.logicObj.getWinner, this.logicObj.getWinnerString);
        } else {
            this.displayObj.displayTurn(nextPlayer);
        }
    }
}

GameController.prototype.playGame = function() {
    for(child of Array.from(document.querySelectorAll(".grid div"))) {
        child.addEventListener("click", (e) => this.gameBoxClicked(e));
    }

    document.querySelector("#play-again").addEventListener("click", () => {
        this.displayObj.closeModal();
        this.displayObj.displayReset();
    })

    document.querySelector("#back").addEventListener("click", () => {
        this.displayObj.closeModal();
    })
}

let gameObj = new GameController();
gameObj.playGame();
