buttonColours =["red", "blue", "green", "yellow"]
userClickedPattern=[]
gamePattern=[];
level=-1;
started=false
ct=0

$(".btn").click(function(){
  userChosenColor=$(this).attr('id');
  userClickedPattern.push(userChosenColor)
  playSound(userChosenColor)
  animatePress(userChosenColor)
  checkAnswer(userClickedPattern)
  ct++;
})

function nextSequence() {
  userClickedPattern=[]
  level++;
  ct=0;
  randint= Math.floor(Math.random() * 4);
  randomChosenColour=buttonColours[randint];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  $("h1").text("Level "+level);
  playSound(randomChosenColour)
}

$(document).keypress(function () {
  if (! started){
    started=true
    nextSequence();
  }

})


function playSound(color){
  path='sounds/'+color+'.mp3';
  var audio = new Audio(path);
  audio.play();
}

function animatePress(currentColor){

  $('#'+currentColor).click(function(){
        $('#'+currentColor).addClass("pressed");
        setTimeout(function(){
            $('#'+currentColor).removeClass("pressed");
        },100);
    });
}

var arraysMatch = function (arr1, arr2) {

	// Check if the arrays are the same length
	if (arr1.length !== arr2.length) return false;

	// Check if all items exist and are in the same order
	for (var i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) return false;
	}

	// Otherwise, return true
	return true;

};

function checkAnswer(userClickedPattern){
  if (userClickedPattern[ct]==gamePattern[ct]){
    console.log('userClickedPattern:', userClickedPattern)
    console.log('gamePattern:', gamePattern)
    console.log('ct', ct)
    console.log('success')
    if (arraysMatch(userClickedPattern,gamePattern)){
      setTimeout(function(){
          nextSequence()
      },1000);
    }
  }
  else{
    console.log('wrong')
    var audio = new Audio('sounds/wrong.mp3');
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver()
  }
}

function startOver(){
  level=-1;
  started=false;
  gamePattern=[];
  userClickedPattern=[]
}
