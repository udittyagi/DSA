const LinkedList = require('./SinglyLinkedList/LinkedList');

/**
 * Question
 * 
 * -------------
 * 
 * You have to implement the findMid() function, which will take a linked list as an 
 * input and return the middle node. If the length of the list is even, the middle value will occur at length / 2.
 * For a list of odd length, the middle value will be (length / 2) + 1.
 * 
 * Input
 * A singly linked list.
 * 
 * Output
 * The middle node.
 * 
 * Sample Input
 * LinkedList = 7->14->10->21
 * 
 * Sample Output
 * 14
 */

function findMid(list) {
    if(!list || !list.head) {
        return null;
    }

    let slowPtr = list.getHead();
    let fastPtr = list.getHead();

    while(slowPtr && fastPtr?.nextElement?.nextElement) {
        slowPtr = slowPtr.nextElement;
        fastPtr = fastPtr.nextElement.nextElement;
    }

    return slowPtr.data;
}

const linkedList = new LinkedList();

linkedList.insertAtTail(4);
linkedList.insertAtHead(3);
linkedList.insertAtHead(2);
linkedList.insertAtHead(1);
linkedList.insertAtTail(6)

console.log('Mid Element ==> ', findMid(linkedList))