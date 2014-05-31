define(function(){
    function Controls(gm){
        this.down=40;
        this.right=39;
        this.up=38;
        this.left = 37;
        this.place = 80;
        this.destroy = 79;
        this.gm=gm;
    }
    return Controls;
});