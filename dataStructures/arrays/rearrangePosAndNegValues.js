/**
 * Question
 * 
 * -------------
 * 
 * Implement a function, reArrange(arr), which sorts the elements so that all the
 * negative elements appear on the left, and all positive elements appear at the right.
 * 
 * While zero is NOT positive or negative, we consider zero to be a positive​ integer for this challenge!
 * 
 * Input 
 * An array containing positive and negative elements
 * 
 * Output 
 * A sorted array with negative elements at the left and positive elements at the right
 * 
 * Sample Input 
 * [10,-1,20,4,5,-9,-6]
 * 
 * Sample Output
 * [-1,-9,-6,10,20,4,5]
 */

/**
 * Theory
 * ----------------
 * We iterate over the entire array, and if we encounter a negative element, we simply swap it with the leftmost positive element.
 * 
 * Note: Every element of array will be positive between leftMostPosIdx and i, so incrementing leftMostPosIdx by +1 will be positve,
 *  => i will be either equal to leftMostPosIdx or greater than it.
 */

function reArrange(arr) {
    let leftMostPosIdx = 0;

    for(let i = 0; i < arr.length; i++) {
        if(arr[i] < 0) {
            if(leftMostPosIdx !== i) {
                const temp = arr[leftMostPosIdx];
                arr[leftMostPosIdx] = arr[i];
                arr[i] = temp;
            }

            leftMostPosIdx++;
        }
    }

    return arr;
}

console.log(reArrange([10,-1,20,4,5,-9,-6]))