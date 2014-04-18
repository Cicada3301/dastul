define(['blocks', 'generation'], function(Blocks, Generation){
    function World(width, height){
        this.cells=[];
        this.loaded=[];
        this.name='';
        this.width=width;
        this.height=height;
        this.time=230;
        this.generation=new Generation(this);
    }
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