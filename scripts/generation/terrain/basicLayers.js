define(['blocks', 'mathUtils'], function(Blocks, mathUtils){
    var basicLayers={
        generate:function(world){
            var lastY=mathUtils.getRandomInt(world.generation.terrain.min, world.generation.terrain.max);
            var newY=0;
            for(var col=0; col<world.width; ++col){
                var delta=mathUtils.getRandomInt(0, 2*world.generation.terrain.variation+1)-world.generation.terrain.variation;
                if(!mathUtils.isBetween(lastY+delta, world.generation.terrain.min, world.generation.terrain.max)) delta*=-1;
                newY= lastY+delta;
                lastY= newY;
                world.cells[col][newY] = new Blocks.grass.gen(col, newY);
                for (var row = 0; row < newY; ++row) {
                    var dirtLayer=mathUtils.getRandomInt(world.generation.terrain.dirt.min, world.generation.terrain.dirt.max);
                    if(newY-row<dirtLayer) world.cells[col][row] = new Blocks.dirt.gen(col, row);
                    else world.cells[col][row] = new Blocks.rock.gen(col, row);
                }
            }
        }
    };
    return basicLayers;
});