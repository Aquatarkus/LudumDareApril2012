Turtles.Turtle = function() {
	this.isPhysicsSimulated = false,
	this.density = 1.0;
	this.width = 50.0;
	this.length = 30.0;
	this.shape = "CIRCLE";
	this.color = 0xffffff;
	this.alpha = 0;
};

Turtles.Turtle.prototype = new Turtles.GameEntity();

Turtles.Turtle.prototype.constructor = Turtles.Turtle;
