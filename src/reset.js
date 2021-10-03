#!/usr/bin/env node

//Kruskalův hladový algoritmus

var readline = require('readline');
var rl = readline.createInterface({
    input: process.stdin,
});

let links = []

function getLinkFromInput(line) {
    let link = line.split('-');
    let tmp = link[1].split(":");
    link[1] = tmp[0];
    link[2] = tmp[1];

    link = link.map(function (d) {
        return d.trim();
    })
    return link;
}

function compareLoses(a, b) {
    return parseInt(a[2]) - parseInt(b[2]);
}

function sortLinks() {
    links.sort(compareLoses);
}

rl.on('line', function (line) {
    // let line = "T01 - T02: 15"

    let link = getLinkFromInput(line);
    links.push(link);
})

function createReverseLink(link) {
    let reverseLink = [];
    reverseLink.push(link[1]);
    reverseLink.push(link[0]);
    reverseLink.push(link[2]);
    return reverseLink;
}

// takes derivedLinks adds link, and check if there are new possible routes if yes and add them to derivedRoutes like direct links
function deriveLinks(link) {
    if (!derivedLinks.length) {
        derivedLinks.push(link);
        derivedLinks.push(createReverseLink(link));
        return;
    }

    derivedLinks.forEach(function (derivedLink) {
        if (derivedLink[0] === link[0]) {
            let newDerivedLink = [derivedLink[1], link[1], "0"];
            derivedLinks.push(newDerivedLink);
            derivedLinks.push(createReverseLink(newDerivedLink));
        }

        let newReverseLink = createReverseLink(link);
        if (derivedLink[0] === newReverseLink[0]) {
            let newDerivedLink = [derivedLink[1], newReverseLink[1], "0"];
            derivedLinks.push(newDerivedLink);
            derivedLinks.push(createReverseLink(newDerivedLink));
        }

    })
    derivedLinks.push(link);
    derivedLinks.push(createReverseLink(link));
}

function isLinkInDerivedLinks(link, j) {
    let bLinkInDerivedLinks = false;
    for (let i = 0; i < derivedLinks.length; i++) {
        if (derivedLinks[i][0] === link[0]
            && derivedLinks[i][1] === link[1]
        ) {
            bLinkInDerivedLinks = true;
        }
    }
    return bLinkInDerivedLinks;
}

function addLinkToDerivedLinks(link, i) {


    if (isLinkInDerivedLinks(link, i)) {
        return true; // we return true so we know that there is infinite cycle in links
    }

    deriveLinks(link)
    return false;
}


let derivedLinks = []
rl.on('close', (input) => {

    sortLinks();

    for (let i = 0; i < links.length; i++) {
        let bAddedLinkToDerivedLinks = addLinkToDerivedLinks(links[i], i);
        if (bAddedLinkToDerivedLinks) {
            // in 2b >> we remove link from links which will be used for output
            links.splice(i, 1);// remove redundant link from links
            i--;
        }
    }

    let nEvaluation = 0;
    links.forEach(function (link) {
        console.log(link[0] + " - " + link[1] + ":" + " " + link[2]);
        nEvaluation += parseInt(link[2]);
    })
    console.log("Hodnoceni: " +nEvaluation);
});