// TurtlesBuilder.js
// LudumDare420

var stateElement = document.getElementById('stateElement');

var Log = Log || {};
var Turtles = Turtles || {};

Turtles.BuilderStates = 
{
    MoveCamera : 'State: Move Camera',
    MoveObject : 'State: Move Object',
    RotateObject : 'State: Rotate Object',
    ColorObject : 'State: Color Object',
    WeldObject : 'State: Weld Object',
    UnweldObject : 'State: Unweld Object',
    DeleteObject : 'State: Delete Object',
    AddBoxTerrain : 'State: Add Box Terrain',
    AddCircleTerrain : 'State: Add Circle Terrain',
    AddTriangleTerrain : 'State: Add Triangle Terrain',
    ToggleObjectPhysics : 'State: Toggle Object Physics',
    ToggleObjectMass : 'State: Toggle Object Mass'
};

Turtles.Builder = function()
{
    this.setState(Turtles.BuilderStates.MoveCamera);
};

Turtles.Builder.prototype = 
{
    getRandomColor : function()
    {
        return Math.random() * 0xffffff;
    },
    setState : function(state)
    {
        this.state = state;
        stateElement.innerHTML = state;
    },
    addTerrainBox : function(worldCoord)
    {
        // TODO
    },
    addTerrainCircle : function()
    {
        // TODO
    },
    onClick : function(worldCoords)
    {
        switch (this.state)
        {
            case Turtles.BuilderStates.MoveCamera:
                break;
            case Turtles.BuilderStates.MoveObject:
                break;
            case Turtles.BuilderStates.ColorObject:
                var intersections = turtlesUI.castRay(worldCoords);
                for (var i = 0; i < intersections.length; i++)
                {
                    var material = intersections[i].object.material;
                    if (material.color)
                    {
                        material.color.setHex(this.getRandomColor());
                    }
                }
                break;
            case Turtles.BuilderStates.DeleteObject:
                var intersections = turtlesUI.castRay(worldCoords);
                for (var i = 0; i < intersections.length; i++)
                {
                    var gameEntity = intersections[i].object.gameEntity;
                    // World.DeleteEntity();
                }
                break;
            case Turtles.BuilderStates.WeldObject:
                // scan for intersections
                var intersections = turtlesUI.castRay(worldCoords);
                for (var i = 0; i < intersections.length; i++)
                {
                    var clickedObject = intersections[i].object;
                    var clickedEntity = clickedObject.gameEntity;
                    var clickedBody = clickedEntity.physicsBody;
                    
                    // remove all joints
                    World.removeJoints(clickedEntity);
                    
                    // add new joints
                    var contactNode = clickedBody.GetContactList();
                    while (contactNode)
                    {
                        var contact = contactNode.contact;
                        var contactBody = contact.m_shape1.m_body;
                        if (contactBody === clickedBody)
                        {
                            contactBody = contact.m_shape2.m_body;
                        }
                        var contactEntity = contactBody.gameEntity;
                        if (contactEntity)
                        {
                            var clickedAnchor = clickedBody.m_position;
                            var contactAnchor;
                            if (contactEntity != World.platter)
                            {
                                // anchor to point on platter directly below
                                contactAnchor = contactBody.m_position;
                            }
                            else
                            {
                                // center to center achor points
                                contactAnchor = contactBody.m_position;
                            }
                            World.addJoint(clickedEntity, clickedAnchor,
                                           contactEntity, contactAnchor);
                        }
                        contactNode = contactNode.next;
                    }
                    
                }
                break;
            case Turtles.BuilderStates.UnweldObject:
                // scan for intersections
                var intersections = turtlesUI.castRay(worldCoords);
                for (var i = 0; i < intersections.length; i++)
                {
                    var clickedObject = intersections[i].object;
                    var clickedEntity = clickedObject.gameEntity;
                    var clickedBody = clickedEntity.physicsBody;
                    
                    // remove all joints
                    World.removeJoints(clickedEntity);
                }
                break;
            case Turtles.BuilderStates.DeleteObject:
                break;
            case Turtles.BuilderStates.AddBoxTerrain:
                var platter = World.platter;
                var boxTerrain = new Turtles.GameEntity();
                boxTerrain.width = 5;
                boxTerrain.height = 5;
                boxTerrain.shape = "BOX";
                boxTerrain.x = worldCoords.x;
                boxTerrain.y = worldCoords.y;
                boxTerrain.init();
                World.terrain.push(boxTerrain);
                break;
            case Turtles.BuilderStates.AddCircleTerrain:
                var platter = World.platter;
                var circleTerrain = new Turtles.GameEntity();
                circleTerrain.width = 5;
                circleTerrain.height = 5;
                circleTerrain.shape = "CIRCLE";
                circleTerrain.x = worldCoords.x;
                circleTerrain.y = worldCoords.y;
                circleTerrain.init();
                World.terrain.push(circleTerrain);
                break;
            case Turtles.BuilderStates.AddTriangleTerrain:
                var triangleTerrain = new Turtles.GameEntity();
                triangleTerrain.density = 1.0;
                triangleTerrain.width = 5;
                triangleTerrain.height = 2;
                triangleTerrain.shape = "TRIANGLE";
                triangleTerrain.x = worldCoords.x;
                triangleTerrain.y = worldCoords.y;
                triangleTerrain.init();
                World.terrain.push(triangleTerrain);
                break;
            case Turtles.BuilderStates.ToggleObjectPhysics:
                var intersections = turtlesUI.castRay(worldCoords);
                for (var i = 0; i < intersections.length; i++)
                {
                    var gameEntity = intersections[i].object.gameEntity;
                    var physicsBody = gameEntity.physicsBody;
                    physicsBody.ToggleSleep();
                }
                break;
            case Turtles.BuilderStates.ToggleObjectMass:
                var intersections = turtlesUI.castRay(worldCoords);
                for (var i = 0; i < intersections.length; i++)
                {
                    var gameEntity = intersections[i].object.gameEntity;
                    var physicsBody = gameEntity.physicsBody;
                    physicsBody.ToggleMass();
                }
                break;
            default:
                break;
        }
    },
    onMove : function(worldCoords, oldWorldCoords)
    {
        // Log.debug('onMove coords',{wc:worldCoords, owc:oldWorldCoords});
        var deltaWorldCoords = {x:worldCoords.x-oldWorldCoords.x,
                                y:worldCoords.y-oldWorldCoords.y};
        switch (this.state)
        {
            case Turtles.BuilderStates.MoveCamera:
                // Log.debug('onMoveCamera', deltaWorldCoords);
                turtlesUI.moveCamera(deltaWorldCoords);
                break;
            case Turtles.BuilderStates.MoveObject:
                var intersections = turtlesUI.castRay(oldWorldCoords);
                for (var i = 0; i < intersections.length; i++)
                {
                    var gameEntity = intersections[i].object.gameEntity;
                    var physicsBody = gameEntity.physicsBody;
                    var oldPosition = physicsBody.m_position;
                    var movePosition = {x:physicsBody.m_position.x + deltaWorldCoords.x,
                                        y:physicsBody.m_position.y + deltaWorldCoords.y};
                    var moveAngle = 0;
                    physicsBody.SetCenterPosition(movePosition, moveAngle);
                }
                break;
            case Turtles.BuilderStates.ColorObject:
                break;
            case Turtles.BuilderStates.DeleteObject:
                break;
            case Turtles.BuilderStates.AddBoxTerrain:
                break;
            case Turtles.BuilderStates.AddCircleTerrain:
                var platter = World.platter;
                
                break;
            default:
                break;
        }
    }
};

var turtlesBuilder = new Turtles.Builder();

Turtles.onBuilderClick = function(worldCoords)
{
    turtlesBuilder.onClick(worldCoords);
}
turtlesUI.registerOnClickWorld(Turtles.onBuilderClick);

Turtles.onBuilderMove = function(worldCoords, oldWorldCoords)
{
    turtlesBuilder.onMove(worldCoords, oldWorldCoords);
}
turtlesUI.onMove = Turtles.onBuilderMove;

function onStateMoveCamera()
{
    turtlesBuilder.setState(Turtles.BuilderStates.MoveCamera);
}

function onStateMoveObject()
{
    turtlesBuilder.setState(Turtles.BuilderStates.MoveObject);
}

function onStateRotateObject()
{
    turtlesBuilder.setState(Turtles.BuilderStates.RotateObject);
}

function onStateColorObject()
{
    turtlesBuilder.setState(Turtles.BuilderStates.ColorObject);
}

function onStateWeldObject()
{
    turtlesBuilder.setState(Turtles.BuilderStates.WeldObject);
}

function onStateUnweldObject()
{
    turtlesBuilder.setState(Turtles.BuilderStates.UnweldObject);
}

function onStateDeleteObject()
{
    turtlesBuilder.setState(Turtles.BuilderStates.DeleteObject);
}

function onStateAddBoxTerrain()
{
    turtlesBuilder.setState(Turtles.BuilderStates.AddBoxTerrain);
}

function onStateAddCircleTerrain()
{
    turtlesBuilder.setState(Turtles.BuilderStates.AddCircleTerrain);
}

function onStateAddTriangleTerrain()
{
    turtlesBuilder.setState(Turtles.BuilderStates.AddTriangleTerrain);
}

function onStateToggleObjectPhysics()
{
    turtlesBuilder.setState(Turtles.BuilderStates.ToggleObjectPhysics);
}

function onStateToggleObjectMass()
{
    turtlesBuilder.setState(Turtles.BuilderStates.ToggleObjectMass);
}
