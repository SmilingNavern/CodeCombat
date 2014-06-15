// This code runs once per frame. Choose where to move to grab gold!
// First player to 150 gold wins.

// This is an example of grabbing the 0th coin from the items array.
this.getItemsByDistance = function (items_set, i_distance ) {
    for (var i = 0; i < items_set.length; ++i) {
        items_in_distance = [];

        var item = items_set[i];

        if ( item.distance < i_distance ) {
            items_in_distance.push(item);
        }
    }

    return items_in_distance;
};

this.getBestValue = function(items_set) {
    var best_price = 0;
    var best_item;

    for (var i = 0; i < items.length; ++i) {
    
        var item = items[i];
        var item_price = item.bountyGold;

        if ( item_price > best_price ) {
            best_price = item_price;
            best_item = item;
        }

    }

    return best_item;  
};


var items = this.getItems();
var items_nearby = this.getItemsByDistance(items, 4);
var best_item = this.getBestValue(items);
var next_move;
var random_move = Math.round(Math.random());


if (best_item) {
    next_move = { x : best_item.pos.x, y : best_item.pos.y };
} else {
    next_move = {x : (this.pos.x + random_move), y : (this.pos.y + random_move)};
}

if (this.getCooldown("jump")) {
    this.jumpTo(next_move);
} else {
    this.move(next_move);
}

// You can surely pick a better coin using the methods below.
// Click on a coin to see its API.