define(['blocks'], function(Blocks){
    function World(width, height){
        this.cells=[];
        this.loaded=[];
        this.name='';
        this.width=width;
        this.height=height;
    }
    World.prototype.generate=function(){
        for(var column=0; column<this.width; ++column){
            this.cells.push([]);
            for(var row=0; row<this.height; ++row){
                this.cells[column].push(new Blocks.air.gen(column, row));
            }
        }
        var localWidth=this.width;
        for(var i=0; i<localWidth; ++i){
            var isOccupied=false;
            for(var j=0; j<this.height; ++j){
                if(this.cells[i][j].type!=='air') isOccupied=true;
            }
            isOccupied ? ++localWidth : function () {
                var random = Math.floor(Math.random() * this.height);
                cells[i][random] = new Blocks.grass.gen(column, row);
                for(var j=0; j<random; ++j){
                    cells[i][j]=new Blocks.dirt.gen(column, row);
                }
            };
        }
    }
    World.prototype.draw=function(){
        for(var column=0; column<this.width; ++column){
            for(var row=0; row<this.height; ++row){
                this.cells[column][row].draw();
            }
        }
    }
    return World;
});