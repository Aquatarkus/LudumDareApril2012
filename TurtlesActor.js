//LudumDareActor.js

//An actor binds a body to a mesh, and handles updating the mesh with the position of the shape.
var Actor = function (gameEntity){
	this.gameEntity = gameEntity;
};

Actor.prototype = 
{
	constructor: Actor,
	
	update : function ()
	{
        if (this.gameEntity.isPhysicsSimulated) {
            var pos = this.gameEntity.body.m_position;
            this.gameEntity.mesh.position.x = pos.x;
            this.gameEntity.mesh.position.y = pos.y;
        } else {
            this.gameEntity.mesh.position.x = this.x;
            this.gameEntity.mesh.position.y = this.y;
        }
	}
};