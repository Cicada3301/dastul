define(function(){
    var Blocks={
        standard:function(x, y, id){
            this.x=x;
            this.y=y;
            this.id=id;
            this.breakPhase=0;
        },
        ids:['air', 'rock', 'grass', 'dirt'],
        air:{
            id:0,
            sprite:new Image(),
            friction:0.01,
            hardness:1,
            breakable:false,
            solid:false,
            gettable:5,
            gen:function(x, y){
                Blocks.standard.call(this, x, y, 0);
            }
        },
        rock:{
            id:1,
            sprite:new Image(),
            friction:0.04,
            hardness:5,
            breakable:true,
            solid:true,
            gettable:3,
            gen:function(x, y){
                Blocks.standard.call(this, x, y, 1);
            }
        },
        grass:{
            id:2,
            sprite:new Image(),
            friction:0.06,
            hardness:2,
            breakable:true,
            solid:true,
            gettable:2,
            gen:function(x, y){
                this.type='grass';
                this.breakPhase=0;
                this.x=x;
                this.y=y;
            }
        },
        dirt:{
            id:3,
            sprite:new Image(),
            friction:0.08,
            hardness:3,
            breakable:true,
            solid:true,
            gettable:2,
            gen:function(x, y){
                this.type='dirt';
                this.breakPhase=0;
                this.x=x;
                this.y=y;
            }
        }
    };
    Blocks.air.sprite.src='/matei/games/dastul/game/sprites/blocks/air.png';
    Blocks.rock.sprite.src='/matei/games/dastul/game/sprites/blocks/rock.png';
    Blocks.grass.sprite.src='/matei/games/dastul/game/sprites/blocks/rock.png';
    Blocks.dirt.sprite.src='/matei/games/dastul/game/sprites/blocks/dirt.png';
    Blocks.standard.prototype.draw=function(){
        dastul.drawer.drawBlock(this);
    };
    Blocks.air.gen.prototype=Blocks.standard.create(Blocks.standard.prototype);
    Blocks.rock.gen.prototype=Blocks.standard.create(Blocks.standard.prototype);
    Blocks.grass.gen.prototype=Blocks.standard.create(Blocks.standard.prototype);
    Blocks.dirt.gen.prototype=Blocks.standard.create(Blocks.standard.prototype);

    return Blocks;
});