Turtles.MeteorSpawner = function(coords) {
    var self = this;

    self.x = coords.x;
    self.y = coords.y;

    // set up arrow/swinging (use global object; only one can appear at a time)
    self.arrowMesh = Turtles.Meteor.prototype.arrowMesh;
    self.arrowMesh.position.set(coords.x, coords.y, 0.0);
    self.arrowMesh.rotation.x = Math.PI / 2.0;
    self.arrowTime = 0.0;
    // angle range (centered around straight down) that meteors can fire
    self.arrowSpan = Math.PI / 2.0;

    turtlesUI.scene.add(self.arrowMesh);
};

Turtles.MeteorSpawner.prototype = {
    constructor: Turtles.MeteorSpawner,

    update: function(stepTime) {
        this.arrowTime += stepTime;
        this.arrowMesh.rotation.y = this.arrowSpan * Math.sin((Math.PI / 600.0) * this.arrowTime);
    },

    spawn: function() {
        console.log('spawning');
        var meteor = new Turtles.Meteor();
        meteor.x = this.x;
        meteor.y = this.y;
        meteor.linearVelocity

        meteor.init();

        meteor.physicsBody.SetLinearVelocity(
            new b2Vec2(
                250 * Math.sin(this.arrowMesh.rotation.y),
                -250 * Math.cos(this.arrowMesh.rotation.y)
            )
        );

        // unleash meteor
        World.effects.push(meteor);

        // clear the current spawner
        World.spawner = null;
        turtlesUI.scene.remove(this.arrowMesh);
    }
};

Turtles.Meteor.prototype.arrowMaterial = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('textures/Arrow.png') });
Turtles.Meteor.prototype.arrowMesh = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), Turtles.Meteor.prototype.arrowMaterial);
