// leetcode


function proc(dividend,divisor){
  var x = Math.abs(dividend)
  var y = Math.abs(divisor)
  var sign = (dividend >= 0 && divisor >=0) || (dividend < 0 && divisor < 0)?0:1
  var q = 0
  if (y == 1){
    return sign?-x:x
  }
  for(;x-y >= 0;x-=y){
   q++
  }
  return sign?-q:q
}

require("../aux.js")()

cases=[
[[10,3],3],
[[20,4],5],
] // cases

tests(proc,cases)

function randcase(level){
  return function(i){
    var x = rand(-1000,1000)
    var y = rand(-1000,1000)
    return [[x*y,y],x]
  }
}

tests(proc,randcase(100),1000)


