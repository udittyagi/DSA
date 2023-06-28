const LinkedList  = require('./SinglyLinkedList/LinkedList');
/**
 * Question
 * 
 * ----------------------
 * 
 * You have to write the reverse function, which takes a singly linked list and reverses that list in place.
 * 
 * Input
 * A singly linked list.
 * 
 * Output
 * The reversed linked list.
 * 
 * Note: You have to modify the given linked list.
 * 
 * Sample Input
 * LinkedList = 0->1->2->3-4
 * 
 * Sample Output
 * LinkedList = 4->3->2->1->0
 */

function reverse(list) {
    let previous = null;
    let curr = list.getHead();
    
    if(curr === null) {
        return list;
    }

    list.tail = curr;

    while(curr.nextElement !== null) {
        const nextElement = curr.nextElement;
        curr.nextElement = previous;
        previous = curr;
        curr = nextElement;
    }

    curr.nextElement = previous;
    list.head = curr;

    return list;
}

const linkedList = new LinkedList();

linkedList.insertAtTail(4);
linkedList.insertAtHead(3);
linkedList.insertAtHead(2);
linkedList.insertAtHead(1);

reverse(linkedList);

linkedList.print()