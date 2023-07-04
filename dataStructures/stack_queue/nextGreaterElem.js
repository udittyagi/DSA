/**
 * You must implement the nextGreaterElement() function. For each element in an array, it finds the next greater element in that array.
 * 
 * Note: The next greater element is the first element towards the right, which is greater than the current element.
 * For example, in the array [1, 3, 8, 4, 10, 5], the next greater element of 3 is 8, and the next greater element for 8 is 10.
 * 
 * To keep it simple, the next greater element for the last or maximum value in the array is -1.
 * In each iteration, we only check the array elements appearing after the current element.
 * 
 * Sample Input 
 * arr = [4, 6, 3, 2, 8, 1]
 * 
 * Sample Output 
 * result = [6, 8, 8, 8, -1, -1]
 */

/**
 * 
 * Theory
 * ----------------
 * 
 * Nearest first logic is used
 *  First nearest is the next index element
 *  Second Nearest is the top of stack
 *  Third nearest is the globalMax
 *  Last is -1
 */

const Stack = require("./Stack/Stack");

function nextGreaterElement(arr) {
    const stack = new Stack();

    stack.push(-1);
    let idx = arr.length - 1;
    let maxElem = arr[idx];

    while(idx > 0) {
        const top = stack.getTop();

        if(arr[idx] > arr[idx - 1]) {
            stack.push(arr[idx]);
        } else if(top > arr[idx - 1]) {
            stack.push(top);
        } else if(maxElem > arr[idx - 1]) {
            stack.push(maxElem);
        } else {
            stack.push(-1);
        }

        if(arr[idx] > maxElem) {
            maxElem = arr[idx];
        }
        idx--;
    }

    console.log('Stack')
    const resArr = [];
    while(!stack.isEmpty()){
        resArr.push(stack.pop());
    }
    stack.print()

    return resArr;
}

let nextGreter = nextGreaterElement([4, 6, 3, 2, 8, 1]);
console.log('Next Greater 1', nextGreter)

nextGreter = nextGreaterElement([4,8,14,2,16,18,9,5]);
console.log('Next Greater 2', nextGreter)

nextGreter = nextGreaterElement([13,3,12,16,15,11,1,2]);
console.log('Next Greater 3', nextGreter)