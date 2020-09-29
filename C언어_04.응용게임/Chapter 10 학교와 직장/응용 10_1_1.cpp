#include <stdio.h>
#include <time.h>
#include <stdlib.h>
#include <conio.h>
#include <windows.h>

void number_check(int k, int i);
void digit_print(int dim[], int line);
void gotoxy(int x, int y);
void dot_print(int hour);

int zero[20] =
	{1,1,1,1,
	 1,0,0,1,
	 1,0,0,1,
	 1,0,0,1,
	 1,1,1,1};

int one[20] =
	{0,0,1,0,
	 0,0,1,0,
	 0,0,1,0,
	 0,0,1,0,
	 0,0,1,0};

int two[20] =
	{1,1,1,1,
	 0,0,0,1,
	 1,1,1,1,
	 1,0,0,0,
	 1,1,1,1};

int three[20] =
	{1,1,1,1,
	 0,0,0,1,
	 1,1,1,1,
	 0,0,0,1,
	 1,1,1,1};

int four[20] =
	{1,0,0,1,
	 1,0,0,1,
	 1,1,1,1,
	 0,0,0,1,
	 0,0,0,1};

int five[20] =
	{1,1,1,1,
	 1,0,0,0,
	 1,1,1,1,
	 0,0,0,1,
	 1,1,1,1};

int six[20] =
	{1,0,0,0,
	 1,0,0,0,
	 1,1,1,1,
	 1,0,0,1,
	 1,1,1,1};

int seven[20] =
	 {1,1,1,1,
	  1,0,0,1,
	  1,0,0,1,
	  0,0,0,1,
	  0,0,0,1};

int eight[20] =
	 {1,1,1,1,
	  1,0,0,1,
	  1,1,1,1,
	  1,0,0,1,
	  1,1,1,1};

int nine[20] =
	{1,1,1,1,
	 1,0,0,1,
	 1,1,1,1,
	 0,0,0,1,
	 0,0,0,1};



int main(void)
{
	time_t current;
	struct tm *d;
	int hour, min, sec, y; 
	long time_number;
	system("cls");
	printf("디지털 시계 프로그램\n\n");
	printf("아무키나 누르면 현재시간을 출력합니다.\n");
	getch();
	system("cls");
	while(!kbhit())
	{
		current=time(NULL);
		d=localtime(&current);
		hour=d->tm_hour*10000;
		min=d->tm_min*100;
		sec=d->tm_sec;
		time_number=hour+min+sec;
		gotoxy(1,3);
		for(y=0;y<=4;y++)
		{
			number_check(time_number, y);
			printf("\n");
		}
		dot_print(time_number);
		printf("\n\n\n\n아무키나 누르면 종료합니다.\n");
	}
	return 0;
}


void number_check(int k, int i)
{
 if (k>=1)
  {
  number_check(k/10, i);
  switch(k%10)
  {
  case 0 : 
	  digit_print(zero, i);
	  break;
  case 1 : 
	  digit_print(one, i);
	  break;
  case 2 : 
	  digit_print(two, i);
	  break;
  case 3 : 
	  digit_print(three, i);
	  break;
  case 4 : 
	  digit_print(four, i);
	  break;
  case 5 : 
	  digit_print(five, i);
	  break;
  case 6 : 
	  digit_print(six, i);
	  break;
  case 7 : 
	  digit_print(seven, i);
	  break;
  case 8 : 
	  digit_print(eight, i);
	  break;
  case 9 : 
	  digit_print(nine, i);
	  break;
  }
  }
}


void digit_print(int dim[], int line)
{
 int i;
 for(i=line*4;i<=line*4+3; i++)
  if (dim[i]==1)
	 printf("■");
  else
	 printf("  ");
 printf("     ");
}

void gotoxy(int x, int y)
{
   COORD Pos = {x - 1, y - 1};
   SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), Pos);
}

void dot_print(int hour)
{
	int i;
	if (hour<100000)
	{
		for(i=0;i<2;i++)
		{
			gotoxy(10+(i*27), 4);
			printf("■");
			gotoxy(10+(i*27), 6);
			printf("■");
		}
	}
	else
	{
		for(i=0;i<2;i++)
		{
			gotoxy(24+(i*26), 4);
			printf("■");
			gotoxy(24+(i*26), 6);
			printf("■");
		}
	}
}
