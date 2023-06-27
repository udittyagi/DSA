/**
 * Implement a function rightRotate(arr,n) that will rotate the given array by n.
 * 
 * Input 
 * An array and a number by which to rotate that array
 * 
 * Output
 * The given array rotated by n elements
 * 
 * Sample Input 
 * arr = [1,2,3,4,5]
 * n = 3
 * Sample Output 
 * arr = [3,4,5,1,2]
 */

/**
 * Theory
 * rotate last n elements ==> [1,2,5,4,3]
 * rotate first len - n elements => [2,1,5,4,3]
 * rotate the entire array => [3,4,5,1,2]
 */

function rotateArr(arr, startIdx, endIdx) {
    let leftPtr = startIdx;
    let rightPtr = endIdx;

    while (leftPtr < rightPtr) {
        const temp = arr[leftPtr];
        arr[leftPtr] = arr[rightPtr];
        arr[rightPtr] = temp;
        leftPtr++;
        rightPtr--;
    }

    return arr;
}

function rightRotate(arr, n) {
    const len = arr.length
    rotateArr(arr, len - n, len - 1)
    rotateArr(arr, 0, len - n - 1);
    rotateArr(arr, 0, len - 1);
    return arr;
}

console.log(rightRotate([1,2,3,4,5], 3));
console.log(rightRotate([1,2,3,4,5,6], 3));