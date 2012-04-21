Turtles.World = function() {
    self = this;
    self.turtle = new Turtles.Turtle();
    self.platter = new Turtles.Platter();

    self.gravity = 0.098;

    // for update/render calls
    self.stepLength = 1000.0 / 60.0;

    self.people = [];

    self.buildings = [];

    // effects placed by the player
    self.effects = [];

    // physics objects (no AI interaction)
    self.actors = [];
    
    // How long it takes, in ms, for a building to be built or iterate to the next level.
    self.buildTimePerLevel =  1000;
	
	// How long it takes, in ms, for a single unit of energy to be drained from a person.
    self.energyDrainRate = 500;
	
	self.pWorld = null;
};


Turtles.World.prototype = {
	init: function(){
		var gameIsDirty = true;
		self.actors = new Array();
		
		//Init pWorld
		var worldAABB = new b2AABB();
		worldAABB.minVertex.Set(-1000, -1000);
		worldAABB.maxVertex.Set(1000, 1000);
		var gravity = new b2Vec2(0, 300);
		var doSleep = true;
		self.pWorld = new b2World(worldAABB, gravity, doSleep);
		
		//init ground
		var groundSd = new b2BoxDef();
		groundSd.extents.Set(2000, 10);
		groundSd.restitution = 0.2;
		var groundBd = new b2BodyDef();
		groundBd.AddShape(groundSd);
		groundBd.position.Set(-1000, 500);
		self.pWorld.CreateBody(groundBd);
		
		//init platter
		var platterSd = new b2BoxDef();
		platterSd.extents.Set(1000, 50);
		platterSd.density = 1.0;
		var platterBd = new b2BodyDef();
		platterBd.AddShape(platterSd);
		platterBd.position.Set(-500, 100);
		var platterBody = self.pWorld.CreateBody(platterBd);
		self.actors.push(new Actor(platterBody, platterMesh));
	},
    constructor: Turtles.World,

    energyDrainRate: 0.01,

    isOnTerrain: function(position) {
        // todo
        return true;
    },
    
	createObject:function(x, y) {
		//$TODO
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
		for(var buildingIndex = 0; buildingIndex < self.buildings.length; buildingIndex++) {
			var building = self.buildings[buildingIndex];
			
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
		
		for (var sortedBuildingIndex = 0; sortedBuildingIndex < self.buildings.length; sortedBuildingIndex++) {
			var compareBuilding = self.buildings[sortedBuildingIndex];
			
			if (compareBuilding.platePosition > building.platePosition) {
				self.buildings.splice(sortedBuildingIndex, 0, building);
				foundPosition = true;
				break;
			}
		}
		
		if (!foundPosition) {
			self.buildings.push(building);
		}
		
		return building;
	},

    checkWinState: function() {
        return false;
    },

    update: function() {
		//update physics
		var stepping = false;
		self.pWorld.Step(1.0/60.0, 1);
	
        self.platter.update(self.stepLength);
        
        // people
        for (var i = 0; i < self.people.length; i++) {
            self.people[i].update(self.stepLength);
        }

        // effects
        for (var i = 0; i < self.effects.length; i++) {
            self.effects[i].update(self.stepLength);
        }

        // actors
        for (var i = 0; i < self.actors.length; i++) {
            self.actors[i].update(self.stepLength);
        }

        // buildings
        for (var i = 0; i < self.buildings.length; i++) {
            self.buildings[i].update(self.stepLength);
        }
    }
	
};
