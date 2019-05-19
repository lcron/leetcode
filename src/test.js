log = console.log
require("../aux.js")()

// 生成器测试

log(rand_array(10))
log(rand_array(10,1))
log(rand_array(10,1))
log(rand_array(10,1))
log(rand_array(10,1))
log(rand_array(10,1,0,1))

log(""+rand_array(90,1,100,1).sort((a,b)=>a-b))

log (""+mixup(line_array(100)))