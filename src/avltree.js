#!/usr/bin/env node
var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
});


let root = {
    value: undefined,
    left: {},
    right: {}
};

function addNode(node, line) {
    if (node.value === undefined) {
        node.value = line;
        node.left = {};
        node.right = {};
        return;
    }

    let value = parseInt(line);

    if (parseInt(node.value) <= value) {
        addNode(node.right, line);

    } else {
        addNode(node.left, line);
    }
}

function rotationLL(node) {
    let tmp = node.left;
    tmp.left = {};
    node.left = tmp.right;
    tmp.right = node;
    // console.log("LL");
    // console.log(tmp)
    return tmp;
}

function rotationRR(node) {
    let tmp = node.right;
    node.right = tmp.left;
    tmp.left = node;
    // console.log("RR");
    // console.log(tmp)

    return tmp;
}

function rotationLR(node) {
    node.left = rotationRR(node.left);
    // console.log("LR");

    return rotationLL(node);
}

function rotationRL(node) {
    node.right = rotationLL(node.right);
    // console.log("RL");

    return rotationRR(node);
}

function getLength(node) {

    if (node === undefined) {
        return -1;
    }

    if (node.value === undefined) {
        return -1;
    }

    return Math.max(getLength(node.left), getLength(node.right)) + 1;
}

function compareLengths() {
    let leftLength = getLength(root.left);
    let rightLength = getLength(root.right);
    return leftLength - rightLength;
}

function sort(node, value) {
    if (compareLengths() < -1 && node.right) {
        if (value > parseInt(node.right.value)) { // extract?
            node = rotationRR(node);
            return node;
        } else {
            node = rotationRL(node);
            // console.log(node);
            // console.log("end of RL")
            return node;
        }
    }

    if (compareLengths() > 1 && node.left) { // dont use comparison to undefined?
        if (value > parseInt(node.left.value)) {
            node = rotationLL(node);
            return node;
        } else {
            node = rotationLR(node);
            // console.log(node);
            return node;
        }
    }

}

function printInFormat(printStack, repeat) {

    let node;
    for (let i = 0; i < repeat; i++) {
        node = printStack.shift();

        if (!node || !node.value) {
            process.stdout.write("_");
        } else {
            process.stdout.write(node.value);
        }

        if ((i + 1) < repeat) {
            process.stdout.write(" ");
        }

        if (!node) {
            return;
        }

        if (!printStack.length && !node.left && !node.right) {
            return;
        }
        printStack.push(node.left);
        printStack.push(node.right);
    }

    let bReturn = true;

    for (let j = 0; j < printStack.length; j++) {
        if (printStack[j] === undefined) {
            continue;
        }
        if (printStack[j].value !== undefined) {
            bReturn = false;
        }
    }
    if (bReturn) {
        return;
    }

    process.stdout.write("|");
    printInFormat(printStack, repeat * 2);
}


rl.on('line', function (line) {
    let node = addNode(root, line);
    let value = parseInt(line);

    let tmp = sort(root, value);
    if (tmp) {
        root = tmp;
    }

    printStack = [];
    printStack.push(root);
    printInFormat(printStack, 1);
    console.log();
})

rl.on('close', (input) => {
});