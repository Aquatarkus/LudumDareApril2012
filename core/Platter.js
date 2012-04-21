Turtles.Platter = function(box2dObj) {
    Turtles.Actor.call(box2dObj);
};

Turtles.Platter.prototype = new Turtles.Actor();
Turtles.Platter.prototype.constructor = Turtles.Platter;
Turtles.Platter.prototype.update = function() {
    alert('updating platter');
};
