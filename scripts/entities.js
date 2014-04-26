function getArray(main, files){
    for(var file=0; file<files.length; ++file){
        files[file]=main+files[file];
    }
    return files
}
define(getArray('entities/', ['player']), function(Player){
    function Entities(world){
        this.array=[];
        this.world=world;
    }
    Entities.prototype.init=function(){
        this.player=new Player(this.world);
        this.array=[this.player];
    };
    return Entities;
});