const TrieNode = require('./TrieNode');

class Trie {
    constructor() {
        this.root = new TrieNode("");
    }

    getIndex(key) {
        if(!key) {
            throw new Error("Invalid Key");
        }
        return key.charCodeAt(0) - "a".charCodeAt(0);
    }

    insert(key) {
        if(!key) {
            throw new Error("Invalid Key");
        }
        key = key.toLowerCase();
        let currentNode = this.root;
        for(let level = 0; level < key.length; level++) {
            const keyIdx = this.getIndex(key[level])
            if(currentNode.children[keyIdx] === null) {
                currentNode.children[keyIdx] = new TrieNode(key[level]);
                console.log('Inserting Key:', key[level])
            }
            currentNode = currentNode.children[keyIdx];
        }
        currentNode.markAsLeaf();
        console.log('--------------------------');
    }

    search(key) {
        if(!key) {
            return false
        }
        key = key.toLowerCase();
        let currentNode = this.root;

        for(let level = 0; level < key.length; level++ ) {
            const keyIdx = this.getIndex(key[level]);
            if(currentNode.children[keyIdx] === null){
                return false;
            }
            currentNode = currentNode.children[keyIdx];
        }
        if(currentNode !== null && currentNode.isEndWord) {
            return true;
        }
        return false
    }

    containsInOtherWords(node){
        if(!node) {
            throw new Error("Invalid Node")
        }
        return node.children.some(value => value !== null);
    }

    deleteHelper(currNode, key, level){
        let deletedSelf = false;

        if(currNode === null) {
            return deletedSelf;
        }

        //We have reached at the end character
        if(key.length === level ) {
            if(this.containsInOtherWords(currNode)) {
                deletedSelf = false
                currNode.unMarkAsLeaf();
            } else {
                deletedSelf = true;
            }
        } else {
            const keyIdx = this.getIndex(key[level]);
            const childDeleted = this.deleteHelper(currNode.children[keyIdx], key, level + 1);
            if(childDeleted) {
                currNode.children[keyIdx] = null;

                //It contains part other word in it
                if(this.containsInOtherWords(currNode)) {
                    deletedSelf = false;
                }else if(currNode.isEndWord) {
                    //If this node is the end character of another word
                    deletedSelf = false;
                } else {
                    //This current node is not part of any word
                    deletedSelf = true;
                }
            }
        }

        return deletedSelf;
    }

    delete(key) {
        if(!key) {
            return false;
        }
        /**
         * case 1: If word Preset
         *  a) Word is some other words prefix --> Then just set last node isEndWord to false
         *  b) It contains other word in it (not all of its children are null) ---> Delete nodes (bottom to top) till the first isEndWord true encountered
         *  c) If no other words are part of it --> Delete it whole till we reach the root
         * case 2: If word is not present i.e at any level in tree if any character of word is missing return false
         */
        this.deleteHelper(this.root, key, 0)

    }
}

const trie = new Trie();
const words = ["their", "There", "the", "bed", "bedroom"];
words.forEach(word => {
    trie.insert(word)
})
trie.delete("the")
console.log("Their: ", trie.search("Their"))
console.log("The: ", trie.search("the"))
console.log("There: ", trie.search("There"))
console.log("bedroom: ", trie.search("bedroom"))
console.log("bedroo: ", trie.search("bedroo"))
console.log("that: ", trie.search("that"))