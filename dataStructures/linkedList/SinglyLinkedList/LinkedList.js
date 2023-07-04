const Node = require('./Node');

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
        this.length++;
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
            return null
        }

        this.length--;

        //In case of last node
        if(this.tail == this.head) {
            const data = this.tail.data;
            this.tail = this.head = null;
            return data;
        }

        this.head = currNode.nextElement;
        currNode.nextElement = null;
        return currNode.data;
    }

    removeAtTail() {
        let currNode = this.getHead();

        if(!currNode) {
            return null;
        }

        this.length--;

        //In case of last node
        if(this.tail == this.head) {
            const data = this.tail.data;
            this.tail = this.head = null;
            return data;
        }

        while(currNode?.nextElement?.nextElement) {
            currNode = currNode.nextElement;
        }

        this.tail = currNode;

        const deletedData = currNode.nextElement.data;
        currNode.nextElement = null;
        return deletedData
    }

    removeNodeWithValue(value) {
        let currNode = this.getHead();
        if(!currNode) {
            return null;
        }

        if(this.head.data === value && this.tail.data === value && this.tail === this.head) {
            this.length--;
            this.head = this.tail = null;
            return value;
        }

        if(this.head.data === value) {
            this.length--;
            this.head = currNode.nextElement;
            currNode.nextElement = null;
            return value;
        }

        while(currNode.nextElement && currNode.nextElement.data !== value) {
            currNode = currNode.nextElement;
        }

        
        if(currNode.nextElement && currNode.nextElement.data === value) {
            this.length--;
            const nextToNextElement = currNode.nextElement.nextElement;
            currNode.nextElement.nextElement = null;
            currNode.nextElement = nextToNextElement;

            if(this.tail.data === value) {
                this.tail = currNode;
            }

            return value;
        }

        return null;
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
// linkedList.insertAtTail(1);
// linkedList.insertAtHead(2);
// linkedList.insertAtHead(1);

// console.log("Removing 1", linkedList.removeAtHead())
// linkedList.removeAtHead()
// console.log('Removing 2', linkedList.removeNodeWithValue(8))
// linkedList.removeAtHead()
// linkedList.removeAtHead();
// console.log("Removing 4", linkedList.removeAtTail())
// console.log("Removing 5", linkedList.removeAtTail())
// console.log("Removing 6", linkedList.removeAtHead())
// linkedList.removeAtTail()
// linkedList.removeAtTail()

// linkedList.removeNodeWithValue(1);
// linkedList.removeNodeWithValue(3);
// linkedList.removeNodeWithValue(1);
// linkedList.removeNodeWithValue(4);

// console.log('Search,', linkedList.search(5))


// linkedList.print()

module.exports = LinkedList;
