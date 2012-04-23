
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

Turtles.BuildingTexture = THREE.ImageUtils.loadTexture('textures/Building3.png');


Turtles.Building = function() {
    Turtles.GameEntity.call(this);

    this.platterPosition = 0;
	// Build properties
	this.builder = null;
	this.isBuilt = false;
	this.level = 0;
	this.buildTimeElapsed = 0;
	this.friction = .5;
    this.categoryBits = 0x0008;
	this.maskBits = 0xfffd;
    
	// Occupency properties
	this.occupiers = [];
	this.maxOccupancy = 1;
	
	// Recharge properties
	this.energyChargeRate = 1.0;

    // Custom physics properties
    this.densityPerFloor = 1.0;
    this.lengthPerFloor = 1.0;

	// GameEntity properties
	this.density = 0.2;
    this.width = 3.0;
    this.height = 3.0;
    this.shape = 'BOX';
    this.x = 0.0;
    this.y = 0.0;
    this.color = 0x0000ff;
    this.alpha = 1.0;
    
    this.texture = Turtles.BuildingTexture;
};

Turtles.Building.prototype = new Turtles.GameEntity();
Turtles.Building.prototype.constructor = Turtles.Building;


Turtles.Building.prototype.init = function() {
    Turtles.GameEntity.prototype.init.call(this);
    
    this.physicsBody.m_friction = 99;
};

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
    person.addToSimulationAt(this.x, this.y + person.height);
};

Turtles.Building.prototype.build = function(person) {
    this.occupiers.push(person);
    this.builder = person;
	this.buildTimeElapsed = 0;
    this.level = 1;
    this.isBuilt = false;
};

Turtles.Building.prototype.update = function(timeElapsedInMs) {
    if (this.checkForDeath()) {
        return;
    }
    
    Turtles.GameEntity.prototype.update.call(this, timeElapsedInMs);
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
    World.increaseScore(World.scoreValuePerBuildingConstruction);
    
    if (this.builder) {
        this.builder.buildComplete(this);
    }
    
    // Make a new person for the successful building/upgrade effort.
    var newPerson = World.createPerson(this.x, this.y);
    
    if (newPerson) {
        this.onSpawnOccupant(newPerson);
    }
    
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

Turtles.Building.prototype.onSpawnOccupant = function(person) {
    person.state = 'SLEEP';
    person.energy = 0.0;
    person.removeFromSimulation();
    person.goalObject = this;
    this.occupiers.push(person);
};
