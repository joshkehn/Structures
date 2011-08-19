module.exports = function (arr) {
    var self = this,
        me = {};
        
    me.arr = arr || [];
    
    self.push = function (item) {
        me.arr.push(item);
    };
    
    self.pop = function () {
        return me.arr.pop();
    };
    
    self.dump = function (each) {
        var item, results = [];
        
        while (item = self.pop())
        {
            results.push(each(item));
        }
        
        return results;
    };
    
    return self;
};