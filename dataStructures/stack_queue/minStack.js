/**
 * You have to implement the minStack class, which will have a min() function.
 * Whenever min() is called, the minimum value of the stack is returned in O(1) time.
 * The element is not popped from the stack; its value is simply returned.
 */

class MinStack {
    constructor() {
        this.items = [];
    }

    getTop() {
        return this.items.length ? this.items[this.items.length - 1] : null;
    }

    isEmpty() {
        return this.items.length === 0;
    }

    push(value) {
        if(this.isEmpty()) {
            this.items.push({min: value, value});
            return;
        }

        const top = this.getTop();
        const min = top.min < value ? top.min : value;
        this.items.push({min, value})
    }

    pop() {
        if(this.isEmpty()){
            return null;
        }
        const {value} = this.items.pop();
        return value;
    }

    min() {
        if(this.isEmpty()){
            return null;
        }

        const { min } = this.getTop();
        return min;
    }
}

const minStack = new MinStack();

minStack.push(3);
minStack.push(2);
minStack.push(1);
minStack.push(100);

console.log('Min1', minStack.min());

minStack.pop();
console.log('Min2', minStack.min());

minStack.pop();
console.log('Min3', minStack.min());

minStack.pop();
console.log('Min4', minStack.min());
