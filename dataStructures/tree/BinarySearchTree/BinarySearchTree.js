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

    delete(value) {
        let currNode = this.root;

        //1. When root is null;
        if(currNode === null) {
            return false;
        }

        //Search node to delete
        // let parent; ==> We have created a parent pointer
        
        while(currNode !== null && currNode.data !== value) {
            // parent = currNode;
            if(value < currNode.data) {
                currNode = currNode.leftElement;
            } else {
                currNode = currNode.rightElement;
            }
        }

        if(currNode === null) {
            return false;
        }
        //2. When the node to delete is leaf node; ==> Simply delete it
        if(currNode.leftElement === null && currNode.rightElement === null) {
            const parentNode = currNode.parent;
            currNode.parent = null;

            if(this.root.data === value) {
                this.root = null
            } else if(value < parentNode.data) {
                parentNode.leftElement = null;
            } else {
                parentNode.rightElement = null;
            }
        }
        //3. When the node to delete have only left child;
        else if(currNode.rightElement === null) {
            const parentNode = currNode.parent;
            currNode.parent = null;
            if(this.root.data === value) {
                this.root = currNode.leftElement;
                this.root.parent = null;
                return true;
            } else if(value < parentNode.data) {
                parentNode.leftElement = currNode.leftElement;
            } else {
                parentNode.rightElement = currNode.leftElement;
            }
            currNode.leftElement.parent = parentNode;
            currNode.leftElement = null;
        }
        //4. When the node to delete have only right child;
        else if(currNode.leftElement === null) {
            const parentNode = currNode.parent;
            currNode.parent = null;
            if(this.root.data === value) {
                this.root = currNode.rightElement;
                this.root.parent = null;
                return true;
            } else if(value < parentNode.data) {
                parentNode.leftElement = currNode.rightElement;
            } else {
                parentNode.rightElement = currNode.rightElement;
            }
            currNode.rightElement.parent = parentNode;
            currNode.rightElement = null;
        }
        //5. When the node to delete have both the child; (We need to find the best value to replace this node
        // which either can be smallest (leftmost) value in right subtree or largest(rightmost) value in left subtree).
        else {
            let replaceNode = currNode.rightElement;
            while(replaceNode.leftElement !== null) {
                replaceNode = replaceNode.leftElement;
            }
            const temp = replaceNode.data;
            this.delete(temp)
            currNode.data = temp
        }
        return true;
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


// BST.delete(5)
// console.log('Root++', BST.root);

// console.log("Height", BST.height())

BST.preOrder()