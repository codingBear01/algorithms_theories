class Heap {
  constructor() {
    this.items = [];
  }

  swap(index1, index2) {
    let temp = this.items[index1];

    this.items[index1] = this.items[index2];
    this.items[index2] = temp;
  }

  parentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  leftChildIndex(index) {
    return index * 2 + 1;
  }

  rightChildIndex(index) {
    return index * 2 + 2;
  }

  parent(index) {
    return this.items[this.parentIndex(index)];
  }

  leftChild(index) {
    return this.items[this.leftChildIndex(index)];
  }

  rightChild(index) {
    return this.items[this.rightChildIndex(index)];
  }

  peek() {
    return this.items[0];
  }

  size() {
    return this.items.length;
  }
}

// min-heap
class MinHeap extends Heap {
  // inherit helpers from heap by extending class
  constructor(items) {
    super(items);
  }

  add(item) {
    this.items[this.items.length] = item;
    this.bubbleUp();
  }

  poll() {
    let item = this.items[0];

    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    this.bubbleDown();

    return item;
  }

  bubbleUp() {
    let index = this.items.length - 1;

    while (this.parent(index) && this.parent(index) > this.items[index]) {
      this.swap(this.parentIndex(index), index);
      index = this.parentIndex(index);
    }
  }

  bubbleDown() {
    let index = 0;

    while (
      this.leftChild(index) &&
      (this.leftChild(index) < this.items[index] ||
        this.rightChild(index) < this.items[index])
    ) {
      let smallerIndex = this.leftChildIndex(index);

      if (
        this.rightChild(index) &&
        this.rightChild(index) < this.items[smallerIndex]
      ) {
        smallerIndex = this.rightChildIndex(index);
      }

      this.swap(smallerIndex, index);
      index = smallerIndex;
    }
  }
}

const minHeap = new MinHeap([2, 4]);

minHeap.add(1);
minHeap.add(10);
minHeap.add(5);
minHeap.add(100);
minHeap.add(8);

console.log('min_heap:', minHeap.poll()); // 1
console.log('min_heap:', minHeap.poll()); // 5
console.log('min_heap:', minHeap.poll()); // 8
console.log('min_heap:', minHeap.poll()); // 10
console.log('min_heap:', minHeap.poll()); // 100

// max-heap
class MaxHeap extends Heap {
  // inherit helpers from heap by extending class
  constructor(items) {
    super(items);
  }

  add(item) {
    this.items[this.items.length] = item;
    this.bubbleUp();
  }

  poll() {
    let item = this.items[0];

    this.items[0] = this.items[this.items.length - 1];
    this.items.pop();
    this.bubbleDown();

    return item;
  }

  bubbleUp() {
    let index = this.items.length - 1;

    while (this.parent(index) && this.parent(index) < this.items[index]) {
      this.swap(this.parentIndex(index), index);
      index = this.parentIndex(index);
    }
  }

  bubbleDown() {
    let index = 0;

    while (
      this.leftChild(index) &&
      (this.leftChild(index) > this.items[index] ||
        this.rightChild(index) > this.items[index])
    ) {
      let biggerIndex = this.leftChildIndex(index);

      if (
        this.rightChild(index) &&
        this.rightChild(index) > this.items[biggerIndex]
      ) {
        biggerIndex = this.rightChildIndex(index);
      }

      this.swap(biggerIndex, index);
      index = biggerIndex;
    }
  }
}

const maxHeap = new MaxHeap();

maxHeap.add(1);
maxHeap.add(10);
maxHeap.add(5);
maxHeap.add(100);
maxHeap.add(8);

console.log('max_heap:', maxHeap.poll()); // 100
console.log('max_heap:', maxHeap.poll()); // 10
console.log('max_heap:', maxHeap.poll()); // 8
console.log('max_heap:', maxHeap.poll()); // 5
console.log('max_heap:', maxHeap.poll()); // 1

class MedianHeap {
  constructor() {
    this.minHeap = new MinHeap();
    this.maxHeap = new MaxHeap();
  }

  add(value) {
    if (value > this.median()) {
      this.minHeap.add(value);
    } else {
      this.maxHeap.add(value);
    }

    // Re balancing
    if (this.minHeap.size() - this.maxHeap.size() > 1) {
      this.maxHeap.add(this.minHeap.poll());
    }

    if (this.maxHeap.size() - this.minHeap.size() > 1) {
      this.minHeap.add(this.maxHeap.poll());
    }
  }

  median() {
    if (this.minHeap.size() === 0 && this.maxHeap.size() === 0) {
      return Number.NEGATIVE_INFINITY;
    } else if (this.minHeap.size() === this.maxHeap.size()) {
      return (this.minHeap.peek() + this.maxHeap.peek()) / 2;
    } else if (this.minHeap.size() > this.maxHeap.size()) {
      return this.minHeap.peek();
    } else {
      return this.maxHeap.peek();
    }
  }
}

const medianH = new MedianHeap();

medianH.add(12);
console.log('median_heap', medianH.median()); // 12
medianH.add(2);
console.log('median_heap', medianH.median()); // 7
medianH.add(23);
console.log('median_heap', medianH.median()); // 12
medianH.add(13);
console.log('median_heap', medianH.median()); // 12.5

const array1 = [12, 3, 13, 4, 2, 40, 23];

function getKthSmallestElement(array, k) {
  const minH = new MinHeap();

  for (let i = 0, arrayLength = array.length; i < arrayLength; i++) {
    minH.add(array[i]);
  }

  for (let i = 1; i < k; i++) {
    minH.poll();
  }

  return minH.poll();
}

console.log('getKthSmallestElement(2)', getKthSmallestElement(array1, 2)); // 3
console.log('getKthSmallestElement(1)', getKthSmallestElement(array1, 1)); // 2
console.log('getKthSmallestElement(7)', getKthSmallestElement(array1, 7)); // 40

function getKthBiggestElement(array, k) {
  const maxH = new MaxHeap();

  for (let i = 0, arrayLength = array.length; i < arrayLength; i++) {
    maxH.add(array[i]);
  }

  for (let i = 1; i < k; i++) {
    maxH.poll();
  }

  return maxH.poll();
}

console.log('getKthBiggestElement(2)', getKthBiggestElement(array1, 2)); // 23
console.log('getKthBiggestElement(1)', getKthBiggestElement(array1, 1)); // 40
console.log('getKthBiggestElement(7)', getKthBiggestElement(array1, 7)); // 2
