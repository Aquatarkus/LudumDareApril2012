Turtles.Effect = function(box2dObj) {
    Turtles.GameEntity.call(box2dObj);
};

Turtles.Effect.prototype = new Turtles.GameEntity();
