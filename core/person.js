

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
	this.density = 0.1;
	this.height = 3;
    this.width = 3;
    this.shape = "BOX";
	this.color = 0xff3333;
	this.alpha = 0;
	this.categoryBits = 0x0004;
	this.maskBits = 0x0001;
	this.platterPosition = 0;
	this.moveSpeed = 25.0;
	this.maxEnergy = 5.0;
	this.energy = 5.0;
	this.state = "IDLE";
	this.goalPlatterPosition = null;
	this.goalObject = null;
    this.lastMoveDirection = 0;
    this.z = 1;
	this.screamTickCounter = 0;

    this.texture = Turtles.Person.prototype.personTexture;
    this.animFrameCount = 8;
    this.animFrameLength = 150;
};


Turtles.Person.prototype = new Turtles.GameEntity();

Turtles.Person.prototype.constructor = Turtles.Person;

Turtles.Person.prototype.buildComplete = function(building) {
    this.addToSimulationAt(building.x, building.y + this.height);
};

Turtles.Person.prototype.addToSimulationAt = function(x, y) {
    Turtles.GameEntity.prototype.addToSimulationAt.call(this, x, y);
    this.state = "IDLE";
	this.goalObject = null;
    this.x = x;
    this.y = y;
    this.init();
    this.goalPlatterPosition = null;
    this.lastMoveDirection = 0;
};

Turtles.Person.prototype.removeFromSimulation = function() {
    Turtles.GameEntity.prototype.removeFromSimulation.call(this);

    this.goalPlatterPosition = null;
    this.lastMoveDirection = 0;
};

Turtles.Person.prototype.isOnTerrain = function() {
    var list = this.physicsBody.GetContactList();
    
    while (list) {
        if (list.other === World.platter.physicsBody) {
            return true;
        }
        
        list = list.next;
    }
    
    return false;
};


Turtles.Person.prototype.checkForSleepState = function() {
    var result = false;
    if (this.energy <= 0) {
        var building = World.getClosestUnoccupiedBuilding(this.platterPosition);
        
        if (building) {
            this.state = "MOVE_TO_SLEEP";
            this.goalPlatterPosition = building.platterPosition;
            this.goalObject = building;
            
            result = true;
        }
    }
    
    return result;
};

Turtles.Person.prototype.update = function(deltaMs) {
    if (this.checkForDeath()) {
        return;
    }
    if (this.isInSimulation) {
        Turtles.GameEntity.prototype.update.call(this, deltaMs);

        this.platterPosition = World.getPlatterPosition(this.x, this.y);
        
		if (this.screamTickCounter > 0)
		{
			this.screamTickCounter++;
			this.screamTickCounter = this.screamTickCounter % 300;
		}
		
        // Check for panic/exiting panic.
        if (this.isOnTerrain(this)) {
            if (this.state == "PANIC") {
                this.state = "IDLE";
                this.goalPlatterPosition = null;
                this.lastMoveDirection = 0;
            }
        } else {
			if (this.screamTickCounter === 0)
			{
				SoundManager.playDeathSound();
				this.screamTickCounter++;
			}
            this.state = "PANIC";
            this.goalPlatterPosition = null;
        }
	}
    // Update energy.
	if (this.state != "SLEEP") {
		this.energy -=  World.energyDrainRate * deltaMs;
	}
    var direction = 0;
    
    switch(this.state) {
        case "PANIC":
        case "SLEEP":
        case "BUILD":
            break;
        case "MOVE_TO_BUILD_SITE":
            this.checkForSleepState();
        default:
            if (this.goalPlatterPosition) {
                var dirToGoal = this.goalPlatterPosition - this.platterPosition;
                direction = dirToGoal > 0 ? 1 : -1;
            }
            break;
    }
    

	switch(this.state) {
		case "IDLE":
            if (!this.checkForSleepState()) {
                this.state = "MOVE_TO_BUILD_SITE";
                this.goalPlatterPosition = World.getBuildPosition();
                // console.log("move to build site");
            }
			break;
		case "MOVE_TO_BUILD_SITE":
            if ((this.platterPosition == this.goalPlatterPosition) || (this.lastMoveDirection != direction && this.lastMoveDirection != 0)) {
                var building = null;
				var building = World.initBuilding(this);
                if (building) {
                    this.goalObject = building;
                    this.state = "BUILD";
                    this.removeFromSimulation();
                    // console.log("building");
                } else {
                    // We can't build anymore, wait for further commands... or just try to build another next iteration, whatever floats your boat.
                    this.state = "IDLE";
                }
            }
			break;
		case "BUILD":
			break;
		case "MOVE_TO_SLEEP":
            if ((this.platterPosition == this.goalPlatterPosition) || (this.lastMoveDirection != direction && this.lastMoveDirection != 0)) {
				this.goalObject.occupy(this);
				this.state = "SLEEP";
                this.removeFromSimulation();
                // console.log("Entered sleep");
            }
			break;
		case "SLEEP":
			this.energy +=  this.goalObject.energyChargeRate * deltaMs;
			if (this.energy >= this.maxEnergy) {
                this.goalObject.unoccupy(this);
            }
			break;
		case "PANIC":
			break;
	}
    switch(this.state) {
        case "PANIC":
        case "SLEEP":
        case "BUILD":
            break;
        default:
            if (this.goalPlatterPosition) {
                this.lastMoveDirection = direction;
                var vector = new b2Vec2(direction * this.moveSpeed, 0);
                
                this.physicsBody.SetLinearVelocity(vector);
            }
            break;
    }
};

Turtles.Person.prototype.personTexture = THREE.ImageUtils.loadTexture('textures/personStrip.png');
