// WebToWRenderer.js
// by John Shaffstall

var LudumDareElement = document.getElementById('LudumDareElement');
var gameElement = document.getElementById('gameElement');
var debugElement = document.getElementById('debugElement');
var feedbackElement = document.getElementById('feedbackElement');

var Stats = Stats || {};
var THREE = THREE || {};

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

var gameCamera = new THREE.PerspectiveCamera(gameFoV, gameAR, 10, 1000);
// game camera
var gameFoV = 70;
var gameAR = window.innerWidth / window.innerHeight;
var gameCameraRadius = 200;
var gameCameraTheta = 0.1;
var gameCameraPhi = 0.1;
var gameThetaRotateFactor = 0.01, gamePhiRotateFactor = 0.01;
var gameCameraThetaRotateFactor = 0.01, gameCameraPhiRotateFactor = 0.01;
gameCamera.lookAt(new THREE.Vector3(0,0,0));

// game renderer
var gameRenderer = new THREE.WebGLRenderer();
gameRenderer.setSize(window.innerWidth, window.innerHeight);
gameElement.appendChild(gameRenderer.domElement);

// game scene
var gameScene = new THREE.Scene();
gameScene.add(gameCamera);

// fps counter
stats = new Stats();
stats.domElement.style.position = 'absolute';
stats.domElement.style.top = '0px';
LudumDareElement.appendChild( stats.domElement );

// tiny world
var tinyWorldGeometry = new THREE.SphereGeometry(50.0, 50, 50);
var tinyWorldMaterial = new THREE.MeshBasicMaterial({color:0x00ff00, opacity: 1.0, wireframe:true});
var tinyWorldMesh = new THREE.Mesh(tinyWorldGeometry, tinyWorldMaterial);
tinyWorldMesh.position.set(0,0,0);
gameScene.add(tinyWorldMesh);

// platter
var platterGeometry = new THREE.CubeGeometry(200, 1, 200)
var platterMaterial = new THREE.MeshBasicMaterial({color:0x7f3f1f});
var platterMesh = new THREE.Mesh(platterGeometry, platterMaterial);
platterMesh.position.set(0, 50, 0);
gameScene.add(platterMesh);

// sun
var sunLight = new THREE.Light(1.0);

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
gameScene.add( planeObject );
var gameCameraTarget = planeObject;

var actors;
var pWorld;

function init(){
	var gameIsDirty = true;
	actors = new Array();
	
	//Init pWorld
	var worldAABB = new b2AABB();
	worldAABB.minVertex.Set(-1000, -1000);
	worldAABB.maxVertex.Set(1000, 1000);
	var gravity = new b2Vec2(0, 300);
	var doSleep = true;
	pWorld = new b2World(worldAABB, gravity, doSleep);
	
	//init ground
	var groundSd = new b2BoxDef();
	groundSd.extents.Set(2000, 10);
	groundSd.restitution = 0.2;
	var groundBd = new b2BodyDef();
	groundBd.AddShape(groundSd);
	groundBd.position.Set(-1000, 500);
	pWorld.CreateBody(groundBd);
	
	//init platter
	var platterSd = new b2BoxDef();
	platterSd.extents.Set(1000, 50);
	platterSd.density = 1.0;
	var platterBd = new b2BodyDef();
	platterBd.AddShape(platterSd);
	platterBd.position.Set(-500, 100);
	var platterBody = pWorld.CreateBody(platterBd);
	actors.push(new Actor(platterBody, platterMesh));
}


// Game Camera Controls
function updateGameCamera()
{
    gameCamera.position.x = gameCameraRadius * Math.cos(gameCameraTheta);
    gameCamera.position.z = gameCameraRadius * Math.sin(gameCameraTheta);
    gameCamera.position.y = gameCameraRadius * Math.sin(gameCameraPhi);
    gameCamera.lookAt(gameCameraTarget.position);
}

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

function update()
{
	//update physics
	var stepping = false;
	pWorld.Step(1.0/60.0, 1);
	
	//update graphics
	var actorLen = actors.length;
	var i;
    for (i = 0; i < actorLen; i++){
		var actor = actors[i];
		actor.update();
	}
}

function animate()
{
    requestAnimationFrame(animate);
    update();
    gameRenderer.render(gameScene, gameCamera);
    stats.update();
};

init();
animate();
updateGameCamera();
