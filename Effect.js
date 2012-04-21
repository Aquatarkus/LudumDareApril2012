Turtles.Effect = function(box2dObj) {
    Turtles.Actor.call(box2dObj);
};

Turtles.Effect.prototype = new Turtles.Actor();
