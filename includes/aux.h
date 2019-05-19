
#ifndef _AUX_H
#define _AUX_H

#include <stdio.h>
#include <stdlib.h>
#include <stddef.h>
#include <string.h>
#include <ctype.h>
#include <math.h>
#include <time.h>
#include <assert.h>
#include <error.h>
#include <limits.h>
#include <float.h>

// #循环，数组相关

#define loop(count,body) for(int i=0;i<count;i++){body}

char _test_success = 0;


// #计时相关

clock_t _clock_stack[16];
int _clocking = 0;

#define clock_push() _clock_stack[++_clocking] = clock();
#define clock_pop() _clock_stack[_clocking--];
#define clock_sub() (clock_pop()-clock_pop())/CLOCK_PER_SEC/1000

// #测试相关

#define eq(a,b) a==b
#define eq_array(a,b,len,res) loop(len,if(a[i]==b[i])res=1;else{res=0;break;})

#define eq_int(a,b) eq(a,b);if(!eq(a,b));



#define 


// expr: 要测试的表达式
// name: expr返回值储存
// expect: 预期结果
// check(r,e,...): 校验函数，成功返回1，失败返回0
#define test(expr,name,expect,check,...) \
  printf("TEST\t"#expr"\n");\
  clock_start();\
  name=expr;\
  clock_end();\
  _test_success = check(name,expect,__VA_ARGS__);\
  printf("%s\tused %d ms.\n",_test_success?"^_^ success":">_< fail",clock_sub())


int rand_int(int min,int max);

#endif // _AUX_H