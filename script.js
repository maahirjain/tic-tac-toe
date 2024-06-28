function GameController() {
    let gameboard = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
}

GameController.prototype.isMoveLegal = function(index) {
    return gameboard[index] === "";
}

GameController.prototype.updateGameboard = function(index) {
    gameboard[index] = currentPlayer;
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    return currentPlayer;
}

GameController.prototype.getWinner = function() {
    let winnerString = "012,345,678,036,147,258,048,246";

    let XString = "";
    let OString = "";

    for (let i = 0; i < gameboard.length; i++) {
        if (gameboard[i] === "X") { XString += i; }
        else if (gameboard[i] === "O") { OString += i; }
    }

    if (winnerString.contains(XString)) { return "X"; }
    else if (winnerString.contains(OString)) { return "O"; }
    else { return null; }
}

