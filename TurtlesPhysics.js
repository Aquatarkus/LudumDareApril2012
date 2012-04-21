//LudumDarePhysics.js
//Handles all of the physics in the game.


//Creates the ground on which the turtle stands.
function createGround(world) {

}

//Creates the turtle.
function createTurtle (world) {

}

//Creates the platter.
function createPlatter(world){
	var platterSd = new b2BoxDef();
	platterSd.extents.Set(1000, 50);
	platterSd.restitution = 0;
	var platterBd = new b2BodyDef();
	platterBd.AddShape(platterSd);
	platterBd.position.Set(-500, 340);
	return world.CreateBody(platterBd)
}