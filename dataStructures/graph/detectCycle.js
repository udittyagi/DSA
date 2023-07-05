/**
 * The concept of loops or cycles is very common in graph theory.
 * A cycle exists when you traverse the graph and come upon a vertex that has already been visited.
 * 
 * Note: Your solution should work for both connected and unconnected graphs.
 * You have to implement the detectCycle function, which tells you whether or not a graph contains a cycle.
 */

/**
 * Theory
 * ----------------
 * 
 * For each node, we start a recursive call with detectCycleUtils.
 * The function maintains a stack (not to be confused with the stack data structure) of
 * nodes called inStack along with a visited array.
 * 
 * The vertices that have been traversed in the current recursion are added to inStack
 * and visited keeps a record of all the nodes that have been traversed regardless of the recursive call.
 * 
 * For a cycle to occur, we must reach a node that was already present in the recursion stack.
 * If the recursion ends and no such node is found, the stack is reset again and the next iteration of detectCycle starts.
 */

const Graph = require('./Graph/Graph'); 

function detectCycleUtils(g, source, inStack, visited) {
    if(inStack[source]) {
        return true;
    }

    if(visited[source]) {
        return false;
    }

    inStack[source] = true;
    visited[source] = true;

    const currList = g.list[source];
    let currNode = currList.getHead();

    while(currNode !== null) {
        const result = detectCycleUtils(g, currNode.data, inStack, visited);
        if(result === true) {
            return true;
        }
        currNode = currNode.nextElement;
    }

    inStack[source] = false;
    return false;
}

function detectCycle(g) {
    const inStack = {};
    const visited = {};

    for(let i = 0; i < g.vertices; i++) {
        if(!visited[i]) {
            const result = detectCycleUtils(g, i, inStack, visited);
            if(result) {
                return true
            }
        }
    }

    return false
}

// const graph = new Graph(6);
// graph.addEdge(1, 3);
// graph.addEdge(1, 2);
// graph.addEdge(1, 4);
// graph.addEdge(2, 5);
// graph.addEdge(2, 4);
// graph.addEdge(5, 1)

// const isCyclic = detectCycle(graph)

// console.log('IS Cyclic: ', isCyclic);

module.exports = detectCycle
