/**
 * Question
 * 
 * ----------------
 * 
 * Implement a function findSecondMaximum(arr), which returns the second largest element in the array.
 * Note 1: Input array will contain at least two unique elements.
 * Note 2: Input array will not contain Number.NEGATIVE_INFINITY value.
 * Input
 * An array of integers ==> [9,2,3,6]
 * Output 
 * The second largest element in the array ==> 6
 */

function findSecondMaximum(arr) {
    let max = arr[0];
    let secondMax = Number.NEGATIVE_INFINITY;

    for(let i = 1; i < arr.length; i++) {
        if(arr[i] > max) {
            secondMax = max;
            max = arr[i];
        } else if(arr[i] > secondMax && arr[i] !== max) {
            secondMax = arr[i]
        }
    }
    return secondMax
}

console.log(findSecondMaximum([9, 2, 3, 6]))
console.log(findSecondMaximum([4,4,4,3,3,2]))