const LinkedList  = require('./SinglyLinkedList/LinkedList');

/**
 * Question
 * 
 * ----------------------
 * 
 * By definition, a loop is formed when a node in your linked list points to a previously traversed node.
 * You must implement the detectLoop() function, which will take a linked list as input and deduce whether or not a loop is present.
 * 
 * Input 
 * A singly linked list.
 * 
 * Output 
 * Returns true if the given linked list contains a loop. Otherwise, it returns false.
 * 
 * Sample Input 
 * linkedlist = 7->14->21->7 // Both '7's are the same node. Not duplicates.
 * 
 * Sample Output 
 * true
 */

/**
 * Theory
 * -----------------
 * 
 * We will take 2 pointers one slow(move by one node) and one fast(move by two node);
 * 
 * If there is a loop then fast pointer will intersect the slow one at some given point of time
 * 
 */

function detectLoop(list) {
    if(this.head === null) {
        return false;
    }

    let slowPtr = list.getHead();
    let fastPtr = slowPtr.nextElement ? slowPtr.nextElement : null;

    while(slowPtr !== null && fastPtr !== null && fastPtr.nextElement !== null) {
        if(slowPtr.data === fastPtr.data) {
            return true;
        }

        slowPtr = slowPtr.nextElement;
        fastPtr = fastPtr.nextElement.nextElement;
    }

    return false;
}

const linkedList = new LinkedList();

const node4 = linkedList.insertAtTail(4);
const node3 = linkedList.insertAtHead(3);
const node2 = linkedList.insertAtHead(2);
const node1 = linkedList.insertAtHead(1);

node4.nextElement = node2;

console.log("Is loop detected ==> ", detectLoop(linkedList));
