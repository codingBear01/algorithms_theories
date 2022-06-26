class UndirectedGraph {
  constructor() {
    this.edges = {};
  }

  addVertex(vertex) {
    this.edges[vertex] = {};
  }

  addEdge(vertex1, vertex2, weight) {
    if (weight === undefined) {
      weight = 0;
    }
    this.edges[vertex1][vertex2] = weight;
    this.edges[vertex2][vertex1] = weight;
  }

  removeEdge(vertex1, vertex2) {
    if (this.edges[vertex1] && this.edges[vertex1][vertex2] !== undefined) {
      delete this.edges[vertex1][vertex2];
    }
    if (this.edges[vertex2] && this.edges[vertex2][vertex1] !== undefined) {
      delete this.edges[vertex2][vertex1];
    }
  }

  removeVertex(vertex) {
    for (let adjacentVertex in this.edges[vertex]) {
      this.removeEdge(adjacentVertex, vertex);
    }
    delete this.edges[vertex];
  }
}

const graph1 = new UndirectedGraph();
graph1.addVertex(1);
graph1.addVertex(2);
graph1.addVertex(3);
graph1.addVertex(4);
graph1.addVertex(5);
graph1.addEdge(1, 2, 1);
graph1.addEdge(2, 3, 8);
graph1.addEdge(3, 4, 10);
graph1.addEdge(4, 5, 100);
graph1.addEdge(1, 5, 88);
console.log('graph1', graph1.edges);

const graph2 = new UndirectedGraph();
graph2.addVertex(1);
graph2.addVertex(2);
graph2.addVertex(3);
graph2.addVertex(4);
graph2.addVertex(5);
graph2.addEdge(1, 2, 1);
graph2.addEdge(2, 3, 8);
graph2.addEdge(3, 4, 10);
graph2.addEdge(4, 5, 100);
graph2.addEdge(1, 5, 88);
graph2.removeVertex(5);
graph2.removeVertex(1);
graph2.removeEdge(2, 3);
console.log('graph2', graph2.edges);

class DirectedGraph {
  constructor() {
    this.edges = {};
  }

  addVertex(vertex) {
    this.edges[vertex] = {};
  }

  addEdge(origVertex, destVertex, weight) {
    if (weight === undefined) {
      weight = 0;
    }
    this.edges[origVertex][destVertex] = weight;
  }

  removeEdge(origVertex, destVertex) {
    if (
      this.edges[origVertex] &&
      this.edges[origVertex][destVertex] !== undefined
    ) {
      delete this.edges[origVertex][destVertex];
    }
  }

  removeVertex(vertex) {
    for (let adjacentVertex in this.edges[vertex]) {
      this.removeEdge(adjacentVertex, vertex);
    }
    delete this.edges[vertex];
  }

  traverseBFS(vertex, fn) {
    const queue = [];
    const visited = {};

    queue.push(vertex);

    while (queue.length) {
      vertex = queue.shift();
      if (!visited[vertex]) {
        visited[vertex] = true;
        fn(vertex);
        for (let adjacentVertex in this.edges[vertex]) {
          queue.push(adjacentVertex);
        }
      }
    }
  }

  traverseDFS(vertex, fn) {
    const visited = {};
    this._traverseDFS(vertex, visited, fn);
  }

  _traverseDFS(vertex, visited, fn) {
    visited[vertex] = true;
    fn(vertex);
    for (let adjacentVertex in this.edges[vertex]) {
      if (!visited[adjacentVertex]) {
        this._traverseDFS(adjacentVertex, visited, fn);
      }
    }
  }
}

const digraph1 = new DirectedGraph();
digraph1.addVertex('A');
digraph1.addVertex('B');
digraph1.addVertex('C');
digraph1.addEdge('A', 'B', 1);
digraph1.addEdge('B', 'C', 2);
digraph1.addEdge('C', 'A', 3);
// digraph1.removeEdge('C', 'A');
// digraph1.removeVertex('C');
console.log('digraph1', digraph1.edges);

digraph1.traverseBFS('B', (vertex) => {
  console.log('BFS', vertex);
});
digraph1.traverseDFS('B', (vertex) => {
  console.log('DFS', vertex);
});
