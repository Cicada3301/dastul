function getArray(main, files){
    for(var file=0; file<files.length; ++file){
        files[file]=main+files[file];
    }
    files.push('Blocks');
    return files
}
define(getArray('generation/terrain/', ['basicLayers', 'sea', 'nature', 'cave']), function(basicLayers, sea, Nature, Cave,Blocks){
    function Terrain(world){
        this.min=100;
        this.max=20;
        this.seaLevel=64;
        this.dirt={
            min:4,
            max:14
        };
        this.variation=1;

        this.basicLayers=basicLayers;
        this.cave=new Cave(world, 0.005);
        this.sea=sea;
        this.nature=new Nature(world);
        this.world=world;
    }
    Terrain.prototype.empty=function(){
        this.world.cells.length=0;
        this.nature.saplings.length=0;
        for (var column = 0; column < this.world.width; ++column) {
            this.world.cells.push([]);
            for (var row = 0; row < this.world.height; ++row) {
                this.world.cells[column].push(new Blocks.air.gen(column, row));
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