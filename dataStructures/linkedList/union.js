const LinkedList  = require('./SinglyLinkedList/LinkedList');
/**
 * Question
 * 
 * --------------
 * 
 * Given two lists A and B; the union is the list that contains elements or objects that belong to either A, or to B, or to both.
 * The union function will take two linked lists and return their union.
 * 
 * Sample Input 
 * list1 = 10->20->80->60
 * list1 = 15->20->30->60->45
 * 
 * Sample Output 
 * union = 10->20->80->60->15->30->45
 */

function insertUnique(list1, list2, present = {}) {
    let currNode = list2.getHead();
    while(currNode != null) {
        if(!present[currNode.data]){
            list1.insertAtTail(currNode.data);
        }
        present[currNode.data] = true;
        currNode = currNode.nextElement;
    }
}

function union(list1, list2) {
    const present = {};
    const list = new LinkedList();

    insertUnique(list, list1, present);
    insertUnique(list, list2, present);

    return list
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

const unionList = union(list1, list2);
unionList.print();

