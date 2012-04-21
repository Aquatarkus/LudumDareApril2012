

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
		.buildRate : float
		.isOnTerrain(b2Vec2) : RETURN bool
		.getClosestUnoccupiedBuilding(platePosition) : RETURN Turtles.Building
		.getBuildPosition() : RETURN platePosition
		.initBuilding(Turtles.Person) : RETURN Turtles.Building
	Turtles.Building
		.occupier : reference to Turtles.Person, or null if unoccupied (reference to Person, or null if no occupier)
		.platePosition
		.buildStartAtTime
		.isBuilt
		.occupy(Turtles.Position) : Has person occupy building
		.unoccupy() : Removes occupier
*/



var Turtles.Person = function(platePosition) {
	var self = this;
	self.platePosition = platePosition;
	self.shape = shape;
	self.moveSpeed = 5.0;
	self.maxEnergy = 5.0;
	self.energy = 5.0;
	self.state = "IDLE";
	self.goalPosition = platePosition;
	self.goalObject = null;
};

Turtles.Person.prototype = {
	update: function(deltaMs) {
		// Check for panic/exiting panic.
		if (Turtles.World.isOnTerrain(self.shape.GetPosition())) {
			if (self.state == "PANIC") {
				self.state = "IDLE";
			}
		} else {
			self.state = "PANIC";
		}
		
		// Update energy.
		if (self.state != SLEEP) {
			self.energy -=  Turtles.World.energyDrainRate * deltaMs;
		}
	
		switch(self.state) {
			case "IDLE":
				if (self.energy <= 0) {
					self.state = "MOVE_TO_SLEEP";
					var building = Turtles.World.getClosestUnoccupiedBuilding(self.platePosition);
				
					self.goalPosition = building.platePosition;
					self.goalObject = building;
				} else {
					self.state = "MOVE_TO_BUILD_SITE";
					self.goalPosition = Turtles.World.getBuildPosition();
				}
				break;
			case "MOVE_TO_BUILD_SITE":
				if (self.platePosition == self.goalPosition) {
					var building = Turtles.World.initBuilding(self);
					self.goalObject = building;
					self.state = "BUILD";
				}
				break;
			case "BUILD":
				break;
			case "MOVE_TO_SLEEP":
				if (self.platePosition == self.goalPosition) {
					self.goalObject.occupy(self);
					self.state = "SLEEP";
				}
				break;
			case "SLEEP":
				self.energy +=  Turtles.World.energyDrainRate * deltaMs;
				if (self.energy >= self.maxEnergy) {
					self.goalObject.unoccupy();
					self.state = "IDLE";
				}
				break;
			case "PANIC":
				break;
		}
	}
};

