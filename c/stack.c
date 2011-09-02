#include <stdlib.h>
#include <stdio.h>

typedef struct
{
    int size;
    int items[256];
} STACK;

void push (STACK * s, int x)
{
    if (s->size == 256)
    {
        fputs("Error: Stack overflow\n", stderr);
        exit(1);
    }
    else
    {
        s->items[s->size++] = x;
    }
}

int pop (STACK * s)
{
    if (s->size == 0)
    {
        fputs("Error: Stack underflow\n", stderr);
        exit(2);
    }
    else
    {
        return s->items[--s->size];
    }
}

int main()
{
    fputs("Stacking?\n", stdout);
    STACK s;
    STACK * ref = &s;
    int i;

    for(i = 0; i < 256; i++)
    {
        push(ref, i);
    }

    for(i = 0; i < 256; i++)
    {
        printf("Popped %d\n", pop(ref));
    }

    return 0;
}