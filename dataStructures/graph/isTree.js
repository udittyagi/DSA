/**
 * The next section will tackle the tree data structure.
 * For now, here’s the basic difference between a graph and a tree.
 * A graph can only be a tree under two conditions:
 * 
 * There are no cycles.
 * The graph is connected.
 * 
 * A graph is connected when there is a path between every pair of vertices.
 * In a connected graph, there are no unreachable vertices.
 * Each vertex must be able to reach every other vertex through either a direct edge or through a graph traversal.
 * 
 * You have to implement isTree() function which will take a graph as input and find out if it is a tree.
 * 
 * Sample Input 
 * graph = {
 *  0 - 1
 *  0 - 2
 *  0 - 3
 *  3 - 4  
 * }
 * 
 * Sample Output 
 * true
 */

const Graph = require("./Graph/Graph");
const detectCycle = require("./detectCycle");
const findMotherVertex = require("./motherVertex");

function isTree(g) {
    const isCyclic = detectCycle(g);
    if(isCyclic) {
        return false;
    }
    const motherVertex = findMotherVertex(g);
    if(motherVertex === -1) {
        return false
    }
    return true;
}

const graph = new Graph(5);
graph.addEdge(1, 0);
graph.addEdge(0, 2);
graph.addEdge(0, 3);
graph.addEdge(3, 4);

const isGraphTree = isTree(graph);
console.log('Is Tree: ', isGraphTree)