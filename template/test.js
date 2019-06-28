const aux = require("../aux/aux.js")


// 校验函数
function check(a,b){
  return aux.eq(a,b)
}

// 测试用例表
cases = [
{
  input:[]
  expect:0
},
] // cases

// 测试用例生成器
generator = {
  random:{
    func:function(len){
      
    },
    call:[]
  }
} //generator



aux.test(require("../src/@1.js"))