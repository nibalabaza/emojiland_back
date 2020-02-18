function randomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
    /**to choose the random numbers between min and max */
}

function randomChar(minC, maxC) {
    min = minC.codePointAt(0); /**to find the character with his equivalent number */
    max = maxC.codePointAt(0);
    var codePoint = randomInt(min,max)
    return String.fromCodePoint(codePoint) /**to transform the equivalent number of the character into Character  */
}

function multipleRanges(arr1,arr2){
   var args = Array.prototype.slice.apply(arguments) /**to transform the arguments into an array */
   var range = pick(args) /** */
    return randomChar (range[0], range[1])
    
}

function pick(xs) {
    var indexMin = 0
    var indexMax = xs.length -1
    var i = randomInt(indexMin, indexMax)
    return xs[i]
}
console.log(multipleRanges(["a","d"],["ب","ح"]))



// console.log(randomChar("A","Z")); /**if i put a space insteade of "A" ,it will choose all (the numbers the leters and the @ # /)  */

// console.log(randomInt("a".codePointAt(0),"z".codePointAt(0)));
// console.log(randomInt(2,2));


