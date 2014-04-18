define(['generation/structures/tree', 'blocks'], function(Tree, Blocks){
    function Nature(world){
        this.saplings=[];
        this.trees=[];
        this.world=world;
    }
    Nature.prototype.generateGreenary=function(){
            for(var col=0; col<this.world.width; ++col){
                for(var row=1; row<this.world.height; ++row){
                    if(this.world.checkBlock(col, row-1, [2])&&this.world.checkBlock(col, row, [0])){
                        var naturalize=Math.random()<0.2;
                        if(naturalize){
                            var chosenNature=Blocks.natureByChance[Math.floor(Math.random()*Blocks.natureByChance.length)];
                            this.world.cells[col][row]=new Blocks[chosenNature].gen(col, row);
                            if(chosenNature==='sapling'){
                                this.saplings.push({x:col, y:row});
                            }
                        }
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