define(['blocks', 'mathUtils'], function(Blocks, mathUtils){
    var ore={
        choose:function(world){
            var totalOreChance=0;
            for(var i=0; i<Blocks.ores.length; ++i){
                totalOreChance+=Blocks[Blocks.ores[i]].chance;
            }
            for(var column=0; column<world.width; ++column){
                for(var row=0; row<world.height; ++row){
                    if(world.cells[column][row].id===Blocks.rock.id){
                        var orify=mathUtils.getRandomBoolean(mathUtils.getRandomInt(0, 100, world.seed)/10000, world.seed);
                        if(orify){
                            var chosenOre=Blocks.oresByChance[mathUtils.getRandomInt(0, Blocks.oresByChance.length-1, world.seed)];
                            this.generateVein(world, Blocks[chosenOre], Blocks.rock, column, row, mathUtils.getRandomInt(3, 12, world.seed))
                        }
                    }
                }
            }
        },
        generateVein:function(world, block, context, x, y, size){
            world.cells[x][y]=new block.gen(x, y);
            var x=x;
            var y=y;
            var size=size;
            --size;
            var trial=40;
            while(size&&trial){
                --trial;
                var newX=x+mathUtils.getRandomInt(-1, 1, world.seed);
                var newY=y+mathUtils.getRandomInt(-1, 1, world.seed);
                if(world.checkBlock(newX, newY, ['rock', 'coalOre', 'ironOre'])){
                    x=newX;
                    y=newY;
                    --size;
                    world.cells[x][y]=new block.gen(x, y);
                }
            }
        }
    };
    return ore;
});