Turtles.Platter = function() {
    Turtles.GameEntity.call(this);
    this.isPhysicsSimulated = true,
	this.density = 0.5;
	this.width = 150.0;
	this.height = 2.0;
	this.shape = "BOX";
	this.color = 0x7f3f1f;
	this.alpha = 1;
	this.x = 0;
	this.y = 100;
	this.z = 1;
    this.mesh = null;
};

Turtles.Platter.prototype = new Turtles.GameEntity();

Turtles.Platter.prototype.constructor = Turtles.Platter;