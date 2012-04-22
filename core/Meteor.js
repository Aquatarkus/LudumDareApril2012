Turtles.Meteor = function() {
    Turtles.Effect.call(this);

    var self = this;

    // GameEntity properties
	self.density = 0.0;
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

    self.arrow = null;
    self.arrowTime = 0.0;
    self.arrowAngle = Math.PI / 2.0;

    self.mouseWasUp = false;
};

Turtles.Meteor.prototype = new Turtles.Effect();
Turtles.Meteor.prototype.constructor = Turtles.Meteor;
Turtles.Meteor.prototype.init = function() {
    Turtles.Effect.prototype.init.call(this);

    // set up arrow/swinging (use global object; only one can appear at a time)
    this.arrowMesh = Turtles.Meteor.prototype.arrowMesh;
    this.arrowMesh.position.set(this.x, this.y, 0.0);
    this.arrowMesh.rotation.x = Math.PI / 2.0;
    this.arrowTime = 0.0;

    turtlesUI.addObject(this.arrowMesh);

    World.pendingEffect = this;
}

Turtles.Meteor.prototype.update = function(stepLength, coords) {
    Turtles.Effect.prototype.update.call(this, stepLength);

    this.arrowTime += stepLength;

    if (!this.hasLaunched) {
        this.arrowMesh.rotation.y = (1.0 / 3.0) * Math.sin((Math.PI / 600.0) * this.arrowTime);
    }
    
    this.mouseWasUp = turtlesUI.mouseIsUp;
};

Turtles.Meteor.prototype.execute = function() {
    Turtles.Effect.prototype.execute.call(this);

    // hack
    this.density = 1.0;
    this._createPhysicsBody();
    // hack

    this.physicsBody.SetLinearVelocity(
        new b2Vec2(
            250 * Math.sin(this.arrowMesh.rotation.y),
            -250 * Math.cos(this.arrowMesh.rotation.y)
        )
    );

    this.hasLaunched = true;
    World.pendingEffect = null;
};

Turtles.Meteor.prototype.cooldownTimer = 0.0;
Turtles.Meteor.prototype.arrowMaterial = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('textures/Arrow.png') });
Turtles.Meteor.prototype.arrowMesh = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), Turtles.Meteor.prototype.arrowMaterial);
