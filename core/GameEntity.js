// shape = "BOX" | "CIRCLE"

Turtles.geometryFromShape = function(shape)
{
    var shapeGeometry = null;
    var depth = 20;
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
                shapeGeometry = new THREE.CubeGeometry(extents.x, extents.y, depth);
            }
            break;
        case b2Shape.e_polyShape:
            {
                var poly = shape;
                if (poly.m_localOBB.extents)
                {
                    var extents = poly.m_localOBB.extents;
                    shapeGeometry = new THREE.CubeGeometry(2*extents.x, 2*extents.y, depth);
                }
                else
                {
                    // Triangle
                    var triangleShape = new THREE.Shape();
                    var vertexCount = poly.vertexCount;
                    for (var i = 0; i < vertexCount; i++)
                    {
                        var polyVertex = poly.vertices[i];
                        var vertexPos = new THREE.Vertex3(polyVertex.x, polyVertex.y, 0);
                        var shapeVertex = new THREE.Vertex(vertexPos);
  
                        triangleShape.lineTo(polyVertex.x, polyVertex.y);
                        shapeGeometry.vertices.push(shapeVertex);
                    }
                    triangleShape.lineTo(0, 0);
                    var trianglePoints = triangleShape.createPointsGeometry();
                    
                    shapeGeometry = new THREE.Geometry();
                    shapeGeometry.vertices = trianglePoints;
                    
                    Log.debug('trianglePoints', trianglePoints);
                }
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
    if (texture)
    {
        var textureMaterial = new THREE.MeshBasicMaterial(
        {
            map: texture,
            transparent: true
        });
        var otherSideMaterials = new THREE.MeshBasicMaterial({color: 0xF20A4C});
        var materials = [
		otherSideMaterials,
		otherSideMaterials,
		otherSideMaterials,
		otherSideMaterials,
		textureMaterial, //Positive Z face materialis in position 4.
		otherSideMaterials];
        
        var extents = shape.m_localOBB.extents;
        meshGeometry = new THREE.CubeGeometry(2*extents.x, 2*extents.y, 20, 1, 1, 1, materials);
        meshMaterial = new THREE.MeshFaceMaterial();
    }
    else
    {
        meshGeometry = Turtles.geometryFromShape(shape);
        meshMaterial = new THREE.MeshBasicMaterial({color:hexColor, wireframe:true});
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
	this.color = 0xffffff;
	this.alpha = 0;
    this.mesh = null;
    this.physicsBodyDef = null;
    this.physicsBody = null;
    this.actor = null;
    this.texture = null;
    this.joints = [];
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
    
    this.mesh = Turtles.meshFromBody(this.physicsBody, this.color, this.texture);
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
    switch(this.shape)
    {
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
        case "TRIANGLE":
            physicsShapeDef = new b2PolyDef();
            physicsShapeDef.vertexCount = 3;
            physicsShapeDef.vertices[0].x = 0;
            physicsShapeDef.vertices[0].y = 0;
            physicsShapeDef.vertices[1].x = 5;
            physicsShapeDef.vertices[1].y = 0;
            physicsShapeDef.vertices[2].x = 5;
            physicsShapeDef.vertices[2].y = 2;
            physicsShapeDef.vertices[0].x = 0;
            // physicsShapeDef.extents = new b2Vec2(5.0, 2.0);
            break;
        default:
            alert("Unknown entity type '" + this.shape + "'.");
            break;
    }
    this.physicsBodyDef = new b2BodyDef();
    this.physicsBodyDef.AddShape(physicsShapeDef);
    this.physicsBodyDef.position.Set(this.x, this.y);
    this.physicsBody = World.pWorld.CreateBody(this.physicsBodyDef);
    this.physicsBody.gameEntity = this;
    return this.physicsBody;
};

Turtles.GameEntity.prototype.addJoint = function(joint)
{
    // stash it
    this.joints.push(joint);
};

Turtles.GameEntity.prototype.removeJoint = function(joint)
{
    // burn it
    var jointIndex = this.joints.indexOf(joint);
    this.joints.splice(jointIndex, 1);
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
};