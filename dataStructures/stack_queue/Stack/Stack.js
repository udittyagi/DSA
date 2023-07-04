const LinkedList = require('../../linkedList/SinglyLinkedList/LinkedList');

class Stack {
    constructor() {
        this.list = new LinkedList();
    }

    getTop() {
        return this.list.head ? this.list.head.data : null;
    }

    size() {
        return this.list.length;
    }
    
    isEmpty(){
        return this.list.head === null;
    }

    push(value) {
        this.list.insertAtHead(value);
    }

    pop() {
        return this.list.removeAtHead();
    }

    print() {
        console.log('----SIZE---- : ', this.size());
        console.log('')

        console.log('-----IS EMPTY-----', this.isEmpty())
        console.log('');

        console.log('----TOP---- : ', this.getTop());
        console.log('')

        let currNode = this.list.getHead();
        while(currNode !== null) {
            console.log(`|   ${currNode.data}    |`)
            console.log('----------');
            currNode = currNode.nextElement;
        }
        console.log('')
    }
}

const stack = new Stack();
stack.push(-1);
stack.push(-1);
stack.push(8);
stack.push(8);
stack.push(8);
stack.push(6);

// while(!stack.isEmpty()) {
//     console.log(stack.pop())
// }
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
console.log(stack.pop())
// stack.pop();
// stack.pop();
// stack.pop();
stack.print();

module.exports = Stack;
