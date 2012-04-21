Turtles.Building = function(box2dObj) {
    Turtles.Actor.call(box2dObj);
};

Turtles.Building.prototype = new Turtles.Actor();
