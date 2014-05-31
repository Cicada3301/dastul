function getArray(main, files){
    for(var file=0; file<files.length; ++file){
        files[file]=main+files[file];
    }
    return files
}
define(getArray('entities/', ['player']), function(Player){
    var Entities={
      player:{
          size:{
              height:1.7,
              width:0.8
          },
          parts:{
              head:{
                  pos:{
                      x:0,
                      y:0
                  },
                  size:{
                      height:0.8,
                      width:0.8
                  },
                  sprite:new Image()
              }
          }
      }
    };
    return Entities;
});