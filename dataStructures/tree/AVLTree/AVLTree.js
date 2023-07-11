const Node = require('../Node/Node');
const utils = require('./utils/utils');

/**
 * AVL Trees are Balanced BST Tree
 * A balanced tree is where for ever node n ->  | height(left subtree of n) - height(right subtree of n) | <= 0
 * Height of leaf is considered 0
 * Height of null node is considered -1
 * 
 * https://www.geeksforgeeks.org/introduction-to-avl-tree/
 */

class AVLTree {
    constructor() {
        this.root = null;
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
                right: currNode?.rightElement?.data ? currNode?.rightElement?.data: null,
                balance: utils.getBalanceFactor(currNode)
            });
            this._preOrder(currNode.leftElement);
            this._preOrder(currNode.rightElement);
        }
    }

    preOrder() {
        this._preOrder(this.root)
    }

    _insertNode(currNode, value) {
        //1. Insert the node same as in BST
        // While inserting we move down the tree due to recursion
        if(currNode === null) {
            currNode = new Node(value);
        } else {
            if(value < currNode.data) {
                 const leftNode = this._insertNode(currNode.leftElement, value);
                 leftNode.parent = currNode;
                 currNode.leftElement = leftNode
            } else {
                 const rightNode = this._insertNode(currNode.rightElement, value);
                 rightNode.parent = currNode;
                 currNode.rightElement = rightNode
            }
        }

        currNode.height = Math.max(utils.height(currNode.leftElement), utils.height(currNode.rightElement)) + 1;
        //2. We will check the balance factor
        //Now the recusrion for any stage completed, so we start moving up one by one in recursion
        const balanceFactor = utils.getBalanceFactor(currNode);

        // console.log('balance Factor+++', {data: currNode.data, balanceFactor, height: currNode.height, value: value, parent: currNode.parent?.data})

        /**
         * There arise 4 cases of roatation
         * left-left ==> When new Node (C) is added in the left subtree of a node (P), 
         *              which in turn is in the leftSubtree of currNode (G) ==> Right Rotation around G
         * 
         * left-right ==> When new Node (C) is added in the right subtree of a node (P) which,
         *               in turn is in the leftSubtree of currNode (G) ==> First Left around node around P, then right roataion around G
         * 
         * right-right ==> When new Node (C) is added in the right subtree of a node (P),
         *               which in turn is in the rightSubtree of currNode (G) ==> Left rotation around G
         * 
         * right-left ==> When new Node (C) is added in the left subtree of a node (P),
         *               which in turn is in the rightSubtree of currNode (G) ==> Right Rotation around P, then left roation around G
         * 
         * It is for sure the tree will become unbalanced at G only (if it become unbalanced) not before that.
         */

        //Balance factor is leftSubtreeHeight - RightSubtreeHeight ==> For balanced tree it should always be in set of {-1, 0, 1}

        /**
         * If balance factor greater than 1 then it means new Node is added in leftSubTree of currNode
         * If balance factor less than -1 then it means new Node is added in rightSubtree of currNode
         * 
         * This gives us the first of left-* / right-* of rotation
         * To get the second we can simply compare the value of new Node with the value of P node (right of left subtree root value of currNode)
         */

        if(balanceFactor > 1) {
            if(value < currNode?.leftElement?.data) {
                console.log('******---L/L----******')
                //left-left case
                currNode = utils.rightRotate(currNode);
            } else {
                //left-right case
                console.log('******---L/R----******')
                currNode.leftElement = utils.leftRotate(currNode.leftElement);
                currNode.leftElement.parent = currNode;
                currNode = utils.rightRotate(currNode);
            }
        } else if(balanceFactor < -1) {
            if(value < currNode?.rightElement?.data) {
                console.log('******---R/L----******')
                //right-left case
                currNode.rightElement = utils.rightRotate(currNode.rightElement);
                currNode.rightElement.parent = currNode;
                currNode = utils.leftRotate(currNode)
            } else {
                //right-right case
                console.log('******---R/R----******')
                currNode = utils.leftRotate(currNode);
                // console.log('CurrNOde+++', currNode)
            }
        }

        
        return currNode;
    }

    insert(value) {
        this.root = this._insertNode(this.root, value);
        this.root.parent = null;
    }
}

const AVL = new AVLTree();
AVL.insert(6)
AVL.insert(2)
AVL.insert(10)
AVL.insert(9)
AVL.insert(11)
AVL.insert(8)
// AVL.insert(3)
// AVL.insert(1)
// AVL.insert(4)
// AVL.insert(5)

// AVL.insert(5)
// AVL.insert(4)
// AVL.insert(3)
// AVL.insert(2)
// AVL.insert(1)

// console.log(AVL.root);
// console.log('Height+++', AVL.height())
AVL.preOrder()
// console.log('Balance: ', utils.getBalanceFactor(AVL.root))
