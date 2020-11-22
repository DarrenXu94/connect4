console.log("Reached");

class Board {
  private rows: number;
  private columns: number;

  private cellHeight;
  private cellWidth;

  private board = [];

  public userTurn;
  public gameover;

  boardState: null;
  constructor() {
    this.rows = 10;
    this.columns = 10;
    this.board = [];
    this.cellHeight = (windowHeight - 200) / 10;
    this.cellWidth = windowWidth / 10;

    this.userTurn = true;
  }

  init() {
    for (let i = 0; i < this.columns; i++) {
      const col = [];
      for (let j = 0; j < this.rows; j++) {
        col.push(0);
      }
      this.board.push(col);
    }
  }

  getBoard() {
    return this.board;
  }

  colorSquare(i, j) {
    if (this.board[j] && this.board[i][j] == 1) {
      fill(255, 0, 0);
    } else if (this.board[i] && this.board[i][j] == 2) {
      fill(0, 0, 255);
    }
  }

  drawBoard() {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        this.colorSquare(i, j);

        rect(
          i * this.cellWidth,
          j * this.cellHeight,
          this.cellWidth,
          this.cellHeight
        );
        fill(255);
      }
    }
  }

  validateVictory() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.columns; j++) {
        if (this.board[i][j] == 0) continue;

        const player = this.board[i][j];

        // Horizontal victory
        if (
          this.board[i][j + 1] == player &&
          this.board[i][j + 2] == player &&
          this.board[i][j + 3] == player
        ) {
          console.log("To it's right");
          return player;
        }

        // Vertical victory
        if (
          this.board[i - 1][j] == player &&
          this.board[i - 2][j] == player &&
          this.board[i - 3][j] == player
        ) {
          console.log("To it's right");
          return player;
        }

        // Diagonal victory
        if (
          this.board[i - 1][j + 1] == player &&
          this.board[i - 2][j + 2] == player &&
          this.board[i - 3][j + 3] == player
        ) {
          console.log("To it's right");
          return player;
        }

        if (
          this.board[i - 1][j - 1] == player &&
          this.board[i - 2][j - 2] == player &&
          this.board[i - 3][j - 3] == player
        ) {
          console.log("To it's right");
          return player;
        }
      }
    }
  }

  addDiscToBoard(column, user) {
    const discColor = user ? 1 : 2;

    for (let i = 0; i < this.rows; i++) {
      // Check each row in the column to see if it's empty
      if (this.board[column][i] != 0) {
        // Check for valid move
        if (i == 0) {
          return false;
        }
        this.board[column][i - 1] = discColor;
        return true;
      } else {
        if (i == this.rows - 1) {
          this.board[column][i] = discColor;
          return true;
        }
      }
    }
  }

  boardClicked(mouseX, mouseY) {
    if (this.gameover) return;
    const clickedColumn = Math.floor(mouseX / this.cellWidth);
    console.log(clickedColumn);
    const moved = this.addDiscToBoard(clickedColumn, this.userTurn);

    if (moved) {
      const victory = this.validateVictory();
      this.gameover = victory;
      this.userTurn = !this.userTurn;
    }
  }
}
