
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
		
		- platterPosition
		- shape
		- buildStartAtTime
		- isBuilt
		- occupiers

*/


Turtles.Building = function() {
    Turtles.GameEntity.call(this);

    var self = this;
	self.platterPosition = 0;
	// Build properties
	self.builder = null;
	self.isBuilt = false;
	self.level = 0;
	self.buildTimeElapsed = 0;
    
	// Occupency properties
	self.occupiers = [];
	self.maxOccupancy = 1;
	
	// Recharge properties
	self.energyChargeRate = 1.0;

    // Custom physics properties
    self.densityPerFloor = 1.0;
    self.lengthPerFloor = 1.0;

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
Turtles.Building.prototype.constructor = Turtles.Building;


Turtles.Building.prototype.occupy = function(person) {
    this.occupiers.push(person);
};

Turtles.Building.prototype.hasVacancy = function() {
    return this.occupiers.length < this.maxOccupancy;
};

Turtles.Building.prototype.unoccupy = function(person) {
	var index = this.occupiers.indexOf(person);
	if (index > -1) {
		this.occupiers.splice(index, 1);
	}
};

Turtles.Building.prototype.build = function(person) {
    this.occupiers.push(person);
    this.builder = person;
	this.buildTimeElapsed = 0;
    this.level = 1;
    this.isBuilt = false;
};

Turtles.Building.prototype.update = function(timeElapsedInMs) {
	if (!this.isBuilt) {
		this.buildTimeElapsed += timeElapsedInMs;
		
		// Check if building is complete.
		if (this.buildTimeElapsed >= World.buildTimePerLevel) {
			this.levelUp();
		}
	}
};

Turtles.Building.prototype.levelUp = function() {
    // building complete; builder leaves
    this.builder.buildComplete(self);
	this.isBuilt = true;
	this.level++;

    // after the first level, occupancy grows by two
    if (this.level != 1) {
        this.maxOccupancy += 2;
    } else {
        this.maxOccupancy++;
    }

	this.energyChargeRate++;

    this.density += this.densityPerFloor;
    this.length += this.lengthPerFloor;

	this.builder = null;
};

Turtles.Building.prototype.spawnPerson = function() {
    var person = World.createPerson(this.x, this.y);
    person.state = 'SLEEP';
    person.energy = 0.0;
    this.occupiers.push(person);
};
