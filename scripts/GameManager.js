define(['physics', 'blocks', /*'settings', 'entities', */'world', 'drawer'], function(Physics, Blocks, /*Settings, Entity,*/ World, Drawer){
    function GameManager(){
        this.drawer=new Drawer();
        //this.settings=new Settings();
        this.world= new World(128, 64);
        this.physics=new Physics();
        //this.entities=new Entity.array();
    };
    GameManager.prototype.init=function(){
        this.drawer.reset();
        this.world.generate();
        this.world.draw(this.drawer);
    }
    return GameManager;
});