define(['blocks'], function(Blocks){
    var sea={
        generate:function(world){
            for(var col=0; col<world.width; ++col){
                for(var row=world.generation.terrain.seaLevel; row>0; --row){
                    var current=world.cells[col][row];
                    if(world.checkBlock(col, row, [0])||world.checkBlock(col, row, Blocks.nature)){
                        if(world.checkBlock(col, row [7])) world.generation.terrain.nature.saplings.splice(world.generation.terrain.nature.saplings.indexOf({x:col, y:row}), 1);
                        world.cells[col][row]=new Blocks.water.gen(col, row);
                    }else if(world.checkBlock(col, row, [2])){
                        world.cells[col][row]=new Blocks.dirt.gen(col, row);
                    }
                }
            }
        }
    };
    return sea;
});