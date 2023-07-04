/**
 * Question
 * 
 * ---------------
 * 
 * You have to implement the sortStack() function,
 * which will take a stack and sort all its elements in ascending order.
 * 
 * Sample Input
 * //input stack where 23 is the top
 * 23, 60, 12, 42, 4, 97, 2
 * 
 * Sample Output
 * //resultant stack where 2 is the top
 * 2, 4, 12, 23, 42, 60, 97
 */

/**
 * Theory
 * ---------------
 * 
 * It is solved using two stack, or 1 stack along with recurssion (so effectively 2 stacks)
 * 
 */

const Stack = require('./Stack/Stack');

function sortStackUtils(stack, elem) {
    if(stack.isEmpty() || stack.getTop() >= elem) {
        stack.push(elem);
        return;
    }

    const currElem = stack.pop();
    sortStackUtils(stack, elem);
    stack.push(currElem);
    return;
}

function sortStack(stack) {
    const resStack = new Stack();
    while(!stack.isEmpty()) {
        sortStackUtils(resStack, stack.pop());
    }
    return resStack;
}

const stack = new Stack();

stack.push(2)
stack.push(97)
stack.push(4)
stack.push(42)
stack.push(12)
stack.push(60)
stack.push(23)

console.log('Before Sort')
stack.print();

const sortedStack = sortStack(stack)
console.log('After Sort');
sortedStack.print();