Turtles.Turtle = function(box2dObj) {
    Turtles.Actor.call(box2dObj);
};

Turtles.Turtle.prototype = new Turtles.Actor();
