// Initialize sprites and animations
function initializeScene() {
  const ground = createSprite(200, 200);
  ground.setAnimation("Ground_1");
  ground.scale = 2;

  const player = createSprite(200, 200);
  player.scale = 0.1;
  player.setAnimation("Phoenix_right");

  const brazil = createLocationSprite(83, 221, "Pin", 2);
  const japan = createLocationSprite(422, 152, "Pin", 2);

  camera.on();

  return { ground, player, brazil, japan };
}

// Helper function to create location sprites
function createLocationSprite(x, y, animation, scale) {
  const sprite = createSprite(x, y, 15, 15);
  sprite.setAnimation(animation);
  sprite.scale = scale;
  return sprite;
}

// Handle player movement
function handleMovement(player) {
  if (keyWentDown("right")) {
    player.setAnimation("Phoenix_right");
    player.velocityX = 5;
  }
  if (keyWentDown("left")) {
    player.setAnimation("Phoenix left");
    player.velocityX = -5;
  }
  if (keyWentUp("left") || keyWentUp("right")) {
    player.velocityX = 0;
  }

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

  camera.x = player.x;
  camera.y = player.y;
}

// Handle Brazil arrival logic
function arrivedBrazil(player, ground, japan, brazil) {
  player.scale = 0.5;
  ground.setAnimation("city_1");
  player.position.set(200, 200);
  ground.scale = 1.5;

  japan.visible = false;
  brazil.visible = false;
  camera.off();

  // Create and set collider for Brazil sidewalk
  const brazilSidewalk = createSprite(225, 300);
  brazilSidewalk.setAnimation("brazilSidewalk");
  brazilSidewalk.setCollider("rectangle", 0, 0, brazilSidewalk.width, brazilSidewalk.height);
  brazilSidewalk.debug = true; // Enable debug to visualize collider

  player.setCollider("rectangle", 0, 0, player.width, player.height);
  player.debug = true; // Enable debug to visualize collider

  player.collide(brazilSidewalk);
  player.scale = 0.25;

  const brazilOffice = createSprite(63, 220);
  brazilOffice.setAnimation("brazilOffice");
  brazilOffice.scale = 2;

  // Check if player touches the Brazil office
  if (player.isTouching(brazilOffice)) {
    ground.visible = false;
    brazilOffice.visible = false;
    brazilSidewalk.visible = false;
    const brazilInside = createSprite(200, 200);
    brazilInside.setAnimation("brazilInside"); // Ensure this animation is defined
    brazilInside.scale = 2;
  }
}

// Handle Japan arrival logic
function arrivedJapan() {
  // Japan-specific logic here
}

// Handle player collision with locations
function checkCollisions(player, brazil, japan) {
  if (player.isTouching(brazil)) {
    console.log("Player has arrived at location: Brazil");
    arrivedBrazil(player, ground, japan, brazil);
  }
  if (player.isTouching(japan)) {
    console.log("Player has arrived at location: Japan");
    arrivedJapan();
  }
}

// Brazil-specific jump behavior
function brazilJump(player) {
  if (keyDown("up")) {
    player.velocityY = -3;
  }
  if (keyWentUp("up")) {
    player.velocityY = 0;
  }
}

// Main draw function
function draw() {
  const { ground, player, brazil, japan } = initializeScene();
  handleMovement(player);
  checkCollisions(player, brazil, japan);

  // Continuously check for collision with brazilSidewalk
  if (typeof brazilSidewalk !== 'undefined') {
    player.collide(brazilSidewalk);
  }

  brazilJump(player);
  drawSprites();
}
