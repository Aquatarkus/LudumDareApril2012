// LudumDareEvents.js

var gameElement = document.getElementById('gameElement');
var debugElement = document.getElementById('debugElement');
var feedbackElement = document.getElementById('feedbackElement');

var mouseIsDown = false;
var touchIsDown = false;
var oldEventCoords = [];

// register for document events
document.addEventListener( 'mousedown' , onMouseDown, false );
document.addEventListener( 'mousemove' , onMouseMove, false );
document.addEventListener( 'mouseup'   , onMouseUp  , false );
document.addEventListener( 'touchstart', onTouchDown, false );
document.addEventListener( 'touchmove' , onTouchMove, false );
document.addEventListener( 'touchend'  , onTouchUp  , false );
document.addEventListener( 'touchcancel', onTouchUp , false );

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
        // $TODO zoome game camera
        // zoomGameCamera(1-delta/100);
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
        
        rotateGameCamera(eventCoords[0].x, eventCoords[0].y);
        
        oldEventCoords = eventCoords;
    }
}

function onMouseUp(event)
{
    event.preventDefault();
    var eventCoords = getEventCoords(event);
    Log.event('onMouseUp', eventCoords);
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
        // Log.event('onTouchMove', eventCoords);
        
        rotateGameCamera(eventCoords[0].x, eventCoords[0].y);
        
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
    // Adjust the game
    gameRenderer.setSize( window.innerWidth, window.innerHeight);
    gameCamera.aspect	= window.innerWidth / window.innerHeight;
    gameCamera.updateProjectionMatrix();
    gameIsDirty = true;
}
