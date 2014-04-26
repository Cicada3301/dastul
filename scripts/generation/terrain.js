function getArray(main, files){
    for(var file=0; file<files.length; ++file){
        files[file]=main+files[file];
    }
    files.push('Blocks', 'mathUtils');
    return files
}
define(getArray('generation/terrain/', ['basicLayers', 'sea', 'nature', 'cave']), function(basicLayers, sea, Nature, Cave, Blocks, mathUtils){
    function Terrain(world){
        this.world=world;
        this.min=44;
        this.max=84;
        this.seaLevel=Math.floor(world.height/2);
        this.dirt={
            min:6,
            max:18
        };
        this.variation=world.roughness;

        this.basicLayers=basicLayers;
        this.cave=new Cave(world, mathUtils.getRandomInt(0, 1000, this.world.seed)/100000);
        this.sea=sea;
        this.nature=new Nature(world);
    }
    Terrain.prototype.empty=function(){
        this.world.cells.length=0;
        this.nature.saplings.length=0;
        for (var column = 0; column < this.world.width; ++column) {
            this.world.cells.push([]);
            for (var row = 0; row < this.world.height; ++row) {
                this.world.cells[column].push(new Blocks.air.gen());
            }
        }
    };
    Terrain.prototype.generate=function(){
        this.empty();
        this.basicLayers.generate(this.world);
        this.cave.generate();
        this.sea.generate(this.world);
        this.nature.generate(this.world, this.nature);
    };
    return Terrain;
});