

var myGamePiece;
var level = 1;
var levelStartup = true;
var timeBeforeStart = 3;
var randomBoi = Math.floor((Math.random() * 1200) + 0);
var randombBoi = Math.floor((Math.random() * 600) + 0);
setInterval(function(){

    randomBoi = Math.floor((Math.random() * 1200) + 0);


    projectiles.one.push(new component(30,30,"green",randomBoi,100),);
    projectiles.one.push(new component(30,30,"yellow",randomBoi,100),);
    projectiles.one.push(new component(30,30,"yellow",randomBoi,100),); 


    
    
    }, 75);
function startGame() {

    
      
    myGamePiece = new component(50, 50, "red", 610, 585);

    projectiles = {
        one: [
            new component(30,30,"yellow",500,0),
            new component(30,30,"blue",200,100),
        ],
    }
    platforms = { 
    
        one: [
            
            new component(1500,10,"blue",0,510),
            new component(1500,10,"blue",0, 710),
            new component(10,200,"blue",0,510),
            new component(10,200,"blue",1270,510),
       
        ],
        
        two: [
            new component(225,225,"blue",100,495),
        ],
    }
    

finishPlt = [
    new component(100,3,"black",815,392), // turn the finishes into animated blackholes later
]
text = {
    death: new component("30px", "Ariel", "blue", 5, 30, "text", "Deaths " + deathCount),
    level: new component("30px", "Ariel", "blue", 120, 30, "text", "Level " + level),
    // if (levelStartup == true) {
    //     setTimeout(function(){ beforePlay }, 1000);
    //     beforePlay = [new component("30px", "Ariel", "blue", 620, 310, "text", "3"),
    //     new component("30px", "Ariel", "blue", 620, 310, "text", "3"),
    //     new component("30px", "Ariel", "blue", 620, 310, "text", "3"),]
    // }
    
    beforePlay: new component("30px", "Ariel", "blue", 620, 310, "text", timeBeforeStart),
    
    
    
    one:  [
        
        new component("20px", "Ariel", "blue", 280, 370, "text", ""),
    //    new component("20px", "Ariel", "blue", 280, 200, "text",count),
    //     new component("20px", "Ariel", "blue", 300, 250, "text", countAll),
    //     new component("20px", "Ariel", "blue", 700, 350, "text", "The black platforms are the end of the level"),

        

    ],
    two: [
        new component("20px", "Ariel", "teal", 280, 370, "text", "yung blud activated secret stealth. FBI IS WATCHING YOU"),
    ],
}

myGameArea.start();
}

var myGameArea = {

    canvas : document.createElement("canvas"),
     start : function() {
         this.canvas.width = 1280;
         this.canvas.height = 720;
         
         this.context = this.canvas.getContext("2d");
         
         document.body.insertBefore(this.canvas, document.body.childNodes[0]);
         this.interval = setInterval(updateGameArea, 20);
         
         
         window.addEventListener('keydown', function (e) {
             myGameArea.keys = (myGameArea.keys || []);
             myGameArea.keys[e.keyCode] = (e.type == "keydown");
         })
         window.addEventListener('keyup', function (e) {
             myGameArea.keys[e.keyCode] = (e.type == "keydown");            
         })
     }, 
     clear : function(){
         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
     }    
     
 
 }

 function component(width, height, color, x, y, type, words) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    if (type == "text"){
        this.text = words;
        this.font = width;
        this.size = height;
        //this.direction = directionplayerfacing
        

    }


    this.width = width;
    this.height = height;   
    this.speedX = 0;
    this.speedY = 0;   
    this.gravity = 0.00;
    this.gravitySpeed = 0;   
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);  

                
} else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
            } 
    else    {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        
    }

                   this.newPose = function() {
       
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.newPos = function() {
        this.gravitySpeed *= this.gravity;
       this.x += this.speedX;            
       this.y += this.speedY += this.gravitySpeed;         
   }
   
 
    

   
}

var solidPlat; // Basic platform
var dodge; // the projectile that kills
var leftMove = true; // just a moving function
var rightMove = true; // ^^
var x = 1; // a switch statement for gravity
var leftCheck = 1; // helps with moving
var rightCheck = 1; // helps with movins
var dpCheck = 1;
var downCheck = 1;
var upMove = true;
var downMove = true;
// var count = 0; // a timer 
// var countAll = []; // a timer that stores all of your previous times before death
var deathCount = 0; // players amount of deaths in total
function youDied() {
        
    deathCount += 1
    myGameArea.clear();   
    clearInterval(myGameArea.interval);
    //timeBeforeStart = 3;
    //levelStartup = true; 
    startGame();
    // countAll.push(count);
    // count = 0;    
      
}
if (levelStartup == true) {

    clearInterval(startUpStuff);

            var startUpStuff = setInterval(function() {
        if (levelStartup == true && timeBeforeStart >= 0) {
            timeBeforeStart --;
        }
          
        
     if (timeBeforeStart == 0) {timeBeforeStart = 1;
         levelStartup = false;

         youDied();
         
         
         
     }
    }, 1000);

 }
    

function updateGameArea() {
    // if (myGameArea.frameNo == 1 || everyinterval(150)) {
        // x = myGameArea.canvas.width;
        // minHeight = 20;
        // maxHeight = 200;
        // height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        // minGap = 50;
        // maxGap = 200;
        // gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);


      //projectiles.one.push(new component(30,300,"blue",randomBoi,100),);  
    

    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;  
    randomBoi = Math.floor((Math.random() * 690) + 0);
    if (level == 1) {
        txt  = text.one;
        solidPlat = platforms.one;
        dodge = projectiles.one;
        
    }
    else if (level == 2) {
        txt = text.two;
        solidPlat = platforms.two;
       
    }
    leftCheck = 1; 
    rightCheck = 1;
    upCheck = 1;
    downCheck = 1;


        


for(i = 0; i < solidPlat.length; i++){
      
    if ( myGamePiece.x + myGamePiece.width + 4 > solidPlat[i].x &&
        solidPlat[i].x + 4> myGamePiece.x + myGamePiece.width &&
        
        myGamePiece.y + myGamePiece.height   > solidPlat[i].y &&
        myGamePiece.y <= solidPlat[i].y + solidPlat[i].height) {
            rightMove = false;
            rightCheck = 2;

        }
    else if (rightCheck == 1) {
        rightMove = true;
        
    }

    if (myGamePiece.x - 4 < solidPlat[i].x + solidPlat[i].width &&
        solidPlat[i].x + solidPlat[i].width - 4 < myGamePiece.x &&
        myGamePiece.y + myGamePiece.height  > solidPlat[i].y &&
        myGamePiece.y <= solidPlat[i].y + solidPlat[i].height) {
        
        
        
            leftMove = false;
            leftCheck = 2;
        }


    else if (leftCheck == 1) {
        leftMove = true;
    }

    if ( myGamePiece.x + myGamePiece.width > solidPlat[i].x &&
        myGamePiece.x < solidPlat[i].x + solidPlat[i].width &&
        myGamePiece.y <= solidPlat[i].y + solidPlat[i].height &&
        myGamePiece.y >= solidPlat[i].y + solidPlat[i].height) {
        
        
        
            upMove = false;
            upCheck = 2;
        }
        


    else if (upCheck == 1) {
        upMove = true;
    }

    if ( myGamePiece.x + myGamePiece.width > solidPlat[i].x &&
        myGamePiece.x < solidPlat[i].x + solidPlat[i].width &&
        myGamePiece.y + myGamePiece.height >= solidPlat[i].y &&
        myGamePiece.y + 1 <= solidPlat[i].y + solidPlat[i].height) {
        
        
        
            downMove = false;
            downCheck = 2;
        }


    else if (downCheck == 1) {
        downMove = true;
    }

    // if ( myGamePiece.x + myGamePiece.width > solidPlat[i].x &&
    //     myGamePiece.x < solidPlat[i].x + solidPlat[i].width &&
    //     myGamePiece.y + myGamePiece.height >= solidPlat[i].y &&
    //     myGamePiece.y <= solidPlat[i].y + solidPlat[i].height) {
       
    //         myGamePiece.y = solidPlat[i].y - myGamePiece.height;
    
    //     }
    
    } 

    for(i = 0; i < finishPlt.length; i++){  
        finishPlat = finishPlt[i];
            if ( myGamePiece.x + myGamePiece.width > finishPlat.x &&
            myGamePiece.x < finishPlat.x + finishPlat.width &&
            myGamePiece.y + myGamePiece.height  >= finishPlat.y &&
            myGamePiece.y <= finishPlat.y + finishPlat.height) {
                level++;
                myGameArea.clear();   
        clearInterval(myGameArea.interval);
        startGame();
                
                
                
            }
        
    }
    for(i = 0; i < dodge.length; i++){
        
        //dodge[i].x = Math.floor((Math.random() * 1250) + 0);
            dodge[i].y += 5;
    
        
        if ( myGamePiece.x + myGamePiece.width > dodge[i].x &&
            myGamePiece.x < dodge[i].x + dodge[i].width &&
            myGamePiece.y + myGamePiece.height >= dodge[i].y &&
            myGamePiece.y + 1 <= dodge[i].y + dodge[i].height ||
            

            myGamePiece.x + myGamePiece.width > dodge[i].x &&
            myGamePiece.x < dodge[i].x + dodge[i].width &&
            myGamePiece.y <= dodge[i].y + dodge[i].height &&
            myGamePiece.y >= dodge[i].y + dodge[i].height ||

            myGamePiece.x - 4 < dodge[i].x + dodge[i].width &&
        dodge[i].x + dodge[i].width - 4 < myGamePiece.x &&
        myGamePiece.y + myGamePiece.height  > dodge[i].y &&
        myGamePiece.y <= dodge[i].y + dodge[i].height ||
        
        myGamePiece.x + myGamePiece.width + 4 > dodge[i].x &&
        dodge[i].x + 4> myGamePiece.x + myGamePiece.width &&       
        myGamePiece.y + myGamePiece.height   > dodge[i].y &&
        myGamePiece.y <= dodge[i].y + dodge[i].height) {
            
            levelStartup = true;

        }

    }
    for(i = 0; i < txt.length; i++){ 
        // count ++
        // txt[1] = new component("20px", "Ariel", "blue", 280, 200, "text",count)
       text.beforePlay =  new component("30px", "Ariel", "blue", 620, 310, "text", timeBeforeStart)
            
            
        }
console.log(timeBeforeStart)
     
  

        if (myGameArea.keys && myGameArea.keys[39]) {
            if (rightMove == true) {   
                //myGamePiece.image.src = "players/Tak/Tak right small.png"
                myGamePiece.speedX += 10;   
                //                                   
            } 
        }   
            //moving left
        else if (myGameArea.keys && myGameArea.keys[37]) {
            if (leftMove == true) {
        
                //myGamePiece.image.src = "players/Tak/Tak left small.png"
                myGamePiece.speedX -= 10;                                                           
            } 
        }
    if (myGameArea.keys && myGameArea.keys[40]) {
        if(downMove == true) {
            myGamePiece.speedY += 5;    //down
        }
                                                               
    }   
    if (myGameArea.keys && myGameArea.keys[38]) {
        if (upMove == true) {
            myGamePiece.speedY -= 5;        //up 
        }
                                                          
    }   

    if(levelStartup == false) {
    for(i = 0; i < solidPlat.length; i++){

        solidPlat[i].update();
        solidPlat[i].newPose();
    
    }
    for(i = 0; i < dodge.length; i++){
        if (dodge[i].y < 800) {
        dodge[i].update();
        dodge[i].newPos();
        }
    }

    for(i = 0; i < finishPlt.length; i++){
        finishPlat = finishPlt[i];
        finishPlat.update();
        finishPlat.newPose();
    }

    for(i = 0; i < txt.length; i++){
        // count+=1;

        
        txt[i].update();
        txt[i].newPose();

    }
    text.death.update();
    text.level.update();
}
    if(levelStartup == true) {
    text.beforePlay.update();
    text.beforePlay.newPos();
    }
    if(levelStartup == false) {
myGamePiece.newPose();
myGamePiece.update();
    }
}