const Queue = require('./Queue/Queue');
/**
 * Question
 * 
 * ------------
 * 
 * Implement a function findBin(n), which will generate binary numbers from 1 to n
 * in the form of a string using a queue. 
 * Sample Input
 * n = 3
 * Sample Output
 * result = ["1","10","11"]
 */

function findBin(n) {
    const queue = new Queue();
    const arr = [];

    queue.enqueue('1');

    for(let i = 0; i < n; i++) {
        const currElem = queue.dequeue();
        arr.push(currElem);

        queue.enqueue(`${currElem}0`);
        queue.enqueue(`${currElem}1`);

    }

    return arr;
}

const binArr1 = findBin(3);
console.log(binArr1);

const binArr2 = findBin(5);
console.log(binArr2);
