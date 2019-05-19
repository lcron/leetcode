// leetcode


function proc(nums,target){

  for(var i=0;i<nums.length-1;i++){
    for(var j=i;j<nums.length;j++){
       if(nums[i]+nums[j] == target)
         return [i,j]
    }
  }
  return null
  //return [-1,-1]
}

require("../aux.js")()

cases=[
[[[2,7,9,11,15],9],[0,1]],
[[[2,7,9,11,15],11],[0,2]],
[[[2,7,9,11,15],20],[2,3]],
[[[2,7,9,11,15],25],[2,5]],// fail

] // cases

tests(proc,cases)

function randcase(level){
  return function(i){
    var a = rand_array(level)
    var expect = rand_array(2,0,level-1,true).sort((a,b)=>a-b)
    
    return [[a,a[expect[0]]+a[expect[1]]],expect]
  }
}


tests(proc,randcase(10),10)

console.log("level: ",100)
tests(proc,randcase(100),10,2)

console.log("level: ",1000)
tests(proc,randcase(1000),10,1)

console.log("level: ",10000)
tests(proc,randcase(10000),10,1)

console.log("level: ",50000)
tests(proc,randcase(50000),10,1)
