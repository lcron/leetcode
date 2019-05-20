
#include "aux.h"

#define _F function
int _F(){
  
  return 0
}

int main(){
  int res;
  test(_F(),res,0,eq_int);
  test(_F(),res,1,eq_int);

  
  return 0;
}

/*
TEST func(args) ...500 ms
REALITY
EXPECT 
fail success


*/