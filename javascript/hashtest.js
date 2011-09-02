var Hash = require('./hashtable'),
    // You could also say
    //
    //     m = new Hash(8388608)
    //
    // if you wanted to hint the array size.    
    m = new Hash(),
    key = "",
    val = 0,
    ref = {},
    failures = 0,
    chars = 'ABCDEFGHIJKLM'.split('');

// Quick nested loop
for (var a = 0; a < chars.length; a++)
{
    for (var b = 0; b < chars.length; b++)
    {
        for (var c = 0; c < chars.length; c++)
        {
            for (var d = 0; d < chars.length; d++)
            {
                for (var e = 0; e < chars.length; e++)
                {
                    key = chars[a] + chars[b] + chars[c] + chars[d] + chars[e];
                    val = Math.random() * 1000000 | 0 ;
                    ref[key] = val;
                    m.set(key, val);
                }
            }
        }
    }
}

// Quick double checking using the native map.
console.log('Checking keys...');
for(var k in ref)
{
    if (m.get(k) !== ref[k])
    {
        failures++;
    }
}

// This is 0.
console.log('Found ' + failures + ' key match failures.');