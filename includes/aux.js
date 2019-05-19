
module.exports = {
eq:(a,b) => {a==b},
eqArray:(a,b) => {
  if(!(a instanceof Array && b instanceof Array) ) 
    return false

  for(var i in a){
    if(a[i] instanceof Array && !arguments.callee(a[i],b[i]))
      return false
    if(!a[i] === b[i])
      return false
  }
  return true
},
test:function(fun,args,expect,check){
  console.log(args)
  var res = fun.apply(null,args)
  
  if(check(res,expect)){
    console.log("success")
    return true
  }else{
    console.log("fail")
    return false
  }
  
},

unpack:function(){
  eq=this.eq
  test=this.test
  eqArray=this.eqArray
}
}