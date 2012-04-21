//LudumDareActor.js

//An actor binds a body to a mesh, and handles updating the mesh with the position of the shape.
var Actor = function (body, mesh){
	this.body = body;
	this.mesh = mesh;
};

Actor.prototype = 
{
	constructor: Actor,
	
	update : function ()
	{
		var pos = this.body.m_position;
		this.mesh.position.x = pos.x;
		this.mesh.position.y = pos.y;
	}
};