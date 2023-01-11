var documentWidth = window.screen.availWidth;
var gridcontainerWidth = 0.92 * documentWidth;
var cellSlideLength = 0.18 * documentWidth;
var cellSpace = 0.04 * documentWidth;

function getPosTop(i, j){
	return cellSpace + i * (cellSpace + cellSlideLength);
}
function getPosLeft(i, j){
	return cellSpace + j * (cellSpace + cellSlideLength);
}
function getNumberBackgroundColor(number){
	switch(number){
		case 2:return "#eee4da"; break;
		case 4:return "#ede0c8"; break;
		case 8:return "#f2b179"; break;
		case 16:return "#f59563"; break;
		case 32:return "#f67e5f"; break;
		case 64:return "#f65e3b"; break;
		case 128:return "#edcf72"; break;
		case 256:return "#edcc61"; break;
		case 512:return "#9c0"; break;
		case 1024:return "#33b5e5"; break;
		case 2048:return "#09c"; break;
		case 4096:return "#a6c"; break;
		case 9192:return "#93c"; break;
	}
	return "black";
}
function getNumberColor(number){
	if(number <= 4){
		return "#776e65"
	}
	return "white";
}
function nospace(board){
	for(var i = 0; i < 4; i++){
		for(var j = 0; j < 4; j++){
			if(board[i][j] == 0){
				return false;
			}
		}
	}
	return true;
}
//判断是否能够进行左移操作
function canMoveLeft(board){
	for(var i = 0; i < 4; i++){
		for(var j = 1; j < 4; j++){
			if(board[i][j] != 0){
				if(board[i][j-1] == 0 || board[i][j-1] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断是否能够进行右移操作
function canMoveRight(board){
	for(var i = 3; i >= 0; i--){
		for(var j = 2; j >= 0; j--){
			if(board[i][j] != 0){
				if(board[i][j+1] == 0 || board[i][j+1] == board[i][j]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断是否能够进行上移操作
function canMoveTop(board){
	for(var i = 0; i < 4; i++){
		for(var j = 1; j < 4; j++){
			if(board[j][i] != 0){
				if(board[j-1][i] == 0 || board[j-1][i] == board[j][i]){
					return true;
				}
			}
		}
	}
	return false;
}
//判断是否能够进行下移操作
function canMoveDown(board){
	for(var i = 3; i >= 0; i--){
		for(var j = 2; j >= 0; j--){
			if(board[j][i] != 0){
				if(board[j+1][i] == 0 || board[j+1][i] == board[j][i]){
					return true;
				}
			}
		}
	}
	return false;
}
// 判断移动途中是否存在障碍
function noBlockHorizontal(row, col1, col2, board){
	for(var i = col1 + 1; i < col2; i++){
		if(board[row][i] != 0){
			return false;
		}
	}
	return true;
}
function noBlockVertical(col, row1, row2, board){
	for(var i = row1 + 1; i < row2; i++){
		if(board[i][col] != 0){
			return false;
		}
	}
	return true;
}
function nomove(){
	if(canMoveLeft(board) || canMoveRight(board) || canMoveTop(board) || canMoveDown(board)){
		return false;
	}
	return true;
}