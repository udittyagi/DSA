const LinkedList = require('../../linkedList/DoublyLinkedList/LinkedList');

class Queue {
    constructor() {
        this.list = new LinkedList();
    }

    getFront() {
        return this.list.head ? this.list.head.data : null;
    }

    isEmpty() {
        return this.list.length === 0;
    }

    size() {
        return this.list.length;
    }

    enqueue(value) {
        this.list.insertAtTail(value);
    }

    dequeue() {
        return this.list.removeAtHead()
    }

    print() {
        console.log('----SIZE---- : ', this.size());
        console.log('')

        console.log('-----IS EMPTY-----', this.isEmpty())
        console.log('');

        console.log('----FRONT---- : ', this.getFront());
        console.log('')

        let currNode = this.list.getHead();
        let str = '';
        while(currNode !== null) {
            // console.log(`|   ${currNode.data}    |`)
            // console.log('----------');
            str = `${str} ${currNode.data} |`
            currNode = currNode.nextElement;
        }

        console.log(str)
        console.log('')
    }

}


// const queue = new Queue();
// queue.enqueue(1);
// queue.enqueue(2);
// queue.enqueue(3);
// queue.enqueue(4);

// console.log(' DEQUEUE : ', queue.dequeue())
// console.log(' DEQUEUE : ', queue.dequeue())
// console.log(' DEQUEUE : ', queue.dequeue())
// console.log(' DEQUEUE : ', queue.dequeue())

// queue.print()

module.exports = Queue;
