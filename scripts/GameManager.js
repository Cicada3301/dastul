define(['physics', 'blocks', /*'settings', 'entities', */'world'], function(Physics, Blocks, /*Settings, Entity,*/ World){
    function GameManager(){
        //this.settings=new Settings();
        this.world= new World();
        this.physics=new Physics();
        //this.entities=new Entity.array();
    };
    return GameManager;
});