class MaxHeap {
    constructor() {
        this.heap = [];
        this.heapSize = 0;
    }

    insert(value) {
        if(this.heap.length >= this.heapSize) {
            this.heap.push(value);
        } else {
            this.heap[this.heapSize] = value;
        }
        this.heapSize++;
        this.__percolateUp(this.heapSize - 1);
    }

    removeMax() {
        if(this.heapSize === 0) {
            return null;
        }
        if(this.heapSize === 1) {
            const max = this.heap[0];
            this.heapSize--;
            return max;
        }
        const max = this.heap[0];
        const lastElement = this.heap[this.heapSize - 1];
        this.heap[0] = lastElement;
        this.heapSize--;
        this.__maxHeapify(0);
        return max;
    }

    getMax() {
        if(this.heapSize > 0) {
            return this.heap[0];
        }
        return null;
    }

    buildHeap(arr = []) {
        this.heap = arr;
        this.heapSize = arr.length;
        for(let i = Math.floor(this.heapSize / 2); i >= 0; i--) {
            this.__maxHeapify(i)
        }
    }

    __percolateUp(index){
        if(index <= 0) {
            return;
        }
        
        const parent = Math.floor((index - 1) / 2);
        if(this.heap[parent] < this.heap[index]) {
            const parentValue = this.heap[parent];
            this.heap[parent] = this.heap[index];
            this.heap[index] = parentValue;
            this.__percolateUp(parent);
        }
    }

    __maxHeapify(index) {
        const left = (2 * index) + 1;
        const right = (2 * index) + 2;
        let maxValIdx = index;

        if(left < this.heapSize && this.heap[left] > this.heap[maxValIdx]) {
            maxValIdx = left;
        }

        if(right < this.heapSize && this.heap[right] > this.heap[maxValIdx]) {
            maxValIdx = right;
        }

        if(maxValIdx !== index) {
            const maxVal = this.heap[maxValIdx];
            this.heap[maxValIdx] = this.heap[index];
            this.heap[index] = maxVal;
            this.__maxHeapify(maxValIdx);
        }
    }
}

const heap = new MaxHeap();

heap.insert(12)
heap.insert(10)
heap.insert(-10)
heap.insert(100)
heap.insert(200)
heap.insert(5)

// const arr = [12, 10, -10, 100, 200, 5]
// heap.buildHeap(arr);

console.log("max value", heap.getMax(), heap.heap)

heap.removeMax()
heap.removeMax()

console.log(heap.getMax())
