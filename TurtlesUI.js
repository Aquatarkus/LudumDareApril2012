
// TurtlesUI.js
// LudumDare420

var TurtleElement = document.getElementById('TurtleElement');
var gameElement = document.getElementById('gameElement');
var debugElement = document.getElementById('debugElement');
var feedbackElement = document.getElementById('feedbackElement');

var Stats = Stats || {};
var THREE = THREE || {};
var Turtles = Turtles || {};
var World = World || {};

var Log = 
{
    debug : function(tag, message)
    {
        var log = '(DEBUG) '+ tag + ': ' + JSON.stringify(message);
        console.log(log);
        debugElement.innerHTML = log;
    },
    feedback : function(message)
    {
        console.log('(FEEDBACK) ' + message);
        feedbackElement.innerHTML = message;
    },
    error : function(tag, message)
    {
        var log = '(Error) '+ tag + ': ' + JSON.stringify(message);
        console.log(log);
        debugElement.innerHTML = log;
    },
    event : function(tag, message)
    {
        var log = '(EVENT) ' + tag + ': ' + JSON.stringify(message);
        console.log(log);
        debugElement.innerHTML = log;
    }
};

Turtles.UI = function(element, width, height, cameraHeight)
{
    // camera bounds
    this.cameraNear = -50;
    this.cameraFar = 50;
    this.cameraFrame = {x:0, y:0, width:1, height:cameraHeight};
    
    // ray casting
    this.projector = new THREE.Projector();
    this.ray = new THREE.Ray();
    this.objects = [];
    this.clickableObjects = [];
    
    // scene
    this.scene = new THREE.Scene();
    
    // camera
    this.camera = new THREE.OrthographicCamera(-1,1,-1,1,-50,50);
    this.scene.add(this.camera);
    
    // renderer
    this.renderer = new THREE.WebGLRenderer();
    
    this.resize(width, height);
    
    // DOM
    element.appendChild(this.renderer.domElement);
    var canvas = this.renderer.domElement;
    
    // register for document events
    canvas.addEventListener( 'mousedown' , onMouseDown, false );
    canvas.addEventListener( 'mousemove' , onMouseMove, false );
    canvas.addEventListener( 'mouseup'   , onMouseUp  , false );
    canvas.addEventListener( 'touchstart', onTouchDown, false );
    canvas.addEventListener( 'touchmove' , onTouchMove, false );
    canvas.addEventListener( 'touchend'  , onTouchUp  , false );
    canvas.addEventListener( 'touchcancel', onTouchUp , false );
};

Turtles.UI.prototype = 
{
    constructor : Turtles.UI,
    addObject : function(object)
    {
        this.objects.push(object);
        this.scene.add(object);
        
        Log.debug('TurtleUI addObject position', object.position);
    },
    addClickableObject : function(clickableObject)
    {
        this.clickableObjects.push(clickableObject);
        this.addObject(clickableObject);
    },
    show : function()
    {
        this.renderer.domElement.style.display = 'block';
    },
    hide : function()
    {
        this.renderer.domElement.style.display = 'none';
    },
    resize : function(width, height)
    {
        // renderer
        this.width = width;
        this.height = height;
        this.renderer.setSize(this.width, this.height);
        
        Log.debug('Turtles.UI resize', {width:width, height:height});
        
        // camera
        var aspectRatio = this.width/this.height;
        this.cameraFrame.width = aspectRatio * this.cameraFrame.height;
        this.updateCamera();
    },
    updateCamera : function()
    {
        // adjust the camera
        var frame = this.cameraFrame;
        var scale = this.cameraScale;
        var scaledWidthHalf = frame.width/2;
        var scaledHeightHalf = frame.height/2;
        
        var camera = this.camera;
        camera.left   = frame.x - scaledWidthHalf;
        camera.right  = frame.x + scaledWidthHalf;
        camera.bottom = frame.y - scaledHeightHalf;
        camera.top    = frame.y + scaledHeightHalf;
        camera.near   = this.cameraNear;
        camera.far    = this.cameraFar;
        
        this.cameraIsDirty = true;
    },
    getWorldCoords : function(eventCoords)
    {
        var worldCoords = [];
        for (var i = 0; i < eventCoords.length; i++)
        {
            var coords = eventCoords[i];
            xCoord = coords.x;
            yCoord = coords.y;
            // percent into the screen
            var percentWidth = xCoord/this.width-0.5;
            var percentHeight = 0.5-yCoord/this.height;
            var cameraFrame = this.cameraFrame;
            var cameraX = percentWidth  * cameraFrame.width + cameraFrame.x;
            var cameraY = percentHeight * cameraFrame.height + cameraFrame.y;
            Log.debug('percentWidth/Height', {width:percentWidth, height:percentHeight});
            worldCoords.push({x:cameraX, y:cameraY});
        }
        Log.debug('getWorldCoords', worldCoords);
        return worldCoords;
    },
    draw : function()
    {
        if (this.cameraIsDirty)
        {
            this.camera.updateProjectionMatrix();
            this.cameraIsDirty = false;
        }
        this.renderer.render(this.scene, this.camera);
    },
    castRay : function(xCoord, yCoord)
    {
        var ray = this.ray;
        var percentWidth = xCoord/this.width-0.5;
        var percentHeight = 0.5-yCoord/this.height;
        var cameraX = percentWidth * this.cameraFrame.width/this.cameraScale + this.cameraFrame.x;
        var cameraY = percentHeight * this.cameraFrame.height/this.cameraScale + this.cameraFrame.y;
        Log.debug('castRay percents', {x:percentWidth, y:percentHeight});
        Log.debug('castRay cameraX, cameraY', {x:cameraX, y:cameraY});
        // this.projector.unprojectVector(ray.origin.set(cameraX, cameraY, this.cameraNear), this.camera);
        // this.projector.unprojectVector(ray.direction.set(0, 0, -1), this.camera);
        ray.origin.set(cameraX, cameraY, this.cameraNear);
        ray.direction.set(0, 0, -1);
        var intersections = ray.intersectObjects(this.clickableObjects);
        return intersections;
    },
    moveCamera : function(deltaX, deltaY)
    {
        this.cameraFrame.x -= deltaX;
        this.cameraFrame.y += deltaY;
        this.updateCamera();
    },
    scaleCamera : function(scaleFactor)
    {
        this.cameraFrame.width *= scaleFactor;
        this.cameraFrame.height *= scaleFactor;
        this.updateCamera();
    }
};

var turtlesUI = new Turtles.UI(gameElement, window.innerWidth, window.innerHeight, 200);

var mouseIsDown = false;
var touchIsDown = false;
var mouseDidMove = false;
var oldEventCoords = [];

// register for window events
window.addEventListener('resize', onWindowResize, false);
window.addEventListener('DOMMouseScroll', onMouseScroll, false);
window.onmousewheel = document.onmousewheel = onMouseScroll;

function getEventCoords(event)
{
    var eventCoords = [];
    if (event.clientX && event.clientY)
    {
        eventCoords.push({x:event.clientX, y:event.clientY});
    }
    else if (event.touches && event.touches.length > 0)
    {
        for (var i in event.touches)
        {
            var touch = event.touches[i];
            eventCoords.push({x:touch.pageX, y:touch.pageY});
        }
    }
    return eventCoords;
}

function onMouseScroll(event)
{
    var delta = 0;
    if (!event) event = window.event;
    if (event.wheelDelta)
    {
        delta = event.wheelDelta/120; 
    }
    else if (event.detail)
    {
        delta = -event.detail/3;
    }
    Log.event('onMouseScroll', 'delta = '+delta);
    if (delta)
    {
        turtlesUI.scaleCamera(1-delta/100);
    }
}

function onMouseDown(event)
{
    event.preventDefault();
    oldEventCoords = getEventCoords(event);
    Log.event('onMouseDown', oldEventCoords);
    mouseIsDown = true;
    mouseDidMove = false;
}

function onMouseMove(event)
{
    if (mouseIsDown)
    {
        event.preventDefault();
        var eventCoords = getEventCoords(event);
        // Log.event('onMouseMove', eventCoords);
        
        var oldWorldCoords = turtlesUI.getWorldCoords(oldEventCoords);
        var worldCoords = turtlesUI.getWorldCoords(eventCoords);
        var deltaX = worldCoords[0].x - oldWorldCoords[0].x;
        var deltaY = worldCoords[0].y - oldWorldCoords[0].y;
        
        turtlesUI.moveCamera(deltaX, -deltaY);
        
        oldEventCoords = eventCoords;
        mouseDidMove = true;
    }
}

function onMouseUp(event)
{
    event.preventDefault();
    var eventCoords = getEventCoords(event);
    Log.event('onMouseUp', eventCoords);
    
    var worldCoords = turtlesUI.getWorldCoords(eventCoords);
	World.createBuilding(worldCoords[0]);
    
    mouseIsDown = false;
    mouseDidMove = false;
    oldEventCoords.length = 0;
}

// WorldObject
// shape (box or circle)
// position
// length
// width
function spawnObject(worldObject)
{

}   

function spawnMeteor(position, velocity)
{
    // spawn meteor
    var meteorShapeDef = new b2CircleDef();
    meteorShapeDef.radius = 5;
    meteorShapeDef.density = 1.0;
    var meteorBodyDef = new b2BodyDef();
    meteorBodyDef.AddShape(meteorShapeDef);
    meteorBodyDef.position.Set(position.x, position.y);
    var meteorBody = pWorld.CreateBody(meteorBodyDef);
    var meteorActor = new Actor(meteorBody);
    actors.push(meteorActor);
    
    var meteorMesh = meteorActor.mesh;
    turtlesUI.addClickableObject(meteorMesh);
}

function onTouchDown(event)
{
    // Log.event('onTouchDown', "");
    event.preventDefault();
    var eventCoords = getEventCoords(event);
    Log.event('onTouchDown', eventCoords);
    touchIsDown = true;
    oldEventCoords = eventCoords;
}

function onTouchMove(event)
{
    if (touchIsDown)
    {
        event.preventDefault();
        var eventCoords = getEventCoords(event);
        
        switch (eventCoords.length)
        {
            case 1:
                // one-touch camera pan
                var deltaX = eventCoords[0].x - oldEventCoords[0].x;
                var deltaY = eventCoords[0].y - oldEventCoords[0].y;
                turtlesUI.moveCamera(deltaX, deltaY);
                break;
            case 2:
                // $TODO two-touch camera scale
                break;
            default:
                // nothing
        }
        oldEventCoords = eventCoords;
    }
}

function onTouchUp(event)
{
    event.preventDefault();
    var eventCoords = getEventCoords(event);
    Log.event('onTouchUp', eventCoords);
    
    // $TODO determine if any touches are left
    touchIsDown = false;
    oldEventCoords.length = 0;
}

function onWindowResize()
{
    turtlesUI.resize(window.innerWidth, window.innerHeight);
}

// fps counter
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
TurtlesElement.appendChild( stats.domElement );

// light
var ambientLight = new THREE.AmbientLight(0x7f7f7f);
turtlesUI.addObject(ambientLight);

// sun
var sunLight = new THREE.PointLight(0xffffff, 1);
sunLight.position.set(-100, 200, 0);
turtlesUI.addObject(sunLight);

var renderer = turtlesUI.renderer;
var scene = turtlesUI.scene;
var camera = turtlesUI.camera;

var World = new Turtles.World();
World.init();


function animate() {
	requestAnimationFrame(animate);
    World.update();
    turtlesUI.draw();
	stats.update();
}

animate();

/*
function addTexturedCube()
{
	//Add a cube body.
	var cubeWidth = 16;
	var cubeSd = new b2BoxDef();
	cubeSd.extents.Set(cubeWidth, cubeWidth);
	cubeSd.density = 4.0;
	var cubeBd = new b2BodyDef();
	cubeBd.AddShape(cubeSd);
	cubeBd.position.Set(-100, 300);
	var cubeBody = pWorld.CreateBody(cubeBd);
    cubeActor = new Actor(cubeBody);
	
	//We have to create a mesh from scratch beacuse of how the CubeGeometry object works.
    var buildingTexture = THREE.ImageUtils.loadTexture('./textures/building0.png');
	var buildingMaterial = new THREE.MeshBasicMaterial({map: buildingTexture});
	var otherSideMaterials = new THREE.MeshBasicMaterial({color: 0xF20A4C});
	var materials = [
		otherSideMaterials,
		otherSideMaterials,
		otherSideMaterials,
		otherSideMaterials,
		buildingMaterial, //Positive Z face materialis in position 4.
		otherSideMaterials];
	var cubeMesh = new THREE.Mesh(new THREE.CubeGeometry(cubeWidth, cubeWidth, 10, 1, 1, 1, materials), new THREE.MeshFaceMaterial());
	cubeActor.mesh = cubeMesh
	turtlesUI.addClickableObject(cubeMesh);
	
	actors.push(cubeActor);
}

addTexturedCube();
*/
