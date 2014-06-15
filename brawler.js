// The Brawler is a huge melee hero with mighty mass.
// this.throw() hurls an enemy behind him.
// this.jumpTo() leaps to a target within 20m every 10s.
// this.stomp() knocks everyone away, once per match.

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

var base_coords = { x : 70, y : 30 };
var friends = this.getFriends();
var enemies = this.getEnemies();
var all_archers = this.findAllByType(enemies,'archer');
if (enemies.length === 0) return;  // Chill if all enemies are dead.
var enemy = this.getNearest(enemies);
var friend = this.getNearest(friends);
var librarian = this.findTypeInRange(enemies, 'librarian');
var knight = this.findTypeInRange(enemies, 'knight');
var archer = this.findTypeInRange(all_archers, 'archer');
var archer_count = this.enemyCount(all_archers, 'archer');

if (archer_count > 2) {
    enemy = this.getNearest(all_archers);
} else if(knight && knight.pos.x > 13) {
    enemy = knight;
} else if (librarian && librarian.pos.x > 13) {
    enemy = librarian;
} 

// Which one do you do at any given time? Only the last called action happens.
if(!this.getCooldown('jump') && (enemy.type == 'archer' || enemy.type == 'librarian')) {
    this.jumpTo(enemy.pos);
} else if(!this.getCooldown('stomp') && this.distance(enemy) < 10) {
    this.stomp();
} else if(!this.getCooldown('throw') && enemy.type == 'soldier') {
    this.throw(enemy);
} else if(enemy.type == 'archer') {
    this.attack(enemy);
} else {
    this.attack(enemy) && this.say("Attack," + enemy.id + "!", {target: enemy});
}

// You can also command your troops with this.say():
//
//this.say("Move!", {targetPos: {x: 50, y: 40});

// You can store state on this across frames:
//this.lastHealth = this.health;
if ( this.now() < 10) {

    if (this.distance(this.getNearest(enemies)) > 8) {
        this.move(base_coords) && this.say("Defend!", {targetPos: {x : 74, y : 38}});
    } else if (this.distance(this.getNearest(enemies)) < 9) {
        this.attack(enemy) && this.say("Attack," + enemy.id + "!", {target: enemy});
    }
}