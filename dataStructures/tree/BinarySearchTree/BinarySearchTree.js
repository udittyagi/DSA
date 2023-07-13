const Node = require('../Node/Node');

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    _insertBST(currNode, value) {
        if(currNode === null) {
            currNode = new Node(value);
        } else {
            if(value < currNode.data) {
                 const leftNode = this._insertBST(currNode.leftElement, value, currNode);
                 leftNode.parent = currNode;
                 currNode.leftElement = leftNode;
            } else {
                 const rightNode = this._insertBST(currNode.rightElement, value, currNode);
                 rightNode.parent = currNode;
                 currNode.rightElement = rightNode
            }
        }
        return currNode;
    }
    
    insert(value) {
        this.root = this._insertBST(this.root, value, null)   
        this.root.parent = null;     
    }

    _deleteBST(currNode, value) {
        if(currNode !== null) {
            if(value < currNode.data) {
                const leftNode = this.deleteNode(currNode.leftElement, value);
                if(leftNode) {
                    leftNode.parent = currNode;
                }
                currNode.leftElement = leftNode
            } else if(value > currNode.data) {
                const rightNode = this.deleteNode(currNode.rightElement, value);
                if(rightNode) {
                    rightNode.parent = currNode;
                }
                currNode.rightElement = rightNode;
            } else {
                //If node found
                if(currNode.leftElement === null && currNode.rightElement === null) {
                    // Case 1 => If leaf node
                    currNode.parent = null;
                    currNode = null;
                } else if (currNode.rightElement === null) {
                    // case 2 ==> If left child is not null
                    const temp = currNode.leftElement;
                    currNode.parent = null;
                    currNode.leftElement = null;
                    currNode = temp;
                } else if (currNode.leftElement === null) {
                    // case 2 ==> If right child is not null
                    const temp = currNode.rightElement;
                    currNode.parent = null;
                    currNode.rightElement = null;
                    currNode = temp;
                } else {
                    //Both childs are present
                    //We need to find the best value to replace this node
                    //which either can be smallest (leftmost) value in right subtree or largest(rightmost) value in left subtree.
                    let replacementNode = currNode.rightElement;
                    while(replacementNode.leftElement !== null) {
                        replacementNode = replacementNode.leftElement;
                    }
                    currNode.data = replacementNode.data;
                    currNode.rightElement = this.deleteNode(currNode.rightElement, replacementNode.data);
                    if(currNode.rightElement !== null) {
                        currNode.rightElement.parent = currNode
                    }
                }
            }
        }
        return currNode;
    }

    delete(value) {
        this.root = this._deleteBST(this.root, value)
    }

    _inOrder(currNode) {
        if(currNode !== null) {
            this._inOrder(currNode.leftElement);
            console.log({
                data: currNode.data,
                parent: currNode?.parent?.data ? currNode?.parent?.data : null,
                left: currNode?.leftElement?.data ? currNode?.leftElement?.data: null,
                right: currNode?.rightElement?.data ? currNode?.rightElement?.data: null
            });
            this._inOrder(currNode.rightElement);
        }
    }
    inOrder() {
        this._inOrder(this.root);
    }

    _preOrder(currNode) {
        if(currNode !== null) {
            console.log({
                data: currNode.data,
                parent: currNode?.parent?.data ? currNode?.parent?.data : null,
                left: currNode?.leftElement?.data ? currNode?.leftElement?.data: null,
                right: currNode?.rightElement?.data ? currNode?.rightElement?.data: null
            });
            this._preOrder(currNode.leftElement);
            this._preOrder(currNode.rightElement);
        }
    }

    preOrder() {
        this._preOrder(this.root)
    }

    nodeHeight(node) {
        if(node === null) {
            return -1;
        }

        const lHeight = this.nodeHeight(node.leftElement);
        const rHeight = this.nodeHeight(node.rightElement);
        return lHeight > rHeight ? lHeight + 1 : rHeight + 1;
    }

    height() {
        return this.nodeHeight(this.root);
    }
}

const BST = new BinarySearchTree();
BST.insert(5);
BST.insert(3);
BST.insert(7);
BST.insert(6);
BST.insert(9);
BST.insert(1);
BST.insert(2);
BST.insert(4);
BST.insert(8);
BST.insert(10);
BST.insert(11);

// BST.insert(5);
// BST.insert(4);
// BST.insert(3);
// BST.insert(2);


BST.delete(1)
// console.log('Root++', BST.root);

// console.log("Height", BST.height())

BST.preOrder()
console.log("++++++++++++++")
BST.inOrder()