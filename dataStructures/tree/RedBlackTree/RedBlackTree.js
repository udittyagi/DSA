const Node = require('../Node/Node');
const utils = require('../utils/utils');

const COLOR = {
    BLACK: 'black',
    RED: 'red',
}

class RedBlackTree {
    constructor() {
        //Sentinel Node
        this.NIL = new Node(null);
        this.NIL.color = COLOR.BLACK;

        this.root = this.NIL;
    }

    _insertRB(currNode, node) {
        if(currNode === this.NIL) {
            currNode = node
        } else {
            if(node.data < currNode.data){
                currNode.leftElement = this._insertRB(currNode.leftElement, node);
                currNode.leftElement.parent = currNode;
            } else {
                currNode.rightElement = this._insertRB(currNode.rightElement, node);
                currNode.rightElement.parent = currNode;
            }
        }
        return currNode;
    }

    _insertFixup(node) {
        while(node.parent && node.parent.color === COLOR.RED) {
            // Case if node parent is left child
            if(node.parent === node.parent.parent.leftElement) {
                const uncle = node.parent.parent.rightElement;
                const grandParent = node.parent.parent;

                if(uncle.color === COLOR.RED) {
                    //If node uncle is red
                    node.parent.color = COLOR.BLACK;
                    uncle.color = COLOR.BLACK;
                    grandParent.color = COLOR.RED;
                    node = grandParent;
                } else {
                    //If node uncle is black;

                    if(node === node.parent.rightElement) {
                        // If node is right child
                        // Do the rotation and change node, so that node become left child
                        // Uncle and grandparent will remain same
                        node = node.parent;
                        this.leftRotate(node);
                    }

                    node.parent.color = COLOR.BLACK;
                    grandParent.color = COLOR.RED;

                    /**
                     * We will preserve greatGrandParent node bcoz after rotation
                     * parent will be the new parent of previous grandParent Node
                     */
                    this.rightRotate(grandParent);
                }
            } else {
                //If Node parent is right child
                // Everything goes same with left & right exchanged

                const uncle = node.parent.parent.leftElement;
                const grandParent = node.parent.parent;

                if(uncle.color === COLOR.RED) {
                    node.parent.color = COLOR.BLACK;
                    uncle.color = COLOR.BLACK;
                    grandParent.color = COLOR.RED;
                    node = grandParent;
                } else {
                    if(node === node.parent.leftElement) {
                        node = node.parent;
                        this.rightRotate(node)
                    }

                    node.parent.color = COLOR.BLACK;
                    grandParent.color = COLOR.RED;

                    this.leftRotate(grandParent)
                }
            }
        }

        //maintaining root color
        this.root.color = COLOR.BLACK;
    }

    insert(value) {
        // Create a new node
        const newNode = new Node(value);
        newNode.leftElement = this.NIL;
        newNode.rightElement = this.NIL;
        newNode.parent = this.NIL;
        newNode.color = COLOR.RED

        //First insert using normal BST
        this.root = this._insertRB(this.root, newNode);

        //Fix its red-black properties
        this._insertFixup(newNode);
    }

    transplant(u, v) {
        console.log('U+++', u.data, v.data)
        if(u.parent === this.NIL) {
            this.root = v;
        } else if(u === u.parent.leftElement) {
            u.parent.leftElement = v;
        } else {
            u.parent.rightElement = v
        }
        v.parent = u.parent;
    }

    _deleteFixup(x) {
        while(x !== this.root && x.color === COLOR.BLACK) {
            if(x === x.parent.leftElement) {
                let w = x.parent.rightElement;

                if(w.color === COLOR.RED) {
                    //If Sibling is RED
                    // CASE 1
                    w.color = COLOR.BLACK;
                    x.parent.color = COLOR.RED;

                    this.leftRotate(x.parent)
                    w = x.parent.rightElement
                } else {
                    //If Sibling is black
                    if(w.rightElement.color === COLOR.BLACK && w.leftElement.color === COLOR.BLACK) {
                        // CASE 2
                        //Both the Sibling children are black
                        // Take one black from w & x(black black) --> Turn w red & x black
                        w.color = COLOR.RED;

                        //taking one black from x & w give one extra black to x.parent, i.e change x to x.p
                        x = x.parent;
                    } else {
                        if(w.rightElement.color === COLOR.BLACK) {
                            //CASE 3
                            w.leftElement.color = COLOR.BLACK;
                            w.color = COLOR.RED;
                            this.rightRotate(w);
                            w = x.parent.rightElement;
                        }

                        //CASE 4
                        w.color = x.parent.color;
                        x.parent.color = COLOR.BLACK;
                        w.rightElement.color = COLOR.BLACK;
                        this.leftRotate(x.parent);
                        x = this.root;
                    }
                }
            } else {
                let w = x.parent.leftElement;

                if(w.color === COLOR.RED) {
                    w.color = COLOR.BLACK;
                    x.parent.color = COLOR.RED;
                    this.rightRotate(x.parent);
                    w = x.parent.leftElement;
                } else {
                    if(w.leftElement.color === COLOR.BLACK && w.rightElement.color === COLOR.BLACK) {
                        w.color = COLOR.RED;
                        x = x.parent;
                    }else {
                        if(w.leftElement.color === COLOR.BLACK) {
                            w.rightElement.color = COLOR.BLACK;
                            w.color = COLOR.RED;
                            this.leftRotate(w);
                            w = x.parent.leftElement;
                        }

                        w.color = x.parent.color;
                        x.parent.color = COLOR.BLACK;
                        w.leftElement.color = COLOR.BLACK;
                        this.rightRotate(x.parent);

                        x = this.root
                    }
                }
            }
        }
        x.color = COLOR.BLACK;
    }

    delete(value) {
        if(this.root === this.NIL) {
            throw new Error('Tree is Empty...');
        }

        let z = this.root;
        while(z !== this.NIL && z.data !== value) {
            if(value < z.data) {
                z = z.leftElement;
            } else if (value > z.data) {
                z = z.rightElement;
            }
        }

        if(z === this.NIL) {
            return false;
        }

        let y = z;
        let y_original_color = z.color;
        let x;

        if(z.leftElement === this.NIL) {
            x = z.rightElement;
            this.transplant(z, z.rightElement);
        } else if (z.rightElement === this.NIL) {
            x = z.leftElement;
            this.transplant(z, z.leftElement)
        } else {
            y = this.treeMinimum(z.rightElement);
            y_original_color = y.color;
            x = y.rightElement;

            if(y.parent === z) {
                x.parent = y;
            } else {
                this.transplant(y, y.rightElement);
                y.rightElement = z.rightElement;
                y.rightElement.parent = y;
            }
            this.transplant(z, y);
            y.leftElement = z.leftElement;
            y.leftElement.parent = y;
            y.color = z.color;
        }

        if(y_original_color === COLOR.BLACK) {
            this._deleteFixup(x)
        }
        

        return true;
    }

    treeMinimum(node) {
        if(node === this.NIL) {
            throw new Error('Node is null')
        }

        while(node.leftElement !== this.NIL) {
            node = node.leftElement;
        }

        return node;
    }

    inorder(currNode = this.root) {
        if(currNode === this.NIL) {
            return;
        }
        this.inorder(currNode.leftElement);
        console.log({
            data: currNode.data,
            color: currNode.color,
            parent: currNode?.parent?.data ? currNode?.parent?.data : null,
            left: currNode?.leftElement?.data ? currNode?.leftElement?.data: null,
            right: currNode?.rightElement?.data ? currNode?.rightElement?.data: null,
        });
        this.inorder(currNode.rightElement);
    }

    preorder(currNode = this.root) {
        if(currNode === this.NIL) {
            return;
        }
        console.log({
            data: currNode.data,
            color: currNode.color,
            parent: currNode?.parent?.data ? currNode?.parent?.data : null,
            left: currNode?.leftElement?.data ? currNode?.leftElement?.data: null,
            right: currNode?.rightElement?.data ? currNode?.rightElement?.data: null,
        });
        this.preorder(currNode.leftElement);
        this.preorder(currNode.rightElement);
    }

    leftRotate(node) {
        if(node === this.NIL || node.rightElement === this.NIL) {
            throw new Error('Invalid Node for Left Rotation')
        }
        const y = node.rightElement;
        node.rightElement = y.leftElement;

        if(y.leftElement !== this.NIL) {
            y.leftElement.parent = node;
        }

        y.parent = node.parent;

        if(node.parent === this.NIL) {
            this.root = y;
        } else if(node === node.parent.leftElement) {
            node.parent.leftElement = y
        } else {
            node.parent.rightElement = y;
        }

        y.leftElement = node;
        node.parent = y;
    }

    rightRotate(node) {
        if(node === this.NIL || node.leftElement === this.NIL) {
            throw new Error('Invalid Node for Right Rotation')
        }

        const y = node.leftElement;
        node.leftElement = y.rightElement;

        if(y.rightElement !== this.NIL) {
            y.rightElement.parent = node;
        }

        y.parent = node.parent;

        if(node.parent === this.NIL) {
            this.root = y;
        } else if(node === node.parent.leftElement) {
            node.parent.leftElement = y;
        } else {
            node.parent.rightElement = y;
        }

        y.rightElement = node;
        node.parent = y;
    }
}

const tree = new RedBlackTree();

tree.insert(10)
tree.insert(23)
tree.insert(24)
tree.insert(11)
tree.insert(12)
tree.insert(9);
tree.insert(8)
tree.insert(13)

tree.insert(25)
tree.insert(26)
tree.insert(27)
tree.insert(28)
tree.insert(29)
tree.insert(30)
tree.insert(31)

tree.preorder()

console.log("===========")
// tree.delete(31)
// tree.delete(12)
tree.delete(27)

// tree.preorder()

// console.log("===========")
// tree.insert(11)
tree.preorder()