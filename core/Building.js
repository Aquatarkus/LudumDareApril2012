
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
	self.buildCompleteOn = 0;
	self.isBuilt = false;
	self.level = 0;
	self.buildTimeElapsed = 0;
	
	// Occupency properties
	self.occupiers = [];
	self.maxOccupancy = 1;
	
	// Recharge properties
	self.energyChargeRate = 1.0;
	
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

Turtles.Building.prototype.unoccupy = function(person) {
	var index = self.occupiers.indexOf(person);
	if (index > -1) {
		self.occupiers.splice(index, 1);
	}
};

Turtles.Building.prototype.build = function(person) {
	self.builder = person;
	self.buildTimeElapsed = 0;
	self.buildCompleteOn = self.level * World.buildTimePerLevel;
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
	if (self.builder) {
		self.builder.buildComplete(self);
	}
	self.isBuilt = true;
	self.level++;
	// $HACK - For now, perform simple additive leveling up.  We can customize this later.
	self.maxOccupancy++;
	self.energyChargeRate++;
	self.mass++;
	
	self.builder = null;
};
