// WebToWRenderer.js
// by John Shaffstall

var LudumDareElement = document.getElementById('LudumDareElement');
var gameElement = document.getElementById('gameElement');
var debugElement = document.getElementById('debugElement');
var feedbackElement = document.getElementById('feedbackElement');

var Stats = Stats || {};
var THREE = THREE || {};
var Turtle = Turtle || {};

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

Turtle.UI = function()
{
    var gameRenderer = new THREE.WebGLRenderer();
    gameRenderer.setSize(window.innerWidth, window.innerHeight);
    gameElement.appendChild(gameRenderer.domElement);
};

Turtle.UI = function(element, width, height, cameraHeight)
{
    // camera bounds
    this.cameraNear = -50;
    this.cameraFar = 50;
    this.cameraFrame = {x:0, y:0, width:1, height:1};
    this.cameraScale = 1;
    
    // ray casting
    this.projector = new THREE.Projector();
    this.ray = new THREE.Ray();
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
    
    canvas.addEventListener( 'mousedown' , onMouseDown, false );
    canvas.addEventListener( 'mousemove' , onMouseMove, false );
    canvas.addEventListener( 'mouseup'   , onMouseUp  , false );
    canvas.addEventListener( 'touchstart', onTouchDown, false );
    canvas.addEventListener( 'touchmove' , onTouchMove, false );
    canvas.addEventListener( 'touchend'  , onTouchUp  , false );
    canvas.addEventListener( 'touchcancel', onTouchUp , false );
};

Turtle.UI.prototype = 
{
    constructor : Turtle.UI,
    addObject : function(object)
    {
        this.objects.push(object);
        this.scene.add(object);
    },
    addClickableObject : function(clickableObject)
    {
        this.clickableObjects.push(clickableObjects);
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
        this.width = width || window.innerWidth;
        this.height = height || 100;
        this.renderer.setSize(this.width, this.height);
        
        // camera
        var aspectRatio = this.width/this.height;
        this.cameraFrame.width = aspectRatio * this.cameraFrame.height;
        this.updateCamera();
    },
    updateCamera : function()
    {
        // adjust the camera
        var camera = this.camera;
        var frame = this.cameraFrame;
        camera.left = frame.x - frame.width/2;
        camera.right = frame.x + frame.width/2;
        camera.bottom = frame.y - frame.height/2;
        camera.top = frame.y + frame.height/2;
        this.cameraIsDirty = true;
    },
    draw : function()
    {
        if (this.cameraIsDirty)
        {
            this.camera.updateProjectionMatrix();
        }
        this.renderer.render(this.scene, this.camera);
    },
    castRayForObjects : function(xCoord, yCoord)
    {
        var ray = this.ray;
        this.projector.unprojectVector(ray.origin.set(xCoord, yCoord, this.cameraNear), this.camera);
        this.projector.unprojectVector(ray.target.set(xCoord, yCoord, this.CameraFar) , this.camera);
        var intersections = ray.intersectObjects(this.objects);
        return intersections;
    },
    moveCamera : function(deltaX, deltaY)
    {
        this.cameraFrame.x += deltaX;
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

var turtleUI = new Turtle.UI(gameElement, window.innerWidth, window.innerHeight, 200);


// fps counter
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
LudumDareElement.appendChild( stats.domElement );

// turtle
var turtleGeometry = new THREE.SphereGeometry(50.0, 50, 50);
var turtleMaterial = new THREE.MeshPhongMaterial(
{
    ambient:0x7f3f1f,
    color: 0x00ff00, 
    specular: 0x009900, 
    shininess: 30, 
    shading: THREE.SmoothShading, 
});
var turtleMesh = new THREE.Mesh(turtleGeometry, turtleMaterial);
turtleMesh.position.set(0,0,0);
turtleUI.addClickableObject(turtleMesh);

// platter
var platterGeometry = new THREE.CubeGeometry(200, 1, 200)
var platterMaterial = new THREE.MeshBasicMaterial({color:0x7f3f1f});
var platterMesh = new THREE.Mesh(platterGeometry, platterMaterial);
platterMesh.position.set(0, 50, 0);
turtleUI.addClickableObject(platterMesh);

// light
var ambientLight = new THREE.AmbientLight(0x7f7f7f);
turtleUI.addObject(ambientLight);

// sun
var sunLight = new THREE.PointLight(0xffffff, 1);
sunLight.position.set(-100, 200, 0);
turtleUI.addObject(sunLight);

// plane
var planeGeometry = new THREE.CubeGeometry( 10, 0, 10 );
var planeObject = new THREE.Mesh( planeGeometry, new THREE.MeshBasicMaterial( { color: 0xffffff, opacity: 1.0, wireframe: true } ) );
planeObject.position.x = 0;
planeObject.position.y = 0;
planeObject.position.z = 0;
planeObject.scale.x = 1;
planeObject.scale.y = 1;
planeObject.scale.z = 1;
planeObject.rotation.x = 0;
planeObject.rotation.y = 0;
planeObject.rotation.z = 0;
turtleUI.addObject( planeObject );

function rotateGameCamera(xCoord, yCoord)
{
    var xCoordOld = oldEventCoords[0].x;
    var yCoordOld = oldEventCoords[0].y;
    var deltaX = xCoord - xCoordOld;
    var deltaY = yCoord - yCoordOld;
    
    gameCameraTheta = gameCameraTheta + deltaX * gameCameraThetaRotateFactor;
    gameCameraPhi = gameCameraPhi + deltaY * gameCameraPhiRotateFactor;
    if (gameCameraPhi > Math.PI/2)
    {
        gameCameraPhi = Math.PI/2;
    }
    else if (gameCameraPhi < -Math.PI/2)
    {
        gameCameraPhi = -Math.PI/2;
    }
    updateGameCamera();
}

function animate()
{
    requestAnimationFrame(animate);
    update();
    gameCamera.updateProjectionMatrix();
    gameRenderer.render(gameScene, gameCamera);
    stats.update();
};

animate();
