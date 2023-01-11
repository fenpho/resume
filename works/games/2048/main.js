$(document).ready(function(){
  prepareForMobile();
  newgame();
});

const documentWidth = $('body')[0].offsetWidth;
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

function newgame(){
  init();
  generateOneNumber();
  generateOneNumber();
}

function init() {
  
}