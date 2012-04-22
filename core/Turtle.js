Turtles.Turtle = function() {
Turtles.GameEntity.call(this);
	this.isPhysicsSimulated = true;
	this.density = 0;
	this.width = 100.0;
	this.height = 20.0;
	this.shape = "CIRCLE";
	this.color = 0x00ff00;
	this.alpha = 0;
	this.collisionCategoryBits = 0x0004;
	this.collisionMaskBits = 0x0000;
    this.x = 0;
    this.y = 0;
};

Turtles.Turtle.prototype = new Turtles.GameEntity();

Turtles.Turtle.prototype.constructor = Turtles.Turtle;
