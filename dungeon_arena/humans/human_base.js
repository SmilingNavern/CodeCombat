// This is the code for your base. Decide which unit to build each frame.
// Units you build will go into the this.built array.
// Destroy the enemy base within 60 seconds!
// Check out the Guide at the top for more info.

// CHOOSE YOUR HERO! You can only build one hero.
var hero;
//hero = 'tharin';  // A fierce knight with battlecry abilities.
hero = 'hushbaum';  // A fiery spellcaster hero.

if(hero && !this.builtHero) {
    this.builtHero = this.build(hero);
    return;
}

// Soldiers are hard-to-kill, low damage melee units with 2s build cooldown.
// Archers are fragile but deadly ranged units with 2.5s build cooldown.
var buildOrder = ['soldier', 'soldier', 'soldier', 'soldier', 'archer'];
var type = buildOrder[this.built.length % buildOrder.length];
//this.say('Unit #' + this.built.length + ' will be a ' + type);
this.build(type);


if (this.now() < 9) {
    buildOrder = ['soldier', 'soldier', 'soldier', 'archer', 'archer'];
    type = buildOrder[this.built.length % buildOrder.length];
    //this.say('Unit #' + this.built.length + ' will be a ' + type);
    this.build(type);    
}