//LudumDareActor.js

var Log = Log || {};
var Turtles = Turtles || {};

function geometryFromShape(shape)
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
        default:
            {
                Log.debug('invalid shape type', shape.m_type);
            }
	}
    
    return shapeGeometry;
}

//An actor binds a body to a mesh, and handles updating the mesh with the position of the shape.
Turtles.meshFromBody = function(body)
{
    var shape = body.GetShapeList();
    var meshGeometry = geometryFromShape(shape);
    var meshMaterial = new THREE.MeshBasicMaterial({color:0xff0000});
    var mesh = new THREE.Mesh(meshGeometry, meshMaterial);
    return mesh;
}

var Actor = function (body, mesh)
{
	this.body = body;
	this.mesh = Turtles.meshFromBody(body);
};

Actor.prototype = 
{
	constructor: Actor,
	
	update : function ()
	{
		var pos = this.body.m_position;
		this.mesh.position.x = pos.x;
		this.mesh.position.y = pos.y;
        
        this.mesh.rotation.z = this.body.m_rotation;
	}
};