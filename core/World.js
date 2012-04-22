Turtles.World = function() {
    this.turtle = null;
    this.platter = null;
	this.fulcrumJoint = null;

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
    this.energyDrainRate = 500.0;
	
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
		var gravity = new b2Vec2(0, -300);
		var doSleep = true;
		this.pWorld = new b2World(worldAABB, gravity, doSleep);
		
        // Init turtle
        this.turtle = new Turtles.Turtle();
        this.turtle.x = 0;
        this.turtle.y = 0;
        this.turtle.init();
        
        
		//init platter
		this.platter = new Turtles.Platter();
		this.platter.x = 0;
		this.platter.y = this.turtle.height;
        this.platter.init();
		
        //init seed person
        var person = new Turtles.Person();
        person.x = 0;
        person.y = 150;
        person.init();
        
        this.people.push(person);
        
        //init fulcrum
		var fulcrumShapeDef = new b2BoxDef();
        fulcrumShapeDef.extents.Set(1, 1);
        fulcrumShapeDef.density = 0;
		//fulcrumShapeDef.collisionCategoryBits = 0x0004;
		//fulcrumShapeDef.collisionMaskBits = 0x0002;
		fulcrumShapeDef.groupIndex = -2;
		var fulcrumBodyDef = new b2BodyDef();
		fulcrumBodyDef.AddShape(fulcrumShapeDef);
		fulcrumBodyDef.position.Set(0, this.turtle.height/4);
		var fulcrumBody = this.pWorld.CreateBody(fulcrumBodyDef);
		
		//join platter to fulcrum.
		var fulcrumJointDef = new b2RevoluteJointDef();
		fulcrumJointDef.body1 = this.platter.physicsBody;
		fulcrumJointDef.body2 = fulcrumBody;
		fulcrumJointDef.anchorPoint.Set(fulcrumBody.m_position.x, fulcrumBody.m_position.y);
		fulcrumJointDef.lowerAngle = -Math.PI / 6;
		fulcrumJointDef.upperAngle = Math.PI / 6;
		fulcrumJointDef.enableLimit = true;
		this.pWorld.CreateJoint(fulcrumJointDef);
	},
	
    constructor: Turtles.World,

    isOnTerrain: function(position) {
        // todo
        return true;
    },
    
    getPlatterPosition: function(x, y) {
        /*
        var geometry = new THREE.Geometry();
        geometry.vertices.push(new THREE.Vertex(World.platter.mesh.position));
        geometry.vertices.push(new THREE.Vertex(World.platter.mesh.matrix.multiplyVector3(new THREE.Vector3(100, 0, 0))));
        var material = new THREE.MeshBasicMaterial({color: 0xff33ff, wireframe:true });
        var debugline = new THREE.Line(geometry, material);
        turtlesUI.addObject(debugline);
        */
        //World.platter.mesh.position
        var vectorAligned = World.platter.mesh.matrix.multiplyVector3(new THREE.Vector3(1, 0, 0));
        var vectorComp = new THREE.Vector3();
        vectorComp.sub(vectorAligned, World.platter.mesh.position);
        var vectorPosition = new THREE.Vector3(x, y, 0);
        
        // Get x position along plane of the platter.
        var result = vectorComp.dot(vectorPosition);
        
        // Convert to a 0-1 range, with 0 = -width and 1 = width.
        return result / World.platter.width;
        
    },
    
    getCoordinatesFromPlatterPosition: function(platterPosition) {
        var realRelativePosition = platterPosition * World.platter.width;
        
        var worldVector = World.platter.mesh.matrix.multiplyVector3(new THREE.Vector3(realRelativePosition, 0, 0));
        
        return worldVector;
    },
    
	createBuilding:function(coords) {
        var x = coords.x;
        var y = coords.y;
		var newBuilding = new Turtles.Building();
		
		newBuilding.x = x;
		newBuilding.y = y;
		//$TODO Need method to get platter position from xy global coords
		newBuilding.platterPosition = World.getPlatterPosition(x, y);
        newBuilding.init();
		newBuilding.levelUp();
		
		this.buildings.push(newBuilding);
		
		return newBuilding;
	},
	
	createPerson: function(x, y) {
		var newPerson = new Turtles.Person();
		
		newPerson.x = x;
		newPerson.y = y;
		//$TODO Need method to get platter position from xy global coords
		newPerson.platterPosition = World.getPlatterPosition(x, y);
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
	
	// Forget it, we need speed.  Get a random building.  It's not in order, so this algorithm will essentially be random.
    // it'll be closest if we bother to sort the list after every frame... which I don't know if we want to do.
	getClosestUnoccupiedBuilding: function(platterPosition) {
        var lastValidBuilding = null;
        
		// Iterate through the buildings, looking for the two closest ones... and then compare them
		// for the true closest.
		for(var buildingIndex = 0; buildingIndex < this.buildings.length; buildingIndex++) {
			var building = this.buildings[buildingIndex];
			
			if (building.occupiers.length >= building.maxOccupancy || !building.isBuilt) {
				continue;
			}
			
			var position = building.platterPosition - platterPosition;
			
			// If the position is > 0, we've passed the actual platter position.  Check this and
			// the last building we saw to see which is closer, and use that.
			if (position > 0) {
				if (lastValidBuilding) {
					var lastPosDiff = Math.abs(lastValidBuilding.platterPosition - platterPosition);
					var posDiff = Math.abs(building.platterPosition - platterPosition);
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
		
		building.platterPosition = person.goalPlatterPosition;
        var platterVector = World.getCoordinatesFromPlatterPosition(building.platterPosition);
        building.x = platterVector.x;
        building.y = platterVector.y;
        building.init();
		building.build(person);
        
        this.buildings.push(building);
		
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
        this.turtle.update(this.stepLength);
        
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
