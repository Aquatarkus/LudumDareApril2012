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
    this.cameraNear = -100;
    this.cameraFar = 100;
    this.cameraFrame = {x:0, y:0, width:1, height:cameraHeight};
    
    // ray casting
    this.projector = new THREE.Projector();
    this.ray = new THREE.Ray();
    this.objects = [];
    this.clickableObjects = [];
    
    // scene
    this.scene = new THREE.Scene();
    
    // camera
    this.camera = new THREE.OrthographicCamera(-1,1,-1,1,this.cameraNear,this.cameraFar);
    this.scene.add(this.camera);
    
    // starfield
    var starCount = 1000;
    var starGeometry = new THREE.Geometry();
    var starMaterial = new THREE.ParticleBasicMaterial(
    {
        color: 0xffffff
    });
    for (var i = 0; i < starCount; i++)
    {
        var starX = Math.random()*1000-500;
        var starY = Math.random()*1000-500;
        var starZ = -40;
        var star = new THREE.Vertex(new THREE.Vector3(starX, starY, starZ));
        starGeometry.vertices.push(star);
    }
    
    var starSystem = new THREE.ParticleSystem(starGeometry, starMaterial);
    // starSystem.sortParticles = true;
    this.addObject(starSystem);
    
    // renderer
    this.renderer = new THREE.WebGLRenderer();
    
    this.resize(width, height);
    
    this.onClick = function(worldCoords){};
    this.onMove = function(worldCoords, oldWorldCoords){};
    
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
    removeObject: function(object)
    {
        var index = this.clickableObjects.indexOf(object);
        if (index > -1) {
            this.clickableObjects.splice(index, 1);
        }
        index = this.objects.indexOf(object);
        if (index > -1) {
            this.objects.splice(index, 1);
        }
        this.scene.remove(object);
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
            worldCoords.push({x:cameraX, y:cameraY});
        }
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
    castRay : function(coords)
    {
        var ray = this.ray;
        ray.origin.set(coords.x, coords.y, 100);
        ray.direction.set(0, 0, -1);
        var intersections = ray.intersectObjects(this.clickableObjects);
        Log.debug('castRay counts', {clickable:this.clickableObjects.length, intersects: intersections.length});
        Log.debug('castRay ray', ray);
        return intersections;
    },
    moveCamera : function(coords)
    {
        this.cameraFrame.x -= coords.x;
        this.cameraFrame.y -= coords.y;
        this.updateCamera();
    },
    scaleCamera : function(scaleFactor)
    {
        this.cameraFrame.width *= scaleFactor;
        this.cameraFrame.height *= scaleFactor;
        this.updateCamera();
    },
    registerOnClickWorld : function(onClick)
    {
        this.onClick = onClick;
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
        
        /*
        var deltaWorldCoords = {};
        deltaWorldCoords.x = worldCoords[0].x - oldWorldCoords[0].x;
        deltaWorldCoords.y = worldCoords[0].y - oldWorldCoords[0].y;
        
        turtlesUI.moveCamera(deltaWorldCoords);
        */
        
        turtlesUI.onMove(worldCoords[0], oldWorldCoords[0]);
        
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
    
    // if(!mouseDidMove)
    // {
    //     turtlesUI.onClick(worldCoords[0]);
    // }

    if (World.spawner) {
        World.spawner.spawn();
    } else {
        World.setSpawner(new Turtles.MeteorSpawner(worldCoords[0]));
    }

    mouseIsDown = false;
    mouseDidMove = false;
    oldEventCoords.length = 0;
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

function animate()
{
	requestAnimationFrame(animate);
    World.update();
    turtlesUI.draw();
	stats.update();
}

animate();
