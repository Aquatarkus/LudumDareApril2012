Turtles.World = function() {
    this.turtle = null;
    this.platter = null;
	this.fulcrumJoint = null;

    this.gravity = 0.098;

    // for update/render calls
    this.stepLength = 1000.0 / 60.0;

    this.people = [];

    this.buildings = [];
    
    // additions to the terrain
    this.terrain = [];

    // effects placed by the player
    this.effects = [];
    this.selectedEffect = Turtles.Meteor;
    // for multi-step effects (e.g. meteors; placed on screen, then a second click deploys)
    this.pendingEffect = null;
    
    // How long it takes, in ms, for a building to be built or iterate to the next level.
    this.buildTimePerLevel = 1500;
	
	// How long it takes, in ms, for a single unit of energy to be drained from a person.
    this.energyDrainRate = 500.0;
    
    this.maxPeople = 20;
    this.maxBuildings = 50;
	this.pWorld = null;
    this.minWorldX = -1000;
    this.minWorldY = -1000;
    this.maxWorldX = 1000;
    this.maxWorldY = 1000;
};


Turtles.World.prototype = {
	init: function(){
		// Initial creation of physics objects for world, ground, and platter
		var gameIsDirty = true;
		
		//Init pWorld
		var worldAABB = new b2AABB();
		worldAABB.minVertex.Set(this.minWorldX, this.minWorldY);
		worldAABB.maxVertex.Set(this.maxWorldX, this.maxWorldY);
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
		this.platter.initFulcrumJoint();
		this.platter.terrain = [];
		
        setTimeout(function() {
            //init seed person
            var person = new Turtles.Person();
            person.platterPosition = 0.5;
            World.initOnPlatter(person);
            World.people.push(person);
        }, 1000);
	},
	
    constructor: Turtles.World,

    energyDrainRate: 0.01,

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
        
        return (result + World.platter.width) / (World.platter.width * 2);
        
    },
    
    getCoordinatesFromPlatterPosition: function(platterPosition, heightAbovePlatter) {
        if (!heightAbovePlatter) {
            heightAbovePlatter = 0;
        }
        var realRelativePosition = (platterPosition * (World.platter.width * 2)) - World.platter.width;
        
        var worldVector = World.platter.mesh.matrix.multiplyVector3(new THREE.Vector3(realRelativePosition, heightAbovePlatter, 0));
        
        return worldVector;
    },

	createBuilding:function(coords) {
        var x = coords.x;
        var y = coords.y;
		var newBuilding = new Turtles.Building();
		
		newBuilding.x = x;
		newBuilding.y = y;
		newBuilding.platterPosition = World.getPlatterPosition(x, y);
        newBuilding.init();
		newBuilding.levelUp();
		
		this.buildings.push(newBuilding);
		
		return newBuilding;
	},
	
	createPerson: function(x, y) {
        // Don't make any more people if we've hit our limit.
        if (this.people.length >= this.maxPeople) {
            return null;
        }
        
		var newPerson = new Turtles.Person();
		
		newPerson.x = x;
		newPerson.y = y;
		newPerson.platterPosition = World.getPlatterPosition(x, y);
		newPerson.init();
        
		this.people.push(newPerson);

		return newPerson;
	},

    createEffect: function(coords) {
        var newEffect = new this.selectedEffect();

        newEffect.x = coords.x;
        newEffect.y = coords.y;
        newEffect.init();

        newEffect.physicsBody.SetLinearVelocity(new b2Vec2(0, -300));

        this.effects.push(newEffect);

        return newEffect;
    },

    setSpawner: function(spawner) {
        this.spawner = spawner;
    },

	// Checks whether the given actor is actually on the terrain, or whether they're
	// flipping wildly through the air.  
	// $TODO - Do this once we have physics a bit more fleshed out.
	isOnTerrain: function(actor) {
		return true;
	},
	
	// Forget it, we need speed.  Get a random building.  It's not in order, so this algorithm will essentially be random.
    // it'll be closest if we bother to sort the list after every frame... which I don't know if we want to do.
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
    
    initOnPlatter: function(newPlatterObject) {
        var platterVector = World.getCoordinatesFromPlatterPosition(newPlatterObject.platterPosition, World.platter.height);
        newPlatterObject.x = platterVector.x + newPlatterObject.width;
        newPlatterObject.y = platterVector.y + newPlatterObject.height;
        newPlatterObject.init();
        newPlatterObject.mesh.rotation.z = newPlatterObject.physicsBody.m_rotation = World.platter.physicsBody.m_rotation;
    },

	// Instantiate a building and assign the builder.
	initBuilding: function(person) {
		//$TODO - How are we going to initialize the new physics objects we need?  I think
		//		  World is going to need some kind of method to initiate generic physics objects, or
		//		  Actors need the responsibility.
		var building = new Turtles.Building();
		building.platterPosition = person.goalPlatterPosition;
        World.initOnPlatter(building);
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
        
        /*
        for (var contact = this.platter.physicsBody.GetContactList(); contact; contact = contact.GetNext())
        {
            var platter = this.platter;
            if (platter.terrain.indexOf(contact) > -1)
            {
                platter.terrain.push(contact);
                var jointDef = new b2DistanceJointDef();
                jointDef.body1 = platter;
                jointDef.body2 = contact;
                jointDef.collideConnected = true; // bump and grind
                jointDef.anchorPoint1 = platter.m_position;
                jointDef.anchorPoint2 = contact.m_position;
                
                // roll it
                World.pWorld.CreateJoint(jointDef);
                
                // light it
            }
        }
        */
        // terrain
        for (var i = 0; i < this.terrain.length; i++)
        {
            var terrainPiece = this.terrain[i];
            terrainPiece.update(this.stepLength);
            
        }
        
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

        if (this.spawner) {
            this.spawner.update(this.stepLength);
        }
        
        for (var i = this.terrain.length; i >= 0; i--) {
            if (this.destroy) {
                this.terrain
            }
        }
        
        this.destroyCrap(this.terrain);
        this.destroyCrap(this.people);
        this.destroyCrap(this.effects);
        this.destroyCrap(this.buildings);
    },
    
    destroyCrap: function(array) {
        for (var i = array.length - 1; i >= 0; i--) {
            if (array[i].destroy) {
                array[i].removeFromSimulation();
                array.splice(i, 1);
            }
        }
    }
	
};


