// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

const boardSize = 400,
      darkSqColor = "brown",
      lightSqColor = "beige",
      uiColor = "red",
      pieces = {},
      moves = [],
      board = {};

var boardCanvas, boardCtx, uiCanvas, uiCtx, width, height,
dragging = false, dragFrom, dragTo;

document.addEventListener("DOMContentLoaded", init);


/* SETUP */
 function init () {
     boardCanvas = document.querySelector("canvas");
     uiCanvas = boardCanvas.nextElementSibling;
     boardCtx = boardCanvas.getContext("2d");
     uiCtx = uiCanvas.getContext("2d");
     width = boardCanvas.width = uiCanvas.width = boardSize;
     height = boardCanvas.height = uiCanvas.height = boardSize;

 setupPieces();
 setupBoard();
 drawBoard();
 drawPieces();
}

function setupPieces() {
    //preload piece images
}

function setupBoard() {
    let squareSize = boardSize/8;
         board.a8 = { x: squareSize * 0, y: squareSize * 0, piece: null };
         board.a7 = { x: squareSize * 0, y: squareSize * 1, piece: "r" };
         board.a6 = { x: squareSize * 0, y: squareSize * 2, piece: null };
         board.a5 = { x: squareSize * 0, y: squareSize * 3, piece: null };
         board.a4 = { x: squareSize * 0, y: squareSize * 4, piece: null };
         board.a3 = { x: squareSize * 0, y: squareSize * 5, piece: "b" };
         board.a2 = { x: squareSize * 0, y: squareSize * 6, piece: null };
         board.a1 = { x: squareSize * 0, y: squareSize * 7, piece: "b" };
         board.b8 = { x: squareSize * 1, y: squareSize * 0, piece: "r" };
         board.b7 = { x: squareSize * 1, y: squareSize * 1, piece: null };
         board.b6 = { x: squareSize * 1, y: squareSize * 2, piece: "r" };
         board.b5 = { x: squareSize * 1, y: squareSize * 3, piece: null };
         board.b4 = { x: squareSize * 1, y: squareSize * 4, piece: null };
         board.b3 = { x: squareSize * 1, y: squareSize * 5, piece: null };
         board.b2 = { x: squareSize * 1, y: squareSize * 6, piece: "b" };
         board.b1 = { x: squareSize * 1, y: squareSize * 7, piece: null };
         board.c8 = { x: squareSize * 2, y: squareSize * 0, piece: null };
         board.c7 = { x: squareSize * 2, y: squareSize * 1, piece: "r" };
         board.c6 = { x: squareSize * 2, y: squareSize * 2, piece: null };
         board.c5 = { x: squareSize * 2, y: squareSize * 3, piece: null };
         board.c4 = { x: squareSize * 2, y: squareSize * 4, piece: null };
         board.c3 = { x: squareSize * 2, y: squareSize * 5, piece: "b" };
         board.c2 = { x: squareSize * 2, y: squareSize * 6, piece: null };
         board.c1 = { x: squareSize * 2, y: squareSize * 7, piece: "b" };
         board.d8 = { x: squareSize * 3, y: squareSize * 0, piece: "r" };
         board.d7 = { x: squareSize * 3, y: squareSize * 1, piece: null };
         board.d6 = { x: squareSize * 3, y: squareSize * 2, piece: "r" };
         board.d5 = { x: squareSize * 3, y: squareSize * 3, piece: null };
         board.d4 = { x: squareSize * 3, y: squareSize * 4, piece: null };
         board.d3 = { x: squareSize * 3, y: squareSize * 5, piece: null };
         board.d2 = { x: squareSize * 3, y: squareSize * 6, piece: "b" };
         board.d1 = { x: squareSize * 3, y: squareSize * 7, piece: null };
         board.e8 = { x: squareSize * 4, y: squareSize * 0, piece: null };
         board.e7 = { x: squareSize * 4, y: squareSize * 1, piece: "r" };
         board.e6 = { x: squareSize * 4, y: squareSize * 2, piece:  null };
         board.e5 = { x: squareSize * 4, y: squareSize * 3, piece: null };
         board.e4 = { x: squareSize * 4, y: squareSize * 4, piece: null };
         board.e3 = { x: squareSize * 4, y: squareSize * 5, piece: "b" };
         board.e2 = { x: squareSize * 4, y: squareSize * 6, piece: null };
         board.e1 = { x: squareSize * 4, y: squareSize * 7, piece: "b" };
         board.f8 = { x: squareSize * 5, y: squareSize * 0, piece: "r" };
         board.f7 = { x: squareSize * 5, y: squareSize * 1, piece: null };
         board.f6 = { x: squareSize * 5, y: squareSize * 2, piece: "r" };
         board.f5 = { x: squareSize * 5, y: squareSize * 3, piece: null };
         board.f4 = { x: squareSize * 5, y: squareSize * 4, piece: null };
         board.f3 = { x: squareSize * 5, y: squareSize * 5, piece: null };
         board.f2 = { x: squareSize * 5, y: squareSize * 6, piece: "b" };
         board.f1 = { x: squareSize * 5, y: squareSize * 7, piece: null };
         board.g8 = { x: squareSize * 6, y: squareSize * 0, piece: null };
         board.g7 = { x: squareSize * 6, y: squareSize * 1, piece: "r" };
         board.g6 = { x: squareSize * 6, y: squareSize * 2, piece: null };
         board.g5 = { x: squareSize * 6, y: squareSize * 3, piece: null };
         board.g4 = { x: squareSize * 6, y: squareSize * 4, piece: null };
         board.g3 = { x: squareSize * 6, y: squareSize * 5, piece: "b" };
         board.g2 = { x: squareSize * 6, y: squareSize * 6, piece: null };
         board.g1 = { x: squareSize * 6, y: squareSize * 7, piece: "b" };
         board.h8 = { x: squareSize * 7, y: squareSize * 0, piece: "r" };
         board.h7 = { x: squareSize * 7, y: squareSize * 1, piece: null };
         board.h6 = { x: squareSize * 7, y: squareSize * 2, piece: "r" };
         board.h5 = { x: squareSize * 7, y: squareSize * 3, piece: null };
         board.h4 = { x: squareSize * 7, y: squareSize * 4, piece: null };
         board.h3 = { x: squareSize * 7, y: squareSize * 5, piece: null };
         board.h2 = { x: squareSize * 7, y: squareSize * 6, piece: "b" };
         board.h1 = { x: squareSize * 7, y: squareSize * 7, piece: null };
             moves.length = 1; // empty out moves array
             moves[0] = JSON.parse(JSON.stringify(board)); // deep copy of board
}

/* EVENT HANDLING */
function handleMousedown(e) {
    if (dragFrom) {
        dragging = true;
    } 
}

function handleMousemove(e) {
    uiCtx.clearRect(0, 0, width, height);
    if (dragging) {
        handleDrag(e);
    }
    else { //not dragging but hovering 
        handleHover(e);
    }
}

function handleDrag(e) {
    let squareSize = boardSize/8,
    player = whoseTurn(), //"b" or "r"
    lastPosition = moves[moves.length-1],
    square = getSquareByXY(e.clientX, e.clientY)  // find square from mousemove event object;
if (isValidMove(square)) {
    //currently, can move a piece onto ANY empty square (!lastPosition[square].piece) or an opponent's square (lastPosition[square].piece[0] !== player)
        // if so, highlight square
        uiCtx.lineWidth = 4;
        ui.Ctx.strokeStyle = uiColor;
        uiCtx.strokeRect(lastPosition[square].x + 2, lastPosition[square].y + 2, squareSize - 4, squareSize - 4);
        // draw line from original square
        uiCtx.lineWidth = 2;
        uiCtx.beginPath();
        let x1 = lastPosition[dragFrom].x + squareSize/2,
            y1 = lastPosition[dragFrom].y + squareSize/2,
            x2 = lastPosition[square].x + squareSize/2,
            y2 = lastPosition[square].y + squareSize/2;
        uiCtx.moveTo(x1, y1);
        uiCtx.lineTo(x2, y2);
        uiCtx.stroke();
        dragTo = square;
    }
    else {
        dragTo = null;
    }
}

/* DRAWING */
function drawBoard(){
    let squareSize = boardSize/8,
        isLightSq = true;
        for (let x=0; x<width; x+=squareSize) {
            for (let y=0; y<height; y+=squareSize) {
                if (isLightSq) boardCtx.fillStyle = lightSqColor;
                else boardCtx.fillStyle = darkSqColor; 
                boardCtx.fillRect(x, y, squareSize, squareSize);
                isLightSq = !isLightSq;
            }
            isLightSq = !isLightSq;
        }
}

function drawPieces() {
    let lastPosition = moves[moves.lenth-1]; //get last element of moves array
    boardCtx.fillStyle = "black";
    boardCtx.textBaseline ="top";
    boardCtx.font = "30px Verdana"
    for (let square in lastPosition) { //iterate through the most recent game state
        if (lastPosition[square].piece) { 
boardCtx.fillText(lastPosition[square].piece, lastPosition[square].x, lastPosition[square].y);
        }
    } 
}

