function compareWidth3(arr) {
    return arr.sort(function(a, b) {
        return Math.abs(a - 3) - Math.abs(b - 3);
    })
}

function reverseStr(str) {
    var result = "";
    for(var i = str.length - 1; i >= 0; i--) {
        result += str[i];
    } 
    //str.split("").reverse().join("")
    return result;
}

function findMax(arr) {
    return Math.max.apply(null, arr);
}

function qSort(arr) {
    if(arr.length === 0) {
        return arr;
    }
    var flag = arr[0];
    var lowerArr = [];
    var heightArr = [];
    for(var i = 1; i < arr.length; i++) {
        if(arr[i] <= flag) {
            lowerArr.push(arr[i])
        }else {
            heightArr.push(arr[i])
        }
    }
    return qSort(lowerArr).concat(flag, qSort(heightArr));
}