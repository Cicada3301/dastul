define(['physics', 'blocks', /*'settings',*/ 'entities', 'world', 'drawer'], function(Physics, Blocks, /*Settings,*/ Entities, World, Drawer){
    function GameManager(){
        //this.settings=new Settings();
        this.world= new World(256, 128, parseInt(prompt('seed')));
        this.drawer=new Drawer(this.world);
        this.physics=new Physics();
        this.entities=new Entities(this.world);
    }
    GameManager.prototype.init=function(){
        this.drawer.reset();
        this.world.generate();
        this.world.draw(this.drawer);
    };
    return GameManager;
});