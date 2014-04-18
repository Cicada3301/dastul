define(['blocks', 'generation'], function(Blocks, Generation){
    function World(width, height){
        this.cells=[];
        this.loaded=[];
        this.name='';
        this.width=width;
        this.height=height;
        this.time=230;
        this.spawnPoint={x:0, y:0};
        this.generation=new Generation(this);
    }
    World.prototype.setSpawnPoint=function(){
        for(var row=this.height-1; row>0; --row){
            if(this.checkBlock(Math.floor(this.width/2), row-1, ['grass'])){
                row=0;
                this.spawnPoint.x=Math.floor(this.width/2);
                this.spawnPoint.y=row;
            }
        }
    };
    World.prototype.checkBlock=function(x, y, ids){
        if(this.cells[x]) if(this.cells[x][y]) return ids.indexOf(this.cells[x][y].id)>=0||ids.indexOf(Blocks.ids[this.cells[x][y].id])>=0;
    };
    World.prototype.generate=function(){
        this.generation.generate();
    };
    World.prototype.draw=function(drawer){
        drawer.drawBackground(this.time);
        for(var column=0; column<this.width; ++column){
            for(var row=0; row<this.height; ++row){
                this.cells[column][row].draw(drawer);
            }
        }
    };
    return World;
});