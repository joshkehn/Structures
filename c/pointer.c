#include <stdlib.h>
#include <stdio.h>

int main ()
{
    int anInt = 5;
    int * intPtr = &anInt;

    printf("%d", *intPtr);
    printf("%d", intPtr[0]);
    int * foo;
    foo = malloc(sizeof(int) * 12);
    foo[0] = 10;
    foo[1] = 12;
    printf("%d, %d", foo[0], foo[1]);
    return 0;
}