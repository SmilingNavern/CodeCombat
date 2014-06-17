// This code runs once per frame. Choose where to move to grab gold!
// First player to 150 gold wins.

this.getDistanceTo = function(x_coord,y_coord) {
    return Math.sqrt(Math.pow((x_coord - this.pos.x),2) + Math.pow((y_coord - this.pos.y),2));
};

this.getDistanceBetween = function(x1,y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2));
};

this.getItemsByDistance = function (items_set, i_distance ) {
    for (var i = 0; i < items_set.length; ++i) {
        items_in_distance = [];

        var item = items_set[i];

        if (this.getDistanceTo(item.pos.x, item.pos.y) < i_distance ) {
            items_in_distance.push(item);
        }
    }

    return items_in_distance;
};

this.getBestValue = function(items_set, items_price_set) {
    
    var choosen_item = items_set[0];
    var best_price = items_price_set[0];

    for (var i = 1; i < items_set.length; ++i) {

        if ( items_price_set[i] > best_price ) {
            best_price = items_price_set[i];
            choosen_item = items_set[i];
            
        }

    }

    return choosen_item;
};

this.getCalculatedValue = function(all_items, the_enemy) {
    var item_to_value = [];

    for(var i = 0; i < all_items.length; ++i) {
        var item = all_items[i];
        var item_value = (item.bountyGold * 5) - this.getDistanceTo(item.pos.x, item.pos.y) * 2 + this.getDistanceBetween(item.pos.x, item.pos.y, the_enemy.pos.x, the_enemy.pos.y) / 3;
        item_to_value[i] = item_value;
    }

    return item_to_value;
};

var enemy = this.getNearestEnemy();
var items = this.getItems();
//var items_nearby = this.getItemsByDistance(items, 2);
var items_price = this.getCalculatedValue(items,enemy);
var best_item = this.getBestValue(items,items_price);
var next_move;
var random_move = Math.round(Math.random());


if (best_item) {
    next_move = { x : best_item.pos.x, y : best_item.pos.y };
} else if (items[0]) {
    next_move = items[0].pos;
} else {
    next_move = {x : (this.pos.x + random_move), y : (this.pos.y + random_move)};
}

if (!this.getCooldown("jump") && best_item) {
    this.jumpTo(next_move);
} else {
    this.move(next_move);
}

// You can surely pick a better coin using the methods below.
// Click on a coin to see its API.