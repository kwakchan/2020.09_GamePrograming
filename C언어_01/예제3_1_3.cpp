#include <stdio.h>
#include <stdlib.h>
int main(void)
{
  char ch;
  printf("문자를 입력하고 Enter>");
  scanf("%c", &ch);
  system("cls");
  system("dir");
  system("type 예제3_1_1.cpp");
  printf("입력된 문자 %c\n", ch);
  return 0;
}
