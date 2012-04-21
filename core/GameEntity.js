
// shape = "BOX" | "CIRCLE"

Turtles.GameEntity = function() {
    this.isPhysicsSimulated = true,
	this.density = 1.0;
	this.width = 1.0;
	this.length = 1.0;
	this.shape = "BOX";
	this.x = 0.0;
	this.y = 0.0;
	this.color = 0xffffff;
	this.alpha = 0;
};

Turtles.GameEntity.prototype = {
    textureUri: '',
    
    update: function() {
    }
};
