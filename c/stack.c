#include <stdlib.h>
#include <stdio.h>

typedef struct
{
    const int size;
    int pos;
    int * items;
} STACK;

void push (STACK * s, int x)
{
    if (s->pos > s->size)
    {
        fputs("Error: Stack overflow\n", stderr);
        exit(1);
    }
    else
    {
        s->items[s->pos++] = x;
    }
}

int pop (STACK * s)
{
    if (s->pos == 0)
    {
        fputs("Error: Stack underflow\n", stderr);
        exit(2);
    }
    else
    {
        return s->items[--s->pos];
    }
}

int main()
{
    int size = 256;
    STACK init = {size};
    STACK * s = malloc(sizeof(*s));
    memcpy(s, &init, sizeof(*s));
    s->items = malloc(sizeof(int) * size);

    fputs("Stacking?\n", stdout);

    int i;

    for(i = 0; i < size; i++)
    {
        push(s, i);
    }

    for(i = 0; i < size; i++)
    {
        pop(s);
    }

    free(s->items);
    free(s);
    return 0;
}