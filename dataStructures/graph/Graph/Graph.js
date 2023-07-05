const LinkedList = require('../../linkedList/SinglyLinkedList/LinkedList');

class Graph {
    constructor(vertices, isUndirected) {
        this.vertices = vertices;
        this.isUndirected = isUndirected;
        this.list = [];

        for(let i = 0; i < vertices; i++) {
            this.list.push(new LinkedList());
        }
    }

    addVertex() {
        this.list.push(new LinkedList());
        this.vertices++;
    }

    removeVertex(vertex) {
        //TODO
    }

    addEdge(source, destination) {
        if(source > this.vertices - 1 || destination > this.vertices - 1) {
            return;
        }
        this.list[source].insertAtHead(destination);
        if(this.isUndirected) {
            this.list[destination].insertAtHead(source);
        }
    }

    removeEdge(source, destination) {
        if(source > this.vertices - 1 || destination > this.vertices - 1) {
            return;
        }

        this.list[source].removeNodeWithValue(destination);

        if(this.isUndirected) {
            this.list[destination].removeNodeWithValue(source);
        }
    }

    print() {
        console.log(">>Adjacency List of Graph<<");
        var i;
        for (i = 0; i < this.list.length; i++) {
          process.stdout.write("|" + String(i) + "| => ");
          let temp = this.list[i].getHead();
          while (temp != null) {
            process.stdout.write("[" + String(temp.data) + "] -> ");
            temp = temp.nextElement;
          }
          console.log("null ");
        }
      }
}

// const graph = new Graph(5, true);
// graph.addEdge(0,1);
// graph.addEdge(0,3);
// graph.addEdge(1,2);
// graph.addEdge(1,4);
// graph.addEdge(1,5);
// graph.addEdge(3,4);

// graph.removeEdge(3,4)

// graph.print()

module.exports = Graph;
