Turtles.World = function() {
    this.turtle = null;
    this.platter = null;

    this.gravity = 0.098;

    // for update/render calls
    this.stepLength = 1000.0 / 60.0;

    this.people = [];

    this.buildings = [];

    // effects placed by the player
    this.effects = [];
    
    // How long it takes, in ms, for a building to be built or iterate to the next level.
    this.buildTimePerLevel =  1000;
	
	// How long it takes, in ms, for a single unit of energy to be drained from a person.
    this.energyDrainRate = 500;
	
	this.pWorld = null;
};


Turtles.World.prototype = {
	init: function(){
		// Initial creation of physics objects for world, ground, and platter
		var gameIsDirty = true;
		
		//Init pWorld
		var worldAABB = new b2AABB();
		worldAABB.minVertex.Set(-1000, -1000);
		worldAABB.maxVertex.Set(1000, 1000);
		var gravity = new b2Vec2(0, 300);
		var doSleep = true;
		this.pWorld = new b2World(worldAABB, gravity, doSleep);
		
		//init ground
		var groundSd = new b2BoxDef();
		groundSd.extents.Set(2000, 10);
		groundSd.restitution = 0.2;
		var groundBd = new b2BodyDef();
		groundBd.AddShape(groundSd);
		groundBd.position.Set(-1000, 500);
		this.pWorld.CreateBody(groundBd);
		
        // Init turtle
        this.turtle = new Turtles.Turtle();
        this.turtle.x = 0;
        this.turtle.y = 0;
        this.turtle.init();
        
        
		//init platter
		this.platter = new Turtles.Platter();
		this.platter.x = -500;
		this.platter.y = 100;
        this.platter.init();
		
        
	},
	
    constructor: Turtles.World,

    energyDrainRate: 0.01,

    isOnTerrain: function(position) {
        // todo
        return true;
    },
    
	createBuilding:function(x, y) {
		var newBuilding = new Turtles.Building();
		
		newBuilding.x = x;
		newBuilding.y = y;
		//$TODO Need method to get plate position from xy global coords
		//newBuilding.platterPosition = PhysicsEngine.GetPlatterPosition(x, y);
        newBuilding.init();
		newBuilding.levelUp();
		
		this.buildings.push(newBuilding);
		
		return newBuilding;
	},
	
	createPerson: function(x, y) {
		var newPerson = new Turtles.Person();
		
		newPerson.x = x;
		newPerson.y = y;
		//$TODO Need method to get plate position from xy global coords
		//newBuilding.platterPosition = PhysicsEngine.GetPlatterPosition(x, y);
		newPerson.init();
        
		this.people.push(newPerson);
		
		return newPerson;
	},
	
	// Checks whether the given actor is actually on the terrain, or whether they're
	// flipping wildly through the air.  
	// $TODO - Do this once we have physics a bit more fleshed out.
	isOnTerrain: function(actor) {
		return true;
	},
	
	// Get the closest building that does not yet have full occupancy, if one can be found.
	getClosestUnoccupiedBuilding: function(platePosition) {
		var lastValidBuilding = null;
		
		// Iterate through the buildings, looking for the two closest ones... and then compare them
		// for the true closest.
		for(var buildingIndex = 0; buildingIndex < this.buildings.length; buildingIndex++) {
			var building = this.buildings[buildingIndex];
			
			if (building.occupiers.length >= building.maxOccupancy || !building.isBuilt) {
				continue;
			}
			
			var position = building.platePosition - platePosition;
			
			// If the position is > 0, we've passed the actual plate position.  Check this and
			// the last building we saw to see which is closer, and use that.
			if (position > 0) {
				if (lastValidBuilding) {
					var lastPosDiff = Math.abs(lastValidBuilding.platePosition - platePosition);
					var posDiff = Math.abs(building.platePosition - platePosition);
					lastValidBuilding = (lastPosDiff > posDiff) ? building : lastValidBuilding;
				} else {
					lastValidBuilding = building;
				}
				break;
			}
			
			lastValidBuilding = building;
		}
		
		return lastValidBuilding;
	},

	// Get a reasonable, yet randomized, build position.
	// $HACK - This is a temporary placeholder for first iteration.  Subsequent iterations
	//			could likely make this a function of the person, taking some sort of internal 
	//			preferences into account for example.  But fuck that for now.
	//		Note that, conveniently, Math.random returns a number between 0 and 1.  How nice is that?
	getBuildPosition : function() {
		return Math.random();
	},

	// Instantiate a building and assign the builder.
	initBuilding: function(person) {
		//$TODO - How are we going to initialize the new physics objects we need?  I think
		//		  World is going to need some kind of method to initiate generic physics objects, or
		//		  Actors need the responsibility.
		var building = new Turtles.Building();
		
		building.platePosition = person.goalPosition;
		building.build(person);
		
		var foundPosition = false;
		
		for (var sortedBuildingIndex = 0; sortedBuildingIndex < this.buildings.length; sortedBuildingIndex++) {
			var compareBuilding = this.buildings[sortedBuildingIndex];
			
			if (compareBuilding.platePosition > building.platePosition) {
				this.buildings.splice(sortedBuildingIndex, 0, building);
				foundPosition = true;
				break;
			}
		}
		
		if (!foundPosition) {
			this.buildings.push(building);
		}
		
		return building;
	},

    checkWinState: function() {
        return false;
    },

    update: function() {
		//update physics
		var stepping = false;
		this.pWorld.Step(1.0/60.0, 1);
	
        this.platter.update(this.stepLength);
        
        // people
        for (var i = 0; i < this.people.length; i++) {
            this.people[i].update(this.stepLength);
        }

        // effects
        for (var i = 0; i < this.effects.length; i++) {
            this.effects[i].update(this.stepLength);
        }

        // buildings
        for (var i = 0; i < this.buildings.length; i++) {
            this.buildings[i].update(this.stepLength);
        }
    }
	
};
