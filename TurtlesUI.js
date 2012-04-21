// TurtlesUI.js
// LudumDare420

var TurtleElement = document.getElementById('TurtleElement');
var gameElement = document.getElementById('gameElement');
var debugElement = document.getElementById('debugElement');
var feedbackElement = document.getElementById('feedbackElement');

var Stats = Stats || {};
var THREE = THREE || {};
var Turtles = Turtles || {};

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
    this.cameraScale = 1;
    
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
    this.renderer = new THREE.CanvasRenderer();
    
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
        var scaledWidthHalf = scale * frame.width;
        var scaledHeightHalf = scale * frame.height;
        
        var camera = this.camera;
        camera.left   = frame.x - scaledWidthHalf;
        camera.right  = frame.x + scaledWidthHalf;
        camera.bottom = frame.y - scaledHeightHalf;
        camera.top    = frame.y + scaledHeightHalf;
        camera.near   = this.cameraNear;
        camera.far    = this.cameraFar;
        
        this.cameraIsDirty = true;
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
    window2cameraCoords : function(xCoord, yCoord)
    {

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
        this.cameraScale *= scaleFactor;
        Log.debug('scaleCamera', {cameraScale: this.cameraScale});
        this.updateCamera();
    }
};

var turtlesUI = new Turtles.UI(gameElement, window.innerWidth, window.innerHeight, 200);

var mouseIsDown = false;
var touchIsDown = false;
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
}

function onMouseMove(event)
{
    if (mouseIsDown)
    {
        event.preventDefault();
        var eventCoords = getEventCoords(event);
        // Log.event('onMouseMove', eventCoords);
        
        var deltaX = eventCoords[0].x - oldEventCoords[0].x;
        var deltaY = eventCoords[0].y - oldEventCoords[0].y;
        
        turtlesUI.moveCamera(deltaX, deltaY);
        
        oldEventCoords = eventCoords;
    }
}

function onMouseUp(event)
{
    event.preventDefault();
    var eventCoords = getEventCoords(event);
    Log.event('onMouseUp', eventCoords);
    
    var intersections = turtlesUI.castRay(eventCoords[0].x, eventCoords[0].y);
    Log.debug('onMouseUp intersections count', intersections.length);
    
    mouseIsDown = false;
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

// turtle
var turtleGeometry = new THREE.SphereGeometry(50.0, 20.0, 20.0);
var turtleMaterial = new THREE.MeshBasicMaterial({color:0x00ff00});
var turtleMesh = new THREE.Mesh(turtleGeometry, turtleMaterial);
turtleMesh.position.set(0,0,0);
turtlesUI.addClickableObject(turtleMesh);

// platter
var platterGeometry = new THREE.CubeGeometry(200, 10, 200)
var platterMaterial = new THREE.MeshBasicMaterial({color:0x7f3f1f});
var platterMesh = new THREE.Mesh(platterGeometry, platterMaterial);
platterMesh.position.set(0, 50, 0);
turtlesUI.addClickableObject(platterMesh);

// light
var ambientLight = new THREE.AmbientLight(0x7f7f7f);
turtlesUI.addObject(ambientLight);

// sun
var sunLight = new THREE.PointLight(0xffffff, 1);
sunLight.position.set(-100, 200, 0);
turtlesUI.addObject(sunLight);

// plane
var planeGeometry = new THREE.CubeGeometry( 500, 10, 500 );
var planeMaterial = new THREE.MeshBasicMaterial({color:0xffffff});
var planeObject = new THREE.Mesh(planeGeometry, planeMaterial);
planeObject.position.x = 0;
planeObject.position.y = 0;
planeObject.position.z = 0;
planeObject.scale.x = 1;
planeObject.scale.y = 1;
planeObject.scale.z = 1;
planeObject.rotation.x = 0;
planeObject.rotation.y = 0;
planeObject.rotation.z = 0;
turtlesUI.addObject( planeObject );

var renderer = turtlesUI.renderer;
var scene = turtlesUI.scene;
var camera = turtlesUI.camera;

function animate()
{
    requestAnimationFrame(animate);
    turtlesUI.draw();
    stats.update();
};

animate();
