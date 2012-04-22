Turtles.turtleTexture = THREE.ImageUtils.loadTexture('textures/FullFrontTurtle0.png');

Turtles.Turtle = function() {
Turtles.GameEntity.call(this);
	this.isPhysicsSimulated = true;
	this.density = 0;
	this.width = 32.0;
	this.height = 32.0;
    this.rotation = new THREE.Vector3(0, 0, 0);
	this.shape = "BOX";
	this.color = 0x00ff00;
	this.alpha = 0;
	this.groupIndex = -1;
	this.categoryBits = 0x0002;
	this.maskBits = 0x0002;
    this.x = 0;
    this.y = 0;
	
	this.texture = Turtles.turtleTexture;
};

Turtles.Turtle.prototype = new Turtles.GameEntity();

Turtles.Turtle.prototype.constructor = Turtles.Turtle;
