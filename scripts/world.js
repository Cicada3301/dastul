define(['blocks', 'generation'], function(Blocks, Generation){
    function World(width, height, seed, roughness){
        this.cells=[];
        this.loadedSize={
            width:50, height:Math.floor(50*(window.innerHeight/window.innerWidth))+1
        };
        this.offset={
            x:0, y:0
        };
        this.loaded=[];
        this.name='';
        this.width=width;
        this.height=height;
        this.time=0;
        this.spawnPoint={x:0, y:0};
        this.roughness=roughness;
        this.seed={
            original:seed,
            value:seed
        };
        this.generation=new Generation(this, roughness);
        this.pos={
            x:60, y:60
        };
    }
    World.prototype.setSpawnPoint=function(){
        for(var row=this.height-1; row>0; --row){
            if(this.checkBlock(Math.floor(this.width/2), row-1, ['grass'])){
                row=0;
                this.spawnPoint.x=Math.floor(this.width/2);
                this.spawnPoint.y=row;
            }
        }
    };
    World.prototype.checkBlock=function(x, y, ids){
        if(this.cells[x]) if(this.cells[x][y]) return ids.indexOf(this.cells[x][y].id)>=0||ids.indexOf(Blocks.ids[this.cells[x][y].id])>=0;
    };
    World.prototype.checkLoadedBlock=function(x, y, ids){
        if(this.loaded[x]) if(this.loaded[x][y]) return ids.indexOf(this.loaded[x][y].id)>=0||ids.indexOf(Blocks.ids[this.loaded[x][y].id])>=0;
    };
    World.prototype.setLoaded=function(){
        this.loaded.length=0;
        for(var col=0; col<this.loadedSize.width; ++col){
            this.loaded.push([]);
            for(var row=0; row<this.loadedSize.height; ++row){
                if(this.checkBlock(col+this.pos.x, row+this.pos.y, Blocks.ids)) this.loaded[col][row]=this.cells[col+this.pos.x][row+this.pos.y];
            }
        }
    };
    World.prototype.addOffset=function(value, coord){
        if(coord==='y') {
            this.offset[coord] += value;
            if (this.offset[coord] < 0) {
                this.offset[coord] = 1;
                this.pos[coord]-= 1;
                this.setLoaded();
            } else if (this.offset[coord] > 1) {
                this.offset[coord] = 0;
                this.pos[coord] += 1;
                this.setLoaded();
            }
        }else{
            this.offset.x-= value;
            if (this.offset.x < 0) {
                this.offset.x = 1;
                this.pos.x += 1;
                this.setLoaded();
            } else if (this.offset.x > 1) {
                this.offset.x = 0;
                this.pos.x -= 1;
                this.setLoaded();
            }
        }
    };
    World.prototype.generate=function(){
        this.seed.value=this.seed.original;
        if(false) {
            var generation = new Worker('scripts/generate.js');
            generation.onmessage = function (e) {
                this.cells = e.data;
                generation.terminate();
            };
            generation.postMessage({width: this.width, height: this.height, roughness: this.roughness, seed: this.seed});
        }else this.generation.generate();
    };
    World.prototype.draw=function(drawer){
        drawer.drawWorldPreps(this);
        this.forEveryLoaded(function(block, nope, col, row){
            block.draw(drawer, col, row);
        });
    };
    World.prototype.forEvery=function(fn){
        for(var col=0; col<this.width; ++col){
            for(var row=0; row<this.height; ++row){
                if(this.checkBlock(col, row, Blocks.ids)) fn(this.cells[col][row], col, row);
            }
        }
    };
    World.prototype.forEveryLoaded=function(fn){
        for(var col=0; col<this.loadedSize.width; ++col) {
            for (var row = 0; row < this.loadedSize.height; ++row) {
                if(this.checkLoadedBlock(col, row, Blocks.ids)) fn(this.loaded[col][row], this.cells[col+this.pos.x][row+this.pos.y], col, row);
            }
        }
    };
    return World;
});