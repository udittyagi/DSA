class Node {
    constructor(value) {
        this.data = value;
        this.leftElement = null;
        this.rightElement = null;
        this.parent = null;
        this.height = 0;
        this.color = ''
    }
}

module.exports = Node;
