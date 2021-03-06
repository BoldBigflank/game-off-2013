var chosenPieceId = -1;
var chosenPiece;
var completeBoard;
var images = [];
var boardWidth = 20;
var boardHeight = 20;
var piecePage = 1;

window.onload = function () {
	var boardElem = document.getElementById('boardCanvas');
	var pieceChoices = document.getElementById('pieceChoices');
	var pieceContext = pieceChoices.getContext('2d');
	var context = boardElem.getContext('2d');
	
	preLoad();
	
	images[3].onload = function(){ drawPieceList(1)};
	
   drawGrid();
   
   boardElem.onclick = getLocation;
   pieceChoices.onclick = choosePiece;
   boardElem.onmousemove = drawOutline;
   boardElem.onmouseout = removeOutline;
   window.onkeypress = handleKeyPress;
}

function handleKeyPress(e){
	if(e.keyCode == 114 || e.keyCode == 82){ // R
		// Rotate
		removeOutline(e);
		rotate();
		drawOutline(e);
	}
	if(e.keyCode == 102 || e.keyCode == 70){ // F
		removeOutline(e);
		flip();
		drawOutline(e);
	}
	if(e.keyCode == 80 || e.keyCode == 112){ // P
		pass();
	}
	if(e.keyCode == 49 ){
		drawPieceList(1);
	}
	if(e.keyCode == 50 ){
		drawPieceList(2);
	}

	return null;
}

	    var colors = ['green', 'blue', 'purple', 'red'];

	    var available = [
			[{'x':0, 'y':0}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':1, 'y':1}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':2, 'y':0}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':0, 'y':1}, {'x':1, 'y':1}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':2, 'y':0}, {'x':1, 'y':1}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':2, 'y':0}, {'x':3, 'y':0}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':2, 'y':0}, {'x':2, 'y':1}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':1, 'y':1}, {'x':2, 'y':1}],
			[{'x':0, 'y':0}, {'x':0, 'y':1}, {'x':1, 'y':0}, {'x':2, 'y':0}, {'x':3, 'y':0}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':1, 'y':1}, {'x':1, 'y':2}, {'x':2, 'y':0}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':2, 'y':0}, {'x':0, 'y':1}, {'x':0, 'y':2}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':1, 'y':1}, {'x':2, 'y':1}, {'x':3, 'y':1}],
			[{'x':0, 'y':0}, {'x':0, 'y':1}, {'x':1, 'y':1}, {'x':2, 'y':1}, {'x':2, 'y':2}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':2, 'y':0}, {'x':3, 'y':0}, {'x':4, 'y':0}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':0, 'y':1}, {'x':1, 'y':1}, {'x':0, 'y':2}],
			[{'x':0, 'y':0}, {'x':0, 'y':1}, {'x':1, 'y':1}, {'x':1, 'y':2}, {'x':2, 'y':2}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':0, 'y':1}, {'x':0, 'y':2}, {'x':1, 'y':2}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':1, 'y':1}, {'x':1, 'y':2}, {'x':2, 'y':1}],
			[{'x':1, 'y':0}, {'x':0, 'y':1}, {'x':1, 'y':1}, {'x':2, 'y':1}, {'x':1, 'y':2}],
			[{'x':0, 'y':0}, {'x':1, 'y':0}, {'x':1, 'y':1}, {'x':2, 'y':0}, {'x':3, 'y':0}]
		];

	    // where each piece appers on the 'choose piece' canvas
	    var pieceCanvasLocation = [
	    {'x':40, 'y':10, 'page': 1},
	    {'x':120, 'y':10, 'page': 1},
	    {'x':200, 'y':10, 'page': 1},
	    
		{'x':40, 'y':110, 'page': 1},
	    {'x':120, 'y':110, 'page': 1},
	    {'x':200, 'y':110, 'page': 1},
	    
		{'x':20, 'y':210, 'page': 1},
	    {'x':120, 'y':210, 'page': 1},
	    {'x':200, 'y':210, 'page': 1},
	    
		{'x':20, 'y':310, 'page':1},
	    {'x':130, 'y':310, 'page':1},
	    {'x':210, 'y':310, 'page':1},
		
		{'x':5, 'y':10, 'page': 2},
	    {'x':100, 'y':10, 'page': 2},
	    {'x':175, 'y':10, 'page': 2},
	    
		{'x':20, 'y':140, 'page': 2},
	    {'x':110, 'y':140, 'page': 2},
	    {'x':190, 'y':140, 'page': 2},
	    
		{'x':20, 'y':250, 'page': 2},
	    {'x':110, 'y':250, 'page': 2},
	    {'x':190, 'y':250, 'page': 2}
	    ];
	
function preLoad() {
	for (var i = 0; i < colors.length; ++i) {
		images[i] = new Image();
		images[i].src = "img/" + colors[i] + ".png";
	}
}

function getMaxDimension(piece, direction){
	var maxSize = 0;

	if ( piece != null ) {
		for ( var i = 0; i < piece.length; i++ ) {
			var point = piece[i];
			if ( direction == null || direction == 'x' ) {
				if ( point.x > maxSize ) {
					maxSize = point.x;
				}
			}
			if ( direction == null || direction == 'y' ) {
				if ( point.y > maxSize ) {
					maxSize = point.y;
				}
			}
		}
	}
	
	return maxSize + 1;
}

function choosePiece(event) {
	var pieceChoices = document.getElementById('pieceChoices');
	var pieceContext = pieceChoices.getContext('2d');
	
	event = event || window.event;
	var pos = findPos(this);
	var x = Math.floor( event.pageX - pos.x );
	var y = Math.floor( event.pageY - pos.y );

	for ( var i = 0; i < pieceCanvasLocation.length; i++ ) {
		var canvasLocation = pieceCanvasLocation[i];
		if ( x >= canvasLocation.x
			&& y >= canvasLocation.y 
			&& x <= canvasLocation.x + getMaxDimension(available[i]) * 20
			&& y <= canvasLocation.y + getMaxDimension(available[i]) * 20
			&& canvasLocation.page == piecePage) {
				if(player.pieces.indexOf(i) != -1)
					chosenPieceId = i;
				drawPieceList(piecePage);
				break;
			}	
	}

}
				
function drawGrid() {
	var boardElem = document.getElementById('boardCanvas');
	var boardContext = boardElem.getContext('2d');
	boardContext.clearRect(0, 0, boardElem.width, boardElem.height);

	boardContext.fillStyle = colors[0];
	boardContext.fillRect(-5, -5, 10, 10);
	boardContext.fillStyle = colors[1];
	boardContext.fillRect(395, -5, 10, 10);
	boardContext.fillStyle = colors[2];
	boardContext.fillRect(395, 395, 10, 10);
	boardContext.fillStyle = colors[3];
	boardContext.fillRect(-5,395, 10, 10);
	
	for ( var i = 0; i < 20; i++ ) {
		for ( var j = 0; j < 20; j++ ) {
			boardContext.strokeRect(i*20, j*20, 20, 20);
			if ( completeBoard && completeBoard[i][j] != null ) {
				boardContext.drawImage(images[completeBoard[i][j]], i*20, j*20);
			}
		}
	}	

}

var outlineX = -1;
var outlineY = -1;

function removeOutline(event){
	if(typeof chosenPieceId == "undefined" || chosenPieceId == -1) return;
	var boardElem = document.getElementById('boardCanvas');
	var boardContext = boardElem.getContext('2d');
	// draw the overlay back to original
	for ( var i = 0; i < available[chosenPieceId].length; i++ ) {
		var pieceX = available[chosenPieceId][i].x + outlineX;
		var pieceY = outlineY + available[chosenPieceId][i].y;

		if ( pieceX >= 0 && pieceY >= 0 && pieceX < 20 && pieceY < 20 ) {
			if ( completeBoard && completeBoard[pieceX][pieceY] != null ) {
				boardContext.drawImage(images[completeBoard[pieceX][pieceY]], pieceX*20, pieceY*20);
			} else {
				boardContext.fillStyle = 'white';
				boardContext.fillRect(pieceX*20, pieceY*20, 20, 20);
			}
			boardContext.strokeRect(pieceX*20, pieceY*20, 20, 20);
		}
	}
}

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function drawOutline(event) {
	var boardElem = document.getElementById('boardCanvas');
	var boardContext = boardElem.getContext('2d');

	if ( chosenPieceId != -1 ) {
		var pos = findPos(this);
		var x = Math.floor( ( event.pageX - pos.x ) / 20 - ( getMaxDimension(available[chosenPieceId], 'x') / 2 ) );
		var y = Math.floor( ( event.pageY - pos.y ) / 20 - ( getMaxDimension(available[chosenPieceId], 'y') / 2 ) );
		if ( x != outlineX || y != outlineY ) {
			// draw the overlay back to original
			removeOutline(event);

			// draw an outline of the new version
			var validPlacement = isValidPlacement(x,y,available[chosenPieceId]);

			for ( var i = 0; i < available[chosenPieceId].length; i++ ) {
					var pieceX = available[chosenPieceId][i].x + x;
					var pieceY = y + available[chosenPieceId][i].y;
					var fillColor = 'orange'
					if(validPlacement) fillColor = 'green'
					else if ( !isValidPosition({'x':pieceX, 'y':pieceY}) ) fillColor = 'red';
					boardContext.fillStyle = fillColor;
					boardContext.fillRect(pieceX*20, pieceY*20, 20, 20);
			}
			// draw the old location with correct items
			// draw the new outline
			outlineX = x;
			outlineY = y;
		}
	}
}

function getLocation(event) {
	if( typeof chosenPieceId == "undefined" || chosenPieceId == -1 ) return;
	var boardElem = document.getElementById('boardCanvas');
	var pieceChoices = document.getElementById('pieceChoices');
	var pieceContext = pieceChoices.getContext('2d');
	var context = boardElem.getContext('2d');
	
	event = event || window.event;
	var pos = findPos(this);	
	var x = Math.floor( ( event.pageX - pos.x ) / 20 - ( getMaxDimension(available[chosenPieceId], 'x') / 2 ) );
	var y = Math.floor( ( event.pageY - pos.y ) / 20 - ( getMaxDimension(available[chosenPieceId], 'y') / 2 ) );


	var thisPiece = [];
	
	for ( var i = 0; i < available[chosenPieceId].length; i++ ) {
		thisPiece.push({'x': available[chosenPieceId][i].x + x , 'y': y + available[chosenPieceId][i].y })
	}
	

	// check if move is legal
	socket.emit('addPiece', { piece: chosenPieceId, placement: thisPiece }, 
		function(error) {
			if (error) {
				console.log(error);
			}
			else {
				// Remove the selection box
				chosenPieceId = -1;
				drawPieceList(piecePage);
				
				// let the server tell me what board to draw
			}
		}
	);
}

function pass() {
	socket.emit('pass', 
		function(error) {
			if (error) {
				console.log(error);
			}
		}
	);
	
}

//Draw Piece List Function
function drawPieceList(page){
	// Change the button list classes
	if(page==1){
		$("#buttonOne").addClass("active")
		$("#buttonTwo").removeClass("active")
	} else {
		$("#buttonOne").removeClass("active")
		$("#buttonTwo").addClass("active")
	}

	piecePage = page;
	var pieceChoices = document.getElementById('pieceChoices');
	var pieceContext = pieceChoices.getContext('2d');
	pieceContext.clearRect(0, 0, pieceChoices.width, pieceChoices.height);

	if ( chosenPieceId != -1 ) {
		var canvasLocation = pieceCanvasLocation[chosenPieceId];
			
		var thisPiece = available[chosenPieceId];
		if (canvasLocation.page == page){
			pieceContext.strokeRect(canvasLocation.x - 5, canvasLocation.y - 5, getMaxDimension(thisPiece) * 20 + 10, getMaxDimension(thisPiece) * 20 + 10);
		}
	}
	
	var positionColor = (player.position>=0) ? player.position : 0;
	for ( var i = 0; i < available.length; i++ ) {
		if(pieceCanvasLocation[i].page == page){
			// var pieceIndex = player.pieces[i];
			var piece = available[i];

			var xOffset = Math.floor( ( getMaxDimension(piece) - getMaxDimension(piece, 'x') ) / 2 );
			var yOffset = Math.floor( ( getMaxDimension(piece) - getMaxDimension(piece, 'y') ) / 2 );

			var canvasLocation = pieceCanvasLocation[i];
			var x = canvasLocation.x + xOffset * 20;
			var y = canvasLocation.y + yOffset * 20;

			for ( var j = 0; j < piece.length; j++ ) {
				var point = piece[j];
				
				var xLoc = x + ( point.x * 20 );
				var yLoc = y + ( point.y * 20 );	
				if(player.pieces && player.pieces.indexOf(i) != -1)
					pieceContext.drawImage( images[positionColor], xLoc, yLoc);
			}
		}
	}
	
}

function rotate() {
	//if ( chosenPieceId != -1 ) {
    for (var x in available){
    	var pieceToChange = available[x];
    	var replacementPiece = [];
    	var minX = pieceToChange.length;
    	var minY = pieceToChange.length;

    	for ( var i = 0; i < pieceToChange.length; i++ ) {
	    	var point = pieceToChange[i];
	    	replacementPiece.push( {'x':getMaxDimension(pieceToChange, 'y') - 1 - point.y, 'y':point.x } );
    	}
    	available[x] = replacementPiece;
    	drawPieceList(piecePage);
    }
};

function flip() {
    //if ( chosenPieceId != -1 ) {
    for( var x in available){
    	var pieceToChange = available[x];
    	var replacementPiece = [];
    	for ( var i = 0; i < pieceToChange.length; i++ ) {
	    	var point = pieceToChange[i];
	    	replacementPiece.push( {'x':point.y, 'y':point.x } );
    	}
    	available[x] = replacementPiece;
    	drawPieceList(piecePage);
	}
};

function isValidPlacement(x,y,placement){
	var hasDiagonalConnector = false;
	for(var i in placement){
		var tile = { 'x':x+placement[i].x, 'y':y+placement[i].y }
		
		if( tile.x<0 || tile.y < 0 || tile.x >= boardWidth || tile.y >= boardHeight  ){
            return false;
        }

		hasDiagonalConnector = hasDiagonalConnector || findDiagonalConnector(tile);

		if(!isValidPosition(tile)){
			return false;
		} 
	}
	return hasDiagonalConnector;
}

function findDiagonalConnector(tile){
    var x = tile.x;
    var y = tile.y;

    // Starting positions
    if( player.position == 0 && x == 0             && y == 0 )  return true;
    if( player.position == 1 && x == boardWidth-1  && y == 0)  return true;
    if( player.position == 2 && x == boardWidth-1  && y == boardHeight-1  )              return true;
    if( player.position == 3 && x == 0             && y == boardHeight-1  )              return true;

    // Above right
    if( x < boardWidth-1 && y < boardHeight-1 && game.board[x+1][y+1] === player.position ) return true;
    // Above left
    if( x > 0 && y < boardHeight-1 && game.board[x-1][y+1] === player.position ) return true;
    // Below left
    if( x > 0  && y > 0 && game.board[x-1][y-1] === player.position ) return true;
    // Below right
    if( x < boardWidth-1 && y > 0 && game.board[x+1][y-1] === player.position ) return true;
    return false;
}

function isValidPosition(tile){
	// On the board
	if(tile.x < 0 || tile.x >= boardWidth || tile.y < 0 || tile.y >= boardHeight){ 
		return false;
	}
	// Position is not open
	if (game.board[tile.x][tile.y] !== null){ 
		return false;
	}
	if (hasFacingTile(tile)){
		return false;
	}
	return true;
}



function hasFacingTile(tile){
	var x = tile.x;
    var y = tile.y;
    
    // Above
    if(y < boardHeight-1 && game.board[x][y+1] === player.position ) return true;
    // Below
    if(y > 0 && game.board[x][y-1] === player.position ) return true;
    // Right
    if(x < boardWidth-1 && game.board[x+1][y] === player.position ) return true;
    // Right
    if(x > 0 && game.board[x-1][y] === player.position ) return true;
    return false;
}
