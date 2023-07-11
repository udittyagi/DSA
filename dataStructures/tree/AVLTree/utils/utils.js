function getBalanceFactor(node) {
    if(node === null) {
        return -1;
    }
    return height(node.leftElement) - height(node.rightElement)
}

function height(node) {
    if(node === null) {
        return -1;
    }
    return node.height;
}

function leftRotate(node) {
    const childRtNode = node.rightElement;
    const grandChildLftNode = childRtNode.leftElement;

    childRtNode.leftElement = node;
    node.rightElement = grandChildLftNode;
    node.parent = childRtNode;
    if(grandChildLftNode) {
        grandChildLftNode.parent = node;
    }

    //Update the height;
    // First Update the height of node, as we have roated it (and using it only we will calculate the height of childLftNode)
    node.height = Math.max(height(node.leftElement), height(node.rightElement)) + 1;

    //Update the height of new root of this subtree;
    childRtNode.height = Math.max(height(childRtNode.leftElement), height(childRtNode.rightElement)) + 1;

    //Return new root of this subtree
    return childRtNode;
}

function rightRotate(node) {
    const childLftNode = node.leftElement;
    const grandChildRtNode = childLftNode.rightElement;
    
    childLftNode.rightElement = node;
    node.leftElement = grandChildRtNode;
    node.parent = childLftNode;

    if(grandChildRtNode) {
        grandChildRtNode.parent = node;
    }

    //Update the height;
    // First Update the height of node, as we have roated it (and using it only we will calculate the height of childLftNode)
    node.height = Math.max(height(node.leftElement), height(node.rightElement)) + 1;

    //Update the height of new root of this subtree;
    childLftNode.height = Math.max(height(childLftNode.leftElement), height(childLftNode.rightElement)) + 1;

    //Return new root of this subtree
    return childLftNode;
}

module.exports = {
    getBalanceFactor,
    height,
    leftRotate,
    rightRotate
}
