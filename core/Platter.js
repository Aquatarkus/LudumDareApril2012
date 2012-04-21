Turtles.Platter = function() {
    Turtles.GameEntity.call(this);
    this.isPhysicsSimulated = true,
	this.density = 1.0;
	this.width = 100.0;
	this.length = 50.0;
	this.shape = "BOX";
	this.color = 0x7f3f1f;
	this.alpha = 1;
	this.x = 0;
	this.y = 100;
    this.mesh = null;
};

Turtles.Platter.prototype = new Turtles.GameEntity();

Turtles.Platter.prototype.constructor = Turtles.Platter;