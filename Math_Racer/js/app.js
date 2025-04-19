/*-------------------------------- Constants --------------------------------*/
const playerName = '';

/*-------------------------------- Variables --------------------------------*/

/*------------------------ Cached Element References ------------------------*/
//Player Name
const playerNameInputElement = document.getElementById('playerName')
const startInstructionsBtnElement = document.getElementById('startInstructionsBtn')

const questionParagraphElement = document.getElementById("Question")

/*-------------------------------- Functions --------------------------------*/

//Capture Player Name
handlePlayerInput = () => {
const nameInput = playerNameInputElement.value

let formattedName = nameInput.trim().toLowerCase().replace(/^\w/,c => c.toUpperCase());
if (formattedName === '') {
  playerName = 'Racer'
}
playerName = formattedName
console.log(formattedName)
return;
};

//generate random math questions & answers

function mathChallenges () {
const a = Math.floor(Math.random()*10);
const b = Math.floor(Math.random()*10);
const c = a+b
    return `Question ${a}+${b} = ?`

};

questionParagraphElement.textContent = mathChallenges()



/*----------------------------- Event Listeners -----------------------------*/

startInstructionsBtnElement.addEventListener('click',handlePlayerInput);


/*---------------------------------- Canvas ----------------------------------*/
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');

//road markers
const markerSettings = {
  width : 50,
  height : 200,
  Speed : 2,
  xPositions : [200,600],
  markers : [],
}

for(let x of markerSettings.xPositions){
  for (let i=0;i<5; i++){
    markerSettings.markers.push({
      x: x,
      y: i*300, //space apart by 300px
    });
  }
}



//Draw the car
const car = {
  x: canvas.width/2,
  y: canvas.height - 120,
  width: 50,
  height: 100,
  speed : 10,
}

const carImage = new Image();
carImage.src = './Resources/Car.png';

document.addEventListener("keydown",(event) => {
  if(event.key === "ArrowLeft"){
      if(car.x > 0){
        car.x -= car.speed //as along as within canvas, can move to left
      };
    } if (event.key==="ArrowRight"){
      if(car.x+50<canvas.width){ //+50 to account for width of car
          car.x += car.speed //as long as within canvas, can move to the right
      }
    }
  });

  


//circles 

const circles = {
  xAxis:[150,300,450,600],
  radius:50,
  speed: 2,
  circlesArray : [], //We need to save in format [{x:0, y:0};{x:0, y:0};{x:0, y:0}; ] 
}

for(let x of circles.xAxis){
  for (let i=0; i<1; i++){
    circles.circlesArray.push({x:x, y: Math.random()*-canvas.height});
  }
}

//x:Math.random()*canvas.width

//master draw

function drawAll(){
  ctx.clearRect(0,0,canvas.width, canvas.height)

  //draw road Markers
  ctx.fillStyle = "white";
  for (let marker of markerSettings.markers) {
      ctx.fillRect(marker.x, marker.y, markerSettings.width, markerSettings.height);
      marker.y += markerSettings.Speed;
  
  if (marker.y > canvas.height) {
        marker.y = -300; //i want to start from top of screen, one the last marker goes out of the canvas. I set y=0 
      }
    }
  

  //draw Car
  
  ctx.fillStyle = "red";
  ctx.fillRect(car.x, car.y, car.width, car.height);
  

  //draw falling Circles
  for(let circle of circles.circlesArray){
      ctx.beginPath();
      ctx.arc(circle.x, circle.y, circles.radius ,0, Math.PI*2);
      ctx.fillStyle = '#ffa69e';
      ctx.fill();

      circle.y += circles.speed
    
  if(circle.y - circles.radius>canvas.height){
      circle.y = 0 ;}
    }
    requestAnimationFrame(drawAll);
  }


drawAll();
