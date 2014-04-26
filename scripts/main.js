require(['GameManager'], function(GameManager){
    var values={
        height:128,
        width:2048,
        seed:parseInt(prompt('seed')),
        roughness:0.52
    };
    var dastul = new GameManager(values);
    window.dastul = dastul;
    dastul.init();
    document.addEventListener('keydown', function(e){
        dastul.keydown(e.keyCode, e);
    });
});