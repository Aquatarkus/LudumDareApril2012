Turtles.Turtle = function(box2dObj) {
    Turtles.GameEntity.call(box2dObj);
};

Turtles.Turtle.prototype = new Turtles.GameEntity();
