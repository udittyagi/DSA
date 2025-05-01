/**
 * 
 | **For undirected graphs**                         | **For directed graphs**                               |
|----------------------------------------------------|-------------------------------------------------------|
| Must check: *"Is the neighbor not my parent?"*     | Must check: *"Is the neighbor in the recursion stack?"* |
| Normal edges loop back to parent (not a cycle)     | Back edges (to ancestor in same DFS path) = cycle      |
| Parent check prevents false positives              | Stack tracking detects cycles cleanly                  |
 */

// Helper function to check cycle using DFS
function isCycleUtil(v, adj, visited, parent) {
  visited[v] = true;

  for (let i of adj[v]) {
    if (!visited[i]) {
      if (isCycleUtil(i, adj, visited, v)) {
        return true;
      }
    } else if (i !== parent) {
      //This step is important
      return true;
    }
  }
  return false;
}

function constructadj(V, edges) {
  let adj = Array.from({ length: V }, () => []);

  // Build the adjacency list
  for (let edge of edges) {
    let [u, v] = edge;
    adj[u].push(v);
    adj[v].push(u);
  }
  return adj;
}
// Function to check if graph contains a cycle
function isCycle(V, edges) {
  //We are constructing adjacency list using edges array
  let adj = constructadj(V, edges);

  let visited = new Array(V).fill(false);

  // Check each node
  for (let u = 0; u < V; u++) {
    if (!visited[u]) {
      if (isCycleUtil(u, adj, visited, -1)) {
        return true;
      }
    }
  }
  return false;
}

// Driver Code
const V = 5;
const edges = [
  [0, 1],
  [0, 2],
  [0, 3],
  [1, 2],
  [3, 4],
];

if (isCycle(V, edges)) {
  console.log("true");
} else {
  console.log("false");
}
