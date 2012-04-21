
/*

	.occupy(Turtles.Position) : Has person occupy building
	.unoccupy() : Removes occupier
	
	Buildings can:
		- Be built by people
		- Recharge people's energy
		- be upgraded by people
		- house people
	Buildings have:
		- maxOccupancy (increases by upgrade)
		- mass (increases by upgrade?)
		- level (increases by upgrade)
		- energyChargeRate (increases by upgrade)
		
		- platePosition
		- shape
		- buildStartAtTime
		- isBuilt
		- occupiers

*/


Turtles.Building = function() {
    Turtles.GameEntity.call(this);

    var self = this;
	self.platePosition = 0;
	// Build properties
	self.builder = null;
	self.buildCompleteOn = 0;
	self.isBuilt = false;
	self.level = 1.0;
	self.buildTimeElapsed = 0;
    
	// Occupency properties
	self.occupiers = [];
	self.maxOccupancy = 1;
	
	// Recharge properties
	self.energyChargeRate = 1.0;

    // Custom physics properties
    self.densityPerFloor = 1.0;

	// GameEntity properties
	self.density = 1.0;
    self.width = 1.0;
    self.length = 1.0;
    self.shape = 'BOX';
    self.x = 0.0;
    self.y = 0.0;
    self.color = 0x0000ff;
    self.alpha = 1.0;
};

Turtles.Building.prototype = new Turtles.GameEntity();

Turtles.Building.prototype.occupy = function(person) {
    self.occupiers.push(person);
};

Turtles.Building.prototype.hasVacancy = function() {
    return self.occupiers.length < self.maxOccupancy;
};

Turtles.Building.prototype.unoccupy = function(person) {
	var index = self.occupiers.indexOf(person);
	if (index > -1) {
		self.occupiers.splice(index, 1);
	}
};

Turtles.Building.prototype.build = function(person) {
    self.occupiers.add(person);
    self.builder = person;
	self.buildTimeElapsed = 0;
	self.buildCompleteOn = self.level * World.buildTimePerLevel;
    self.level = 1;
    self.isBuilt = false;
};

Turtles.Building.prototype.update = function(timeElapsedInMs) {
	if (!self.isBuilt) {
		self.buildTimeElapsed += timeElapsedInMs;
		
		// Check if building is complete.
		if (self.buildTimeElapsed >= self.buildCompleteOn) {
			self.levelUp();
		}
	}
};

Turtles.Building.prototype.levelUp = function() {
    // building complete; builder leaves
    self.builder.buildComplete(self);
	self.isBuilt = true;
	self.level++;

    // after the first level, occupancy grows by two
    if (self.level == 1) {
        self.maxOccupancy += 2;
    } else {
        self.maxOccupancy++;
    }

	self.energyChargeRate++;

    self.density += self.densityPerFloor;

	self.builder = null;
};

Turtles.Building.prototype.spawnPerson = function() {
    var person = World.createPerson(self.x, self.y);
    person.state = 'SLEEP';
    person.energy = 0.0;
    self.occupiers.push(person);
};
