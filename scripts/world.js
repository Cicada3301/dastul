define(['blocks'], function(Blocks){
    function World(width, height){
        this.cells=[];
        this.loaded=[];
        this.name='';
        this.width=width;
        this.height=height;
        this.time=230;
        this.maxTerrain=20;
        this.minTerrain=50;
        this.dirt={
            minThickness:4,
            maxThickness:10
        };
        this.landVariation=1;
        this.seaLevel=40
    }
    World.prototype.void=function() {
        this.cells = [];
        for (var column = 0; column < this.width; ++column) {
            this.cells.push([]);
            for (var row = 0; row < this.height; ++row) {
                this.cells[column].push(new Blocks.air.gen(column, this.height - row));
            }
        }
    };
    World.prototype.basicLayers=function(){
        var lastRandom=this.height-this.minTerrain+Math.floor(Math.random()*(this.minTerrain-this.maxTerrain));
        for(var i=0; i<this.width; ++i){
            var delta=Math.floor(Math.random()*(this.landVariation*2+1))-this.landVariation;
            if(lastRandom+delta<this.maxTerrain||lastRandom+delta>this.minTerrain) delta*=-1;
            var random= lastRandom+delta;
            lastRandom= random;
            this.cells[i][random] = new Blocks.grass.gen(i, this.height-random);
            for (var j = 0; j < random; ++j) {
                var dirtLayer=Math.floor(Math.random()*((this.dirt.maxThickness+this.dirt.minThickness)/2))+this.dirt.minThickness;
                if(random-j<dirtLayer) this.cells[i][j] = new Blocks.dirt.gen(i, this.height-j);
                else this.cells[i][j] = new Blocks.rock.gen(i, this.height - j);
            }
        }
    };
    World.prototype.addSea=function(){
        for(var col=0; col<this.width; ++col){
            for(var row=this.seaLevel; row<this.minTerrain+1; ++row){
                var current=this.cells[col][row];
                if(current.id===0||Blocks.nature.indexOf(Blocks.ids[current.id])){
                    current=new Blocks.water.gen(col, this.height-row);
                }else if(current.id===2){
                    current=new Blocks.dirt.gen(col, this.height-row);
                }
            }
        }
    }
    World.prototype.generateVein=function(block, context, x, y, size){
        var x=x;
        var y=y;
        this.cells[x][y]=new block.gen(x, this.height-y);
        for(var i=0; i<size-1; ++i){
            var newX=x+Math.floor(Math.random()*3)-1;
            var newY=y+Math.floor(Math.random()*3)-1;
            var currentCell=this.cells[x][y]
            if(currentCell.id===context.id){
                currentCell=new block.gen();
                x=newX;
                y=newY;
            }else{
                --i;
            }
            if(i<20) return false;
        }
    };
    World.prototype.addOres=function(){
        var totalOreChance=0;
        for(var i=0; i<Blocks.ores.length; ++i){
            totalOreChance+=Blocks[Blocks.ores[i]].chance;
        }
        for(var column=0; column<this.width; ++column){
            for(var row=0; row<this.height; ++row){
                if(this.cells[column][row].id===Blocks.rock.id){
                    var random=Math.random()<0.01;
                    if(random){
                        var sum=0;
                        var oreChance=Math.random()*totalOreChance;
                        for(var ore=0; ore<Blocks.ores.length; ++ore){
                            var current=Blocks[Blocks.ores[ore]];
                            if((oreChance<(sum+current.chance))&&(oreChance>current.chance)){
                                this.generateVein(current, Blocks.rock, column, row, 4);
                                ore=Blocks.ores.length;
                            }
                            sum+=current.chance;
                        }
                    }
                }
            }
        }
    };
    World.prototype.addNature=function(){
        for(var col=0; col<this.width; ++col){
            for(var row=this.maxTerrain-1; row<this.minTerrain; ++row){
                var current=this.cells[col][row];
                if(this.cells[col][row+1].id===2){
                    current=new Blocks.sapling.gen(col, this.height-row);
                }
            }
        }
    };
    World.prototype.generate=function(){
        this.void();
        this.basicLayers();
        this.addOres();
        this.addNature();
        this.addSea();
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