/**
 * 
 * Question
 * 
 * ---------------------
 * 
 * Implement the function reverseK(queue, k), which takes a queue 
 * and a number “k” as input and reverses the first “k” elements of the queue.
 * 
 * Sample Input#
 * Queue = [1,2,3,4,5,6,7,8,9,10]    k = 5
 * 
 * Sample Output
 * result = [5,4,3,2,1,6,7,8,9,10]
 */

const Queue = require("./Queue/Queue");
const Stack = require("./Stack/Stack");

function reverseK(queue, k) {
    const stack = new Stack();

    if(queue.size() < k) {
        throw new Error('K should be more than size of queue');
    }

    for(let i = 0; i < k; i++) {
        stack.push(queue.dequeue());
    }

    while(!stack.isEmpty()) {
        queue.enqueue(stack.pop());
    }

    for(let i = 0; i < queue.size() - k; i++) {
        queue.enqueue(queue.dequeue());
    }

    return queue;
}

const queue = new Queue();
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
queue.enqueue(5)
queue.enqueue(6)
queue.enqueue(7)
queue.enqueue(8)
queue.enqueue(9)
queue.enqueue(10)

console.log('Before Reverse');
queue.print();

reverseK(queue, 5);
queue.print();