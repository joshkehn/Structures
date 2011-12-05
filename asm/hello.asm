; hello.asm - A "Hello, world" program using NASM

section .text

global mystart ; Make the main function externally visible

mystart:

; 1 print "Hello, world!"

    ; 1a Prepare the arguments for the system call to write
    push dword mylen
    push dword mymsg
    push dword 1

    ; 1b Make the system call to write
    mov eax, 0x4
    sub esp, 4
    int 0x80

    ; 1c clean up the stack
    add esp, 16

; 2 exit the program

    push dword 0 ; Exit status returned to the os

    mov eax, 0x1
    sub esp, 4
    int 0x80

    ; No cleanup because no code would be executed

section .data

    mymsg db "Hello, world!", 0xa
    mylen equ $-mymsg
