const Node = require('./Node');

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
        if(this.head === null) {
            this.head = this.tail = node;
            return node;
        }
        this.tail.nextElement = node;
        this.tail = node;
        return node;
    }

    insertAtHead(value) {
        const node = new Node(value);
        if(this.head === null) {
            this.head = this.tail = node;
            return node;
        }
        node.nextElement = this.head;
        this.head = node;
        return node;
    }

    removeAtHead() {
        const currNode = this.getHead();

        if(!currNode) {
            return false
        }

        //In case of last node
        if(this.tail.data == this.head.data) {
            this.tail = this.head = null;
            return true;
        }

        this.head = currNode.nextElement;
        currNode.nextElement = null;
        return true
    }

    removeAtTail() {
        let currNode = this.getHead();

        if(!currNode) {
            return false;
        }

        //In case of last node
        if(this.tail.data == this.head.data) {
            this.tail = this.head = null;
            return true;
        }

        while(currNode?.nextElement?.nextElement) {
            currNode = currNode.nextElement;
        }

        this.tail = currNode;
        currNode.nextElement = null;
        return true
    }

    removeNodeWithValue(value) {
        let currNode = this.getHead();
        if(!currNode) {
            return false;
        }

        if(this.head.data === value && this.tail.data === value) {
            this.head = this.tail = null;
            return true;
        }

        if(this.head.data === value) {
            this.head = currNode.nextElement;
            currNode.nextElement = null;
            return true;
        }

        while(currNode.nextElement && currNode.nextElement.data !== value) {
            currNode = currNode.nextElement;
        }

        
        if(currNode.nextElement && currNode.nextElement.data === value) {
            const nextToNextElement = currNode.nextElement.nextElement;
            currNode.nextElement.nextElement = null;
            currNode.nextElement = nextToNextElement;

            if(this.tail.data === value) {
                this.tail = currNode;
            }

            return true;
        }

        return false;
    }

    search(value) {
        let currentNode = this.head;

        while (currentNode != null) {
            if (currentNode.data == value) {
                return true;
            }
            currentNode = currentNode.nextElement
        }
        return false;
    }

    print() {
        let currNode = this.getHead();
        let str = ''
        while(currNode !== null) {
            str = `${str}| ${currNode.data} | => `;
            currNode = currNode.nextElement;
        }
        console.log('HEAD ===> ', this.head ? this.head.data : null);
        console.log('TAIL ===> ', this.tail ? this.tail.data : null);
        console.log('---------FULL LIST---------')
        console.log(`${str} null`);
    }
}

// const linkedList = new LinkedList();

// linkedList.insertAtTail(3);
// linkedList.insertAtTail(4);
// linkedList.insertAtHead(2);
// linkedList.insertAtHead(1);

// linkedList.removeAtHead()
// linkedList.removeAtHead()
// linkedList.removeAtHead()
// linkedList.removeAtHead();
// linkedList.removeAtTail()
// linkedList.removeAtTail()
// linkedList.removeAtTail()

// linkedList.removeNodeWithValue(2);
// linkedList.removeNodeWithValue(3);
// linkedList.removeNodeWithValue(1);
// linkedList.removeNodeWithValue(4);

// console.log('Search,', linkedList.search(5))


// linkedList.print()

module.exports = LinkedList;
