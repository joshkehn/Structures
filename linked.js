var Node = function (val) {
    var self = this,
        v = val,
        next = null;
    
    self.set = function (val) {
        v = val;
    };
    
    self.get = function () {
        return v;
    };
    
    self.setNext = function (n) {
        next = n;
    };
    
    self.getNext = function () {
        return next;
    };
    
    return self;
};

var LinkedList = function () {
    var self = this,
        first = null;
        last = first;
        
    if ( ! this instanceof LinkedList )
    {
        return new LinkedList();
    }
    
    self.add = function (val)
    {
        var n;
        if (!first)
        {
            first = new Node();
            first.set(val);
            last = first;
        }
        else
        {
            n = new Node(val);
            last.setNext(n);
            last = n;
        }
    };
    
    self.remove = function (val)
    {
        var current, prev, next;
        
        // Check if we have a list
        if (!first)
        {
            return false;
        }
        
        // Find the correct value
        current = first;
        while (current.get() !== val)
        {
            prev = current;
            current = current.getNext();
        }
        
        // Remove the node
        if (prev)
        {
            prev.setNext(current.getNext());
        }
        else
        {
            // Value was in the first node, remove it.
            first = null;
        }
    }
    
    self.tree = function (each)
    {
        var current = first;
        while (current)
        {
            each(current.get());
            current = current.getNext();
        }
    };
    
    return self;
};

LinkedList.prototype.Node = Node;

exports.Node = Node;
module.exports = LinkedList;