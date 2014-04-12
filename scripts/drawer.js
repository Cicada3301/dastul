define(['blocks'], function(Blocks){
    function Drawer(){
        this.canvas=document.getElementById('canvas');
        this.ctx=this.canvas.getContext('2d');
    }
    Drawer.prototype.reset=function(){
        this.canvas.width+=0;
        this.ctx=this.canvas.getContext('2d');
    };
    Drawer.prototype.drawBlock=function(block){
        this.ctx.drawImage(Blocks[Blocks.ids[block.id]].sprite, block.x*Blocks.width, block.y*Blocks.height)
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