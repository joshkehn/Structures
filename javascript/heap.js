// # Heap structure

function Heap () {
    this.content = [];
};

Heap.prototype.push = function push (value) {
    this.content.push(value);
    this.upheap(this.content.length - 1);
};

Heap.prototype.pop = function pop () {
    var first = this.content[0],
        end = this.content.pop();

    if (this.content.length > 0) {
        this.content[0] = end;
        this.downheap(0);
    }
    return first;
};

Heap.prototype.remove = function (node) {
    var len = this.content.length;

    for (var i = 0; i < len; i++) {
        if (this.content[i] === node) {
            var end = this.content.pop();

            if (i != (len - 1)) {
                this.content[i] = end;
                if (end < node) {
                    this.upheap(i);
                } else {
                    this.downheap(i);
                }
            }
            return;
        }
    }
    return false;
};

Heap.prototype.size = function size () {
    return this.content.length;
};

Heap.prototype.get_parent = function get_parent (n) {
    return Math.floor((n + 1) / 2 - 1);
};

Heap.prototype.upheap = function upheap (n) {
    var element = this.content[n];

    while (n > 0) {
        var parentN = this.get_parent(n),
            parent = this.content[parentN];
        if (element < parent) {
            this.content[parentN] = element;
            this.content[n] = parent;
            n = parentN;
        } else {
            break;
        }
    }
};

Heap.prototype.downheap = function downheap (n) {
    var length = this.content.length,
        element = this.content[n];

    while (true) {
        var child2N = (n + 1) * 2,
            child1N = child2N - 1,
            swap = null;

        if (child1N < length) {
            var child1 = this.content[child1N];

            if (child1 < element) {
                swap = child1N;
            }
        }

        if (child2N < length) {
            var child2 = this.content[child2N];

            if (child2 < (swap === null ? element : child1)) {
                swap = child2N;
            }
        }

        if (swap) {
            this.content[n] = this.content[swap];
            this.content[swap] = element;
            n = swap;
        }
        else {
            break;
        }
    }
};

var heap = new Heap();
for (var j = 0; j < 100; j++) {

    for (var i = 0; i < 1000000; i++) {
        heap.push(Math.random() * 1000000 | 0);
    }

    while(heap.size() > 0) {
        heap.pop();
    }
}