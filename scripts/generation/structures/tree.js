define(['../../blocks', 'mathUtils'], function(Blocks, mathUtils){
    function Tree(world, x, y, trunk, leaves){
        this.x=x;
        this.y=y;
        this.trunk=trunk;
        this.leaf=leaves;
        this.size=3;
        this.world=world;
    }
    Tree.prototype.addBranch=function(x, y){
        if(this.world.checkBlock(x, y, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])){
            ++this.size;
            this.world.cells[x][y] = new this.trunk.gen(x, y);
            if(this.world.checkBlock(x+1, y, ['air'])) this.world.cells[x+1][y] = new this.leaf.gen(x+1, y);
            if(this.world.checkBlock(x-1, y, ['air'])) this.world.cells[x-1][y] = new this.leaf.gen(x-1, y);
            if(this.world.checkBlock(x, y+1, ['air'])) this.world.cells[x][y+1] = new this.leaf.gen(x, y+1);
            if (mathUtils.getRandomBoolean(0.6)){
                if (mathUtils.getRandomBoolean(0.4)) this.addBranch(x + 1, y + 1);
                if (mathUtils.getRandomBoolean(0.4)) this.addBranch(x - 1, y + 1);
                if (mathUtils.getRandomBoolean(0.6)) this.addBranch(x, y + 1);
            } else {
                if(this.world.checkBlock(x+1, y, ['air'])) this.world.cells[x+1][y]=new this.leaf.gen(x+1, y);
                if(this.world.checkBlock(x-1, y, ['air'])) this.world.cells[x-1][y]=new this.leaf.gen(x-1, y);
                if(this.world.checkBlock(x, y+1, ['air'])) this.world.cells[x][y+1]=new this.leaf.gen(x, y+1);
                if(this.world.checkBlock(x+1, y+1, ['air'])) this.world.cells[x][y+1]=new this.leaf.gen(x+1, y+1);
                if(this.world.checkBlock(x-1, y+1, ['air'])) this.world.cells[x][y+1]=new this.leaf.gen(x-1, y+1);
            }
        }
    };
    Tree.prototype.grow=function(){
        var x=this.x;
        var y=this.y;
        this.world.cells[x][y]=new this.trunk.gen(x, y);
        this.world.cells[x][y+1]=new this.trunk.gen(x, y+1);
        this.world.cells[x][y+2]=new this.trunk.gen(x, y+2);
        this.addBranch(x, y+3)
    };
    Tree.prototype.generate=function(world){
        while(world.terrain.nature.saplings.length){
            var x=world.terrain.nature.saplings[0].x;
            var y=world.terrain.nature.saplings[0].y;
            var current=new Tree(world, x, y, Blocks.trunk, Blocks.leaf);
            current.grow();
            world.terrain.nature.saplings.shift();
        }
    }
    return Tree;
});