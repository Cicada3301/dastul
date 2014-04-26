/*importScripts('/game/require.js');
require(['generation'], function(Generation){
    onmessage=function(obj){
        var cells=(new Generation(obj)).generate();
        postMessage(cells);
    }
});*/
importScripts('/game/require.js');
console.log('cheese');
require(['generation'], function(Generation){
    console.log('cheese1');
    onmessage=function(obj){
        console.log('cheese2');
        var cells=(new Generation(obj)).generate();
        postMessage(cells);
    }
});