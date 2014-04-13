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
            maxThickness:20
        };
        this.landVariation=2;
        this.seaLevel=32;
        this.saplings=[];
    }
    World.prototype.void=function() {
        this.cells = [];
        for (var column = 0; column < this.width; ++column) {
            this.cells.push([]);
            for (var row = 0; row < this.height; ++row) {
                this.cells[column].push(new Blocks.air.gen(column, row));
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
            this.cells[i][random] = new Blocks.grass.gen(i, random);
            for (var j = 0; j < random; ++j) {
                var dirtLayer=Math.floor(Math.random()*((this.dirt.maxThickness+this.dirt.minThickness)/2))+this.dirt.minThickness;
                if(random-j<dirtLayer) this.cells[i][j] = new Blocks.dirt.gen(i, j);
                else this.cells[i][j] = new Blocks.rock.gen(i, j);
            }
        }
    };
    World.prototype.addSea=function(){
        for(var col=0; col<this.width; ++col){
            for(var row=this.seaLevel; row<this.height; ++row){
                var current=this.cells[col][row];
                if(current.id==0||Blocks.nature.indexOf(Blocks.ids[current.id])>=0){
                    this.cells[col][row]=new Blocks.water.gen(col, row);
                }else if(current.id===2){
                    this.cells[col][row]=new Blocks.dirt.gen(col, row);
                }
            }
        }
    };
    World.prototype.generateVein=function(block, context, x, y, size){
        this.cells[x][y]=new block.gen(x, y);
        if(Math.random()<(2/size))if(this.cells[x][y+1]) if(this.cells[x][y+1].id=context.id) this.cells[x][y+1]=new block.gen(x, y+1);
        if(Math.random()<(2/size))if(this.cells[x][y-1]) if(this.cells[x][y-1].id=context.id) this.cells[x][y-1]=new block.gen(x, y-1);
        if(Math.random()<(2/size))if(this.cells[x+1]) if(this.cells[x+1][y].id=context.id) this.cells[x+1][y]=new block.gen(x+1, y);
        if(Math.random()<(2/size))if(this.cells[x-1]) if(this.cells[x-1][y].id=context.id) this.cells[x-1][y]=new block.gen(x-1, y);
    };
    World.prototype.addOres=function(){
        var totalOreChance=0;
        for(var i=0; i<Blocks.ores.length; ++i){
            totalOreChance+=Blocks[Blocks.ores[i]].chance;
        }
        for(var column=0; column<this.width; ++column){
            for(var row=0; row<this.height; ++row){
                if(this.cells[column][row].id===Blocks.rock.id){
                    var orify=Math.random()<0.01;
                    if(orify){
                        var chosenOre=Blocks.oresByChance[Math.floor(Math.random()*Blocks.oresByChance.length)];
                        this.generateVein(Blocks[chosenOre], Blocks.rock, column, row, 4)
                    }
                }
            }
        }
    };
    World.prototype.growFoliage=function(x, y, size){
       return false;
    };
    World.prototype.growTrees=function(){
        for(var treeN=0; treeN<this.saplings.length; ++treeN){
            var current=this.saplings[treeN];
            this.cells[current.x][current.y]=Blocks.log.gen(current.x, current.y);
            this.cells[current.x][current.y-1]=Blocks.log.gen(current.x, current.y-1);
            this.cells[current.x][current.y-2]=Blocks.log.gen(current.x, current.y-2);
            if(this.cells[current.x][current.y-3].id===0){
                this.cells[current.x][current.y-3]=Blocks.log.gen(current.x, current.y-3);
                if(this.cells[current.x][current.y-4].id===0&&Math.random()<0.8){
                    this.cells[current.x][current.y-4]=Blocks.log.gen(current.x, current.y-4);
                    if(this.cells[current.x][current.y-5].id===0&&Math.random()<0.6){
                        this.cells[current.x][current.y-5]=Blocks.log.gen(current.x, current.y-5);
                        if(this.cells[current.x][current.y-6].id===0&&Math.random()<0.4){
                            this.cells[current.x][current.y-6]=Blocks.log.gen(current.x, current.y-6);
                            if(this.cells[current.x][current.y-7].id===0&&Math.random()<0.2){
                                this.cells[current.x][current.y-7]=Blocks.log.gen(current.x, current.y-7);
                            }else{
                                this.growFoliage(current.x, current.y-7, 7);
                            }
                        }else{
                            this.growFoliage(current.x, current.y-6, 6);
                        }
                    }else{
                        this.growFoliage(current.x, current.y-5, 5);
                    }
                }else{
                    this.growFoliage(current.x, current.y-4, 4);
                }
            }else{
                this.growFoliage(current.x, current.y-3, 3);
            }
        }
    };
    World.prototype.addNature=function(){
        for(var col=0; col<this.width; ++col){
            for(var row=1; row<this.height; ++row){
                if(this.cells[col][row-1].id===2&&this.cells[col][row].id===0){
                    var naturalize=Math.random()<0.2;
                    if(naturalize){
                        var chosenNature=Blocks.natureByChance[Math.floor(Math.random()*Blocks.natureByChance.length)];
                        this.cells[col][row]=new Blocks[chosenNature].gen(col, row);
                        if(chosenNature==='sapling'){
                            this.saplings.push({x:col, y:row});
                        }
                    }
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
        //this.growTrees();
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