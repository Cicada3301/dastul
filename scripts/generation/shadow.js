define(['blocks'], function(Blocks){
    var shadow={
        apply:function(world){
            for(var col=0; col<world.width; ++col){
                var hasLight=1;
                for(var row=world.height; row>=0; --row){
                    if(world.checkBlock(col, row, Blocks.ids)){
                        world.cells[col][row].lightLevel=hasLight;
                        hasLight-=(1-Blocks[Blocks.ids[world.cells[col][row].id]].transparency);
                    }
                }
            }
            function cicle() {
                for (var row = 0; row < world.height; ++row) {
                    var light = 0;
                    for (var col = 0; col < world.width; ++col) {
                        if (world.checkBlock(col, row, Blocks.ids)) {
                            var current = world.cells[col][row];
                            if (current.lightLevel > light) {
                                light = current.lightLevel
                            } else {
                                light -= (1 - Blocks[Blocks.ids[world.cells[col][row].id]].transparency);
                                current.lightLevel = light;
                            }
                        }
                    }
                }
                for (var row = 0; row < world.height; ++row) {
                    var light = 0;
                    for (var col = world.width - 1; col >= 0; --col) {
                        if (world.checkBlock(col, row, Blocks.ids)) {
                            var current = world.cells[col][row];
                            if (current.lightLevel > light) {
                                light = current.lightLevel
                            } else {
                                light -= (1 - Blocks[Blocks.ids[world.cells[col][row].id]].transparency);
                                current.lightLevel = light;
                            }
                        }
                    }
                }
                for (var col = 0; col < world.width; ++col) {
                    var light = 0;
                    for (var row = world.height; row >= 0; --row) {
                        if (world.checkBlock(col, row, Blocks.ids)) {
                            var current = world.cells[col][row];
                            if (current.lightLevel > light) {
                                light = current.lightLevel
                            } else {
                                light -= (1 - Blocks[Blocks.ids[world.cells[col][row].id]].transparency);
                                current.lightLevel = light;
                            }
                        }
                    }
                }
            }
            for(var i=0; i<20; ++i)
            cicle();
        }
    };
    return shadow;
});