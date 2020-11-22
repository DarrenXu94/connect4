console.log("Reached");
var Board = (function () {
    function Board() {
        this.board = [];
        this.rows = 10;
        this.columns = 10;
        this.board = [];
        this.cellHeight = (windowHeight - 200) / 10;
        this.cellWidth = windowWidth / 10;
        this.userTurn = true;
    }
    Board.prototype.init = function () {
        for (var i = 0; i < this.columns; i++) {
            var col = [];
            for (var j = 0; j < this.rows; j++) {
                col.push(0);
            }
            this.board.push(col);
        }
    };
    Board.prototype.getBoard = function () {
        return this.board;
    };
    Board.prototype.colorSquare = function (i, j) {
        if (this.board[j] && this.board[i][j] == 1) {
            fill(255, 0, 0);
        }
        else if (this.board[i] && this.board[i][j] == 2) {
            fill(0, 0, 255);
        }
    };
    Board.prototype.drawBoard = function () {
        for (var i = 0; i < this.columns; i++) {
            for (var j = 0; j < this.rows; j++) {
                this.colorSquare(i, j);
                rect(i * this.cellWidth, j * this.cellHeight, this.cellWidth, this.cellHeight);
                fill(255);
            }
        }
    };
    Board.prototype.validateVictory = function () {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                if (this.board[i][j] == 0)
                    continue;
                var player = this.board[i][j];
                if (this.board[i][j + 1] == player &&
                    this.board[i][j + 2] == player &&
                    this.board[i][j + 3] == player) {
                    console.log("To it's right");
                    return player;
                }
                if (this.board[i - 1][j] == player &&
                    this.board[i - 2][j] == player &&
                    this.board[i - 3][j] == player) {
                    console.log("To it's right");
                    return player;
                }
                if (this.board[i - 1][j + 1] == player &&
                    this.board[i - 2][j + 2] == player &&
                    this.board[i - 3][j + 3] == player) {
                    console.log("To it's right");
                    return player;
                }
                if (this.board[i - 1][j - 1] == player &&
                    this.board[i - 2][j - 2] == player &&
                    this.board[i - 3][j - 3] == player) {
                    console.log("To it's right");
                    return player;
                }
            }
        }
    };
    Board.prototype.addDiscToBoard = function (column, user) {
        var discColor = user ? 1 : 2;
        for (var i = 0; i < this.rows; i++) {
            if (this.board[column][i] != 0) {
                if (i == 0) {
                    return false;
                }
                this.board[column][i - 1] = discColor;
                return true;
            }
            else {
                if (i == this.rows - 1) {
                    this.board[column][i] = discColor;
                    return true;
                }
            }
        }
    };
    Board.prototype.boardClicked = function (mouseX, mouseY) {
        if (this.gameover)
            return;
        var clickedColumn = Math.floor(mouseX / this.cellWidth);
        console.log(clickedColumn);
        var moved = this.addDiscToBoard(clickedColumn, this.userTurn);
        if (moved) {
            var victory = this.validateVictory();
            this.gameover = victory;
            this.userTurn = !this.userTurn;
        }
    };
    return Board;
}());
var ColorHelper = (function () {
    function ColorHelper() {
    }
    ColorHelper.getColorVector = function (c) {
        return createVector(red(c), green(c), blue(c));
    };
    ColorHelper.rainbowColorBase = function () {
        return [
            color('red'),
            color('orange'),
            color('yellow'),
            color('green'),
            color(38, 58, 150),
            color('indigo'),
            color('violet')
        ];
    };
    ColorHelper.getColorsArray = function (total, baseColorArray) {
        var _this = this;
        if (baseColorArray === void 0) { baseColorArray = null; }
        if (baseColorArray == null) {
            baseColorArray = ColorHelper.rainbowColorBase();
        }
        var rainbowColors = baseColorArray.map(function (x) { return _this.getColorVector(x); });
        ;
        var colours = new Array();
        for (var i = 0; i < total; i++) {
            var colorPosition = i / total;
            var scaledColorPosition = colorPosition * (rainbowColors.length - 1);
            var colorIndex = Math.floor(scaledColorPosition);
            var colorPercentage = scaledColorPosition - colorIndex;
            var nameColor = this.getColorByPercentage(rainbowColors[colorIndex], rainbowColors[colorIndex + 1], colorPercentage);
            colours.push(color(nameColor.x, nameColor.y, nameColor.z));
        }
        return colours;
    };
    ColorHelper.getColorByPercentage = function (firstColor, secondColor, percentage) {
        var firstColorCopy = firstColor.copy();
        var secondColorCopy = secondColor.copy();
        var deltaColor = secondColorCopy.sub(firstColorCopy);
        var scaledDeltaColor = deltaColor.mult(percentage);
        return firstColorCopy.add(scaledDeltaColor);
    };
    return ColorHelper;
}());
var TextHelper = (function () {
    function TextHelper() {
    }
    TextHelper.prototype.renderText = function (board) {
        textSize(50);
        textAlign(CENTER, TOP);
        fill(50, 66, 168);
        text(board.gameover
            ? board.gameover + " wins!"
            : board.userTurn
                ? "1s turn"
                : "2s turn", windowWidth / 2, 50);
        if (board.gameover) {
            text("Play again?", windowWidth / 2, 100);
        }
        fill(255);
    };
    return TextHelper;
}());
var speed;
var board;
var textHelper;
function setup() {
    console.log("🚀 - Setup initialized - P5 is running");
    board = new Board();
    textHelper = new TextHelper();
    console.log(board, "BOARD");
    board.init();
    board.getBoard();
    createCanvas(windowWidth, windowHeight);
}
function draw() {
    background(0);
    board.drawBoard();
    textHelper.renderText(board);
}
function mouseReleased() {
    board.boardClicked(mouseX, mouseY);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
//# sourceMappingURL=../sketch/sketch/build.js.map