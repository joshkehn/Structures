// # HashTable Async

// Export function
module.exports = function (limit) {
    
    // Keep a scope reference around
    var self = this,
        
        // What we consider `undefined`
        UDEF,
        
        // Object to stuff scope into
        me = {};
        
    // Preset limit
    limit = limit || 16;
    
    // Load
    me.load = 0;
    
    // Allot the new array
    me.arr = new Array(limit);
    
    // False if `undefined` or `null`.
    function isset(val)
    {
        if (typeof val === 'undefined' || val === null)
        {
            return false;
        }
        return true;
    }
    
    // Translate an object into an integer. This could benefit from better
    // big integer handling on the JS interpreters part as well as more 
    // research into developing an efficient hashing algorithm.
    function hash(key)
    {
        var chars = JSON.stringify(key).split(''),
            hash = 5381,
            l = this.arr.length;
        for (var i = 0; i < chars.length; i++)
        {
            hash = ((hash << 5) + hash) + chars[i].charCodeAt();
        }
        return Math.abs(hash) % l;
    }
    
    // Check for a collision
    function collide(node, key, val)
    {
        if (node.k !== key)
        {
            console.log('Collision between ' + node.k + ':' + key + ' with value ' + val);
        }
        return node.k !== key;
    }
    
    // Node object to store the key and value
    function node(key, value)
    {
        return { k : key, v : value };
    }
    
    // Fetch the object from the array given a key
    function _get(key)
    {
        var idx = hash.bind(this)(key);
        
        if (isset(this.arr[idx]))
        {
            // Return actual object
            return this.arr[idx];
        }
        
        // Return our standard `undefined` value
        return UDEF;
    }
    
    // Set an object `value` to a `key`
    function _set(key, value)
    {
        this.arr[hash.bind(this)(key)] = node(key, value);
    }
    
    // Resizes the array and translates old objects
    function _reshuffle()
    {
        // New limit
        var limit = this.arr.length * 2,
            
            // Allocate new array
            narr = new Array(limit),
            
            // Calculate previous load
            load = 0,
            l = this.arr.length;
        
        // Walk through array and resie
        console.log('Resizing to ' + limit);
        while (l--)
        {
            // Only translate if the index wasn't empty (had a k/v pair)
            if (isset(this.arr[l]))
            {
                load++;
                _set.bind({arr : narr})(this.arr[l].k, this.arr[l].v);
            }
        }
        console.log('Resized to ' + limit + ' from load ' + (load / this.arr.length));
        
        // Overwrite old array
        this.arr = narr;
    }
    
    // Public `get` function, returns only the value
    self.get = function (key)
    {
        return _get.bind(me)(key).v;
    };
    
    // Public `set` function & collision logic
    self.set = function (key, value)
    {
        // First pull the object
        var obj = _get.bind(me)(key);
        
        // Do we have an object currently?
        if (!isset(obj))
        {
            // Nope, complete a normal `_set`.
            _set.bind(me)(key, value);
        }
        else
        {
            // Is this an actual collision?
            if (!collide(obj, key, hash.bind(me)(key)))
            {
                // Nope, just overwrite
                _set.bind(me)(key, value);
            }
            else
            {
                // Fuck. Force reshuffling
                _reshuffle.bind(me)();
                
                // Re-call `set`. Could have multiple collisions. 
                self.set(key, value);
            }
        }
    };
    
    // Return `self`.
    return self;
};