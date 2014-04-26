define(['generation/structures/tree', 'blocks', 'mathUtils'], function(Tree, Blocks, mathUtils){
    function Nature(world){
        this.saplings=[];
        this.trees=[];
        this.world=world;
    }
    Nature.prototype.generateGreenary=function(){
            for(var col=0; col<this.world.width; ++col){
                for(var row=1; row<this.world.height; ++row){
                    if(this.world.checkBlock(col, row-1, [2])&&this.world.checkBlock(col, row, [0])){
                        var naturalize=mathUtils.getRandomBoolean(0.2, this.world.seed);
                        if(naturalize){
                            var num=mathUtils.getRandomInt(0, Blocks.natureByChance.length-1, this.world.seed);
                            var chosenNature=Blocks.natureByChance[num];
                            this.world.cells[col][row]=new Blocks[chosenNature].gen();
                            if(chosenNature==='sapling'){
                                this.saplings.push({x:col, y:row});
                            }
                        }
                    }

                    if(row>(this.world.height-this.world.height/10)&&mathUtils.getRandomBoolean(0.1, this.world.seed)){
                        this.world.cells[col][row] = new Blocks.cloud.gen();
                    }
                }
            }
        };
    Nature.prototype.generateTrees=function(){
            while(this.saplings.length){
                var x=this.saplings[0].x;
                var y=this.saplings[0].y;
                var current=new Tree(this.world, x, y, Blocks.trunk, Blocks.leaf);
                this.trees.push(current);
                current.grow();
                this.saplings.shift();
            }
        };
   Nature.prototype.generate=function(){
            this.saplings.length=0;
            this.trees.length=0;
            this.generateGreenary();
            this.generateTrees();
        };
    return Nature;
});