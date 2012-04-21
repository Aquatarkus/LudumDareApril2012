Turtles.Turtle = function() {
	this.isPhysicsSimulated = false;
	this.density = 1.0;
	this.width = 50.0;
	this.length = 20.0;
	this.shape = "CIRCLE";
	this.color = 0x00ff00;
	this.alpha = 0;
    this.x = 0;
    this.y = 0;
};

Turtles.Turtle.prototype = new Turtles.GameEntity();

Turtles.Turtle.prototype.constructor = Turtles.Turtle;
