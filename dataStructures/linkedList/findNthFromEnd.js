const LinkedList = require("./SinglyLinkedList/LinkedList");
/**
 * 
 * Question
 * 
 * ------------------
 * 
 * In the findNth function, a certain N is specified as an argument.
 * You simply need to return the node itself (not the value of the node),
 * which is N spaces away from the end of the linked list.
 * 
 * Sample Input
 * LinkedList = 22->18->60->78->47->39->99 and n = 3
 * 
 * Sample Output
 * 47
 */

function findNth(list, n) {
    if(list === null || n <= 0) {
        return null;
    }

    let fwdPtr = list.getHead();
    let bkwdPtr = list.getHead();

    let count = n - 1;
    while(fwdPtr != null && count > 0) {
        fwdPtr = fwdPtr.nextElement;
        count--;
    }

    if(fwdPtr === null) {
        return null;
    }

    while(fwdPtr.nextElement !== null) {
        fwdPtr = fwdPtr.nextElement;
        bkwdPtr = bkwdPtr.nextElement;
    }

    return bkwdPtr;
}

const list = new LinkedList();
list.insertAtHead(99)
list.insertAtHead(39)
list.insertAtHead(47)
list.insertAtHead(78)
list.insertAtHead(60)
list.insertAtHead(18)
list.insertAtHead(22)

const nthNode = findNth(list, 2);
console.log('Nth Node ==> ', nthNode?.data)

