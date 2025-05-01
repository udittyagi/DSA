class MinHeap {
    constructor() {
        this.heap = [];
        this.heapSize = 0;
    }

    insert(value) {
        if(this.heapSize < this.heap.length) {
            this.heap[this.heapSize] = value;
        } else {
            this.heap.push(value)
        }
        this.heapSize++;
        this.__percolateUp(this.heapSize - 1);
    }

    getMin() {
        if(this.heapSize > 0) {
            return this.heap[0];
        }
        return null
    }

    removeMin() {
        if(this.heapSize === 0) {
            return null;
        }
        if(this.heapSize === 1) {
            const min = this.heap[0];
            this.heapSize--;
            return min
        }
        const min = this.heap[0];
        const lastElement = this.heap[this.heapSize - 1];
        this.heap[0] = lastElement;
        this.heapSize--;
        this.__minHeapify(0);
        return min;
    }

    buildHeap(arr) {
        this.heap = arr;
        this.heapSize = arr.length;

        for(let i = Math.floor(this.heapSize / 2); i >= 0; i--) {
            this.__minHeapify(i)
        }
    }

    __percolateUp(index) {
        if(index === 0) {
            return;
        }
        const parent = Math.floor((index - 1) / 2);
        if(this.heap[parent] > this.heap[index]) {
            const parentValue = this.heap[parent];
            this.heap[parent] = this.heap[index];
            this.heap[index] = parentValue;
            this.__percolateUp(parent);
        }
    }

    __minHeapify(index) {
        const left = (2 * index) + 1;
        const right = (2 * index) + 2;
        let minIndex = index;

        if(left < this.heapSize && this.heap[left] < this.heap[minIndex]) {
            minIndex = left;
        }

        if(right < this.heapSize && this.heap[right] < this.heap[minIndex]) {
            minIndex = right;
        }

        if(minIndex !== index) {
            let minValue = this.heap[minIndex];
            this.heap[minIndex] = this.heap[index];
            this.heap[index] = minValue;
            this.__minHeapify(minIndex);
        }
    }
}

const heap = new MinHeap();

// heap.insert(12)
// heap.insert(10)
// heap.insert(-10)
// heap.insert(100)
// heap.insert(200)
// heap.insert(5)

const arr = [9,4,7,1,-2,6,5]
heap.buildHeap(arr);

console.log("Min value", heap.getMin(), heap.heap)

heap.removeMin()
heap.removeMin()

console.log(heap.getMin(), heap.heap)