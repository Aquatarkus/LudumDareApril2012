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
    
    // turtles all the way down
    this.turtles = [];

    // effects placed by the player
    this.effects = [];
    this.selectedEffect = Turtles.Meteor;
    // for multi-step effects (e.g. meteors; placed on screen, then a second click deploys)
    this.pendingEffect = null;
    
    // How long it takes, in ms, for a building to be built or iterate to the next level.
    this.buildTimePerLevel = 500;
	
	// How long it takes, in ms, for a single unit of energy to be drained from a person.
    this.energyDrainRate = 0.01;
    
    this.maxPeople = 20;
    this.maxBuildings = 50;
	this.pWorld = null;
    this.minWorldX = -1000;
    this.minWorldY = -1000;
    this.maxWorldX = 1000;
    this.maxWorldY = 1000;
    this.peopleQueue = [];

    this.playerScore = 0;
    // primes make the counter go crazy
    this.scoreValuePerBuildingPerTick = 100129;
    this.scoreValuePerLivingPersonPerTick = 111641;
    this.scoreValuePerBuildingConstruction = 611953;

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
        
        // turtles all the way down
        var turtleCount = 10;
        for (var i = 1; i <= turtleCount; i++)
        {
            var downTurtle = new Turtles.Turtle();
            downTurtle.x = 0;
            downTurtle.y = -62*i;
            downTurtle.init();
            this.turtles.push(downTurtle);
        }
        
		//init platter
		this.platter = new Turtles.Platter();
		this.platter.x = 0;
		this.platter.y = this.turtle.height;
        this.platter.init();
		this.platter.initFulcrumJoint();
		this.platter.terrain = [];
    
        Turtles.Person.prototype.personTexture = THREE.ImageUtils.loadTexture('textures/personStrip.png', {}, function() {
            for (var peopleSpawn = 0; peopleSpawn < 20; peopleSpawn++) {
                var person = new Turtles.Person();
                person.platterPosition = Math.random();
                World.initOnPlatter(person, World.people);
            }
        });
        
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
		
		SoundManager.playChillMusic();
	},
	
    constructor: Turtles.World,

    energyDrainRate: 0.01,

    isOnTerrain: function(position) {
        // todo
        return true;
    },
    
    getPlatterPosition: function(x, y) {
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
        
		var newPerson = this.peopleQueue.pop();
        if (newPerson) {
            newPerson.x = x;
            newPerson.y = y;
            newPerson.platterPosition = World.getPlatterPosition(x, y);
            newPerson.destroy = false;
            
            World.initOnPlatter(newPerson, World.people);
		}
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
    
    initOnPlatter: function(newPlatterObject, arrayToAdd) {
        var platterVector = World.getCoordinatesFromPlatterPosition(newPlatterObject.platterPosition, World.platter.height);
        newPlatterObject.x = platterVector.x + newPlatterObject.width;
        newPlatterObject.y = platterVector.y + newPlatterObject.height;
        newPlatterObject.init();
        newPlatterObject.mesh.rotation.z = newPlatterObject.physicsBody.m_rotation = World.platter.physicsBody.m_rotation;
        arrayToAdd.push(newPlatterObject);
    },

	// Instantiate a building and assign the builder.
	initBuilding: function(person) {
		var building = new Turtles.Building();
		building.platterPosition = person.goalPlatterPosition;
        World.initOnPlatter(building, this.buildings);
		building.build(person);
        
		return building;
	},

    scorePanelElement: document.getElementById('scorePanel'),
    scoreDisplayElement: document.getElementById('scoreDisplay'),
    scorePanelPeopleCountDisplayElement: document.getElementById('scorePanelPeopleCount'),
    scorePanelBuildingCountDisplayElement: document.getElementById('scorePanelBuildingCount'),

    updateScore: function() {
        // calculate score delta
        var scoreDelta = 
              this.scoreValuePerBuildingPerTick * this.buildings.length
            + this.scoreValuePerLivingPersonPerTick * this.people.length;

        this.increaseScore(scoreDelta);
    },

    increaseScore: function(points) {
        this.playerScore += points;

        this.scoreDisplayElement.innerText = this.playerScore;
        this.scorePanelPeopleCountDisplayElement.innerText = this.people.length;
        this.scorePanelBuildingCountDisplayElement.innerText = this.buildings.length;
    },

    update: function() {
		//update physics
		var stepping = false;
		this.pWorld.Step(1.0/60.0, 1);
	
        this.platter.update(this.stepLength);
        this.turtle.update(this.stepLength);
        
        // terrain
        for (var i = 0; i < this.terrain.length; i++)
        {
            var terrainPiece = this.terrain[i];
            terrainPiece.update(this.stepLength);
            
        }
        
        // turtles
        for (var i = 0; i < this.turtles.length; i++)
        {
            var turtle = this.turtles[i];
            turtle.update(this.stepLength);
            
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

        this.updateScore();
        this.destroyCrap(this.terrain);
        this.destroyCrap(this.people, this.peopleQueue);
        this.destroyCrap(this.effects);
        this.destroyCrap(this.buildings);

		//Re-adjust the music
		if (this.effects.length === 0 && this.platter.isStableish){
			SoundManager.playChillMusic();
		}
    },
    
    destroyCrap: function(array, queue) {
        for (var i = array.length - 1; i >= 0; i--) {
            if (array[i].destroy) {
                array[i].removeFromSimulation();
                if (queue) {
                    queue.push(array[i]);
                }
                array.splice(i, 1);
            }
        }
    },
    removeJoint : function(joint)
    {
        joint.m_body1.gameEntity.removeJoint(joint);
        joint.m_body2.gameEntity.removeJoint(joint);
        this.pWorld.DestroyJoint(joint);
    },
    removeJoints : function(gameEntity)
    {
        // deep tokes
        var joints = gameEntity.joints;
        for (var i = joints.length-1; i >= 0; --i)
        {
            var joint = joints[i];
            this.removeJoint(joint);
        }
    },
    addJoint : function(entityA, anchorA, entityB, anchorB)
    {
        // roll it
        var jointDef = new b2DistanceJointDef();
        jointDef.body1 = entityA.physicsBody;
        jointDef.body2 = entityB.physicsBody;
        jointDef.collideConnected = true; // bump and grind
        jointDef.anchorPoint1 = anchorA;
        jointDef.anchorPoint2 = anchorB;
        
        // light it
        var joint = World.pWorld.CreateJoint(jointDef);
        
        entityA.addJoint(joint);
        entityB.addJoint(joint);
    }
};


