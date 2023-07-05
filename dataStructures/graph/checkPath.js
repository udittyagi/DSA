/**
 * 
 * You have to implement the checkPath() function. It takes a source and a destination and tells
 * us whether or not a path exists between the two from the source to the destination.
 * 
 * If there is no repeated sequence of edges and vertices between the source and the destination vertex then the path exists between these two vertices.
 * 
 * Note: Path will always exist if the source and destination nodes are the same.
 * 
 * Sample Input
 * graph = {
 *  0 -> 2
 *  0 -> 5
 *  2 -> 3
 *  2 -> 4
 *  5 -> 3
 *  5 -> 6
 *  3 -> 6
 *  6 -> 7
 *  6 -> 8
 *  6 -> 4
 *  7 -> 8
 * }
 * 
 * source = 0
 * destination = 7
 * 
 * source = 0
 * destination = 0
 * 
 * Sample Output 
 * true
 * true
 */

/**
 * Theory
 * -----------
 * 
 * This problem can be solved by both DFS and BFS.
 * All we need is a simple traversal from the source to see if we can reach dest.
 * If the dest value is found, we return true.
 */

const Graph = require("./Graph/Graph");

function dfs(g, source, destination, visited) {
    if(source === destination) {
        return true;
    }

    if(visited[source]) {
        return false
    }

    visited[source] = true;

    const currList = g.list[source];
    let currNode = currList.getHead();
    
    while(currNode !== null) {
        const result = dfs(g, currNode.data, destination, visited);
        if(result === true) {
            return true;
        }
        currNode = currNode.nextElement;
    }

    return false;
}

function checkPath(g, source, destination) {
    const visited = {};
    return dfs(g, source, destination, visited);
}

const graph = new Graph(9);
graph.addEdge(0,2)
graph.addEdge(0,5)
graph.addEdge(2,3)
graph.addEdge(2,4)
graph.addEdge(5,3)
graph.addEdge(5,6)
graph.addEdge(3,6)
graph.addEdge(6,7)
graph.addEdge(6,8)
graph.addEdge(6,4)
graph.addEdge(7,8)

const isPathExist = checkPath(graph, 0, 7);
const isPathExist2 = checkPath(graph, 2, 5);
console.log('Path Exist: ', isPathExist)
console.log('Path Exist 2: ', isPathExist2)


