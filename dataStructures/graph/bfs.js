/**
 * You have to implement the Breadth First Search traversal in JavaScript.
 */

/**
 * 
 * Theory
 * 
 * ---------------
 * 
 * 1. Loop through all the vertices;
 * 2. Put the current loop vetiex in queue;
 * 3. Take out the queue front element;
 * 4. Enqueue all the elements in the linked list at that current element;
 * 5. mark the current element visited
 * 6. Repeat 
 */

const Graph = require("./Graph/Graph")
const Queue = require("../stack_queue/Queue/Queue");

function bfs(g) {
    const visited = {};
    const queue = new Queue();
    let str = ""

    for(let i = 0; i < g.vertices; i++) {
        if(!visited[i]) {
            queue.enqueue(i);

            while(!queue.isEmpty()) {
                const currElem = queue.dequeue();
                if(!visited[currElem]) {
                    visited[currElem] = true;
        
                    str += currElem;

                    const list = g.list[currElem];
                    let currNode = list.getHead();

                    while(currNode !== null) {
                        queue.enqueue(currNode.data);
                        currNode = currNode.nextElement;
                    }
                }
            }
        }
    }
    return str;
}

const graph = new Graph(8);
graph.addEdge(1, 3);
graph.addEdge(1, 2);
graph.addEdge(1, 4);
graph.addEdge(2, 5);
graph.addEdge(2, 4);
graph.addEdge(4, 7);
graph.addEdge(7, 6);

const searchString = bfs(graph)
graph.print()
console.log(searchString)