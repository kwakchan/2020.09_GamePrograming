#include <stdio.h>
int main(void)
{
   unsigned long long money, num1, num2, temp;
   unsigned long long m_unit[]={1000000000000, 100000000, 10000, 1}; // ⑶ 억단위 →  조 단위까지; 1,000,000,000,000 추가 
   unsigned long long m_unit01[]={1000, 100, 10};
   
   int i, j;
   char *unit01[]={"조", "억", "만", "원"}; // ⑶ 억단위 →  조 단위까지; 조단위 추가 
   char *unit02[]={"천", "백", "십"};
   
   printf("금액을 입력하고 Enter>");
   scanf("%llu", &money);  //  ⑶ 억단위 →  조 단위까지; unsigned long long 자료형 서식문자  llu 교체 
   printf("\n 화폐단위 화폐단위 \n");
   
   if(money>1,000,000,000,000,000){ // ⑵ 범위 초과 시 [범위초과]라고 출력; 1경전까지만 허용 
   		printf("\범위초과\n");
   		return 0;
   }
   
   else{
   
	  
	   for(i=0; i<4; i++) // ⑶ 억단위 →  조 단위까지 ; 
	   {
	      num1=money/m_unit[i]; 
	      if(!num1){  
		  	continue;  
		  } 
		  temp=num1; 
	      
	    
		  for(j=0;j<3;j++)
	      {
	         num2=num1/m_unit01[j]; 
	         if (!num2){
	           continue;
	     	 }
	         printf("%llu%s", num2, unit02[j]);
			 num1=num1-num2*m_unit01[j];
	      }
	      printf("%llu%s ", num1, unit01[i]);
	      money=money-temp*m_unit[i];
	   }
	   printf("\n");
	   return 0;
 	}
}
