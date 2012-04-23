Turtles.Meteor = function() {
    Turtles.Effect.call(this);

    var self = this;

    // GameEntity properties
	self.density = 1.0;
    // hack (compare width/height to PlaneGeometry defs here and in MeteorSpawner)
    self.width = 20.0;
    self.height = 20.0;
    // hack: should be circle, bug in gameentity
    self.shape = 'BOX';
    self.color = 0xff9900;
    self.alpha = 1.0;

    self.instanceVelocity = null;

    self.texture = Turtles.Meteor.prototype.meteorTexture;
};

Turtles.Meteor.prototype = new Turtles.Effect();
Turtles.Meteor.prototype.constructor = Turtles.Meteor;
Turtles.Meteor.prototype.meteorTexture = THREE.ImageUtils.loadTexture('textures/Meteor1.png');
Turtles.Meteor.prototype.meteorMaterial = new THREE.MeshBasicMaterial({ map: Turtles.Meteor.prototype.meteorTexture });
Turtles.Meteor.prototype.meteorMesh = new THREE.Mesh(new THREE.PlaneGeometry(35, 35), Turtles.Meteor.prototype.meteorMaterial);
