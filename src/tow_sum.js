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
     
    return null
  }
}

tests(proc,randcase(100),1000)





