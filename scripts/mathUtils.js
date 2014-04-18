define(function(){
    var mathUtils={
        getRandomBoolean:function(n){
            return Math.random()<n;
        },
        getRandomInt:function(min, max){
            return min+Math.floor(Math.random()*(max-min));
        },
        isBetween:function(point, min, max){
            return point>min&&point>max
        }
    };
    return mathUtils;
});