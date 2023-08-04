const Node = require('./Node');
const Queue = require('../../stack_queue/Queue/Queue');

class BTree {
    constructor(degree) {
        this.t = degree;
        this.root = new Node(degree);
        this.root.leaf = true;
    }

    splitChild(x, i) {
        const z = new Node(this.t);
        const y = x.c[i];

        z.n = this.t - 1;
        z.leaf = y.leaf;
        //Transfer Keys from y to z
        for(let j = 0; j < z.n; j++) {
            z.keys[j] = y.keys[this.t + j];
        }

        if(y.leaf === false) {
            //Transfer children from y to z
            for(let j = 0; j < z.n + 1; j++) {
                z.c[j] = y.c[this.t  + j];
            }
        }

        y.n = this.t - 1;

        //Shift (n - i) children of x by 1 index to right
        for(let j = x.n + 1; j > i + 1; j--) {
            x.c[j] = x.c[j - 1]
        }
        //Insert z on the right side of i pos
        x.c[i + 1] = z 

        //Shift (n - i) Keys of x by 1 index to right
        for(let j = x.n; j > i; j--) {
            x.keys[j] = x.keys[j - 1];
        }
        x.keys[i] = y.keys[this.t - 1];

        //Increate x.n count by 1
        x.n = x.n + 1;
    }

    insertNonFull(x, k) {
        //If Leaf then insert (Insertion will always take place at leaf node)
        if(x.leaf === true) {
            let i = x.n - 1;
            while(i >= 0 && x.keys[i] > k ) {
                x.keys[i + 1] = x.keys[i];
                i--;
            }
            x.keys[i + 1] = k;
            x.n = x.n + 1;
        } else {
            //In internal Node --> search the appropriate child of x
            let i = x.n - 1;
            while(i >= 0 && x.keys[i] > k ) {
                i--;
            }
            i = i + 1;

            //If child node reached max limit then split
            if (x.c[i].n === 2 * this.t - 1) {
                this.splitChild(x, i);
                if(x.keys[i] < k) {
                    i = i + 1;
                }
            }
            this.insertNonFull(x.c[i], k)
            }
    }

    insert(k) {
        const r = this.root;
        if(r.n === 2 * this.t - 1) {
            const newNode = new Node(this.t);
            this.root = newNode;
            newNode.c[0] = r;
            this.splitChild(this.root, 0);
        }
        this.insertNonFull(this.root, k)
    }

    isKeyPresent(x, k) {
        for(let i = 0; i < x.n; i++) {
            if(x.keys[i] === k) {
                return i
            }
        }
        return - 1;
    }

    mergeNodesWithKey(x, i) {
        //merge childrens of node x at pos i and i + 1
        const z = x.c[i];
        z.keys[z.n] = x.keys[i];

        let j = 0;

        for(let k = 0; k < x.c[i+1].n; k++) {
            z.keys[z.n + k + 1] = x.c[i+1].keys[j];
        }
        z.n = 2 * this.t - 1;

        x.n = x.n - 1;
        for(let k = i + 1; k < x.n + 1; k++) {
            x.c[k] = x.c[k + 1]
        }
        x.c[i] = z;

        for(let k = i; k < x.n; k++) {
            x.keys[k] = x.keys[k + 1];
        }

        if(this.root === x && x.n === 0) {
            this.root = z;
        }
    }

    deleteNode(x, k) {
        const keyIdx = this.isKeyPresent(x, k)
        if(keyIdx === -1 && x.leaf) {
            return
        }
        if( keyIdx !== -1) {
            if(x.leaf) {
                x.n = x.n - 1;
                for(let i = keyIdx; i < x.n ; i++) {
                    x.keys[i] = x.keys[i+1];
                }
            } else {
                if(x.c[keyIdx].n >= this.t) {
                    //If left child have minimum t keys, find predecessor
                    const predecessor = this.leftMaximum(x.c[keyIdx]);
                    //Replace predecessor with the deleted key;
                    x.keys[keyIdx] = predecessor;
                    //Delete predecessor key
                    this.deleteNode(x.c[keyIdx], predecessor)
                } else if(x.c[keyIdx + 1].n >= this.t) {
                    //If right child have minimum t keys, find successor
                    const successor = this.rightMinimum(x.c[keyIdx + 1]);
                    //Replace successor with the deleted key;
                    x.keys[keyIdx] = successor;
                    //Delete successor key
                    this.deleteNode(x.c[keyIdx + 1], successor)
                } else {
                    //If no node have minimum t children
                    //Merge the nodes
                    this.mergeNodesWithKey(x, keyIdx);
                    this.deleteNode(x.c[keyIdx], k);
                }
            }
        } else {
            //If k is not found in x
            //then find the child in which we will proceed
            let i = 0;
            while(i < x.n && k > x.keys[i]) {
                i++;
            }

            //check if the child at i have t-1 keys
            if(x.c[i].n === this.t - 1) {
                //if last child of node
                if(i === x.n) {
                    if (x.c[i - 1].n === this.t - 1) {
                        //If both nodes have t - 1 keys
                        i = i - 1
                        this.mergeNodesWithKey(x, i);
                        this.deleteNode(x.c[i], k);
                    } else {
                        //Shift key at i from x to y, and the last key from z to x
                        const y = x.c[i]
                        const z = x.c[i - 1]

                        //Shift one child to the right in y and then add new child at 0
                        for(let j = y.n + 1; j > 0 ; j--) {
                            y.c[j] = y.c[j-1]
                        }
                        y.c[0] = z.c[z.n]

                        //Shift one key to the right and then add key from x to the y
                        for(let j = y.n; j > 0; j--) {
                            y.keys[j] = y.keys[j - 1];
                        }
                        y.keys[0] = x.keys[i - 1];

                        //Add last key of z to x
                        x.keys[i - 1] = z.keys[z.n - 1];

                        z.n = z.n - 1;
                        y.n = y.n + 1;
                        this.deleteNode(x.c[i], k);
                    }
                } else {
                    //If not the last child
                    if(x.c[i + 1].n === this.t - 1) {
                        this.mergeNodesWithKey(x, i);
                        this.deleteNode(x.c[i], k);
                    } else {
                        let y = x.c[i];
                        let z = x.c[i + 1];

                        y.keys[y.n] = x.keys[i];
                        y.c[y.n] = z.c[0];
                        x.keys[i] = z.keys[0];

                        for(let j = 0; j < z.n + 1; j++) {
                            z.c[j] = z.c[j + 1];
                        }

                        for(let j = 0; j < z.n; j++) {
                            z.keys[j] = z.keys[j + 1];
                        }

                        z.n = z.n - 1;
                        y.n = y.n + 1;

                        this.deleteNode(x.c[i], k);
                    }
                }
            } else {
                this.deleteNode(x.c[i], k)
            }
        }
    }

    delete(k) {
       this.deleteNode(this.root, k)
    }

    leftMaximum(node) {
        while(!node.leaf) {
            node = node.c[node.n];
        }
        return node.keys[node.n - 1]
    }

    rightMinimum(node) {
        while(!node.leaf) {
            node = node.c[0];
        }
        return node.keys[0];
    }

    printNode(node) {
        let str = '|';
        for(let i = 0; i < node.n; i++) {
            str = `${str} ${node.keys[i]} |`;
        }
        console.log(str)
    }

    bfsTraverse(node = this.root) {
        const queue = new Queue();
        queue.enqueue(node)

        while(!queue.isEmpty()) {
            const currNode = queue.dequeue();
            if(currNode) {
                console.log('------------------------');
                this.printNode(currNode);
                for(let i = 0; i < currNode.n + 1; i++) {
                    queue.enqueue(currNode.c[i]);
                }
            }
        }
    }
}

const bTree = new BTree(2);

bTree.insert(2)
bTree.insert(3);
bTree.insert(6);
bTree.insert(9);
bTree.insert(7);
bTree.insert(5);
bTree.insert(1);
bTree.insert(4);
bTree.insert(0);
bTree.insert(18);
bTree.insert(20);
bTree.insert(100);
bTree.insert(17);

bTree.bfsTraverse()


bTree.delete(3);
bTree.delete(17);
bTree.delete(18);
bTree.delete(9);
bTree.delete(20);
bTree.delete(100);
bTree.delete(7);
bTree.delete(6);
bTree.delete(0);
bTree.delete(4);
bTree.delete(2);
console.log('*******************')
bTree.bfsTraverse()


