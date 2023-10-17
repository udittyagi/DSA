const HashEntry = require('../HashEntry/HashEntry');

class HashTable {
    constructor(initialSize = 10) {
        this.slots = initialSize;
        this.size = 0;
        this.bucket = Array(this.slots).fill(null);
        this.threshold = 0.6;
    }

    getSize() {
        return this.size;
    }

    isEmpty() {
        return this.size === 0;
    }

    getIndex(key) {
        return key % this.slots;
    }

    __resize() {
        this.slots = this.slots * 2;
        const newBucket = Array(this.slots).fill(null);

        for(let i = 0; i < this.bucket.length; i++) {
            //Rehash all items into new bucket
            const head = this.bucket[i];
            while(head !== null) {
                const newIndex = this.getIndex(head.key);
                const newHead = newBucket[newIndex];
                if(newHead === null) {
                    newHead = new HashEntry(head.key, head.value);
                } else {
                    while(newHead !== null) {
                        if(newHead.key === head.key) {
                            newHead.value = head.value;
                            break;
                        } else if(newHead.next === null) {
                            newHead.next = new HashEntry(head.key, head.value)
                        }
                        newHead = newHead.next;
                    }
                }
                head = head.next;
            }
        }
        this.bucket = newBucket;
    }

    insert(key, value) {
        //Get the index;
        const index = this.getIndex(key);
        let head = this.bucket[index];
        //Check whether the index has collision or not
        if(head === null) {
            this.bucket[index] = new HashEntry(key, value);
            this.size++;
        } else {
            while(head !== null) {
                if(head.key === key) {
                    head.value = value;
                    break;
                }
                if(head.next === null) {
                    head.next = new HashEntry(key, value);
                    this.size++;
                }
                head = head.next;
            }
        }

        const loadFactor = this.size / this.slots;
        if(loadFactor >= 0.6) {
            this.__resize();
        } 
    }

    remove(key) {
        const index = this.getIndex(key);
        let head = this.bucket[index];

        if(head && head.key === key) {
            this.bucket[index] = head.next;
            head.next = null;
            this.size--;
            return true;
        }

        let prev = null;
        while(head !== null) {
            if(head.key === key) {
                prev.next = head.next;
                head.next = null;
                this.size--;
                return true;
            }
            prev = head;
            head = head.next;
        }
        return false;
    }

    search(key) {
        const index = this.getIndex(key);
        let head = this.bucket[index];
        while(head != null) {
            if(head.key === key) {
                return head.value;
            }
            head = head.next;
        }
        return null;
    }
}

const hash = new HashTable();
hash.insert(12, "Udit");
hash.insert(13, "isha");
hash.insert(12, "Tyagi");
hash.remove(11);


console.log('Hash Size:', hash.getSize());
console.log('Searching...', hash.search(13))

module.exports = HashTable;
