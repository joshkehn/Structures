#include <stdlib.h>
#include <stdio.h>
#include <string.h>

// Heap struct to use
typedef struct
{
    const int size;     // Size for each heap is constant
    int index;          // Current index position
    int * content;      // Content pointer
} HEAP;

// ### upheap (HEAP * h, int n)
// #### h `{* HEAP}` Pointer to heap for manipulation
// #### n `{int}` Upheap from this position
// Starting at position `n` rebalance the heap upwards.
void upheap (HEAP * h, int n)
{
    // Create a temporary copy of the data at location `n` in `h->content`.
    int tmp = h->content[n];

    // Continue until a break or `n` is at the root node.
    while (n > 0)
    {
        // Pull the parent values for `n`
        int parentN = (int) (n + 1) / 2 - 1;
        int parent = h->content[parentN];

        // Are we swapping?
        if (tmp < parent)
        {
            // Swap
            h->content[parentN] = tmp;
            h->content[n] = parent;
            n = parentN;
            continue;
        }

        // No swap means break
        break;
    }
}

// ### downheap (HEAP * h, int n)
// #### h `{* HEAP}` Pointer to heap for manipulation
// #### n `{int}` Downheap from this position
// Starting at position `n` rebalance the heap downwards.
void downheap (HEAP * h, int n)
{
    // First pull the length and element aside.
    int length = h->index;
    int elem = h->content[n];

    // Repeat until a `break` statment is hit.
    for(;;)
    {
        int child2N = (n + 1) * 2;
        int child1N = child2N - 1;
        int child1, child2, swap, swap_set = 0;

        // Check the first child
        if (child1N < length)
        {
            child1 = h->content[child1N];

            if (child1 < elem)
            {
                swap = child1N;
                swap_set = 1;
            }
        }

        // Check the second child
        if (child2N < length)
        {
            child2 = h->content[child2N];

            if (child2 < (swap_set == 0 ? elem : child1))
            {
                swap = child2N;
                swap_set = 1;
            }
        }

        // If we found a swap
        if (swap_set == 1)
        {
            h->content[n] = h->content[swap];
            h->content[swap] = elem;
            n = swap;
            swap_set = 0;
            continue;
        }

        // No swap, stop.
        break;
    }
}

void push (HEAP * h, int val)
{
    if (h->index > h->size)
    {
        printf("Error: Heap overflow\n");
        // printf("Index %d, is larger then size %d", h->index, sizeof(h->content));
        exit(1);
    }
    else
    {
        h->content[h->index] = val;
        upheap(h, h->index++);
    }
}

int pop (HEAP * h)
{
    int first = h->content[0];

    if (h->index <= 0)
    {
        printf("Heap underflow.");
        exit(1);
    }

    int end = h->content[--h->index];

    if (h->index > 0)
    {
        h->content[0] = end;
        downheap(h, 0);
    }
    return first;
}

void * createheap (int size)
{
    HEAP real_h = {size};
    HEAP * h = malloc(sizeof(*h));

    memcpy(h, &real_h, sizeof(*h));
    h->content = malloc(sizeof(int) * size);
    return h;
}

int destroyheap (HEAP * heap)
{
    free(heap->content);
    free(heap);
    return 0;
}

int main ()
{
    int i, pushes = 0, pops = 0;
    HEAP * tree;


    printf("Creating heap.\n");
    tree = createheap(1000000);

    printf("Filling heap.\n");
    for(i = 0; i < 1000000; i++, pushes++)
    {
        push(tree, rand());
    }
    printf("Pushed %d values.\n", pushes);

    printf("Emptying heap.\n");
    for(i = 0; i < 1000000; i++, pops++)
    {
        pop(tree);
    }
    printf("Popped %d values.\n", pops);

    destroyheap(tree);
    return 0;
}