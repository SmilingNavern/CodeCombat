// This is the code for your base. Decide which unit to build each frame.
// Units you build will go into the this.built array.
// Destroy the enemy base within 60 seconds!
// Check out the Guide at the top for more info.
this.findTypeInRange = function(units,type) {
    for (var i = 0; i < units.length; ++i) {
        var unit = units[i];

        if (unit.type == type /*&& this.distance(unit) < this.attackRange*/)
            return unit;
        } 

    return null;
};

this.findAllByType = function(units,type) {
    
    var array_of_units = [];

    for (var i = 0; i < units.length; ++i) {
        var unit = units[i];

        if (unit.type == type)
            array_of_units.push(unit);
        }

    return array_of_units;
};

this.enemyCount = function(units, type) {
    var count = 0;

    for (var i = 0; i < units.length; ++i) {
        var unit = units[i];
        if (unit.type == type) count++;
    }

    return count;
};

this.getClosestUnit = function (units) {

    var x_pos = 0;
    var closest_unit = units[0];
    
    for (var i = 0; i < units.length; ++i) {
        var unit = units[i];
        if (unit.pos.x > x_pos) {
            x_pos = unit.pos.x;
            closest_unit = unit;
        }
    }

};

// Choose your hero! You can only build one hero.
var hero;
var base_coords = { x : 70, y : 30 };
var enemies = this.getEnemies();
var enemy = this.getClosestUnit(enemies);
var friends = this.getFriends();
var heroExists = this.findAllByType(friends, 'brawler');


hero = 'ironjaw';  // A leaping juggernaut hero, type 'brawler'.
//hero = 'yugargen';  // A devious spellcaster hero, type 'shaman'.
if(hero && !this.builtHero) {
    this.builtHero = this.build(hero);
    return;
}

if (!heroExists) {
    this.say("Attack," + enemy.id + "!", {target: enemy});
}

// Munchkins are weak melee units with 1.25s build cooldown.
// Throwers are fragile, deadly ranged units with 2.5s build cooldown.
var buildOrder = ['munchkin', 'thrower', 'thrower', 'thrower', 'thrower'];
var type = buildOrder[this.built.length % buildOrder.length];
//this.say('Unit #' + this.built.length + ' will be a ' + type);
this.build(type);

