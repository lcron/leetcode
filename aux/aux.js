module.exports = {
// 对象深比较
eq : function(a,b) {
  var res = a === b
  if(res)
    return true
  else if (a==null || b== null||typeof a != "object"||typeof b!="object" )
    return false

  for(var i in a){
    try {
      if(!arguments.callee(a[i],b[i]))
      return false
    }catch(e){
      return false
    }
  }

  return true
}

// 计时器
timer : {
  _stack:[],// 匿名的放在这
  _store:{},// 有名的放在这
  start:function(name){
    if(name)
      return this._store[name] = Date.now()
    return this._stack.push( Date.now())
  },
  used:function(name){
    return Date.now()-(name?this._store[name]:this._stack[this._stack.length-1])
  },
  end:function(name){
    var used = this.used(name)
    if(name)
      ;
    else 
      this._stack.pop()
    return used
  }
}

// 测试器，需实现 cases generator check 接口
test : function(proc){
  console.log("\n===== 开始 =====\n")
  
  var count = {
    sum:0,
    pass:0,
    fail:0,
  }
  
  var fail_cases = []
  var fail_generator = []
  
  for(var i in cases || []){
    timer.start()
    var real = proc.apply(null,cases[i].input)
    var time = timer.end() 
    
    if(check(real,cases[i].expect)){
      // 通过
      count.pass ++
    }else{
      // 失败
      count.fail ++
      fail_cases.push({index:i,input:cases[i].input,expect:cases[i].expect,real:real})
    }
      
  }
  
  if(typeof(generator) == "function"){
  
  }
  
  for(var i in generator || {}){
    
  }
  
  count.sum = count.pass + count.fail
  
  console.log("\n=== 测试报告 ===")
  
  
  console.log("------------")
  console.log(" "+count.pass+" 个通过\t"+count.fail+" 个失败\t共 "+count.sum+" 个")
  console.log("====================")
}

} // module.exports