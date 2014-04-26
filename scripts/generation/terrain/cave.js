define(['../../blocks', 'mathUtils'], function(Blocks, mathUtils){
    function Cave(world, spawnrate){
        this.world=world;
        this.spawnRate=spawnrate;
        this.spawnable=['grass', 'dirt', 'ironOre', 'coalOre', 'sand', 'rock', 'air']
    }
    Cave.prototype.add=function(x, y, size){
        if(this.world.checkBlock(x, y, this.spawnable)) this.world.cells[x][y]=new Blocks.air.gen();
        var size=size;
        var x=x;
        var y=y;
        while(size){
            --size;
            var newX=x+mathUtils.getRandomInt(-1, 1, this.world.seed);
            var newY=y+mathUtils.getRandomInt(-1, 0, this.world.seed);
            if(this.world.checkBlock(newX, newY, this.spawnable)&&newY>4){
                x=newX;
                y=newY;
                this.world.cells[x][y]=new Blocks.air.gen();
                if(this.world.checkBlock(x+1, y,   Blocks.ids)) this.world.cells[x+1][y]  =new Blocks.air.gen();
                if(this.world.checkBlock(x-1, y,   Blocks.ids)) this.world.cells[x-1][y]  =new Blocks.air.gen();
                if(this.world.checkBlock(x+1, y+1, Blocks.ids)) this.world.cells[x+1][y+1]=new Blocks.air.gen();
                if(this.world.checkBlock(x+1, y-1, Blocks.ids)) this.world.cells[x+1][y-1]=new Blocks.air.gen();
                if(this.world.checkBlock(x-1, y+1, Blocks.ids)) this.world.cells[x-1][y+1]=new Blocks.air.gen();
                if(this.world.checkBlock(x-1, y-1, Blocks.ids)) this.world.cells[x-1][y-1]=new Blocks.air.gen();
                if(this.world.checkBlock(x, y-1,   Blocks.ids)) this.world.cells[x][y-1]  =new Blocks.air.gen();
                if(this.world.checkBlock(x, y+1,   Blocks.ids)) this.world.cells[x][y+1]  =new Blocks.air.gen();

            }
        }
    };
    Cave.prototype.generate=function(){
        for(var col=0; col<this.world.width; ++col){
            for(var row=0; row<this.world.height; ++row){
                if(this.world.checkBlock(col, row, ['grass', 'sand'])&&mathUtils.getRandomBoolean(this.spawnRate, this.world.seed)) this.add(col, row, mathUtils.getRandomInt(2, 202, this.world.seed));
            }
        }
    };
    return Cave;
});