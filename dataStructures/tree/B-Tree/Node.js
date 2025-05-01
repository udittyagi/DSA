class Node {
    //t is minimum degree
    //So A node can containe number of keys from t - 1 to 2t - 1 (except root)
    //and chidlren from t to 
    constructor(t) {
        this.keys = Array(2*t-1).fill(null);
        this.leaf = false;
        this.c = Array(2*t).fill(null);
        this.n = 0 
    }
}

module.exports = Node;
