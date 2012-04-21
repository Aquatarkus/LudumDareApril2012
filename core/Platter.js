Turtles.Platter = function() {
    this.isPhysicsSimulated = false,
	this.density = 1.0;
	this.width = 1000.0;
	this.length = 50.0;
	this.shape = "BOX";
	this.color = 0x7f3f1f;
	this.alpha = 0;
	this.x = -500;
	this.y = 100;
    this.mesh = null;
};

Turtles.Platter.prototype = new Turtles.GameEntity();

Turtles.Platter.prototype.constructor = Turtles.Platter;


Turtles.Platter.prototype.getMesh = function() {
    if (this.mesh == null) {
        var platterGeometry = new THREE.CubeGeometry(200, 10, 200);
        var platterMaterial = new THREE.MeshBasicMaterial({color: this.color });
        this.mesh = new THREE.Mesh(platterGeometry, platterMaterial);
        platterMesh.position.set(0, 50, 0);
        turtlesUI.addClickableObject(this.mesh);
    }
    
    return this.mesh;
};
