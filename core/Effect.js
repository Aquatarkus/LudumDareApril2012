Turtles.Effect = function(x, y) {
    Turtles.GameEntity.call(this);

    var self = this;

    // GameEntity properties
	self.density = 1.0;
    self.width = 1.0;
    self.length = 1.0;
    self.shape = 'BOX';
    self.x = x;
    self.y = y;
    self.color = 0x0000ff;
    self.alpha = 1.0;
};

Turtles.Effect.prototype = new Turtles.GameEntity();
