utils = (function() {
    var utils = {};

    utils.forEach = function(list, fn) {
        for(var i = 0, len = list.length; i < len; i++) {
            var item = list[i];
            fn(item, i);
        }
    };

    utils.spliceString = function(source, index, newString) {
        return source.substring(0, index) + newString + source.substring(index);
    };

    return utils;
}());