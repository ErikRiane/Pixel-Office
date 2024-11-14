var ground = createSprite(200, 200);
ground.setAnimation("Ground_1");
ground.scale = 2;
// Setup the player
var player = createSprite(200, 200);
player.scale = 0.1;
player.setAnimation("Phoenix_right");

//Setup Brazil
var brazil = createSprite(83, 221, 15, 15);
brazil.setAnimation("Pin");
brazil.scale = 2;

//Setup Japan
var japan = createSprite(422, 152, 15, 15);
japan.setAnimation("Pin");
japan.scale = 2;
camera.on();

//Brazil: x=83, y:221
//Japan: x=413, y:136

function handleMovement() {
  if (keyWentDown("right")) {
    player.setAnimation("Phoenix_right");
    player.velocityX = 5;
    console.log((("player x is: " + player.x) + "player y is: ") + player.y);

  }
  if (keyWentDown("left")) {
    player.setAnimation("Phoenix left");
    player.velocityX = -5;

  }
  if (keyWentUp("left")) {
    player.velocityX = 0;
  }
  if (keyWentUp("right")) {
    player.velocityX = 0;
  }
  camera.x = player.x;
  camera.y = player.y;
  if (keyDown("up")) {
    player.velocityY = -5;
  }
  if (keyWentUp("up")) {
    player.velocityY = 0;
  }
  if (keyWentDown("down")) {
    player.velocityY = 5;
  }
  if (keyWentUp("down")) {
    player.velocityY = 0;
  }
  drawSprites();
}
function arrivedBrazil() {
player.scale = 0.5;
ground.setAnimation("city_1");
player.x = 200;
player.y=200;
ground.scale = 1.5;
japan.visible = false;
brazil.visible = false;
camera.off();
var brazilSidewalk = createSprite(225, 300);
brazilSidewalk.setAnimation("brazilSidewalk");
player.setCollider("rectangle");
brazilSidewalk.setCollider("rectangle");
player.collide(brazilSidewalk);
player.scale = 0.25;
camera.x = 0;
camera.y = 0;
player.velocityY = 5;

var brazilOffice = createSprite(63, 220);
brazilOffice.setAnimation("brazilOffice");
brazilOffice.scale = 2;
if (player.isTouching(brazilOffice)) {
  ground.visible = false;
  brazilOffice.visible = false;
  brazilSidewalk.visible = false;
  var brazilInside = createSprite(200, 200);
  brazilInside.scale = 2;
}
brazilJump();

}


function arrivedJapan() {
  
}

function collided() {
  if (player.isTouching(brazil)) {
    console.log("Player has arrived at location: Brazil");
    arrivedBrazil();
  }
  if (player.isTouching(japan)) {
    console.log("Player has arrived at location: Japan");
    arrivedJapan();
  }
}
function brazilJump() {
  if (keyDown("up")) {
    player.velocityY = -3;
    player.velocityY = -5;
    player.velocityY = -3;
    player.velocityY = 0;
  }
  if (keyWentUp("up")) {
    player.velocityY = 0;
  }
}
function draw() {
  handleMovement();
  collided();
  brazilJump();
}
