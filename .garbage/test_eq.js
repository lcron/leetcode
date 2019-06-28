// leetcode


function proc(){

}

require("../aux.js")()

cases=[
[[1,1],true],
[[1,0],false],
[[[1,2,3,4],[1,2,3,4]],true],
[[1,1],false],//fail
[[[1,2],[2,3]],true],//fail
[[[3,4],[3,4,5]],false],//fail
] // cases

tests(eq,cases)

function randcase(level){
  return function(i){
    
    return null
  }
}

//tests(proc,randcase(100),1000)


console.log(eq([1,2],[2,3]))
console.log(eq(null,[1,2]))