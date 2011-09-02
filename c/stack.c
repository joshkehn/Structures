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
    push(ref, 1);
    push(ref, 2);
    push(ref, 3);
    push(ref, 4);
    push(ref, 5);
    printf("popped: %d\n", pop(ref));
    printf("popped: %d\n", pop(ref));
    printf("popped: %d\n", pop(ref));
    printf("popped: %d\n", pop(ref));
    printf("popped: %d\n", pop(ref));
    return 0;
}