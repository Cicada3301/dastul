function getArray(main, files){
    for(var file=0; file<files.length; ++file){
        files[file]=main+files[file];
    }
    return files
}
define(getArray('generation/', ['structures', 'terrain']), function(Structures, Terrain){
    function Generation(world){
        this.world=world;
        this.structs=new Structures(world);
        this.terrain=new Terrain(world);
    }
    Generation.prototype.generate=function(){
        this.terrain.generate();
        this.structs.generate();
    };
    return Generation;
});