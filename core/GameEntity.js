// shape = "BOX" | "CIRCLE"

Turtles.geometryFromShape = function(shape)
{
    var shapeGeometry = null;
    switch (shape.m_type)
    {
        case b2Shape.e_circleShape:
            {
                var circle = shape;
                var pos = circle.m_position;
                var r = circle.m_radius;
                var segments = 5;
                
                shapeGeometry = new THREE.SphereGeometry(r, segments, segments);
            }
            break;
        case b2Shape.e_polyShape:
            {
                var poly = shape;
                var extents = poly.m_localOBB.extents;
                shapeGeometry = new THREE.PlaneGeometry(2*extents.x, 2*extents.y);
				
				//The geometry of a plane needs to be corrected due to a hard-coding of
				//the normal vector in THREE.PlaneGeometry.  We must rotate every vertice 
				//by 90-degrees on the X-axis so the plane is normal to +Z.
				var planeRotationMatrix = new THREE.Matrix4();
				planeRotationMatrix.makeRotationX(Math.PI / 2);
				shapeGeometry.applyMatrix(planeRotationMatrix);
            }
            break;
        default:
            {
                Log.debug('invalid shape type', shape.m_type);
            }
	}
    return shapeGeometry;
}

//An actor binds a body to a mesh, and handles updating the mesh with the position of the shape.
Turtles.meshFromBody = function(body, hexColor, texture)
{
    var shape = body.GetShapeList();
    var meshGeometry = null;
    var meshMaterial = null;
    var mesh = null;
	
	meshGeometry = Turtles.geometryFromShape(shape);
    if (texture)
    {
        meshMaterial = new THREE.MeshBasicMaterial(
        {
            map: texture,
            transparent: true
        });
    }
    else
    {		
        meshMaterial = new THREE.MeshBasicMaterial({color:hexColor});
    }
    mesh = new THREE.Mesh(meshGeometry, meshMaterial);
    return mesh;
}

Turtles.GameEntity = function() {
    this.isPhysicsSimulated = true,
	this.density = 1.0;
	this.width = 1.0;
	this.height = 1.0;
	this.shape = "BOX";
	this.x = 0.0;
	this.y = 0.0;
	this.z = 0;
	this.color = 0xffffff;
	this.categoryBits = 0xffff;
	this.maskBits = 0xffff;
	this.alpha = 0;
    this.mesh = null;
    this.physicsBodyDef = null;
    this.physicsBody = null;
    this.actor = null;
    this.texture = null;
    this.isInSimulation = false;
    this.destroy = false;
};

Turtles.GameEntity.prototype = {
    textureUri: ''
};

Turtles.GameEntity.prototype.init = function() {
    if (!this.isInSimulation) {
        this._createPhysicsBody();
        this._createMesh();
        this.isInSimulation = true;
    }
};

Turtles.GameEntity.prototype.addToSimulationAt = function(x, y) {
    this.x = x;
    this.y = y;
    this.init();
};

Turtles.GameEntity.prototype.removeFromSimulation = function() {
    if (this.isInSimulation) {
        if (this.physicsBody) {
            World.pWorld.DestroyBody(this.physicsBody);
        }
        if (this.mesh) {
            turtlesUI.removeObject(this.mesh);
        }
        this.isInSimulation = false;
    }
};

Turtles.GameEntity.prototype.checkForDeath = function() {
    if (this.y <= World.minWorldY * 0.8) {
        this.destroy = true;
    }
    
    return this.destroy;
};

Turtles.GameEntity.prototype.update = function(timeElapsed) {
    var pos = this.physicsBody.m_position;
    this.mesh.position.x = pos.x;
    this.mesh.position.y = pos.y;
    if (this.checkForDeath()) {
        return;
    }
    
    if (this.isInSimulation) {
        var pos = this.physicsBody.m_position;
        this.mesh.position.x = pos.x;
        this.mesh.position.y = pos.y;
        this.x = this.mesh.position.x;
        this.y = this.mesh.position.y;
        
        this.mesh.rotation.z = this.physicsBody.m_rotation;
    }
};

Turtles.GameEntity.prototype._createMesh = function(){
    
    this.mesh = Turtles.meshFromBody(this.physicsBody, this.color, this.texture);
    this.mesh.position.z = this.z;
	if(this.rotation)
    {
        this.mesh.rotation = this.rotation;
    }
    this.mesh.gameEntity = this;
    turtlesUI.addClickableObject(this.mesh);
    
    return this.mesh;
};

Turtles.GameEntity.prototype._createPhysicsBody = function() {
    
    var physicsShapeDef = null;
    switch(this.shape) {
        case "BOX":
            physicsShapeDef = new b2BoxDef();
            physicsShapeDef.extents.Set(this.width, this.height);
            physicsShapeDef.density = this.density;
            break;
        case "CIRCLE":
            physicsShapeDef = new b2CircleDef();
            physicsShapeDef.radius = this.width/2;
            physicsShapeDef.density = this.density;
            break;
        default:
            alert("Unknown entity type '" + this.shape + "'.");
            break;
    }
    //physicsShapeDef.friction = 99;
	physicsShapeDef.categoryBits = this.categoryBits;
	physicsShapeDef.maskBits = this.maskBits;
	if (this.friction) {
		physicsShapeDef.friction = this.friction;
	}
    this.physicsBodyDef = new b2BodyDef();
    this.physicsBodyDef.AddShape(physicsShapeDef);
    this.physicsBodyDef.position.Set(this.x, this.y);
    this.physicsBody = World.pWorld.CreateBody(this.physicsBodyDef);
    
    return this.physicsBody;
};

// blaze-a-blaze
Turtles.GameEntity.prototype.fixWithJoint = function(entity)
{
    if (this != entity)
    {
        // get down
        var myBody = this.physicsBody;
        var theirBody = entity.physicsBody;
        
        var jointDef = new b2DistanceJointDef();
        jointDef.body1 = myBody;
        jointDef.body2 = theirBody;
        jointDef.collideConnected = true; // bump and grind
        jointDef.anchorPoint1 = myBody.m_position;
        jointDef.anchorPoint2 = theirBody.m_position;
        
        // roll it
        World.pWorld.CreateJoint(jointDef);
        
        // light it
    }
}
