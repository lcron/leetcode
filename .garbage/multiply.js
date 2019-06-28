// 移位乘法

function proc(x,y){
  var low = y & 1
  y >>= 1
  var res = low?x:0

  for(var i =1; y > 0;y>>=1,i++){
    res +=(y&1)? x << i:0;
  }

  return res
}

require("../aux.js")()

cases=[
[[2,3],6],
[[10,10],100],
] // cases

tests(proc,cases)

function randcase(level){
  return function(i){
    var x = rand(level)
    var y = rand(level)
    return [[x,y],x*y]
  }
}

tests(proc,randcase(10000),100000)


