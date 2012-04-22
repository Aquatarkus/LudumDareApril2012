Turtles.Effect = function(x, y) {
    Turtles.GameEntity.call(this);

    // GameEntity properties
	this.density = 1.0;
    this.width = 1.0;
    this.length = 1.0;
    this.shape = 'BOX';
    this.x = x;
    this.y = y;
    this.color = 0x0000ff;
    this.alpha = 1.0;
};

Turtles.Effect.prototype = new Turtles.GameEntity();
