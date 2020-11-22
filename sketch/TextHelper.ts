class TextHelper {
  renderText(board) {
    textSize(50);
    textAlign(CENTER, TOP);

    fill(50, 66, 168);
    text(
      board.gameover
        ? `${board.gameover} wins!`
        : board.userTurn
        ? "1s turn"
        : "2s turn",
      windowWidth / 2,
      50
    );

    if (board.gameover) {
      text("Play again?", windowWidth / 2, 100);
    }

    fill(255);
  }
}
