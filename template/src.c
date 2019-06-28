
int {{1}} {
  
  return 0
}

#include "aux.h"

int main(){
  int res;
  test({{1}}(),res,0,eq_int);
  test({{1}}(),res,1,eq_int);

  
  return 0;
}

// 实现接口
int check(int,int)