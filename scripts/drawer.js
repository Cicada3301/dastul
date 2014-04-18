define(['blocks'], function(Blocks){
    function Drawer(world){
        this.blocks={};
        this.canvas=document.getElementById('canvas');
        this.ctx=this.canvas.getContext('2d');
        this.canvas.width=window.innerWidth;
        this.canvas.height=window.innerHeight;
        this.canvas.style.position='absolute';
        this.canvas.style.top=0;
        this.canvas.style.left=0;
        this.blocks.width=this.canvas.width/world.width;
        this.blocks.height=this.blocks.width;
    }
    Drawer.prototype.reset=function(){
        this.canvas.width+=0;
        this.ctx=this.canvas.getContext('2d');
    };
    Drawer.prototype.drawBlock=function(block){
        this.ctx.drawImage(Blocks[Blocks.ids[block.id]].sprite, block.x*this.blocks.width, this.canvas.height-block.y*this.blocks.height, this.blocks.width, this.blocks.height);
    };
    Drawer.prototype.drawBackground=function(time){
        var gradient=this.ctx.createLinearGradient(0, this.canvas.height, 0, 0);
        gradient.addColorStop(0, 'rgb(0, 0, 0)');
        gradient.addColorStop(1, 'rgb('+(255-time)+', 20, '+time+')');
        this.ctx.fillStyle=gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    };
    return Drawer;
});