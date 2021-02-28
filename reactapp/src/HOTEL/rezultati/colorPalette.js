let Colors = {};
Colors.names = {
    aqua: "#00ffff",
    black: "#000000",
    blue: "#0000ff",
    brown: "#a52a2a",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgrey: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkred: "#8b0000",
    darkviolet: "#9400d3",
    fuchsia: "#ff00ff",
    gold: "#ffd700",
    green: "#008000",
    indigo: "#4b0082",
    khaki: "#f0e68c",
    lime: "#00ff00",
    magenta: "#ff00ff",
    maroon: "#800000",
    navy: "#000080",
    olive: "#808000",
    purple: "#800080",
    red: "#ff0000"
};
Colors.colors = []
Colors.getRandom = n => {
    var arr = []
    let keys = Object.keys(Colors.names)
    let prev = -1
    while(arr.length < n){
        var r = Math.floor(Math.random() * keys.length);
        if(r != prev) {
            arr.push(r)
            prev = r
        }
    }
    Colors.colors = arr.map(i => Colors.names[Object.keys(Colors.names)[i]])
    Colors.colors[Math.floor(Math.random() * Colors.colors.length)] = "#f99759"
    return Colors.colors
}


module.exports = Colors