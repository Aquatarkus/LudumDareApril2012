Turtles.Platter = function() {
    Turtles.GameEntity.call(this);
    this.isPhysicsSimulated = true,
	this.density = 0.5;
	this.width = 150.0;
	this.height = 2.0;
	this.shape = "BOX";
	this.color = 0x7f3f1f;
	this.alpha = 1;
	this.x = 0;
	this.y = 100;
	this.z = 1;
	this.friction = 1;
	this.fulcrumJoint = null
    this.mesh = null;
};

Turtles.Platter.prototype = new Turtles.GameEntity();

Turtles.Platter.prototype.constructor = Turtles.Platter;

//Creates a small fulcrum body in the world, and then creates
//a joint between the fulcrum body and the platter.
Turtles.Platter.prototype.initFulcrumJoint = function (){
		var pWorld = World.pWorld;
		var turtle = World.turtle;
		
	    //init fulcrum
		var fulcrumShapeDef = new b2BoxDef();
        fulcrumShapeDef.extents.Set(1, 1);
        fulcrumShapeDef.density = 0;
		fulcrumShapeDef.groupIndex = -2;
		var fulcrumBodyDef = new b2BodyDef();
		fulcrumBodyDef.AddShape(fulcrumShapeDef);
		fulcrumBodyDef.position.Set(0, turtle.height/4);
		var fulcrumBody = pWorld.CreateBody(fulcrumBodyDef);
		
		//join platter to fulcrum.
		var fulcrumJointDef = new b2RevoluteJointDef();
		fulcrumJointDef.body1 = this.physicsBody;
		fulcrumJointDef.body2 = fulcrumBody;
		fulcrumJointDef.anchorPoint.Set(fulcrumBody.m_position.x, fulcrumBody.m_position.y);
		fulcrumJointDef.lowerAngle = -Math.PI / 6;
		fulcrumJointDef.upperAngle = Math.PI / 6;
		fulcrumJointDef.enableLimit = true;
		this.fulcrumJoint = pWorld.CreateJoint(fulcrumJointDef);
		return this.fulcrumJoint;
}


//A custom update method for the platter that adjusts its angular velocity,
//so the world doesn't flip shit right away.
Turtles.Platter.prototype.update = function(stepMs){
	//super call
	Turtles.GameEntity.prototype.update.call(this, stepMs);
	
	if (this.physicsBody)
	{
		var pBody = this.physicsBody
		
	}
}