

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
	var self = this;
	
	this.isPhysicsSimulated = false,
	this.density = 1.0;
	this.width = 0.07;
	this.length = 0.1;
	this.shape = "CIRCLE";
	this.color = 0xffffff;
	this.alpha = 0;
	
	self.platterPosition = 0;
	self.moveSpeed = 5.0;
	self.maxEnergy = 5.0;
	self.energy = 5.0;
	self.state = "IDLE";
	self.goalPlatterPosition = 0;
	self.goalObject = null;
};

Turtles.Person.prototype = new Turtles.GameEntity();

Turtles.Person.prototype.constructor = Turtles.Person;

Turtles.Person.prototype.buildComplete = function(building) {
	self.state = "IDLE";
	self.goalObject = null;
};

Turtles.Person.prototype.update = function(deltaMs) {
	// Check for panic/exiting panic.
	if (World.isOnTerrain(self)) {
		if (self.state == "PANIC") {
			self.state = "IDLE";
		}
	} else {
		self.state = "PANIC";
	}
	
	// Update energy.
	if (self.state != SLEEP) {
		self.energy -=  World.energyDrainRate * deltaMs;
	}

	switch(self.state) {
		case "IDLE":
			if (self.energy <= 0) {
				self.state = "MOVE_TO_SLEEP";
				var building = World.getClosestUnoccupiedBuilding(self.platterPosition);
			
				self.goalPlatterPosition = building.platterPosition;
				self.goalObject = building;
			} else {
				self.state = "MOVE_TO_BUILD_SITE";
				self.goalPlatterPosition = World.getBuildPosition();
			}
			break;
		case "MOVE_TO_BUILD_SITE":
			if (self.platterPosition == self.goalPlatterPosition) {
				var building = World.initBuilding(self);
				self.goalObject = building;
				self.state = "BUILD";
			}
			break;
		case "BUILD":
			break;
		case "MOVE_TO_SLEEP":
			if (self.platterPosition == self.goalPlatterPosition) {
				self.goalObject.occupy(self);
				self.state = "SLEEP";
			}
			break;
		case "SLEEP":
			self.energy +=  self.goalObject.energyChargeRate * deltaMs;
			if (self.energy >= self.maxEnergy) {
				self.goalObject.unoccupy(this);
				self.state = "IDLE";
			}
			break;
		case "PANIC":
			break;
	}
};