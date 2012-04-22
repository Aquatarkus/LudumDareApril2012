Turtles.Effect = function() {
    Turtles.GameEntity.call(this);

    var self = this;

    self.cooldownMs = 2000.0;

    // GameEntity properties
	self.density = 1.0;
    self.width = 1.0;
    self.length = 1.0;
    self.shape = 'BOX';
    self.color = 0x0000ff;
    self.alpha = 1.0;

};

Turtles.Effect.prototype = new Turtles.GameEntity();
Turtles.Effect.prototype.constructor = Turtles.Effect;
Turtles.Effect.prototype.update = function(stepTime) {
    Turtles.GameEntity.prototype.update.call(this, stepTime);
};

Turtles.Effect.prototype.execute = function(stepTime) {
};
