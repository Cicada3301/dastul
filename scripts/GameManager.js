define(['physics', 'blocks', /*'settings',*/ 'entities', 'world', 'drawer', 'start', 'controls'], function(Physics, Blocks, /*Settings,*/ Entities, World, Drawer, Start, Controls){
    function GameManager(values){
        //this.settings=new Settings();
        this.start=new Start();
        this.world= new World(values.width, values.height, values.seed, values.roughness);
        this.drawer=new Drawer(this.world);
        this.physics=new Physics();
        this.entities=new Entities(this.world);
        this.controls=new Controls(this);
        this.speed=0.1;
        this.updateMs=4;
        this.securityMs=this.updateMs*10;
        this.lag=0;
        this.lastFrame=Date.now();
    }
    GameManager.prototype.keydown=function(key, e){
        var is=true;
        switch(key){
            case this.controls.up: this.world.addOffset(this.speed, 'y'); break;
            case this.controls.down: this.world.addOffset(-this.speed, 'y'); break;
            case this.controls.left: this.world.addOffset(-this.speed, 'x'); break;
            case this.controls.right: this.world.addOffset(this.speed, 'x'); break;
            default: is=false;
        }
        if(is) e.preventDefault();
    };
    GameManager.prototype.update=function(){
        this.world.time+=0.1;
        if(this.world.time>255){
            this.world.time=0;
        }
        this.world.forEveryLoaded(function(block){
            if(block.breakPhase>0){
                block.breakPhase*=0.99;
                if(block.breakPhase<0.01) block.breakPhase=0;
            }
        })
    };
    GameManager.prototype.render=function(){
        this.world.draw(this.drawer);
        this.drawer.drawPlayer(this.world);
    };
    GameManager.prototype.loop=function(){
        var now=Date.now();
        var elapsed=now-this.lastFrame;
        this.lastFrame=now;
        this.lag+=elapsed;
        if(this.lag>this.securityMs) this.lag=this.securityMs;
        while(this.lag>=this.updateMs){
            this.lag-=this.updateMs;
            this.update();
        }
        this.render();
        window.requestAnimationFrame(this.loop.bind(this));
    };
    GameManager.prototype.init=function(){
        this.drawer.reset();
        this.world.generate();
        this.loop();
    };
    return GameManager;
});