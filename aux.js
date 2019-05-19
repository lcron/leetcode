
// usage: require("<file>")()
module.exports = function(){
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

test=(proc,input,expect)=>{
  input.forEach(function(v,i){
    console.log("[input "+i+"]  " + v)
  })

  var res = test_quiet(proc,input,expect)

  console.log("%s in %d ms\n%s",res.pass?"PASS":"FAIL",res.time,res.pass?"":("exp: "+expect+"\nres: "+res.output+"\n"))
  return res
}

tests = function(proc,cases,count){
  var arr = false
  if(cases instanceof Array){
    arr = true
    _cases = cases
    cases = (i)=>{return _cases[i-1]}
  }
  
  console.log("==== Start =============")
  var i,res,pass=0
  timer.start()
  for(i=1;true;i++){
    var _case = cases(i)
    if(!_case){
      break
    }
    if (arr)
      console.log("Test case "+i+": ")
    res = (arr?test: test_quiet)(proc,_case[0],_case[1])
    
   pass += res.pass?1:0
    
  } // for i

  --i
  var time = timer.end()
  var msg = "---- RESULT ------------\n"+
  "Test "+i+" cases in "+time+" ms.\n "+
  pass+" pass, "+ (i-pass)+" fail. \t"+(pass*100/i)+"%\n"
  console.log(msg)
  
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
  max = max || 0x7FFFFFFF
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