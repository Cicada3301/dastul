define(['blocks', 'mathUtils'], function(Blocks, mathUtils){
    var basicLayers={
        Terrain:function(world){
            this.world=world;
            this.points=[];
            this.worldPoints=[];
            for(var seg=0; seg<=this.world.width; ++seg){
                this.points[seg]=0;
                this.worldPoints[seg]=0;
            }
        },
        generate:function(world){
            var terrain=new basicLayers.Terrain(world);
            terrain.generate(0, world.width, world.generation.terrain.max-world.generation.terrain.min);
            for(var col=0; col<terrain.worldPoints.length; ++col) {
                for (var row = 0; row < terrain.worldPoints[col]; ++row) {
                    var dirtLayer = mathUtils.getRandomInt(world.generation.terrain.dirt.min, world.generation.terrain.dirt.max, world.seed);
                    if (terrain.worldPoints[col] - row < dirtLayer) world.cells[col][row] = new Blocks.dirt.gen();
                    else world.cells[col][row] = new Blocks.rock.gen();
                }
            }
        }
    };
    basicLayers.Terrain.prototype.generate=function(start, end, maxElevation){
        var middle=Math.round((start+end)/2);
        if((end-start<=1)||middle==start||middle==end) return false;
        var newY=Math.round(((this.points[end]+this.points[start])/2+maxElevation*(Math.sin(this.world.seed.value++))));
        this.points[middle]=newY;
        this.worldPoints[middle]=newY +this.world.generation.terrain.seaLevel;
        this.world.cells[middle][newY+ this.world.generation.terrain.seaLevel]=new Blocks.grass.gen();
        this.generate(start, middle, maxElevation*this.world.generation.terrain.variation);
        this.generate(middle, end, maxElevation*this.world.generation.terrain.variation);
    };
    return basicLayers;
});