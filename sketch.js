var dog
var happyDog
var database
var foodS
var foodStock
var food 
var feedButton
var foodButton
var feedTime;

function preload() {
doge = loadImage("images/dogImg.png")
happBoi = loadImage("images/dogImg1.png")
milk = loadImage("images/Milk.png")
}

function setup() {
  createCanvas(750, 500);
  database = firebase.database();
  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
  dog = createSprite(250, 250)
  dog.addImage(doge)
  dog.scale = 0.25
  feedButton = createButton("FEED");
  feedButton.position(375,100)
  feedButton.mousePressed(feedDog);

  foodButton = createButton("ADD FOOD");
  foodButton.position(450,100)
  foodButton.mousePressed(addStock);
  }

  function feedDog(){
    writeStock(foodS);
    dog.addImage(happBoi)
  }

  function addStock () {
    if (foodS < 60) {
      foodS = foodS + 1
      database.ref('/').update({
      Food:foodS
    })
    }

    else{
      foodS = 60
      alert("FOOD LIMIT IS EXCEEDED")
    }
    
  }
 
  function showFoodBottle() {
   var x = 400;
   var y = 100;
   imageMode(CENTER);
   

   for(var i =0; i < foodS; i++) {
    if(i%10 === 0 && i > 0) {
    y = y + 70;
    x = 400;
    }
 
    image(milk, x, y, 70, 70);
    x = x + 35;
   }

  }

  function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x<=0){
    x=0
  } else{
   x=x-1 
  }
  database.ref('/').update({
    Food:x,
    feedTime: hour()
  })
}

function draw() {
  background(46, 139, 87)  
  //if (keyWentDown(UP_ARROW)) {
   // console.log(foodS)
     // writeStock(foodS)
     // dog.addImage(happBoi)
  //}                                
        dbref = database.ref("feedTime");
        dbref.on("value", function(data){
          feedTime = data.val();
        })
        
        
  textSize(13)
  fill("Black")
  text("Note: Press 'FEED' to feed your Doge some Chimken to make him a HappBoi", 13, 25)
  text("Remaining Food:" + foodS, 150, 100)
  
  fill(255,255,254);
  textSize(15); 
  if(feedTime>=12){
     text("Last Feed : "+ feedTime%12 + " PM", 500,30); 
    }
    else if(feedTime==0){
       text("Last Feed : 12 AM",500,30); }
       
       else{
          text("Last Feed : "+ feedTime + " AM", 500,30); 
        }

  drawSprites();
  showFoodBottle();
}

