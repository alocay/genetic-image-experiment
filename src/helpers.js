
class Helpers {
    static RandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    
    static RandomInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    static  Clone(o) {
    var out = Array.isArray(o) ? [] : {};
    
    for (var key in o) {
        var v = o[key];
        out[key] = (typeof v === "object") ? copy(v) : v;
    }
    
    return out;
  }
}