Turtles.World = function() {
    this.turtle = new Turtles.Turtle();
    this.platter = new Turtles.Platter();

    this.gravity = 0.098;

    // for update/render calls
    stepLength = 1000.0 / 60.0;

    this.people = [];

    this.buildings = [];

    // effects placed by the player
    this.effects = [];

    // physics objects (no AI interaction)
    this.actors = [];
};

Turtles.World.prototype = {

    constructor: Turtles.World,

    energyDrainRate: 0.01,

    isOnTerrain: function(position) {
        // todo
        return true;
    },
    
    checkWinState: function() {
        return false;
    },

    update: function() {
        this.platter.update(stepLength);
        
        // people
        for (var i in this.people) {
            this.people[i].update(stepLength);
        }

        // effects
        for (var i in this.effects) {
            this.effects[i].update(stepLength);
        }

        // actors
        for (var i in this.actors) {
            this.actors[i].update(stepLength);
        }

        // buildings
        for (var i in this.buildings) {
            this.buildings[i].update(stepLength);
        }
    }

};
