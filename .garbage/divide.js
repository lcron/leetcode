// leetcode #29

// 同号相减异号相加
// 同号相减 商上1，异号相加 商上0

// x/y ==> x*n / y*n ==> 
function proc(x,y){
  


}

require("../aux.js")()

cases=[
[[10,3],3],
[[20,5],4],
] // cases

tests(proc,cases)

function randcase(level){
  return function(i){
    
    return null
  }
}

//tests(proc,randcase(100),1000)



/*
function proc(x,y){
  var q=[],r
  if ((x > 0 && y > 0)||(x<0&&y<0))
    r = x-y
  else
    r = x+y
  while(true){
    if ((r > 0 && y > 0)||(r<0&&y<0)){ 
       // 同号相减商上1
       q.push(1)
       r <<=1
       r = r-y
    }else{
       q.push(0)
        r <<=1
        r = r+y

    }
console.log(q)
if (q.length>3){
  break
}
  }
  return 
}

*/

