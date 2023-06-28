/**
 * Question
 * 
 * ---------------
 * 
 * Given an unsorted array A
 * the maximum sum sub array is the sub array (contiguous elements) from A
 * for which the sum of the elements is maximum. 
 * In this challenge, we want to find the sum of the maximum sum sub array. 
 * This problem is a tricky one because the array might have negative integers in any position, 
 * so we have to cater to those negative integers while choosing the continuous subarray with the largest positive values.
 * 
 * Input
 * [-2, 10, 7, -5, 15, 6]
 * 
 * Output
 * 33 => 10 + 7 - 5 + 15 + 6
 */

/**
 * Theory
 * 
 * ----------------------
 *
 * If previous sum is less than 0 then anything added to it will become less, so we will discard that sum
 * and update it to the current Element
 * 
 * if sum is greater then the maximum sum then we will update the maximum sum
*/


function findMaxSumSubArray(arr) {
    let sum = arr[0];
    let maxSum = sum;
    for(let i = 1; i < arr.length; i++) {
       if(sum < 0) {
        sum = arr[i];
       } else {
        sum += arr[i]
       }

       if (sum > maxSum) {
        maxSum = sum;
       }
    }
    return maxSum
};

console.log(findMaxSumSubArray([-2, 10, 7, -5, 15, 6]))
console.log(findMaxSumSubArray([-2, 10, 7, -5, -15, 6]))
console.log(findMaxSumSubArray([-4, 2, -5, 1, 2, 3, 6, -5, 8]))




/**
 * It can also be modified to find the array which is maximum sum subarray
 */

function getMaxSumSubArray(arr) {
    let sum = arr[0];
    let startIdx = 0;
    let endIdx = 0;
    let maxSum = sum;
    let maxStartIdx = startIdx;
    let maxEndIdx = endIdx;

    for(let i = 1; i < arr.length; i++) {
       if(sum < 0) {
        startIdx = i
        sum = arr[i];
       } else {
        sum += arr[i]
       }

       endIdx = i;

       if (sum > maxSum) {
        maxSum = sum;
        maxEndIdx = endIdx;
        maxStartIdx = startIdx;
       }
    }

    console.log('Start', maxStartIdx, maxEndIdx)
    return arr.slice(maxStartIdx, maxEndIdx + 1)
}

console.log(getMaxSumSubArray([-2, 10, 7, -5, 15, 6]))
console.log(getMaxSumSubArray([-2, 10, 7, -5, -15, 6]))
console.log(getMaxSumSubArray([-4, 2, -5, 1, 2, 3, 6, -5, 8]))