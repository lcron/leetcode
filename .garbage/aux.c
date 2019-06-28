
#include "aux.h"

int rand_int(int min,int max){
  srand(time(0));
  int n = rand();
  return n%(max-min)+min;
}