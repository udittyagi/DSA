/**
 * Question
 * 
 * ----------
 * 
 * Implement a function called maxMin(arr), which will rearrange the elements of a
 * sorted array so that the first position will have the largest number,
 * the second will have the smallest, and the third will have the second-largest and so on. 
 * In other words, all the odd-numbered indices will have the largest numbers 
 * in the array in descending order, and the even-numbered indices 
 * will have the smallest numbers in ascending order.
 * 
 * Note: The given array is sorted in ascending order.
 * 
 * Input 
 * A sorted array
 * 
 * Output 
 * An array with elements stored in max/min form
 * 
 * Sample Input
 * arr = [1,2,3,4,5]
 * 
 * Sample Output 
 * arr = [5,1,4,2,3]
 */

/**
 * Theory
 * 
 * ----------------
 * 
 * This solution is very smart.
 * We actually store two elements at one index mathematically.
 * The original element is stored as the remainder, while the max/min element is stored as the multiplier.
 * The following line achieves this;
 * 
 * arr[i] += (arr[maxIdx] % maxElem ) * maxElem;
 * 
 * eg -> Suppose we want to store 2 & 3 together
 * ans -> maximum value here is 3 so we will take maxValue as 3 + 1 = 4
 *        now we want to store 3 in place of 2 along with 2 itself
 *        3 * 4 + 2 = 14
 *        Math.floor(14 / 4) = 3
 *        Math.floor(14 % 2) = 2
 * 
 * arr[maxIdx] % maxElem ==> Will give the original value of index maxIdx, no matter whether its been updated or not
 * 
 * (arr[maxIdx] % maxElem ) * maxElem => We use this expression instead of arr[maxIdx] * maxElem, 
 *                                       bcoz it might be the case that maxIdx has already been updated, so arr[maxIdx] % maxElem
 *                                       will fetch the original value of index maxIdx
 *                                  
 * arr[i] = arr[i] + (arr[maxIdx] % maxElem ) * maxElem ==> Will store the value of arr[i] and arr[maxIdx] at the same index
 * 
 * arr[i] % maxElem => will give original value of arr[i];
 * arr[i] / maxElem => will give the max/min value stored at i
 * 
 */

function maxMin(arr) {
    let maxIdx = arr.length - 1;
    let minIdx = 0;
    const maxElem = arr[maxIdx] + 1;

    for(let i = 0; i < arr.length; i++) {
        // At even idx we will store the max value
        if(i % 2 === 0) {
            arr[i] += Math.floor(arr[maxIdx] % maxElem) * maxElem;
            maxIdx--;
        } else {
            arr[i] += Math.floor(arr[minIdx] % maxElem) * maxElem;
            minIdx++;
        }
    }

    for(let i = 0; i < arr.length; i++) {
        arr[i] = Math.floor(arr[i] / maxElem)
    }
    return arr;
}

console.log(maxMin([1,2,3,4,5]))