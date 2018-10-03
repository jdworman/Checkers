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
//= require jquery
//= require jquery_ujs
//= require rails-ujs
//= require vue
//= require activestorage
//= require turbolinks
//= require_tree .


const useImages = true;

const boardSize = 400,
      darkSqColor = "brown",
      lightSqColor = "beige",
      uiColor = "lime",
      pieces = {},
      moves = [],
      board = {};


var boardCanvas, boardCtx, uiCanvas, uiCtx, width, height,
	squareSize, canvasPosition, rotated = false,
	dragging = false, dragFrom, dragTo,
   	preloadedImages = 0;

if (useImages) setupPieces();
document.addEventListener("DOMContentLoaded", init);

/* SETUP */
function init () {
    boardCanvas = document.querySelector("canvas");
    uiCanvas = boardCanvas.nextElementSibling;
    boardCtx = boardCanvas.getContext("2d");
    uiCtx = uiCanvas.getContext("2d");
    width = boardCanvas.width = uiCanvas.width = boardSize;
    height = boardCanvas.height = uiCanvas.height = boardSize;
	squareSize = boardSize / 8;
	canvasPosition = uiCanvas.getBoundingClientRect();
	//
	document.querySelector("#rotate").addEventListener("click", rotateBoard);
  	document.querySelector("#randomColor").addEventListener("click", redOrBlack);
	//
    setupBoard();
    drawBoard();
	if (!useImages) drawPieces();
}

function setupPieces() {
    pieces.b = new Image();
  	pieces.b.onload = imagesLoaded;
    pieces.b.src = "images/black.svg";
    pieces.r = new Image();
  	pieces.r.onload = imagesLoaded;
    pieces.r.src = "images/red.svg";
    pieces.bk = new Image();
  	pieces.bk.onload = imagesLoaded;
    pieces.bk.src = "images/black-king.svg";
    pieces.rk = new Image();
  	pieces.rk.onload = imagesLoaded;
    pieces.rk.src = "images/red-king.svg";
}

function imagesLoaded(){
  	preloadedImages++;
	if (preloadedImages === 4){
    	drawPieces();
    }
}

function setupBoard() { //starts or restarts the game from the begining position
    let canvasPosition = uiCanvas.getBoundingClientRect(),
        offsetX = 0,
        offsetY = 0;
    board.a8 = { x: squareSize * 0 + offsetX, y: squareSize * 0 + offsetY, piece: null };
    board.a7 = { x: squareSize * 0 + offsetX, y: squareSize * 1 + offsetY, piece: "r" };
    board.a6 = { x: squareSize * 0 + offsetX, y: squareSize * 2 + offsetY, piece: null };
    board.a5 = { x: squareSize * 0 + offsetX, y: squareSize * 3 + offsetY, piece: null };
    board.a4 = { x: squareSize * 0 + offsetX, y: squareSize * 4 + offsetY, piece: null };
    board.a3 = { x: squareSize * 0 + offsetX, y: squareSize * 5 + offsetY, piece: "b" };
    board.a2 = { x: squareSize * 0 + offsetX, y: squareSize * 6 + offsetY, piece: null };
    board.a1 = { x: squareSize * 0 + offsetX, y: squareSize * 7 + offsetY, piece: "b" };
    board.b8 = { x: squareSize * 1 + offsetX, y: squareSize * 0 + offsetY, piece: "r" };
    board.b7 = { x: squareSize * 1 + offsetX, y: squareSize * 1 + offsetY, piece: null };
    board.b6 = { x: squareSize * 1 + offsetX, y: squareSize * 2 + offsetY, piece: "r" };
    board.b5 = { x: squareSize * 1 + offsetX, y: squareSize * 3 + offsetY, piece: null };
    board.b4 = { x: squareSize * 1 + offsetX, y: squareSize * 4 + offsetY, piece: null };
    board.b3 = { x: squareSize * 1 + offsetX, y: squareSize * 5 + offsetY, piece: null };
    board.b2 = { x: squareSize * 1 + offsetX, y: squareSize * 6 + offsetY, piece: "b" };
    board.b1 = { x: squareSize * 1 + offsetX, y: squareSize * 7 + offsetY, piece: null };
    board.c8 = { x: squareSize * 2 + offsetX, y: squareSize * 0 + offsetY, piece: null };
    board.c7 = { x: squareSize * 2 + offsetX, y: squareSize * 1 + offsetY, piece: "r" };
    board.c6 = { x: squareSize * 2 + offsetX, y: squareSize * 2 + offsetY, piece: null };
    board.c5 = { x: squareSize * 2 + offsetX, y: squareSize * 3 + offsetY, piece: null };
    board.c4 = { x: squareSize * 2 + offsetX, y: squareSize * 4 + offsetY, piece: null };
    board.c3 = { x: squareSize * 2 + offsetX, y: squareSize * 5 + offsetY, piece: "b" };
    board.c2 = { x: squareSize * 2 + offsetX, y: squareSize * 6 + offsetY, piece: null };
    board.c1 = { x: squareSize * 2 + offsetX, y: squareSize * 7 + offsetY, piece: "b" };
    board.d8 = { x: squareSize * 3 + offsetX, y: squareSize * 0 + offsetY, piece: "r" };
    board.d7 = { x: squareSize * 3 + offsetX, y: squareSize * 1 + offsetY, piece: null };
    board.d6 = { x: squareSize * 3 + offsetX, y: squareSize * 2 + offsetY, piece: "r" };
    board.d5 = { x: squareSize * 3 + offsetX, y: squareSize * 3 + offsetY, piece: null };
    board.d4 = { x: squareSize * 3 + offsetX, y: squareSize * 4 + offsetY, piece: null };
    board.d3 = { x: squareSize * 3 + offsetX, y: squareSize * 5 + offsetY, piece: null };
    board.d2 = { x: squareSize * 3 + offsetX, y: squareSize * 6 + offsetY, piece: "b" };
    board.d1 = { x: squareSize * 3 + offsetX, y: squareSize * 7 + offsetY, piece: null };
    board.e8 = { x: squareSize * 4 + offsetX, y: squareSize * 0 + offsetY, piece: null };
    board.e7 = { x: squareSize * 4 + offsetX, y: squareSize * 1 + offsetY, piece: "r" };
    board.e6 = { x: squareSize * 4 + offsetX, y: squareSize * 2 + offsetY, piece:  null };
    board.e5 = { x: squareSize * 4 + offsetX, y: squareSize * 3 + offsetY, piece: null };
    board.e4 = { x: squareSize * 4 + offsetX, y: squareSize * 4 + offsetY, piece: null };
    board.e3 = { x: squareSize * 4 + offsetX, y: squareSize * 5 + offsetY, piece: "b" };
    board.e2 = { x: squareSize * 4 + offsetX, y: squareSize * 6 + offsetY, piece: null };
    board.e1 = { x: squareSize * 4 + offsetX, y: squareSize * 7 + offsetY, piece: "b" };
    board.f8 = { x: squareSize * 5 + offsetX, y: squareSize * 0 + offsetY, piece: "r" };
    board.f7 = { x: squareSize * 5 + offsetX, y: squareSize * 1 + offsetY, piece: null };
    board.f6 = { x: squareSize * 5 + offsetX, y: squareSize * 2 + offsetY, piece: "r" };
    board.f5 = { x: squareSize * 5 + offsetX, y: squareSize * 3 + offsetY, piece: null };
    board.f4 = { x: squareSize * 5 + offsetX, y: squareSize * 4 + offsetY, piece: null };
    board.f3 = { x: squareSize * 5 + offsetX, y: squareSize * 5 + offsetY, piece: null };
    board.f2 = { x: squareSize * 5 + offsetX, y: squareSize * 6 + offsetY, piece: "b" };
    board.f1 = { x: squareSize * 5 + offsetX, y: squareSize * 7 + offsetY, piece: null };
    board.g8 = { x: squareSize * 6 + offsetX, y: squareSize * 0 + offsetY, piece: null };
    board.g7 = { x: squareSize * 6 + offsetX, y: squareSize * 1 + offsetY, piece: "r" };
    board.g6 = { x: squareSize * 6 + offsetX, y: squareSize * 2 + offsetY, piece: null };
    board.g5 = { x: squareSize * 6 + offsetX, y: squareSize * 3 + offsetY, piece: null };
    board.g4 = { x: squareSize * 6 + offsetX, y: squareSize * 4 + offsetY, piece: null };
    board.g3 = { x: squareSize * 6 + offsetX, y: squareSize * 5 + offsetY, piece: "b" };
    board.g2 = { x: squareSize * 6 + offsetX, y: squareSize * 6 + offsetY, piece: null };
    board.g1 = { x: squareSize * 6 + offsetX, y: squareSize * 7 + offsetY, piece: "b" };
    board.h8 = { x: squareSize * 7 + offsetX, y: squareSize * 0 + offsetY, piece: "r" };
    board.h7 = { x: squareSize * 7 + offsetX, y: squareSize * 1 + offsetY, piece: null };
    board.h6 = { x: squareSize * 7 + offsetX, y: squareSize * 2 + offsetY, piece: "r" };
    board.h5 = { x: squareSize * 7 + offsetX, y: squareSize * 3 + offsetY, piece: null };
    board.h4 = { x: squareSize * 7 + offsetX, y: squareSize * 4 + offsetY, piece: null };
    board.h3 = { x: squareSize * 7 + offsetX, y: squareSize * 5 + offsetY, piece: null };
    board.h2 = { x: squareSize * 7 + offsetX, y: squareSize * 6 + offsetY, piece: "b" };
    board.h1 = { x: squareSize * 7 + offsetX, y: squareSize * 7 + offsetY, piece: null };
    moves.length = 1; // empty out moves array
    moves[0] = JSON.parse(JSON.stringify(board)); // deep copy of board
	//
    playerTurn();
}


/* move controllers */

function playerTurn(){
	let color = getCurrentPlayerColor(),
        board = getCurrentBoard(),
        possibleMoves = getMoves(board, color);
	//no moves to play? game over.
  	if (!possibleMoves.length) return gameOver();
	//game's not over yet
  	playerMove(board, possibleMoves);
}

function finishMove(board){
	//add another board to the moves array
	moves.push(board);
	//update board/pieces display
	clearUi();
	drawBoard();
	drawPieces();
	playerTurn();
}


/* game controllers */

function gameOver(){
	//end game state; track wins/losses; restart game
  	let loser = getCurrentPlayerColor();
  	if (loser === "r") alert("Black wins!");
	else alert("Red wins!");
	setupBoard();
	drawBoard();
	drawPieces();
  	document.querySelector("#redOrBlack").removeAttribute("disabled");
}


/* user event handlers */

function playerMove(board, possibleMoves){
	let fromSqPossibles = [],
		move = null;
	startEvents();
	//
	function startEvents(){
		highlightFromSquares(board, possibleMoves);
		uiCanvas.addEventListener("mousedown", handleMousedown);
	}

	function handleMousedown(e){
		let x = e.clientX - canvasPosition.x,
			y = e.clientY - canvasPosition.y,
			sq;
		if (rotated){
			x = boardSize - x;
			y = boardSize - y;
		}
		sq = getSquareByXY(x, y);
		fromSqPossibles = possibleMoves.filter(m => m.fromSq === sq);
		if (!fromSqPossibles.length) return;
		highlightToSquares(board, fromSqPossibles);
		uiCanvas.removeEventListener("mousedown", handleMousedown)
		uiCanvas.addEventListener("mousemove", handleMousemove);
		uiCanvas.addEventListener("mouseup", handleMouseup);
	}

	function handleMousemove(e){
		let x = e.clientX - canvasPosition.x,
			y = e.clientY - canvasPosition.y,
			sq;
		if (rotated){
			x = boardSize - x;
			y = boardSize - y;
		}
		sq = getSquareByXY(x, y);
		move = fromSqPossibles.filter(m => m.toSq === sq);
		if (!move.length){
			move = null;
			return highlightToSquares(board, fromSqPossibles);
		}
		move = move[0];
		connectSquares(board, move.fromSq, move.toSq);
	}

	function handleMouseup(e){
		uiCanvas.removeEventListener("mousemove", handleMousemove);
		uiCanvas.removeEventListener("mouseup", handleMouseup);
		if (!move){
			startEvents();
			return highlightFromSquares(board, possibleMoves);
		}
      	//move piece
      	board[move.toSq].piece = board[move.fromSq].piece;
        board[move.fromSq].piece = null;
		//make jump or normal move?
		if (Math.abs(Number(move.fromSq[1]) - Number(move.toSq[1])) === 1){
        	//normal move, check for king
			if (board[move.toSq].piece === "r" && move.toSq[1] === "1"){
				board[move.toSq].piece = "rk";
			}
			if (board[move.toSq].piece === "b" && move.toSq[1] === "8"){
				board[move.toSq].piece = "bk";
			}
			//finish player turn
          	return finishMove(board);
        }
      	//remove jumped piece
      	if (move.toSq === getFile(move.fromSq[0], -2) + getRank(move.fromSq[1], 2)){
        	//nw
          	let jumpedSq = getFile(move.fromSq[0], -1) + getRank(move.fromSq[1], 1);
          	board[jumpedSq].piece = null;
        }
      	else if (move.toSq === getFile(move.fromSq[0], 2) + getRank(move.fromSq[1], 2)){
        	//ne
          	let jumpedSq = getFile(move.fromSq[0], 1) + getRank(move.fromSq[1], 1);
          	board[jumpedSq].piece = null;
        }
      	else if (move.toSq === getFile(move.fromSq[0], -2) + getRank(move.fromSq[1], -2)){
        	//sw
          	let jumpedSq = getFile(move.fromSq[0], -1) + getRank(move.fromSq[1], -1);
          	board[jumpedSq].piece = null;
        }
      	else {
        	//se
          	let jumpedSq = getFile(move.fromSq[0], 1) + getRank(move.fromSq[1], -1);
          	board[jumpedSq].piece = null;
        }
		//check for king, if so finish player turn
		if (board[move.toSq].piece === "r" && move.toSq[1] === "1"){
			board[move.toSq].piece = "rk";
			return finishMove(board);
		}
		if (board[move.toSq].piece === "b" && move.toSq[1] === "8"){
			board[move.toSq].piece = "bk";
			return finishMove(board);
		}
      	//check for further jumps
		let color = board[move.toSq].piece[0];
      	possibleMoves = getJumps(board, color, move.toSq);
		//no extra jumps, finish player turn
		if (!possibleMoves.length) return finishMove(board);
		//extra jumps must be made, continue
		drawBoard();
		drawPieces();
		startEvents();
	}
}


/* sensors */

function getMoves(board, color, fromSq){
	let possibleMoves = [];
	possibleMoves.push(...getJumps(board, color, fromSq));
	if (!possibleMoves.length) possibleMoves.push(...getNormalMoves(board, color));
	return possibleMoves;
}

function getJumps(board, color, fromSq){
  	let jumps = [];
	//find all jumps for one specific square
	if (fromSq){
		let directionJumps = [];
		if (color === "b" || board[fromSq].piece === "rk") directionJumps.push(...getNorthJumps(board, fromSq));
		if (color === "r" || board[fromSq].piece === "bk") directionJumps.push(...getSouthJumps(board, fromSq));
		if (directionJumps.length) jumps.push(...directionJumps);
	}
	//find all jumps for color
	else {
		for (let sq in board){ //sq will be "a1", "b2", etc.
			if (board[sq].piece && board[sq].piece[0] === color){
				if (color === "b" || board[sq].piece === "rk"){
					let northJumps = getNorthJumps(board, sq);
					if (northJumps.length) jumps.push(...northJumps);
				}
				if (color === "r" || board[sq].piece === "bk"){
					let southJumps = getSouthJumps(board, sq);
					if (southJumps.length) jumps.push(...southJumps);
				}
			}
		}
	}
  	//return array of moveFrom-moveTo options;
  	return jumps;
}

function getNorthJumps(board, sq){
	let jumps = [],
    	color = board[sq].piece[0],
    	nw1 = getFile(sq[0], -1) + getRank(sq[1], 1),
        nw2 = getFile(sq[0], -2) + getRank(sq[1], 2),
        ne1 = getFile(sq[0], 1) + getRank(sq[1], 1),
        ne2 = getFile(sq[0], 2) + getRank(sq[1], 2);
  	if (board[nw1] && board[nw1].piece && board[nw1].piece[0] !== color && board[nw2] && board[nw2].piece === null){
      	let fromSq = sq,
            toSq = nw2;
    	jumps.push({fromSq, toSq});
    }
  	if (board[ne1] && board[ne1].piece && board[ne1].piece[0] !== color && board[ne2] && board[ne2].piece === null){
    	let fromSq = sq,
            toSq = ne2;
      	jumps.push({fromSq, toSq});
    }
  	return jumps;
}

function getSouthJumps(board, sq){
	let jumps = [],
    	color = board[sq].piece[0],
    	sw1 = getFile(sq[0], -1) + getRank(sq[1], -1),
        sw2 = getFile(sq[0], -2) + getRank(sq[1], -2),
        se1 = getFile(sq[0], 1) + getRank(sq[1], -1),
        se2 = getFile(sq[0], 2) + getRank(sq[1], -2);
  	if (board[sw1] && board[sw1].piece && board[sw1].piece[0] !== color && board[sw2] && board[sw2].piece === null){
      	let fromSq = sq,
            toSq = sw2;
    	jumps.push({fromSq, toSq});
    }
  	if (board[se1] && board[se1].piece && board[se1].piece[0] !== color && board[se2] && board[se2].piece === null){
    	let fromSq = sq,
            toSq = se2;
      	jumps.push({fromSq, toSq});
    }
  	return jumps;
}

function getNormalMoves(board, color){
	let normalMoves = [];
	for (let sq in board){
		let piece = board[sq].piece;
		if (piece && piece[0] === color){
			if (color === "b" || piece === "rk"){
				//north
				let nw1 = getFile(sq[0], -1) + getRank(sq[1], 1),
					ne1 = getFile(sq[0], 1) + getRank(sq[1], 1);
				if (board[nw1] && board[nw1].piece === null){
					let fromSq = sq,
						toSq = nw1;
					normalMoves.push({fromSq, toSq});
				}
				if (board[ne1] && board[ne1].piece === null){
					let fromSq = sq,
						toSq = ne1;
					normalMoves.push({fromSq, toSq});
				}

			}
			if (color === "r" || piece === "bk"){
				//south
				let sw1 = getFile(sq[0], -1) + getRank(sq[1], -1),
					se1 = getFile(sq[0], 1) + getRank(sq[1], -1);
				if (board[sw1] && board[sw1].piece === null){
					let fromSq = sq,
						toSq = sw1;
					normalMoves.push({fromSq, toSq});
				}
				if (board[se1] && board[se1].piece === null){
					let fromSq = sq,
						toSq = se1;
					normalMoves.push({fromSq, toSq});
				}
			}
		}
	}
	return normalMoves;
}

function isGameOver(board){
	//make sure there's at least one piece of current player color
	let color = getCurrentPlayerColor();
	for (let sq in board){
		if (sq.piece && sq.piece[0] === color) return false;
	}
	return true;
}


/* helpers */

function getCurrentPlayerColor(){
    // if even number of moves in moves array, it's black's turn, otherwise red's
    return moves.length % 2 === 0 ? "r" : "b";
}

function getCurrentBoard(){
  	//most recent board state, with all piece positions
	return moves[moves.length-1];
}

function getRank(rank, shift){ //rank will be "1", "2", etc.; shift will be -1, +1, -2, +2, etc.
	let rankNum = Number(rank),
        newRankNum = rankNum + shift;
  	//reject less than 0 or greater than 8
  	if (newRankNum < 0 || newRankNum > 8) return undefined;
  	return newRankNum.toString();
}

function getFile(file, shift){ //file will be "a", "b", etc.; shift will be -1, +1, -2, +2, etc.
	let fileNum = file.charCodeAt(0),
        newFileNum = fileNum + shift;
  	//reject less than "a" or greater than "h"
  	if (newFileNum < 97 || newFileNum > 104) return undefined;
  	return String.fromCharCode(newFileNum);
}

function getSquareByXY(x, y){
	let board = moves[0];
	for (let square in board){
		let bx = board[square].x,
			by = board[square].y;
		if (x < bx || y < by) continue;
		if (x > bx + squareSize || y > by + squareSize) continue;
		return square;
	}
}


/* drawing */

function drawBoard(){
	let isLightSq = true;
	for (let x=0; x<width; x+=squareSize){
		for (let y=0; y<height; y+=squareSize){
			if (isLightSq) boardCtx.fillStyle = lightSqColor;
			else boardCtx.fillStyle = darkSqColor;
			boardCtx.fillRect(x, y, squareSize, squareSize);
			isLightSq = !isLightSq;
		}
		isLightSq = !isLightSq;
	}
}

function drawPieces(board){
	if (!board) board = getCurrentBoard();
	for (let square in board){
		if (board[square].piece){
			let sq = board[square];
			if (useImages){
				boardCtx.drawImage(pieces[sq.piece], sq.x, sq.y, squareSize, squareSize);
			}
			else {
				boardCtx.fillStyle = "black";
				boardCtx.textBaseline = "top";
				boardCtx.font = "30px Verdana";
				boardCtx.fillText(sq.piece, sq.x, sq.y);
			}
		}
	}
}

function highlightFromSquares(board, possibleMoves){
	clearUi();
	possibleMoves.map(m => m.fromSq).forEach(sq => highlightSquare(board, sq));
}

function highlightToSquares(board, possibleMoves){
	clearUi();
	possibleMoves.map(m => m.toSq).forEach(sq => highlightSquare(board, sq));
}

function highlightSquare(board, square){
	let sq = board[square];
	uiCtx.lineWidth = 2;
	uiCtx.strokeStyle = uiColor;
	uiCtx.strokeRect(sq.x+2, sq.y+2, squareSize-4, squareSize-4);
}

function connectSquares(board, fromSq, toSq){
	uiCtx.lineWidth = 2;
	uiCtx.strokeStyle = uiColor;
	uiCtx.beginPath();
	uiCtx.moveTo(board[fromSq].x + squareSize/2, board[fromSq].y + squareSize/2);
	uiCtx.lineTo(board[toSq].x + squareSize/2, board[toSq].y + squareSize/2);
	uiCtx.stroke();
}

function clearUi(){
	uiCtx.clearRect(0, 0, width, height);
}


/* game ui */

function rotateBoard(){
	boardCanvas.classList.toggle("rotate");
	rotated = !rotated;
}

function redOrBlack(e){
	let button = e.target;
  	button.setAttribute("disabled", "disabled");
  	if (Math.random() < 0.5) button.textContent = "The Eldest Person Plays As Red";
  	else button.textContent = "The Eldest Person Plays As Black";
}
