// TurtlesBuilder.js
// LudumDare420

var stateElement = document.getElementById('stateElement');

var Log = Log || {};
var Turtles = Turtles || {};

Turtles.BuilderStates = 
{
    MoveCamera : 'State: Move Camera',
    MoveObject : 'State: Move Object',
    ColorObject : 'State: Color Object',
    DeleteObject : 'State: Delete Object',
    AddBoxTerrain : 'State: Add Box Terrain',
    AddCircleTerrain : 'State: Add Circle Terrain',
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
                boxTerrain.fixWithJoint(platter);
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
                circleTerrain.fixWithJoint(platter);
                World.terrain.push(circleTerrain);
                break;
            default:
                break;
        }
    },
    onMove : function(worldCoords, oldWorldCoords)
    {
        Log.debug('onMove coords',{wc:worldCoords, owc:oldWorldCoords});
        var deltaWorldCoords = {x:worldCoords.x-oldWorldCoords.x,
                                y:worldCoords.y-oldWorldCoords.y};
        switch (this.state)
        {
            case Turtles.BuilderStates.MoveCamera:
                Log.debug('onMoveCamera', deltaWorldCoords);
                turtlesUI.moveCamera(deltaWorldCoords);
                break;
            case Turtles.BuilderStates.MoveObject:
                var intersections = turtlesUI.castRay(oldWorldCoords);
                for (var i = 0; i < intersections.length; i++)
                {
                    var gameEntity = intersections[i].object.gameEntity;
                    gameEntity.physicsBody.m_position.x += deltaWorldCoords.x;
                    gameEntity.physicsBody.m_position.y += deltaWorldCoords.y;
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
// World.platter.density = 0;
// World.platter._createPhysicsBody();

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

function onStateColorObject()
{
    turtlesBuilder.setState(Turtles.BuilderStates.ColorObject);
}

function onStateDelete()
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
