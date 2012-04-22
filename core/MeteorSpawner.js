Turtles.MeteorSpawner = function(coords) {
    var self = this;

    self.x = coords.x;
    self.y = coords.y;

    // set up arrow/swinging (use global object; only one can appear at a time)
    self.meteorMesh = Turtles.Meteor.prototype.meteorMesh;
    self.meteorMesh.position.set(coords.x, coords.y, 0.0);
    self.meteorMesh.rotation.x = Math.PI / 2.0;
    
    self.arrowMesh = Turtles.MeteorSpawner.prototype.arrowMesh;
    self.arrowMesh.position.set(coords.x, coords.y, 1.0);
    self.arrowMesh.rotation.x = Math.PI / 2.0;
    self.arrowTime = 0.0;

    // angle range (centered around straight down) that meteors can fire
    self.arrowSpan = Math.PI / 2.0;

    turtlesUI.scene.add(self.meteorMesh);
    turtlesUI.scene.add(self.arrowMesh);
};

Turtles.MeteorSpawner.prototype = {
    constructor: Turtles.MeteorSpawner,

    update: function(stepTime) {
        this.arrowTime += stepTime;
        this.arrowMesh.rotation.y = this.arrowSpan * Math.sin((Math.PI / 600.0) * this.arrowTime);
        this.meteorMesh.rotation.y += stepTime / 600.0;
    },

    spawn: function() {
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
        turtlesUI.scene.remove(this.meteorMesh);
        turtlesUI.scene.remove(this.arrowMesh);
    }
};

Turtles.MeteorSpawner.prototype.arrowMaterial = new THREE.MeshBasicMaterial({ map: THREE.ImageUtils.loadTexture('textures/Arrow.png'), transparent: true });
Turtles.MeteorSpawner.prototype.arrowMesh = new THREE.Mesh(new THREE.PlaneGeometry(30, 30), Turtles.MeteorSpawner.prototype.arrowMaterial);
