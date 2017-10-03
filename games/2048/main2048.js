var board = new Array();
var score = 0;
var hasConflicted = new Array();
var strarX = 0;
var strarY = 0;
var endX = 0;
var endX = 0;

$(document).ready(function(){
	prepareForMobile();
	newgame();
});

function newgame(){
	//初始化棋盘格
	init();
	//在随机两个格子生成数字
	generateOneNumber();
	generateOneNumber();
}

function prepareForMobile(){
	if(documentWidth > 410){
		gridcontainerWidth = 410;
		cellSpace = 10;
		cellSlideLength = 90;
	}
	$('#grid-container').css('width', gridcontainerWidth - 2 * cellSpace);
	$('#grid-container').css('height', gridcontainerWidth - 2 * cellSpace);
	$('#grid-container').css('padding', cellSpace);
	$('#grid-container').css('border-radius', 0.02 * gridcontainerWidth);

	$('.grid-cell').css('width', cellSlideLength);
	$('.grid-cell').css('height', cellSlideLength);
	$('.grid-cell').css('border-radius', 0.02 * cellSlideLength);
}

function init(){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			var gridCell = $("#grid-cell-" + i + "-" + j);
			gridCell.css("top", getPosTop(i, j));
			gridCell.css("left", getPosLeft(i, j));
		}
	}
	for(var i = 0; i < 4; i++){
		board[i] = new Array();
		hasConflicted[i] = new Array()
		for(var j = 0; j < 4; j++){
			board[i][j] = 0;
			hasConflicted[i][j] = false;
		}
	}

	updateBoardView();
	score = 0;
}

function updateBoardView(){
	$(".number-cell").remove();
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			$("#grid-container").append('<div class="number-cell" id="number-cell-' + i + "-" + j + '"></div>');
			var theNumberCell = $('#number-cell-' + i +"-" + j);
			if(board[i][j] == 0){
				theNumberCell.css('width', '0px');
				theNumberCell.css('height', '0px');
				theNumberCell.css('top', getPosTop(i, j) + cellSlideLength / 2);
				theNumberCell.css('left', getPosLeft(i, j) + cellSlideLength / 2);
			}else{
				theNumberCell.css('width', cellSlideLength);
				theNumberCell.css('height', cellSlideLength);
				theNumberCell.css('top', getPosTop(i, j));
				theNumberCell.css('left', getPosLeft(i, j));
				theNumberCell.css("background-color", getNumberBackgroundColor(board[i][j]));
				theNumberCell.css("color", getNumberColor(board[i][j]));
				theNumberCell.text(board[i][j]);
			}
			hasConflicted[i][j] = false;
		}
	}
	$('.number-cell').css('line-height', cellSlideLength + 'px');
	$('.number-cell').css('font-size', 0.6 * cellSlideLength + 'px');
}
function generateOneNumber(){
	if(nospace(board)){
		return false;
	}
	//随机一个位置
	randx = parseInt(Math.floor(Math.random() * 4));
	randy = parseInt(Math.floor(Math.random() * 4));
	var times = 0;
	while(times < 50){
		if(board[randx][randy] == 0){
			break;
		}
		randx = parseInt(Math.floor(Math.random() * 4));
		randy = parseInt(Math.floor(Math.random() * 4));
	}
	if(times == 50){
		for(var i = 0; i < 4; i++){
			for(var j = 0; j < 4; j++){
				if(board[i][j] == 0){
					randx = i;
					randy = j;
				}
			}
		}
	}
	//随机一个数字
	var randNumber = Math.random()<0.5 ? 2 : 4;
	//在随机位置显示数字
	board[randx][randy] = randNumber;
	showNumberWithAnimation(randx, randy, randNumber);

	return true;
}

// 键盘事件监听，键盘的方向键，上下左右
$(document).keydown(function(event){
	switch(event.keyCode){
		case 37://left
			event.preventDefault();
			if(moveLeft()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
			break;
		case 38://up
			event.preventDefault();
			if(moveTop()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
			break;
		case 39://right
			event.preventDefault();
			if(moveRight()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
			break;
		case 40://down
			event.preventDefault();
			if(moveDown()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
			break;
		default:
			break;
	}
});
// 移动端触摸事件监听
document.addEventListener('touchstart', function(event){
	strarX = event.touches[0].pageX;
	strarY = event.touches[0].pageY;
});
document.addEventListener('touchmove', function(event) {
    // 判断默认行为是否可以被禁用
    if (event.cancelable) {
        // 判断默认行为是否已经被禁用
        if (!event.defaultPrevented) {
            event.preventDefault();
        }
    }
}, false);
document.addEventListener('touchend', function(event){
	endX = event.changedTouches[0].pageX;
	endY = event.changedTouches[0].pageY;

	var delatX = endX - strarX;
	var delatY = endY - strarY;

	if(Math.abs(delatX) < 0.05 * documentWidth && Math.abs(delatY) < 0.05 * documentWidth){
		return;
	}

	//dir
	if(Math.abs(delatX) >= Math.abs(delatY)){
		//x
		if(delatX > 0){
			//move right
			if(moveRight()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
		}else{
			//move left
			if(moveLeft()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
		}
	}else{
		//y
		if(delatY > 0){
			//move down
			if(moveDown()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
		}else{
			//move up
			if(moveTop()){
				setTimeout(generateOneNumber, 210);
				setTimeout(isgameover, 300);
			}
		}
	}
});
function moveLeft(){
	if(!canMoveLeft(board)){
		return false;
	}
	//move left
	for(var i = 0; i < 4; i++){
		for(var j = 1; j < 4; j++){
			if(board[i][j] != 0){
				for(var k = 0; k < j; k++){
					if(board[i][k] == 0 && noBlockHorizontal(i, k, j, board)){
						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView, 200);
	return true;
}
function moveRight(){
	if(!canMoveRight(board)){
		return false;
	}
	//move right
	for(var i = 3; i >= 0; i--){
		for(var j = 2; j >= 0; j--){
			if(board[i][j] != 0){
				for(var k = 3; k > j; k--){
					if(board[i][k] == 0 && noBlockHorizontal(i, j, k, board)){
						//move
						showMoveAnimation(i, j, i, k);
						board[i][k] = board[i][j];
						board[i][j] = 0;
						continue;
					}else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]){
						//move
						showMoveAnimation(i, j, i, k);
						//add
						board[i][k] += board[i][j];
						board[i][j] = 0;
						//add score
						score += board[i][k];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView, 200);
	return true;
}
function moveTop(){
	if(!canMoveTop(board)){
		return false;
	}
	//move top
	for(var i = 0; i < 4; i++){
		for(var j = 1; j < 4; j++){
			if(board[j][i] != 0){
				for(var k = 0; k < j; k++){
					if(board[k][i] == 0 && noBlockVertical(i, k, j, board)){
						//move
						showMoveAnimation(j, i, k, i);
						board[k][i] = board[j][i];
						board[j][i] = 0;
						continue;
					}else if(board[k][i] == board[j][i] && noBlockVertical(i, k, j, board) && !hasConflicted[k][i]){
						//move
						showMoveAnimation(j, i, k, i);
						//add
						board[k][i] += board[j][i];
						board[j][i] = 0;
						//add score
						score += board[k][i];
						updateScore(score);
						hasConflicted[k][i] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView, 200);
	return true;
}
function moveDown(){
	if(!canMoveDown(board)){
		return false;
	}
	//move dowm
	for(var i = 3; i >= 0; i--){
		for(var j = 2; j >= 0; j--){
			if(board[j][i] != 0){
				for(var k = 3; k > j; k--){
					if(board[k][i] == 0 && noBlockVertical(i, j, k, board)){
						//move
						showMoveAnimation(j, i, k, i);
						board[k][i] = board[j][i];
						board[j][i] = 0;
						continue;
					}else if(board[k][i] == board[j][i] && noBlockVertical(i, j, k, board) && !hasConflicted[k][i]){
						//move
						showMoveAnimation(j, i, k, i);
						//add
						board[k][i] += board[j][i];
						board[j][i] = 0;
						//add score
						score += board[k][i];
						updateScore(score);
						hasConflicted[i][k] = true;
						continue;
					}
				}
			}
		}
	}
	setTimeout(updateBoardView, 200);
	return true;
}
function isgameover(){
	if(nospace(board) && nomove(board)){
		gameover();
	}
}
function gameover(){
	alert("gameover!");
}