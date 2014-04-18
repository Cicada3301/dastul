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
        }
    };
    return shadow;
});