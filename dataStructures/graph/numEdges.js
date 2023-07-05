/**
 * You have to implement the numEdges() function, which takes an undirected graph
 * and computes the total number of bi-directional edges.
 * 
 * Sample Input 
 * graph = {
 *  0 - 2
 *  0 - 5
 *  2 - 3 
 *  2 - 4
 *  5 - 3
 *  5 - 6
 *  3 - 6
 *  6 - 7
 *  6 - 8
 *  6 - 4
 *  7 - 8
 * }
 * 
 * Sample Output 
 * 11
 * 
 * NOTE :- This is undirected graph
 */

/**
 * 
 * Theory
 * 
 * --------------
 * 
 * Nothing too tricky going on here.
 * We simply traverse through the complete adjacency list and count the size of each linked list.
 * In an undirected graph, the number of edges is always even as the edges are bidirectional.
 * To get the number of unique edges, we half the total sum.
 */

const Graph = require("./Graph/Graph");

function numEdges(g) {
    let sum = 0;
    
    for(let i = 0; i < g.vertices; i++) {
        const currList = g.list[i];
        let currNode = currList.getHead();

        while(currNode != null) {
            sum++;
            currNode = currNode.nextElement;
        }
    }

    return sum/2
}

const graph = new Graph(5, true);
graph.addEdge(0,1);
graph.addEdge(0, 2);
graph.addEdge(1,3);
graph.addEdge(1,4);
graph.addEdge(3, 2);
graph.addEdge(2, 1);

const edges = numEdges(graph)
console.log('Number of Edges: ', edges)
