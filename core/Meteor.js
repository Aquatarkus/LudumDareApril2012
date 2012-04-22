Turtles.Meteor = function() {
    Turtles.Effect.call(this);

    var self = this;

    // GameEntity properties
	self.density = 1.0;
    self.width = 30.0;
    self.length = 30.0;
    self.shape = 'CIRCLE';
    self.color = 0xff9900;
    self.alpha = 1.0;

    self.instanceVelocity = null;
    self.startPosition = null;
    self.hasLaunched = false;
    self.mouseWasDown = false;

    self.placementMode = true;

    self.mouseWasUp = false;
};

Turtles.Meteor.prototype = new Turtles.Effect();
Turtles.Meteor.prototype.constructor = Turtles.Meteor;
