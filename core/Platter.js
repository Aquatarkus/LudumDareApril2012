Turtles.Platter = function() {
    Turtles.GameEntity.call(this);
    this.isPhysicsSimulated = true,
	this.density = 0.5;
	this.width = 150.0;
	this.height = 2.0;
	this.shape = "BOX";
	this.color = 0x7f3f1f;
	this.alpha = 1;
	this.collisionCategoryBits = 0x0002;
	this.collisionMaskBits = 0x0001;
	this.x = 0;
	this.y = 100;
    this.mesh = null;
};

Turtles.Platter.prototype = new Turtles.GameEntity();

Turtles.Platter.prototype.constructor = Turtles.Platter;