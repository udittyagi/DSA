const Node  = require('./Node');

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    insertAtTail(value) {
        const node = new Node(value);
        this.length++;

        node.previousElement = this.tail;

        if(this.tail !== null) {
            this.tail.nextElement = node;
        }

        this.tail = node;

        if(this.head === null) {
            this.head = this.tail;
        }

        return node;
    }

    insertAtHead(value) {
        const node = new Node(value);
        this.length++;

        if(this.head !== null) {
            this.head.previousElement = node;
        }

        node.nextElement = this.head;
        this.head = node;

        if(this.tail === null) {
            this.tail = this.head;
        }

        return node;
    }

    removeAtHead() {
        if(this.head === null) {
            return null;
        }

        this.length--;
        if(this.head === this.tail) {
            const data = this.head.data;
            this.head = this.tail = null;
            return data;
        }

        const currNode = this.head;
        this.head = currNode.nextElement;
        this.head.previousElement = null;
        currNode.nextElement = null;

        return currNode.data;
    }

    removeAtTail() {
        if(this.tail === null) {
            return null;
        }

        this.length--;
        if(this.head === this.tail) {
            const data = this.head.data;
            this.head = this.tail = null;
            return data;
        }

        const currNode = this.tail;
        this.tail = currNode.previousElement;
        this.tail.nextElement = null;
        currNode.previousElement = null;
        return currNode.data;
    }

    removeNodeWithValue(value) {
        if(this.head === null) {
            return null;
        }

        if(this.head.data === value && this.tail.data === value && this.head === this.tail) {
            this.length--;
            this.head = this.tail = null;
            return value;
        }

        if(this.tail.data === value) {
            this.length--;
            this.tail = this.tail.previousElement;
            this.tail.nextElement.previousElement = null;
            this.tail.nextElement = null;
            return value;
        }

        if(this.head.data === value) {
            this.length--;
            this.head = this.head.nextElement;
            this.head.previousElement.nextElement = null;
            this.head.previousElement = null;
            return value;
        }

        let currNode = this.head;

        while(currNode !== null && currNode.data !== value) {
            currNode = currNode.nextElement;
        }

        if(currNode !== null) {
            this.length--;
            currNode.previousElement.nextElement = currNode.nextElement;
            currNode.nextElement.previousElement = currNode.previousElement;
            currNode.previousElement = null;
            currNode.nextElement = null;
            return value;
        }
        return null;
    }

    search(value) {
        
    }

    print() {
        let currNode = this.getHead();
        let str = 'null'
        while(currNode !== null) {
            str = `${str} <= | ${currNode.data} | => `;
            currNode = currNode.nextElement;
        }
        console.log('HEAD ===> ', this.head ? this.head.data : null);
        console.log('TAIL ===> ', this.tail ? this.tail.data : null);
        console.log('---------FULL LIST---------')
        console.log(`${str} null`);
    }

    printReverse() {
        let currNode = this.getTail();
        let str = 'null'
        while(currNode !== null) {
            str = `${str} <= | ${currNode.data} | => `;
            currNode = currNode.previousElement;
        }
        console.log('HEAD ===> ', this.head ? this.head.data : null);
        console.log('TAIL ===> ', this.tail ? this.tail.data : null);
        console.log('---------FULL Reverse LIST---------')
        console.log(`${str} null`);
    }
}

// const linkedList = new LinkedList();

// linkedList.insertAtTail(3);
// linkedList.insertAtTail(4);
// linkedList.insertAtHead(2);
// linkedList.insertAtHead(1);

// linkedList.removeAtTail();
// console.log("Removing 3", linkedList.removeAtTail());
// linkedList.removeAtHead();
// linkedList.removeAtHead();
// linkedList.removeNodeWithValue(3);
// console.log("Removing 2",linkedList.removeNodeWithValue(2));
// linkedList.removeNodeWithValue(1);

// linkedList.print()
// linkedList.printReverse()

module.exports = LinkedList