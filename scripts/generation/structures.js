function getArray(main, files){
    for(var file=0; file<files.length; ++file){
        files[file]=main+files[file];
    }
    return files
}
define(getArray('generation/structures/', ['tree', 'ores']), function(Tree, ore){
    function Structures(world){
        this.world=world;
        this.Tree=Tree;
        this.ore=ore;
    }
    Structures.prototype.generate=function(){
        this.ore.choose(this.world);
    };
    return Structures;
});