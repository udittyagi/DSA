const LinkedList = require("./SinglyLinkedList/LinkedList");

/**
 * Given two lists A and B, the intersection is the largest list, which contains all the elements that are common to both the sets.
 * The intersection function will return all the elements that are common between two linked lists.
 * 
 * Sample Input 
 * list1 = 10->20->80->60
 * list1 = 15->20->30->60->45
 * 
 * Sample Output 
 * intersection = 20->60
 */

function intersection(list1, list2) {
    const present = {};
    const list = new LinkedList()

    let currNode = list1.getHead();

    while(currNode !== null) {
        present[currNode.data] = true;
        currNode = currNode.nextElement;
    }

    currNode = list2.getHead();

    while(currNode !== null) {
        if(present[currNode.data]) {
            list.insertAtTail(currNode.data);
        }
        currNode = currNode.nextElement;
    }

    return list;
}

const list1 = new LinkedList();
list1.insertAtHead(60)
list1.insertAtHead(80)
list1.insertAtHead(20)
list1.insertAtHead(10)

const list2 = new LinkedList();
list2.insertAtHead(45);
list2.insertAtHead(60);
list2.insertAtHead(30);
list2.insertAtHead(20);
list2.insertAtHead(15);

const intersectList = intersection(list1, list2);
intersectList.print();