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
        case b2Shape.e_boxShape:
            {
                var box = shape;
                var extents = box.extents;
                var depth = 20;
                shapeGeometry = new THREE.CubeGeometry(extents.x, extents.y, depth);
            }
            break;
        case b2Shape.e_polyShape:
            {
                var poly = shape;
                var extents = poly.m_localOBB.extents;
                var depth = 20;
                shapeGeometry = new THREE.CubeGeometry(2*extents.x, 2*extents.y, depth);
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
Turtles.meshFromBody = function(body, hexColor)
{
    var shape = body.GetShapeList();
    var meshGeometry = Turtles.geometryFromShape(shape);
    var meshMaterial = new THREE.MeshBasicMaterial({color:hexColor, wireframe:true});
    var mesh = new THREE.Mesh(meshGeometry, meshMaterial);
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
    this._createPhysicsBody();
    this._createMesh();
};

Turtles.GameEntity.prototype.update = function(timeElapsed) {
    var pos = this.physicsBody.m_position;
    this.mesh.position.x = pos.x;
    this.mesh.position.y = pos.y;
    
    this.mesh.rotation.z = this.physicsBody.m_rotation;
};

Turtles.GameEntity.prototype._createMesh = function(){
    
    this.mesh = Turtles.meshFromBody(this.physicsBody, this.color);
    
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
    this.physicsBodyDef = new b2BodyDef();
    this.physicsBodyDef.AddShape(physicsShapeDef);
    this.physicsBodyDef.position.Set(this.x, this.y);
    this.physicsBody = World.pWorld.CreateBody(this.physicsBodyDef);
    
    return this.physicsBody;
};