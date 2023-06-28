/**
 * Question
 * 
 * --------------------------
 * 
 * Implement a function, findProduct(arr), which modifies an array so that each
 * index has a product of all the numbers present in the array except the number stored at that index.
 * 
 * The size of an array should be greater than or equal to 2.
 * 
 * Input 
 * An array of numbers (can even be floats, integers, and negative!)
 * 
 * Output #
 * An array such that each index has a product of all the numbers in the array except the number stored at that index.
 * 
 * arr = [1,2,3,4] ==> [24,12,8,6]
 * arr = [4, 2, 1, 5, 0] ==> [0, 0, 0, 0, 40]
 */

function findProduct(arr) {
    let mulValue = 1;
    const zeroIdx = [];

    arr.forEach((item, idx) => {
        if(item === 0) {
            zeroIdx.push(idx);
        } else {
            mulValue *= item;
        }
    });

    if(zeroIdx.length > 1) {
        return Array(arr.length).fill(0);
    }

    if(zeroIdx.length === 1) {
        const resArr = Array(arr.length).fill(0);
        resArr[zeroIdx[0]] = mulValue;
        return resArr;
    }

    return arr.map(item => mulValue / item);
}

console.log(findProduct([1,2,3,4]));
console.log(findProduct([4,2,1,5,0]));
console.log(findProduct([0,2,1,5,0]));