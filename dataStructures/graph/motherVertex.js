/**
 * You have to implement the findMotherVertex() function, which will take a graph as
 * input and find out which vertex is the mother vertex in the graph.
 * 
 * By definition, the mother vertex is one from which all other vertices are reachable.
 * 
 * Input #
 * A directed graph
 * 
 * Output 
 * Returns the value of the mother vertex if it exists. Otherwise, it returns -1
 * 
 * Sample Input 
 * graph = {
 *  3 -> 0 
 *  3 -> 1
 *  0 -> 1
 *  1 -> 2
 * }
 * 
 * Sample Output 
 * 3
 */

/**
 * 
 * Theory
 * ---------
 * 
 * This solution is based on Kosaraju’s Strongly Connected Component Algorithm.
 * Initially, we run the DFS on the whole graph in a loop.
 * The DFS ensures that all the nodes in the graph are visited.
 * If the graph is disconnected, the visited array will still have some vertices which haven’t been set to true.
 * 
 * The theory is that the last vertex visited in the recursive DFS will be the mother vertex.
 * This is because, ​at the last vertex, all slots in visited would be true since DFS only stops when all nodes are visited.
 * We keep track of this last vertex using lastV.
 * 
 * Then, we reset the visited array and run the DFS only on lastV.
 * If it visits all nodes, it is a mother vertex. Otherwise, a mother vertex does not exist.
 * The only limitation in this algorithm is that it can detect one mother vertex, even if others exist.
 */

const Graph = require('./Graph/Graph'); 

function dfs(g, source, visited) {
    if(visited[source]) {
        return;
    }

    visited[source] = true;

    const currList = g.list[source];
    let currNode = currList.getHead();

    while(currNode !== null) {
        dfs(g, currNode.data, visited);
        currNode = currNode.nextElement;
    }
}

function findMotherVertex(g) {
    let visited = {};
    let lastV = -1;
    for(let i = 0; i < g.vertices; i++) {
        if(!visited[i]) {
            dfs(g, i, visited);
            lastV = i;
        }
    }

    // If there exist mother vertex (or vetices) in given 
    // graph, then lastV must be one (or one of them) 

    // Now check if lastV is actually a mother vertex (or graph 
    // has a mother vertex). We basically check if every vertex 
    // is reachable from lastV or not. 

    // Reset all values in visited as false and do 
    // DFS beginning from lastV to check if all vertices are 
    // reachable from it or not. 
    visited = {};
    dfs(g, lastV, visited);

    for(let i = 0; i < g.vertices; i++) {
        if(!visited[i]) {
            return  -1;
        }
    }

    return lastV;
}

// const graph = new Graph(6);
// graph.addEdge(1, 0);
// graph.addEdge(1, 2);
// graph.addEdge(0, 3);
// graph.addEdge(0, 4);
// graph.addEdge(2, 5)

// const motherVertex = findMotherVertex(graph)

// console.log('Mother Vertex: ', motherVertex);

module.exports = findMotherVertex