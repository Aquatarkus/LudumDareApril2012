Turtles.Platter = function(box2dObj) {
    Turtles.GameEntity.call(box2dObj);
};

Turtles.Platter.prototype = new Turtles.GameEntity();
Turtles.Platter.prototype.constructor = Turtles.Platter;
Turtles.Platter.prototype.update = function() {
    alert('updating platter');
};
