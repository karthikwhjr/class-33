//creating constants
const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//creating variables
var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;

    //creating new ground and platform
    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    //creating new box
    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);

    //creating new pig
    pig1 = new Pig(810, 350);

    //creating new log
    log1 = new Log(810,260,300, PI/2);

    //creating new box
    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);

    //creating new pig
    pig3 = new Pig(810, 220);

    //creating new log
    log3 =  new Log(810,180,300, PI/2);

    //creating new box
    box5 = new Box(810,160,70,70);

    //creating new log
    log4 = new Log(760,120,150, PI/7);
    log5 = new Log(870,120,150, -PI/7);

    //creating new bird
    bird = new Bird(200,50);

    //log6 = new Log(230,180,80, PI/2);
    //creating new slingshot
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);

    //displaying all objects

    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    //if (gameState!=="launched"){

        //setting position of the bird
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
    //}
}

//to make the bird fly
function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

//to make the bird come back when space key preesed
function keyPressed(){
    if(keyCode === 32){
       slingshot.attach(bird.body);
       bird.trajectory = [];
       Matter.Body.setPosition(bird.body,{x:200,y:50});
    }
}

async function getBackgroundImg(){

    //to change backgroundImg according to time
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    } 

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}