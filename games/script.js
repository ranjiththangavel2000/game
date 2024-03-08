const playArea=document.querySelector(".play-area");
const scoreArea=document.querySelector(".score");
const highScoreArea=document.querySelector(".high-score");
let foodX,foodY;//declare foodposition
let snakeX,snakeY;//starting position of snake head
let velocityX=0,velocityY=0;
let gameOver=false;
var speed=150;
let score=0;
let highScore=localStorage.getItem("high-score")||0;//use local storage
highScoreArea.innerText=`High-Score :${highScore}`;
let snakeBody=[];
let isPaused = false;
const changeFoodPosition=()=>{
    //random occurance of food position
 foodX=Math.floor(Math.random() * 30)+1;
 foodY=Math.floor(Math.random() * 30)+1;
}
const changeSnakePosition=()=>{
    //random occurance of food position
 snakeX=Math.floor(Math.random() * 30)+1;
 snakeY=Math.floor(Math.random() * 30)+1;
}
//game over if it hit the border 
const handleGameOver=()=>{
    clearInterval(setIntervalId);//once it over it restart the game. 
    alert("Game over please press ok! to restart");
    location.reload();
}

const changeDirection=(e)=>{
    //change direction according to ur cmt
if(e.key==="ArrowUp" && velocityY!=1||e.key==="w"||e.key==="W"){
   velocityX=0;
   velocityY=-1;
}
else if(e.key==="ArrowLeft" && velocityX!=1||e.key==="a"||e.key==="A"){
    velocityX=-1;
    velocityY=0;
}
else if(e.key==="ArrowDown" && velocityY!=-1||e.key==="s"||e.key==="S"){
    velocityX=0;
    velocityY=1;
}
else if(e.key==="ArrowRight" && velocityX!=-1||e.key==="d"||e.key==="D"){
  velocityX=1;
  velocityY=0;
}

initGame();
}

const initGame=()=>{
    if(gameOver)
    {
        return handleGameOver();
    }
    let htmlMarkup=`<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
    if(foodX===snakeX&&foodY===snakeY){//if food and snake meet change food postion
        changeFoodPosition();
        snakeBody.push([foodX,foodY]);// pushing food position to snakeBody array
        score++;        
        highScore=score>=highScore?score:highScore;
        localStorage.setItem("high-score",highScore);
        scoreArea.innerText=`Score :${score}`;
        highScoreArea.innerText=`High-Score :${highScore}`;
    }
    for (let i = snakeBody.length-1; i > 0; i--) {
        // it shifts each body segment to the position of the previous one.
        console.log(snakeBody);
        snakeBody[i]=snakeBody[i-1];
    }
    snakeBody[0]=[snakeX,snakeY];
    snakeX+=velocityX;
    snakeY+=velocityY;
    //border to hit game over when it reach border to restart the game
    if(snakeX<=0||snakeX>30||snakeY<=0||snakeY>30)
    {
        gameOver=true;
    }
    for(let i=0;i<snakeBody.length;i++)
    {
        htmlMarkup+=`<div class="snake" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`;
        if(i!==0 && snakeBody[0][1]===snakeBody[i][1] && snakeBody[0][0]===snakeBody[i][0])
            {
                gameOver=true;
            }
    }
    playArea.innerHTML=htmlMarkup;
}
changeFoodPosition();
changeSnakePosition();
setIntervalId = setInterval(() => {
    if (!isPaused) {
        initGame();
    }
},speed);
document.addEventListener("keydown",changeDirection);//key function
document.getElementById("pauseButton").addEventListener("click",(e) => {
        isPaused = !isPaused
        if (isPaused) {
            document.getElementById("pauseButton").innerText = "Play"
        } else {
            document.getElementById("pauseButton").innerText = "Pause"
        }
})