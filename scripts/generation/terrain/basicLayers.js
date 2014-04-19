define(['blocks', 'mathUtils'], function(Blocks, mathUtils){
    var basicLayers={
        Terrain:function(world){
            this.world=world;
            this.points=[];
            for(var seg=0; seg<=this.world.width; ++seg){
                this.points[seg]=0;
            }
        },
        generate:function(world){
            var terrain=new basicLayers.Terrain(world);
            terrain.generate(0, world.width, world.generation.terrain.min);
            for(var col=0; col<world.width; ++col) {
                for (var row = 0; row < terrain.points[col]; ++row) {
                    var dirtLayer = mathUtils.getRandomInt(world.generation.terrain.dirt.min, world.generation.terrain.dirt.max, world.seed);
                    if (terrain.points[col] - row < dirtLayer) world.cells[col][row] = new Blocks.dirt.gen(col, row);
                    else world.cells[col][row] = new Blocks.rock.gen(col, row);
                }
            }
        }
    };
    basicLayers.Terrain.prototype.generate=function(start, end, maxElevation){
        var middle=Math.round((start+end)/2);
        if((end-start<=1)||middle==start||middle==end) return false;
        var newY=Math.round(((this.points[end]+this.points[start])/2+maxElevation*(Math.sin(this.world.seed.value++))));
        this.points[middle]=newY;
        this.world.cells[middle][newY]=new Blocks.grass.gen(middle, newY);
        this.generate(start, middle, maxElevation*1);
        this.generate(middle, end, maxElevation*1);
    };
    return basicLayers;
});