// The Librarian is a spellcaster with a fireball attack
// plus three useful spells: 'slow', 'regen', and 'haste'.
// Slow makes a target move and attack at half speed for 5s.
// Regen makes a target heal 10 hp/s for 10s.
// Haste speeds up a target by 4x for 5s, once per match.
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

this.findDamaged = function(units, type) {
    for (var i = 0; i < units.length; ++i) {
        var unit = units[i];

        if (unit.type == type && unit.health < unit.maxHealth) {
            return unit;
        }
    }

    return null;

};

var coords_base = {x:9,y:29};
var friends = this.getFriends();
var enemies = this.getEnemies();
if (enemies.length === 0) return;  // Chill if all enemies are dead.
var enemy = this.getNearest(enemies);
var friend = this.getNearest(friends);
var brawler = this.findTypeInRange(enemies, 'brawler');
var shaman = this.findTypeInRange(enemies, 'shaman'); 
//var damaged_soldier = this.findDamaged(friends, 'soldier');

if (shaman) {
    enemy = shaman;
} else if (brawler && brawler.health < 100) {
    enemy = brawler;
}



// Which one do you do at any given time? Only the last called action happens.
if(this.canCast('slow', enemy) && enemy.type == 'brawler') {
    this.castSlow(enemy);
} else if(this.canCast('regen', friend)) {
    this.castRegen(friend);
} else { 
    this.attack(enemy) && this.say("Attack," + enemy.id + "!", {target: enemy});
}

if ( this.health < 60) {
    if (this.canCast('regen', this)) {
        this.castRegen(this);        
    } else {
        this.move(coords_base);
    }
}