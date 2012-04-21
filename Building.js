Turtles.Building = function(box2dObj) {
    Turtles.Actor.call(box2dObj);

    this.state = Turtles.BuildingStates.Constructing;
    this.people = [];

    this.update = function(stepTime) {
        console.log('updating building');
    };
};

Turtles.Building.prototype = new Turtles.Actor();

Turtles.BuildingStates = {
    Constructing: 'Constructing',
    Empty: 'Empty',
    Occupied: 'Occupied'
};
