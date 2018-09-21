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

/* DRAWING */
function drawBoard(){
    let squareSize = boardSize/8,
        isLightSq = true;
        for (let x=0; x<width; x+=squareSize) {
            for (let y=0; y<height; y+=squareSize) {
                if (isLightSq) boardCtx.fillStyle = lightSqColor;
                else boardCtx.fillStyle = darkSqColor; 
                boardCtx.fillRect(x, y, squareSize, sqaureSize);
                isLightSq = !isLightSq;
            }
            isLightSq = !isLightSq;
        }
}


