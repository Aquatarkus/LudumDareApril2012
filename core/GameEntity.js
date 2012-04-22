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
                var extents = poly.m_localOBB.extents;
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
	this.categoryBits = 0x0001;
	this.maskBits = 0x0001;
	this.alpha = 0;
    this.mesh = null;
    this.physicsBodyDef = null;
    this.physicsBody = null;
    this.actor = null;
    this.texture = null;
    this.animFrameCount = 1;
    this.animFrameLength = 0;
    this.currentFrameTime = 0;
    this.currentFrameIndex = 0;
    // calculated in init
    this.animFrameWidth = null;
};

Turtles.GameEntity.prototype = {
    textureUri: ''
};

Turtles.GameEntity.prototype.init = function() {
    this._createPhysicsBody();
    this._createMesh();

    // for uv anims
    if (this.animFrameCount > 1) {
        this.animFrameWidth = 1.0 / this.animFrameCount;

        // hack: force first update to fire
        this.currentFrameIndex = this.animFrameCount - 1;
        this.currentFrameTime = this.animFrameLength;
    }

    this.mesh.dynamic = true;
    this.mesh.geometry.dynamic = true;
};

Turtles.GameEntity.prototype.removeFromSimulation = function() {
    if (this.physicsBody) {
        World.pWorld.DestroyBody(this.physicsBody);
    }
    if (this.mesh) {
        turtlesUI.removeObject(this.mesh);
    }
};

Turtles.GameEntity.prototype.update = function(timeElapsed) {
    var pos = this.physicsBody.m_position;
    this.mesh.position.x = pos.x;
    this.mesh.position.y = pos.y;
    this.x = this.mesh.position.x;
    this.y = this.mesh.position.y;
    
    this.mesh.rotation.z = this.physicsBody.m_rotation;

    // sprite animation
    if (this.texture && this.animFrameCount > 1) {
        this.currentFrameTime += timeElapsed;

        // advance frame
        if (this.currentFrameTime >= this.animFrameLength) {
            if (this.animFrameLength > 0) {
                this.currentFrameTime = this.currentFrameTime % this.animFrameLength;
            }
            this.currentFrameIndex = (this.currentFrameIndex + 1) % this.animFrameCount;

            for (var i = 0; i < this.mesh.geometry.faceVertexUvs[0].length; i++) {
                this.mesh.geometry.faceVertexUvs[0][i][0].u = this.animFrameWidth * this.currentFrameIndex;
                this.mesh.geometry.faceVertexUvs[0][i][0].v = 0;
                this.mesh.geometry.faceVertexUvs[0][i][1].u = this.animFrameWidth * this.currentFrameIndex;
                this.mesh.geometry.faceVertexUvs[0][i][1].v = 1;
                this.mesh.geometry.faceVertexUvs[0][i][2].u = this.animFrameWidth * (this.currentFrameIndex + 1);
                this.mesh.geometry.faceVertexUvs[0][i][2].v = 1;
                this.mesh.geometry.faceVertexUvs[0][i][3].u = this.animFrameWidth * (this.currentFrameIndex + 1);
                this.mesh.geometry.faceVertexUvs[0][i][3].v = 0;
            }
            this.mesh.geometry.__dirtyUvs = true;
        }
    }
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
        jointDef.anchorPoint1 = theirBody.m_position;
        
        // roll it
        World.pWorld.CreateJoint(jointDef);
        
        // light it
    }
}
