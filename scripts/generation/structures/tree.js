define(['../../blocks', 'mathUtils'], function(Blocks, mathUtils){
    function Tree(world, x, y, trunk, leaves){
        this.x=x;
        this.y=y;
        this.trunk=trunk;
        this.leaf=leaves;
        this.world=world;
        this.size=mathUtils.getRandomInt(1, 10, this.world.seed);
    }
    Tree.prototype.addBranch=function(x, y){
        if(this.world.checkBlock(x, y, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])){
            --this.size;
            this.world.cells[x][y] = new this.trunk.gen();
            if(this.world.checkBlock(x+1, y, ['air'])) this.world.cells[x+1][y]=new this.leaf.gen();
            if(this.world.checkBlock(x-1, y, ['air'])) this.world.cells[x-1][y]=new this.leaf.gen();
            if(this.world.checkBlock(x, y+1, ['air'])) this.world.cells[x][y+1]=new this.leaf.gen();
            if(this.world.checkBlock(x+1, y+1, ['air'])) this.world.cells[x+1][y+1]=new this.leaf.gen();
            if(this.world.checkBlock(x-1, y+1, ['air'])) this.world.cells[x-1][y+1]=new this.leaf.gen();

            if(this.world.checkBlock(x+2, y, ['air'])) this.world.cells[x+2][y]=new this.leaf.gen();
            if(this.world.checkBlock(x-2, y, ['air'])) this.world.cells[x-2][y]=new this.leaf.gen();
            if(this.world.checkBlock(x, y+2, ['air'])) this.world.cells[x][y+2]=new this.leaf.gen();
            if(this.world.checkBlock(x+2, y+2, ['air'])) this.world.cells[x+2][y+2]=new this.leaf.gen();
            if(this.world.checkBlock(x-2, y+2, ['air'])) this.world.cells[x-2][y+2]=new this.leaf.gen();
            if (this.size>=0){
                if (mathUtils.getRandomBoolean(0.4, this.world.seed)) this.addBranch(x + 1, y + 1);
                if (mathUtils.getRandomBoolean(0.4, this.world.seed)) this.addBranch(x - 1, y + 1);
                if (mathUtils.getRandomBoolean(0.6, this.world.seed)) this.addBranch(x, y + 1);
            }
        }
    };
    Tree.prototype.grow=function(){
        var x=this.x;
        var y=this.y;
        this.world.cells[x][y]=new this.trunk.gen();
        this.world.cells[x][y+1]=new this.trunk.gen();
        this.world.cells[x][y+2]=new this.trunk.gen();
        this.addBranch(x, y+3)
    };
    return Tree;
});