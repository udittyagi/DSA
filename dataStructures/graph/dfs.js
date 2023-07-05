/**
 * You have to implement the Depth First Search traversal in JavaScript.
 */


const Graph = require("./Graph/Graph");
const Stack = require("../stack_queue/Stack/Stack");

function dfs(g) {
    const visited = {};
    const stack = new Stack();

    let result = '';

    for(let i = 0; i < g.vertices; i++) {
        if(!visited[i]) {
            stack.push(i);

             while(!stack.isEmpty()) {
                const currElem = stack.pop();
                if(!visited[currElem]) {
                    result += currElem;
    
                    visited[currElem] = true;
    
                    const list = g.list[currElem];
                    let currNode = list.getHead();
    
                    while(currNode !== null) {
                        stack.push(currNode.data);
                        currNode = currNode.nextElement;
                    }
                }
             }
        }
    }

    return result;
}

const graph = new Graph(8);
graph.addEdge(1, 3);
graph.addEdge(1, 2);
graph.addEdge(1, 4);
graph.addEdge(2, 5);
graph.addEdge(2, 4);
graph.addEdge(4, 7);
graph.addEdge(7, 6);

const searchString = dfs(graph)
graph.print()
console.log(searchString)