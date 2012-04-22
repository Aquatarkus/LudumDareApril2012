

/*
STATES:
	IDLE
		If in this state, should move to another state
	MOVE_TO_BUILD_SITE
		Move to a desirable build site, determined by
			Random
			Where there's an open spot
			Where the player can actually access from where they're at
	BUILD
		Stay at current position while building is being built
		When building is complete, move back to IDLE
	MOVE_TO_SLEEP
		When 0 energy, move to nearest empty building to sleep
		Re-evaluate where nearest building is every update
	SLEEP
		Occupy building, and begin to regenerate energy at energyDrainRate.
		Set to IDLE when back to maxEnergy
	PANIC
		When not in control of actions (i.e. when not on ground moving under own velocity)
		Interrupt all other actions
		When in control again, go back to IDLE
		
Assumes:
	Turtles.World
		.energyDrainRate : float
		.isOnTerrain(b2Vec2) : RETURN bool
		.getClosestUnoccupiedBuilding(platterPosition) : RETURN Turtles.Building
		.getBuildPosition() : RETURN platterPosition
		.initBuilding(Turtles.Person) : RETURN Turtles.Building
	Turtles.Building
		.occupier : reference to Turtles.Person, or null if unoccupied (reference to Person, or null if no occupier)
		.platterPosition
		.buildStartAtTime
		.isBuilt
		.occupy(Turtles.Person) : Has person occupy building
		.unoccupy(Turtles.Person) : Removes given occupier
*/



Turtles.Person = function() {
	Turtles.GameEntity.call(this);
	this.isPhysicsSimulated = true,
	this.density = 1.0;
	this.width = 0.07;
	this.height = 0.1;
	this.shape = "CIRCLE";
	this.color = 0xffffff;
	this.alpha = 0;
	
	this.platterPosition = 0;
	this.moveSpeed = 5.0;
	this.maxEnergy = 5.0;
	this.energy = 5.0;
	this.state = "IDLE";
	this.goalPlatterPosition = 0;
	this.goalObject = null;
};

Turtles.Person.prototype = new Turtles.GameEntity();

Turtles.Person.prototype.constructor = Turtles.Person;

Turtles.Person.prototype.buildComplete = function(building) {
	this.state = "IDLE";
	this.goalObject = null;
};

Turtles.Person.prototype.update = function(deltaMs) {
    this.updateActor(deltaMs);

	// Check for panic/exiting panic.
	if (World.isOnTerrain(self)) {
		if (this.state == "PANIC") {
			this.state = "IDLE";
		}
	} else {
		this.state = "PANIC";
	}
	
	// Update energy.
	if (this.state != SLEEP) {
		this.energy -=  World.energyDrainRate * deltaMs;
	}

	switch(this.state) {
		case "IDLE":
			if (this.energy <= 0) {
				this.state = "MOVE_TO_SLEEP";
				var building = World.getClosestUnoccupiedBuilding(this.platterPosition);
			
				this.goalPlatterPosition = building.platterPosition;
				this.goalObject = building;
			} else {
				this.state = "MOVE_TO_BUILD_SITE";
				this.goalPlatterPosition = World.getBuildPosition();
			}
			break;
		case "MOVE_TO_BUILD_SITE":
			if (this.platterPosition == this.goalPlatterPosition) {
				var building = World.initBuilding(self);
				this.goalObject = building;
				this.state = "BUILD";
			}
			break;
		case "BUILD":
			break;
		case "MOVE_TO_SLEEP":
			if (this.platterPosition == this.goalPlatterPosition) {
				this.goalObject.occupy(self);
				this.state = "SLEEP";
			}
			break;
		case "SLEEP":
			this.energy +=  this.goalObject.energyChargeRate * deltaMs;
			if (this.energy >= this.maxEnergy) {
				this.goalObject.unoccupy(this);
				this.state = "IDLE";
			}
			break;
		case "PANIC":
			break;
	}
};