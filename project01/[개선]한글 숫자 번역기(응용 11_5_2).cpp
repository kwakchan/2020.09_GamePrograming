#include <stdio.h>
int main(void)
{
   unsigned long long money, num1, num2, temp;
   unsigned long long m_unit[]={1000000000000, 100000000, 10000, 1}; // �� ����� ��  �� ��������; 1,000,000,000,000 �߰� 
   unsigned long long m_unit01[]={1000, 100, 10};
   
   int i, j;
   char *unit01[]={"��", "��", "��", "��"}; // �� ����� ��  �� ��������; ������ �߰� 
   char *unit02[]={"õ", "��", "��"};
   
   printf("�ݾ��� �Է��ϰ� Enter>");
   scanf("%llu", &money);  //  �� ����� ��  �� ��������; unsigned long long �ڷ��� ���Ĺ���  llu ��ü 
   printf("\n ȭ����� ȭ����� \n");
   
   if(money>1,000,000,000,000,000){ // �� ���� �ʰ� �� [�����ʰ�]��� ���; 1���������� ��� 
   		printf("\�����ʰ�\n");
   		return 0;
   }
   
   else{
   
	  
	   for(i=0; i<4; i++) // �� ����� ��  �� �������� ; 
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
