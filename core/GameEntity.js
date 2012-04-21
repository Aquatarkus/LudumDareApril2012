
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
    this.mesh = null;
    this.physicsBodyDef = null;
    this.physicsBody = null;
    this.actor = null;
};

Turtles.GameEntity.prototype = {
    textureUri: ''
};



Turtles.GameEntity.prototype.init = function() {
    this._createMesh();
    this._createPhysicsBody();
    this._createActor();
};

Turtles.GameEntity.prototype.updateActor = function(timeElapsed) {
    this.actor.update(timeElapsed);
};


Turtles.GameEntity.prototype._createActor = function() {
    this.actor = new Actor(this.physicsBody, this.mesh);
    
    return this.actor;
};


Turtles.GameEntity.prototype._createMesh = function() {
    var geometry = null;
    
    switch (this.shape) {
        case "BOX":
            geometry = new THREE.SphereGeometry(50.0, 20.0, 20.0);
            break;
        case "CIRCLE":
            geometry = new THREE.CubeGeometry(200, 10, 200);
            break;
        default:
            alert("Invalid geometry '" + this.shape + "'");
            break;
    }
    
    var material = new THREE.MeshBasicMaterial({color: this.color });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, 50, 0);
    turtlesUI.addClickableObject(this.mesh);
    
    return this.mesh;
};


Turtles.GameEntity.prototype._createPhysicsBody = function() {
    if (!this.isPhysicsSimulated) {
        return null;
    }
    
    var physicsObj = null;
    if (this.isPhysicsSimulated) {
        switch(this.shape) {
            case "BOX":
                physicsObj = new b2BoxDef();
                physicsObj.extents.Set(this.width, this.height);
                physicsObj.density = this.density;
                break;
            case "CIRCLE":
                alert("Not implemented '" + this.shape + "'.");
                break;
            default:
                alert("Unknown entity type '" + this.shape + "'.");
                break;
        }
        this.physicsBodyDef = new b2BodyDef();
        this.physicsBodyDef.AddShape(physicsObj);
        this.physicsBodyDef.position.Set(this.x, this.y);
        this.physicsBody = World.pWorld.CreateBody(this.physicsBodyDef);
    }
    
    return this.physicsBody;
};