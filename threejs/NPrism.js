// NPrism.js
// by John Shaffstall

var THREE = THREE || {};

// NPrism
// geometry for rapid prototyping
var NPrism = {};

// Stack
// basic construction element of an NPrism
// vertexCount : number of verticex in this stack
// transform : THREE.Matrix4 transformation matrix
// connectRing : draw lines connecting the vertices of this stack to each other
// connectLoft : draw lines connecting this vertices of this stack to the next stack
NPrism.Stack = function(vertexCount, transform, connectRing, connectLoft)
{
    this.vertexCount    = vertexCount || 3;
    this.transform      = transform || new THREE.Matrix4.identity();
    this.connectRing    = connectRing;
    this.connectLoft    = connectLoft;
};

// NPrism
NPrism.NPrism = function(stacks, hexColor)
{
    this.stacks = stacks || [];
    this.vertexPositions = [];
    this.lineIndices = [];
    this.hexColor = hexColor;
    
    // generate vertices, lines, and colors
    for (var i in this.stacks)
    {
        var stack = this.stacks[i];
        
        // vertex positions
        var transform = stack.transform;
        var vertexCount = stack.vertexCount;
        var vertexDeltaRad = Math.PI * 2 / vertexCount;
        for (var j = 0; j < vertexCount; j++)
        {
            // push the vertices
            var vertexRad = j * vertexDeltaRad;
            var vertexPos = new THREE.Vector3(Math.cos(vertexRad), Math.sin(vertexRad), 0);
            vertexPos = transform.multiplyVector3(vertexPos);
            this.vertexPositions.push(vertexPos);
            console.log('vertex = ('+vertexPos.x+', '+vertexPos.y+', '+vertexPos.z+')');
        }
        
        // ring line indices
        if (stack.connectRing)
        {
            var startIndex = this.vertexPositions.length - vertexCount;
            for (var j = 0; j < vertexCount; j++)
            {
                // connect j to k
                var k = (j+1)%vertexCount;
                console.log('jk = '+j+', '+k);
                this.lineIndices.push(j+startIndex,k+startIndex);
            }
        }
        
        // loft line indices
        if (stack.connectLoft && i >= 1)
        {
            var loftStack = this.stacks[i-1];
            var vertexRatio = stack.vertexCount / loftStack.vertexCount;
            var loftVertexRatio = 1/vertexRatio;
            var startIndex = this.vertexPositions.length - stack.vertexCount;
            var loftStartIndex = startIndex - loftStack.vertexCount;
            for (var j = vertexCount, k = loftStack.vertexCount; j > 0; j -= vertexRatio, k-=loftVertexRatio)
            {
                var jj = (Math.floor(j)>0?Math.floor(j):0)%vertexCount;
                var kk = (Math.floor(k)>0?Math.floor(k):0)%loftStack.vertexCount;
                console.log('jjkk = '+jj+', '+kk);
                this.lineIndices.push(jj+startIndex, kk+loftStartIndex);
            }
        }
    }
};

NPrism.NPrism.prototype = 
{
    constructor : NPrism.NPrism,
    combine : function (nPrism, hexColor)
    {
        var combinedStacks = this.stacks.concat(nPrism.stacks);
        var newPrism = new NPrism.NPrism(combinedStacks, hexColor);
        return newPrism;
    },
    getThreeJSGeometry : function()
    {
        // line vertices
        var geometry = new THREE.Geometry();
        for (var i in this.lineIndices)
        {
            var index = this.lineIndices[i];
            var vertexPos = this.vertexPositions[index];
            // console.log('vertex = ('+vertexPos.x+', '+vertexPos.y+', '+vertexPos.z+')');
            var vertex = new THREE.Vertex(vertexPos);
            geometry.vertices.push(vertex);
        }
        return geometry;
    },
    getThreeJSMaterial : function()
    {
        // $TODO
        return new THREE.LineBasicMaterial({color:this.hexColor});
    },
    getThreeJSLines : function()
    {
        // $TODO
        var geometry = this.getThreeJSGeometry();
        var material = this.getThreeJSMaterial();
        var lines = new THREE.Line(geometry, material, THREE.LinePieces); // or THREE.LineStrip
        return lines;
    }
};

NPrism.TwoPrism = function(vertexCount, hexColor, xScale, yScale, zScale)
{
    var scale = {x:xScale, y:yScale, z:zScale};
    // stack 0
    var transform0 = new THREE.Matrix4().identity();
    transform0.translate({x:0,y:0,z:-1});
    transform0.scale(scale);
    var stack0 = new NPrism.Stack(vertexCount, transform0, true, true);
    
    // stack 1
    var transform1 = new THREE.Matrix4().identity();
    transform1.translate({x:0,y:0,z:1});
    transform1.rotateZ(0.5)
    transform1.scale(scale);
    var stack1 = new NPrism.Stack(vertexCount, transform1, true, true);
    
    // nPrism
    var stacks = [stack0, stack1];
    var nPrism = new NPrism.NPrism(stacks, hexColor);
    return nPrism;
};

NPrism.Mushroom = function(vertexCount, headCount, gillCount, stemCount, hexColor, xScale, yScale, zScale)
{
    var scale = {x:xScale, y:yScale, z:zScale};
    var stacks = [];
    
    // head
    var headHeightDelta = 1/(headCount);
    var headWidthDelta = 2/(headCount);
    for (var i = 0; i < headCount; i++)
    {
        var headWidth = Math.pow(headWidthDelta*i, 0.5);
        var transform = new THREE.Matrix4().identity();
        transform.rotateZ(0.1*i);
        transform.scale({x:xScale*headWidth, y:yScale*headWidth, z:zScale});
        transform.translate({x:0,y:0,z:1-headHeightDelta*i});
        var stack = new NPrism.Stack(vertexCount, transform, true, true);
        stacks.push(stack);
    }
    
    // gills
    var gillHeightDelta = 1/gillCount;
    var gillWidthDelta = 1/gillCount;
    for (var i = 0; i < gillCount; i++)
    {
        var gillWidth = Math.pow(1-gillWidthDelta*i, 4);
        var transform = new THREE.Matrix4().identity();
        transform.rotateZ(0.1*(headCount+i));
        transform.scale({x:xScale*gillWidth, y:yScale*gillWidth, z:zScale});
        transform.translate({x:0,y:0,z:0-headHeightDelta*i});
        var stack = new NPrism.Stack(vertexCount, transform, false, true);
        stacks.push(stack);
    }
    
    // stem
    
    var nPrism = new NPrism.NPrism(stacks, hexColor);
    return nPrism;
};

