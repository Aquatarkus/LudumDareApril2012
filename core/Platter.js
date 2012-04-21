Turtles.Platter = function() {
    this.isPhysicsSimulated = false,
	this.density = 1.0;
	this.width = 100.0;
	this.length = 10.0;
	this.shape = "BOX";
	this.color = 0xffffff;
	this.alpha = 0;
};

Turtles.Platter.prototype = new Turtles.GameEntity();

Turtles.Platter.prototype.constructor = Turtles.Platter;

Turtles.Platter.prototype.update = function() {
    
};
