function getArray(main, files){
    for(var file=0; file<files.length; ++file){
        files[file]=main+files[file];
    }
    return files
}
define(getArray('generation/', ['structures', 'terrain', 'shadow']), function(Structures, Terrain, shadow){
    function Generation(world){
        this.world=world;
        this.structs=new Structures(world);
        this.terrain=new Terrain(world);
        this.shadow=shadow;
    }
    Generation.prototype.generate=function(){
        this.terrain.generate();
        this.structs.generate();
        shadow.apply(this.world);
    };
    return Generation;
});