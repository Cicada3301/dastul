define(function(){
    var mathUtils={
        getRandomBoolean:function(n, seed){
            return (((Math.sin(seed.value++)/2+0.5)*10000)%100)/100<n;
        },
        getRandomInt:function(min, max, seed){
            return min+Math.round((((Math.sin(seed.value++)/2+0.5)*10000)%100)/100*(max-min));
        },
        isBetween:function(point, min, max){
            return point>min&&point>max
        }
    };
    return mathUtils;
});