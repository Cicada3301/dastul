define(['blocks'], function(Blocks){
    function Drawer(world){
        this.world=world;
        this.blocks={};
        this.canvas=document.getElementById('canvas');
        this.canvas.width=window.innerWidth;
        this.canvas.height=window.innerHeight;
        this.canvas.style.position='absolute';
        this.canvas.style.top=0;
        this.canvas.style.left = 0;

        this.blocks.width = (this.canvas.width / Math.max(this.world.loadedSize.width - 2, this.world.loadedSize.height - 2)) | 0;
        this.blocks.height = this.blocks.width;
        this.canvas.width = this.blocks.width * this.world.loadedSize.width;
        this.canvas.height = this.blocks.height * this.world.loadedSize.height;
        this.ctx = this.canvas.getContext('2d');
    }
    Drawer.prototype.reset=function(){
        this.canvas.width+=0;
        this.ctx=this.canvas.getContext('2d');
        this.ctx.imageSmoothingEnabled=false;
    };
    Drawer.prototype.drawPlayer=function(world){
        this.ctx.fillStyle='red';
        this.ctx.fillRect(((world.playerPos.x-world.pos.x)*this.blocks.width)|0, (this.canvas.height-(world.playerPos.y-world.pos.y)*this.blocks.height)|0, this.blocks.width, 2*this.blocks.height);
    };
    Drawer.prototype.drawBlock=function(block, x, y){
        this.ctx.drawImage(Blocks[Blocks.ids[block.id]].sprite, (x*this.blocks.width+this.world.offset.x*this.blocks.width-this.blocks.width)|0, (this.canvas.height-y*this.blocks.height+this.world.offset.y*this.blocks.height)|0, this.blocks.width, this.blocks.height);
        this.ctx.fillStyle='rgba(0, 0, 0, '+(1-block.lightLevel)+')';
        this.ctx.fillRect((x*this.blocks.width+this.world.offset.x*this.blocks.width-this.blocks.width)|0, (this.canvas.height-y*this.blocks.height+this.world.offset.y*this.blocks.height)|0, this.blocks.width|0+1, this.blocks.height|0+1);
        /*this.ctx.fillStyle='rgba(200, 200, 200, '+block.breakPhase+')';
        this.ctx.fillRect(x*this.blocks.width+this.world.offset.x*this.blocks.width-this.blocks.width-0.5, this.canvas.height-y*this.blocks.height+this.world.offset.y*this.blocks.height-0.5, this.blocks.width+1, this.blocks.height+1);
    */
    };
    Drawer.prototype.drawWorldPreps = function () {
        //var time = world.time | 0;
        //this.ctx.fillStyle = 'rgb(' + (255-time) + ', 20, ' + time + ')';
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    return Drawer;
});