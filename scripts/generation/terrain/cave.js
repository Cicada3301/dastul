define(['../../blocks'], function(Blocks){
    function Cave(world, spawnrate){
        this.world=world;
        this.spawnRate=spawnrate;
        this.spawnable=['grass', 'dirt', 'ironOre', 'coalOre', 'sand', 'rock', 'air']
    }
    Cave.prototype.add=function(x, y, size){
        if(this.world.checkBlock(x, y, this.spawnable)) this.world.cells[x][y]=new Blocks.air.gen(x, y);
        var size=size;
        var x=x;
        var y=y;
        while(size){
            --size;
            var newX=x+Math.floor(Math.random()*3)-1;
            var newY=y+Math.floor(Math.random()*2.4)-1;
            if(this.world.checkBlock(newX, newY, this.spawnable)&&newY>4){
                x=newX;
                y=newY;
                this.world.cells[x][y]=new Blocks.air.gen(x, y);
                if(this.world.checkBlock(x+1, y,   Blocks.ids)) this.world.cells[x+1][y]  =new Blocks.air.gen(x+1, y);
                if(this.world.checkBlock(x-1, y,   Blocks.ids)) this.world.cells[x-1][y]  =new Blocks.air.gen(x-1, y);
                if(this.world.checkBlock(x+1, y+1, Blocks.ids)) this.world.cells[x+1][y+1]=new Blocks.air.gen(x+1, y+1);
                if(this.world.checkBlock(x+1, y-1, Blocks.ids)) this.world.cells[x+1][y-1]=new Blocks.air.gen(x+1, y-1);
                if(this.world.checkBlock(x-1, y+1, Blocks.ids)) this.world.cells[x-1][y+1]=new Blocks.air.gen(x-1, y+1);
                if(this.world.checkBlock(x-1, y-1, Blocks.ids)) this.world.cells[x-1][y-1]=new Blocks.air.gen(x-1, y-1);
                if(this.world.checkBlock(x, y-1,   Blocks.ids)) this.world.cells[x][y-1]  =new Blocks.air.gen(x, y-1);
                if(this.world.checkBlock(x, y+1,   Blocks.ids)) this.world.cells[x][y+1]  =new Blocks.air.gen(x, y+1);

            }
        }
    };
    Cave.prototype.generate=function(){
        for(var col=0; col<this.world.width; ++col){
            for(var row=0; row<this.world.height; ++row){
                if(this.world.checkBlock(col, row, ['grass', 'sand'])&&Math.random()<this.spawnRate) this.add(col, row, Math.floor(Math.random()*200+2));
            }
        }
    };
    return Cave;
});