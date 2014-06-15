// This is the code for your base. Decide which unit to build each frame.
// Units you build will go into the this.built array.
// Destroy the enemy base within 60 seconds!
// Check out the Guide at the top for more info.

// Choose your hero! You can only build one hero.
var hero;
hero = 'ironjaw';  // A leaping juggernaut hero, type 'brawler'.
//hero = 'yugargen';  // A devious spellcaster hero, type 'shaman'.
if(hero && !this.builtHero) {
    this.builtHero = this.build(hero);
    return;
}

// Munchkins are weak melee units with 1.25s build cooldown.
// Throwers are fragile, deadly ranged units with 2.5s build cooldown.
var buildOrder = ['munchkin', 'munchkin', 'thrower', 'thrower', 'thrower'];
var type = buildOrder[this.built.length % buildOrder.length];
//this.say('Unit #' + this.built.length + ' will be a ' + type);
this.build(type);