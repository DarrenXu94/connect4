// GLOBAL VARS & TYPES
let speed: p5.Element;

let board;
let textHelper;

// P5 WILL AUTOMATICALLY USE GLOBAL MODE IF A DRAW() FUNCTION IS DEFINED
function setup() {
  console.log("🚀 - Setup initialized - P5 is running");

  board = new Board();
  textHelper = new TextHelper();
  console.log(board, "BOARD");

  board.init();

  board.getBoard();

  // FULLSCREEN CANVAS
  createCanvas(windowWidth, windowHeight);
}

// p5 WILL HANDLE REQUESTING ANIMATION FRAMES FROM THE BROWSER AND WIL RUN DRAW() EACH ANIMATION FROME
function draw() {
  // CLEAR BACKGROUND
  background(0);
  // TRANSLATE TO CENTER OF SCREEN
  // translate(width / 2, height / 2);
  board.drawBoard();
  textHelper.renderText(board);
}

function mouseReleased() {
  board.boardClicked(mouseX, mouseY);
}

// p5 WILL AUTO RUN THIS FUNCTION IF THE BROWSER WINDOW SIZE CHANGES
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
