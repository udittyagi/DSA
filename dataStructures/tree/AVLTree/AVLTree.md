# AVL Tree :evergreen_tree:
## Content

- [Introduction](#introduction)
- [Time Complexity](#time-complexity)
- [Balanced Binary Tree](#balanced-binary-tree)
- [Insertion](#insertion)
    - [Insertion Approach](#insertion-approach)
- [Deletion](#deletion)
  - [Deletion Approach](#deletion-approach)

## Introduction

An AVL Tree is a **self balancing** Binary Search Tree(BST), i.e the height of the left and right subtrees in an AVL tree can differ at most by one, or the tree is balanced.

## Time Complexity

In the case of binary search trees, the time complexity of all three basic operations- Insertion, Deletion, and Search, take **O(h)** time, where “h” is the height of Binary Search Tree.

The worst-case time complexity is **O(n)**, for skewed BSTs, where “n” is the number of nodes in the tree. This is the same as a singly linked list. However, in the best-case scenario, when the tree is completely balanced, the time complexity for basic operations is **O(log(n))**.

Skewed Binary Tree are similar to the linked list.

![Image of Skewed Binary Tree](/dataStructures/tree/AVLTree/images/SkewedBST.png)

### Balanced Binary Tree

**For Every node:**

The difference in height of left subtree and the height of right subtree should be in set {-1, 0, 1}

`| Height of left subtree - Height of right subtree | <= 1`

![Image of Valid AVL/Balanced Tree](/dataStructures/tree/AVLTree/images/ValidAVLTree.png)

## Insertion

Insertion in AVL trees is done the same way that BST insertion is done. However, when a node is inserted into a BST it usually becomes unbalanced. So, AVL trees have to be rebalanced after insertion, unlike BSTs. To re-balance the tree, we need to perform a ‘rotation’.

```
T1, T2 and T3 are subtrees of the tree, rooted with y (on the left side) or x (on the right side)     
      
     y                               x
    / \     Right Rotation          /  \
   x   T3   - - - - - - - >        T1   y 
  / \       < - - - - - - -            / \
 T1  T2     Left Rotation            T2  T3
 
Keys in both of the above trees follow the following order 
keys(T1) < key(x) < keys(T2) < key(y) < keys(T3)
So BST property is not violated anywhere.
```

#### Steps to follow in insertion

```
Let the newly inserted node be N 

- Perform standard BST insert for N. 
- Starting from N, travel up and find the first unbalanced node.
  Let z be the first unbalanced node.
    - Node z – an unbalanced node
    - Node y – child node of node z
    - Node x – grandchild node of node z
- Re-balance the tree by performing appropriate rotations on the subtree rooted with z.
- There can be 4 possible cases that need to be handled as x, y and z can be arranged in 4 ways.

Following are the possible 4 arrangements:
y is the left child of z and x is the left child of y (Left Left Case) 
y is the left child of z and x is the right child of y (Left Right Case) 
y is the right child of z and x is the right child of y (Right Right Case) 
y is the right child of z and x is the left child of y (Right Left Case)

```


*Following are the operations to be performed in above mentioned 4 cases. In all of the cases, we only need to re-balance the subtree rooted with U and the complete tree becomes balanced as the height of the subtree (After appropriate rotations) rooted with U becomes the same as it was before insertion.*

**1.Left Left Case**

```T1, T2, T3 and T4 are subtrees.
         z                                      y 
        / \                                   /   \
       y   T4      Right Rotate (z)          x      z
      / \          - - - - - - - - ->      /  \    /  \ 
     x   T3                               T1  T2  T3  T4
    / \
  T1   T2
```
**2. Left Right Case**

```
     z                               z                           x
    / \                            /   \                        /  \ 
   y   T4  Left Rotate (y)        x    T4  Right Rotate(z)    y      z
  / \      - - - - - - - - ->    /  \      - - - - - - - ->  / \    / \
T1   x                          y    T3                    T1  T2 T3  T4
    / \                        / \
  T2   T3                    T1   T2
```   

**3. Right Right Case**

```
  z                                y
 /  \                            /   \ 
T1   y     Left Rotate(z)       z      x
    /  \   - - - - - - - ->    / \    / \
   T2   x                     T1  T2 T3  T4
       / \
     T3  T4
```
**4. Right Left Case**

```
   z                            z                            x
  / \                          / \                          /  \ 
T1   y   Right Rotate (y)    T1   x      Left Rotate(z)   z      y
    / \  - - - - - - - - ->     /  \   - - - - - - - ->  / \    / \
   x   T4                      T2   y                  T1  T2  T3  T4
  / \                              /  \
T2   T3                           T3   T4
```

#### Insertion Approach

```
The idea is to use recursive BST insert, after insertion,we get pointers to all ancestors
one by one in a bottom-up manner. So we don’t need a parent pointer to travel up.
The recursive code itself travels up and visits all the ancestors of the newly inserted node. 
```

**Follow the steps mentioned below to implement the idea:**
```
- Perform the normal BST insertion. 
- The current node must be one of the ancestors of the newly inserted node. Update the height of the current node. 
- Get the balance factor (left subtree height – right subtree height) of the current node.
- If the balance factor is greater than 1, then the current node is unbalanced and we are  
  either in the Left-Left case or Left-Right case. To check whether it is Left-Left  
  case or not, compare the newly inserted key with the key in the left subtree root.
- If the key is less than the left subtree root then the case is Left-Left otherwise it is Left-Right 
- If the balance factor is less than -1, then the current node is unbalanced and we are  
  either in the Right-Right case or Right-Left case. To check whether it is the  
  Right- Right case or not, compare the newly inserted key with the key in the right subtree root. 
- If the key is less than the right subtree root then the case is Right-Left otherwise it is Right-Right 
```

```
Note:
(left subtree height – right subtree height) > 0 then left subtree height is more
(left subtree height – right subtree height) < 0 then right subtree height is more
```

## Deletion

We have to change the normal BST deletion so that the tree remain balanced after the deletion.

#### Steps to follow in deletion

```
Let N be the node to be deleted 

- Perform standard BST delete for N.
- Starting from N, travel up and find the first unbalanced node.
  Let z be the first unbalanced node, y be the larger height child of z, and x be the larger height child of y.
  Note that the definitions of x and y are different from insertion here.
- Re-balance the tree by performing appropriate rotations on the subtree rooted with z.
  There can be 4 possible cases that needs to be handled as x, y and z can be arranged in 4 ways.
  Following are the possible 4 arrangements:
  - y is left child of z and x is left child of y (Left Left Case)
  - y is left child of z and x is right child of y (Left Right Case) 
  - y is right child of z and x is right child of y (Right Right Case) 
  - y is right child of z and x is left child of y (Right Left Case)
```

==Like insertion, following are the operations to be performed in above mentioned 4 cases. Note that, unlike insertion, fixing the node z won’t fix the complete AVL tree. After fixing z, we may have to fix ancestors of z as well==

#### Deletion Approach

```
- Perform the normal BST deletion. 
- The current node must be one of the ancestors of the deleted node.
  Update the height of the current node.
- Get the balance factor (left subtree height – right subtree height) of the current node.
- If balance factor is greater than 1, then the current node is unbalanced and we are either in Left Left case or Left Right case.
  To check whether it is Left Left case or Left Right case, get the balance factor of left subtree.
  If balance factor of the left subtree is greater than or equal to 0, then it is Left Left case, else Left Right case. 
- If balance factor is less than -1, then the current node is unbalanced and we are either in Right Right case or Right Left case.
  To check whether it is Right Right case or Right Left case, get the balance factor of right subtree.
  If the balance factor of the right subtree is smaller than or equal to 0, then it is Right Right case, else Right Left case.
```