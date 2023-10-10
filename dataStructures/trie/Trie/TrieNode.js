class TrieNode {
    constructor(char){
        this.char = char;
        this.children = Array(26).fill(null);
        this.isEndWord = false
    }

    markAsLeaf() {
        this.isEndWord = true;
    }

    unMarkAsLeaf() {
        this.isEndWord = false;
    }
}

module.exports = TrieNode;
