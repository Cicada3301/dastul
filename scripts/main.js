require(['GameManager'], function (GameManager) {
    confirm('use arrow keys to move, P to place blocks and O to destroy them, there is no block selection yet. Input your seed and wait a few seconds for the world to generate. ver0.0.1');
    var values={
        height:256,
        width:128,
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