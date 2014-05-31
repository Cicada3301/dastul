define(['blocks', 'generation'], function(Blocks, Generation){
    function World(width, height, seed, roughness) {
        var _this = this;
        this.cells=[];
        this.loadedSize={
            width:50, height:(50*(window.innerHeight/window.innerWidth))|0+2
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
            x: (this.width / 2) | 0, y: (this.height / 2) | 0,
            set: function (x, y) {
                _this.pos.setCoord(x, 'x');
                _this.pos.setCoord(y, 'y');
            },
            setCoord: function (n, coord) {
                _this.playerPos[coord] -= _this.pos[coord];
                _this.playerPos[coord] += n;
                _this.pos[coord] = n;
                _this.setLoaded();
            },
            add: function (x, y) {
                _this.pos.addCoord(x, 'x');
                _this.pos.addCoord(y, 'y');
            },
            addCoord: function (n, coord) {
                _this.playerPos[coord] += n;
                _this.pos[coord] += n;
                _this.setLoaded();
            }
        };
        this.playerPos = {
            x: this.pos.x + ((this.loadedSize.width / 2) | 0),
            y: this.pos.y + ((this.loadedSize.height / 2) | 0)
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
    /*World.prototype.addOffset = function (value, coord) {
        this.offset[coord]+=value;
        if (this.offset[coord] < 0) {
            while (this.offset[coord] < 0) {
                ++this.offset[coord];
                this.pos.addCoord(1, coord);
            }
        } else if (this.offset[coord] > 1) {
            while (this.offset[coord] > 1) {
                --this.offset[coord];
                this.pos.addCoord(-1, coord);
            }
        }
    };*/
    World.prototype.addOffset=function(value, coord){
        if(coord==='y') {
            this.offset[coord] += value;
            if (this.offset[coord] < 0) {
                this.offset[coord] = 1;
                this.pos[coord] -= 1;
                this.playerPos[coord] -= 1;
                this.setLoaded();
            } else if (this.offset[coord] > 1) {
                this.offset[coord] = 0;
                this.pos[coord] += 1;
                this.playerPos[coord] += 1;
                this.setLoaded();
            }
        }else{
            this.offset.x-= value;
            if (this.offset.x < 0) {
                this.offset.x = 1;
                this.pos.x += 1;
                this.playerPos[coord] += 1;
                this.setLoaded();
            } else if (this.offset.x > 1) {
                this.offset.x = 0;
                this.pos.x -= 1;
                this.playerPos[coord] -= 1;
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
        drawer.drawWorldPreps();
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
    World.prototype.placeBlock = function (x, y, block) {
        this.cells[x][y] = new Blocks[block].gen();
        this.cells[x][y].lightLevel = Math.max(this.cells[x][y + 1].lightlevel, this.cells[x + 1][y].lightLevel, this.cells[x - 1][y].lightLevel, this.cells[y - 1].lightLevel) + 1 - this.transparency;
    };
    return World;
});