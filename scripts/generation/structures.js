function getArray(main, files){
    for(var file=0; file<files.length; ++file){
        files[file]=main+files[file];
    }
    return files
}
define(getArray('generation/structures/', ['tree', 'ores']), function(Tree, ore){
    var Structures={
        Tree:Tree,
        ore:ore,
        generate:function(world){
            ore.choose(world);
        }
    };
    return Structures;
});