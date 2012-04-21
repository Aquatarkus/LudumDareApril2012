Turtles.World = function() {
};

Turtles.World.prototype = {
	self = this,
	
    constructor: Turtles.World,

    // for update/render calls
    stepLength: 1000.0 / 60.0,

    energyDrainRate: 0.01,

    isOnTerrain: function(position) {
        // todo
        return true;
    },
    
    gravity: 0.098,

    people: [],

    buildings: [],

    plate: null,

    turtle: null,

    // effects placed by the player
    effects: [],

    // physics objects (no AI interaction)
    actors: [],
	
	// How long it takes, in ms, for a building to be built or iterate to the next level.
	buildTimePerLevel:  1000,
	
	// How long it takes, in ms, for a single unit of energy to be drained from a person.
	energyDrainRate : 500,
	
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
        // people
        for (var i in people) {
            people[i].update(stepMilliseconds);
        }

        // effects
        for (var i in effects) {
            effects[i].update(stepMilliseconds);
        }

        // actors
        for (var i in actors) {
            actors[i].update(stepMilliseconds);
        }

        // buildings
        for (var i in buildings) {
            buildings[i].update(stepMilliseconds);
        }
    }

};
