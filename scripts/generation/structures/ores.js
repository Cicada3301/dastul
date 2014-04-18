define(['blocks'], function(Blocks){
    var ore={
        choose:function(world){
            var totalOreChance=0;
            for(var i=0; i<Blocks.ores.length; ++i){
                totalOreChance+=Blocks[Blocks.ores[i]].chance;
            }
            for(var column=0; column<world.width; ++column){
                for(var row=0; row<world.height; ++row){
                    if(world.cells[column][row].id===Blocks.rock.id){
                        var orify=Math.random()<0.01;
                        if(orify){
                            var chosenOre=Blocks.oresByChance[Math.floor(Math.random()*Blocks.oresByChance.length)];
                            this.generateVein(world, Blocks[chosenOre], Blocks.rock, column, row, 4)
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
                var newX=x+Math.floor(Math.random()*3)-2;
                var newY=y+Math.floor(Math.random()*3)-2;
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