/**
 * Implement the findMin() function, which will take a graph and two vertices, A and B.
 * The result will be the shortest path from A to B.
 * 
 * Remember, the shortest path will contain the minimum number of edges.
 * 
 * Note: Shortest distance between the same source and destination vertex will be 0.
 * 
 * Note: Your program should return -1 if either source or destination node does not exist.
 * 
 * Input 
 * A directed graph, a vertex A and a vertex B.
 * 
 * Output 
 * Returns number of edges in the shortest path between A and B.
 * 
 * Sample Input 
 * digraph = {
 *  0 -> 1
 *  0 -> 2
 *  0 -> 3
 *  3 -> 5
 *  5 -> 4
 *  2 -> 4
 * }
 * 
 * Vertex A = 0 
 * Vertex B = 4
 * 
 * Sample Output 
 * 2
 */

/**
 * Theory
 * ---------------
 * 
 * Once again, Breadth-First Search comes to the rescue.
 * The visited array must be familiar to you by now.
 * The crux of this algorithm, however, lies in the distance array.
 * For each node, the indexed value in distance shows the node’s distance from a in terms of the number of edges.
 * 
 * The rest is a simple BFS traversal where the distance is incremented by 1 each time.
 * We are guaranteed to find the shortest distance to b. Once it has been visited,
 * it won’t​ be visited again through the longer path as it has already been marked.
 * 
 * NOTE: BFS search always used to find the minimum distance
 */

const Queue = require('../stack_queue/Queue/Queue');
const Graph = require('./Graph/Graph');

function bfs(g, source, destination, visited) {
    if(source === destination) {
        return 0;
    }

    const distance = Array(g.vertices).fill(0);
    const queue = new Queue()
    queue.enqueue(source);

    visited[source] = true;

    while(!queue.isEmpty()) {
        const currElem = queue.dequeue();
        const currList = g.list[currElem];
        let currNode = currList.getHead();

        while(currNode !== null) {
            if(!visited[currNode.data]) {
                queue.enqueue(currNode.data);
                visited[currNode.data] = true;
                distance[currNode.data] = distance[currElem] + 1;
            }

            if(currNode.data === destination) {
                return distance[currNode.data];
            }
            currNode = currNode.nextElement;
        }
    }
    return -1;
}

function findMin(g, source, destination) {
    const visited = {};
    return bfs(g, source, destination, visited)
}

const graph = new Graph(6);
graph.addEdge(0,1)
graph.addEdge(0,2)
graph.addEdge(0,3)
graph.addEdge(3,5)
graph.addEdge(5,4)
graph.addEdge(2,4)

const min = findMin(graph, 0, 4);
console.log('Minimum path: ', min)