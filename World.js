Turtles.World = function() {
};

Turtles.World.prototype = {

    constructor: Turtles.World,

    // for update/render calls
    stepLength: 1000.0 / 60.0,

    energyDrainRate: 0.01,

    isOnTerrain: function(position) {
        // todo
        return true;
    },
    
    gravity: 0.098,

    people: [],

    buildings: [],

    plate: null,

    turtle: null,

    // effects placed by the player
    effects: [],

    // physics objects (no AI interaction)
    actors: [],

    checkWinState: function() {
        return false;
    },

    update: function() {
        // people
        for (var i in people) {
            people[i].update(stepMilliseconds);
        }

        // effects
        for (var i in effects) {
            effects[i].update(stepMilliseconds);
        }

        // actors
        for (var i in actors) {
            actors[i].update(stepMilliseconds);
        }

        // buildings
        for (var i in buildings) {
            buildings[i].update(stepMilliseconds);
        }
    }

};
