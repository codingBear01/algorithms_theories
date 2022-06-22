// peek function
function Heap() {
  this.items = [];
}

Heap.prototype.swap = function (index1, index2) {
  let temp = this.items[index1];
  this.items[index1] = this.items[index2];
  this.items[index2] = temp;
};

Heap.prototype.parentIndex = function (index) {
  return Math.floor((index - 1) / 2);
};

Heap.prototype.leftChildIndex = function (index) {
  return index * 2 + 1;
};

Heap.prototype.rightChildrenIndex = function (index) {
  return index * 2 + 2;
};

Heap.prototype.parent = function (index) {
  return this.items[this.parentIndex(index)];
};

Heap.prototype.leftChild = function (index) {
  return this.items[this.leftChildIndex(index)];
};

Heap.prototype.rightChild = function (index) {
  return this.items[this.rightChildrenIndex(index)];
};

Heap.prototype.peek = function (item) {
  return this.items[0];
};

Heap.prototype.size = function () {
  return this.items.length;
};

// min-heap
function MinHeap() {
  this.items = [];
}

MinHeap.prototype = Object.create(Heap.prototype); // inherit helpers from heap by copying prototype

MinHeap.prototype.add = function (item) {
  this.items[this.items.length] = item;
  this.bubbleUp();
};

MinHeap.prototype.poll = function () {
  let item = this.items[0];
  this.items[0] = this.items[this.items.length - 1];
  this.items.pop();
  this.bubbleDown();
  return item;
};

MinHeap.prototype.bubbleDown = function () {
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
      smallerIndex = this.rightChildrenIndex(index);
    }
    this.swap(smallerIndex, index);
    index = smallerIndex;
  }
};

MinHeap.prototype.bubbleUp = function () {
  let index = this.items.length - 1;

  while (this.parent(index) && this.parent(index) > this.items[index]) {
    this.swap(this.parentIndex(index), index);
    index = this.parentIndex(index);
  }
};

const minHeap = new MinHeap();

minHeap.add(1);
minHeap.add(10);
minHeap.add(5);
minHeap.add(100);
minHeap.add(8);

console.log('min_heap: ', minHeap.poll()); // 1
console.log('min_heap: ', minHeap.poll()); // 5
console.log('min_heap: ', minHeap.poll()); // 8
console.log('min_heap: ', minHeap.poll()); // 10
console.log('min_heap: ', minHeap.poll()); // 100

// max-heap
function MaxHeap() {
  this.items = [];
}

MaxHeap.prototype = Object.create(Heap.prototype); // inherit helpers from heap by copying prototype

MaxHeap.prototype.add = function (item) {
  this.items[this.items.length] = item;
  this.bubbleUp();
};

MaxHeap.prototype.poll = function () {
  let item = this.items[0];
  this.items[0] = this.items[this.items.length - 1];
  this.items.pop();
  this.bubbleDown();
  return item;
};

MaxHeap.prototype.bubbleDown = function () {
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
      biggerIndex = this.rightChildrenIndex(index);
    }
    this.swap(biggerIndex, index);
    index = biggerIndex;
  }
};

MaxHeap.prototype.bubbleUp = function () {
  let index = this.items.length - 1;

  while (this.parent(index) && this.parent(index) < this.items[index]) {
    this.swap(this.parentIndex(index), index);
    index = this.parentIndex(index);
  }
};

const maxHeap = new MaxHeap();

maxHeap.add(1);
maxHeap.add(10);
maxHeap.add(5);
maxHeap.add(100);
maxHeap.add(8);

console.log('max_heap: ', maxHeap.poll()); // 100
console.log('max_heap: ', maxHeap.poll()); // 10
console.log('max_heap: ', maxHeap.poll()); // 8
console.log('max_heap: ', maxHeap.poll()); // 5
console.log('max_heap: ', maxHeap.poll()); // 1
