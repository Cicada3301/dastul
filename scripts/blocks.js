define(function(){
    var Blocks={
        standard:function(id){
            this.id=id;
            this.breakPhase=0;
            this.lightLevel=0;
        },
        ids:['air', 'rock', 'grass', 'dirt', 'flower', 'coalOre', 'ironOre', 'sapling', 'trunk', 'leaf', 'water', 'sand', 'cloud', 'bush'],
        ores:['coalOre', 'ironOre'],
        oresByChance:[],
        nature:['flower', 'sapling', 'bush'],
        natureByChance:[],
        liquids:['water'],
        is:function(cells, x, y, id){
            if(cells[x]) if(cells[x][y]) return cells[x][y].id===id
        },
        air:{
            id:0,
            friction:0.01,
            hardness:1,
            breakable:false,
            solid:false,
            gettable:5,
            transparency:0.999
        },
        rock:{
            id:1,
            friction:0.04,
            hardness:5,
            breakable:true,
            solid:true,
            gettable:3,
            transparency:0.9
        },
        grass:{
            id:2,
            friction:0.06,
            hardness:2,
            breakable:true,
            solid:true,
            gettable:2,
            transparency:0.9
        },
        dirt:{
            id:3,
            friction:0.08,
            hardness:3,
            breakable:true,
            solid:true,
            gettable:2,
            transparency:0.9
        },
        flower:{
            id:4,
            chance:0.04,
            friction:0.01,
            hardness:1,
            breakable:true,
            solid:false,
            gettable:1,
            transparency:0.999
        },
        coalOre:{
            id:5,
            chance:1,
            friction:0.75,
            hardness:6,
            breakable:true,
            solid:true,
            gettable:3,
            transparency:0.9
        },
        ironOre:{
            id:6,
            chance:0.25,
            friction:0.05,
            hardness:7,
            breakable:true,
            solid:true,
            gettable:4,
            transparency:0.9
        },
        sapling:{
            id:7,
            chance:0.03,
            friction:0.02,
            hardness:2,
            breakable:true,
            solid:false,
            gettable:2,
            transparency:0.999
        },
        trunk:{
            id:8,
            friction:0.3,
            hardness:6,
            breakable:true,
            solid:false,
            gettable:2,
            transparency:0.9
        },
        leaf:{
            id:9,
            friction:0.6,
            hardness:3,
            breakable:true,
            solid:false,
            gettable:1,
            transparency:0.998
        },
        water:{
            id:10,
            friction:0.5,
            hardness:1,
            breakable:true,
            solid:false,
            gettable:5,
            transparency:0.99
        },
        sand:{
            id:11,
            friction:0.2,
            hardness:2,
            breakable:true,
            solid:true,
            gettable:3,
            transparency:0.9
        },
        cloud:{
            id:12,
            friction:0.04,
            hardness:1,
            breakable:false,
            solid:false,
            gettable:3,
            transparency:0.3
        },
        bush:{
            id: 13,
            friction: 0.1,
            chance:0.02,
            hardness: 1,
            breakable: true,
            solid: false,
            gettable: 1,
            transparency:0.5
        }
    };
    for(var i=0; i<Blocks.ores.length; ++i){
        for(var j=0; j<Blocks[Blocks.ores[i]].chance; j+=0.01){
            Blocks.oresByChance.push(Blocks.ores[i]);
        }
    }
    for(var i=0; i<Blocks.nature.length; ++i){
        for(var j=0; j<Blocks[Blocks.nature[i]].chance; j+=0.01){
            Blocks.natureByChance.push(Blocks.nature[i]);
        }
    }
    Blocks.standard.prototype.draw=function(drawer, x, y){
        drawer.drawBlock(this, x, y);
    };
    for(var block=0; block<Blocks.ids.length; ++block){
        var type=Blocks.ids[block];
        Blocks[type].sprite=new Image();
        Blocks[type].gen=function(block){
            return function(){
                Blocks.standard.call(this, block)
            }
        }(block);
        Blocks[type].sprite.src=//'/matei/games/dastul/game/sprites/blocks/'+type+'.png';
        'file:///C:/Users/Matei/Desktop/copot.eu_matei/online/games/dastul/game/sprites/blocks/'+type+'.png';
        //'/game/sprites/blocks/'+type+'.png';
        //'../sprites/blocks/' + type + '.png';
        Blocks[type].gen.prototype=Object.create(Blocks.standard.prototype);
    }
    return Blocks;
});