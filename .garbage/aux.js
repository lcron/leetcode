
// usage: require("<file>")()
module.exports = function(){
print=function(){
  for (var i=0; i<arguments.length;i++)
  process.stdout.write(arguments[i]+" ")
}

// 对象深比较
eq=function(a,b) {
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
timer = {
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

// 测试器

test_quiet = (proc,input,expect)=>{
  var res = {}
  timer.start()
  res.output = proc.apply(null,input)
  res.time = timer.end()
  res.pass = eq(res.output,expect)
  return res
}
/*


0 全部不显示
1 只显示结果
2 同 1，不通过时显示实际输出和预期输出
3 同 2，不通过时显示输入
4 同 2，始终显示输入，默认
5 同 4，始终显示输出和预期
*/
test=(proc,input,expect,loglv)=>{
  loglv = typeof loglv == "number"?loglv:4
  var msg = {
    input:"",
    output:"",
    res:""
  }
  input.forEach(function(v,i){
    msg.input+="[input "+i+"]  " + v+"\n"
  })
  
  var res = test_quiet(proc,input,expect)

  msg.res = loglv > 0?((res.pass?"PASS":"FAIL")+" in "+res.time+" ms \n"):""
  msg.output = loglv>4 || (loglv > 1 && !res.pass)?( " - res: "+res.output+"\n - exp: "+expect+"\n"):""
  msg.input = (res.pass&&loglv>2) || loglv > 3?msg.input:""
  var _msg = msg.input+msg.output+msg.res
  if(_msg)
    console.log(_msg)
/*
  
  console.log("%s in %d ms\n%s",res.pass?"PASS":"FAIL",res.time,res.pass?"":("exp: "+expect+"\nres: "+res.output+"\n"))
*/
  return res
}
/*
0 全部不显示
1 只显示总结果
2 同1，列出不通过的测试用例，
3 同2，完成一次后输出结果 默认
4+ test loglv-2 如果cases是数组时默认
...7
*/
tests = function(proc,cases,count,loglv){
  var arr = false
  if(cases instanceof Array){
    count = cases.length
    loglv = typeof loglv == "number"?loglv:6
    arr = true
    _cases = cases
    cases = (i)=>{return _cases[i]}
  }else{
    loglv = typeof loglv == "number"?loglv:3
    count = count || 100
  }
  
  console.log("==== Start =============")
  var i,_res,res={
    pass:0,
    fail:0,
    time:0,
    percent:0
  }
  var fail_msg = "---- FAILED ------------\n"
  for(i=0;i<count;i++){
    var _case = cases(i)
    if(!_case){
      break
    }
    if (loglv > 2){
      console.log("Test case ["+i+"] : ")
    }
    _res = test(proc,_case[0],_case[1],loglv-2)

    res.time += _res.time
    if(_res.pass){
      res.pass ++
    }else{
      res.fail ++
      _case[0].forEach(function(v,i){
    fail_msg+="[input "+i+"]  " + v+"\n"
      })
    fail_msg+=" res: "+_res.output+"\n exp: "+ _case[1]+"\n"
    }

  } // for i

  
  
  //console.log(res)
  var msg = "---- RESULT ------------\n"+
  "Test "+i+" cases in "+res.time+" ms.\n "+
  res.pass+" pass, "+ (i-res.pass)+" fail. \t"+(res.pass*100/i)+"%\n"
  console.log(loglv>1?fail_msg:"")
  console.log(msg)
  
  return res
} // tests

// 生成器

rand = (max,min)=>{
  max = max || 0x7FFFFFFF
  min = min || 0
  if(max < min){
    var tmp = max
    max = min
    min = tmp
  }
  return Math.floor(Math.random()*(max+1-min)+min)
}
rand_array =(len,max,min,only)=>{
  max = max || max == 0?0:0x7FFFFFFF
  min = min || 0
  if(max < min){
    var tmp = max
    max = min
    min = tmp
  }
  var a = [],n
  for(var i=0;i<len;i++){
    for(var j=min;j<max;j++){
      n = rand(max,min)
      if(!(only && a.indexOf(n)!=-1)){
        a[i] = n
        break
      }
    }
  }

  return a
}

line_array = (len,start) =>{
  start = start || 0
  var a = []
  for(var i = 0; i < len;i++){
    a[i] = ++start
  }
  return a
}

mixup=(a)=>{
  for(var i=0;i<a.length;i++){
    var x = rand(a.length-1)
    var y = rand(a.length-1)
    var tmp = a[x]
    a[x] = a[y]
    a[y] = tmp
    
  }
  return a
}

} // module.exports