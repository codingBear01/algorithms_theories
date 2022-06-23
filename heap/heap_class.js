// peek-class
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
