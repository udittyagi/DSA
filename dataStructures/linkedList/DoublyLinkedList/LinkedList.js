const Node  = require('./Node');

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    getHead() {
        return this.head;
    }

    getTail() {
        return this.tail;
    }

    insertAtTail(value) {
        const node = new Node(value);
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
            return false;
        }

        if(this.head.data === this.tail.data) {
            this.head = this.tail = null;
            return true;
        }

        const currNode = this.head;
        this.head = currNode.nextElement;
        this.head.previousElement = null;
        currNode.nextElement = null;

        return true;
    }

    removeAtTail() {
        if(this.tail === null) {
            return false;
        }

        if(this.head.data === this.tail.data) {
            this.head = this.tail = null;
            return true;
        }

        const currNode = this.tail;
        this.tail = currNode.previousElement;
        this.tail.nextElement = null;
        currNode.previousElement = null;
        return true;
    }

    removeNodeWithValue(value) {
        if(this.head === null) {
            return false;
        }

        if(this.head.data === value && this.tail.data === value) {
            this.head = this.tail = null;
            return true;
        }

        if(this.tail.data === value) {
            this.tail = this.tail.previousElement;
            this.tail.nextElement.previousElement = null;
            this.tail.nextElement = null;
            return true;
        }

        if(this.head.data === value) {
            this.head = this.head.nextElement;
            this.head.previousElement.nextElement = null;
            this.head.previousElement = null;
            return true;
        }

        let currNode = this.head;

        while(currNode !== null && currNode.data !== value) {
            currNode = currNode.nextElement;
        }

        if(currNode !== null) {
            currNode.previousElement.nextElement = currNode.nextElement;
            currNode.nextElement.previousElement = currNode.previousElement;
            currNode.previousElement = null;
            currNode.nextElement = null;
            return true;
        }
        return false;
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
// linkedList.removeAtTail();
// linkedList.removeAtHead();
// linkedList.removeAtHead();
// linkedList.removeNodeWithValue(3);
// linkedList.removeNodeWithValue(2);
// linkedList.removeNodeWithValue(1);

// linkedList.print()
// linkedList.printReverse()