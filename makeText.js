const fs = require('fs');
const markov = require('./markov');
const process = require('process');
const axios = require('axios');

// generate text in the console

function generateText(text) {
    let mm = new markov.MarkovMachine(text);
    let result = mm.makeText();
    console.log(result);
}

// generating Markov text from file

function makeText(path) {
    fs.readFile(path, "utf8", (err, data) => {
        if (err) {
            console.log(`Can't read file ${path}: ${err}`);
            process.exit(1);

        } else generateText(data);
    })
}

//generating Markov text from URL

async function makeTextFromUrl (url) {
    let response;
    try {
        response = await axios.get(url);        

    } catch(err) {
        console.log(`Can't read URL ${url}: ${err}`)
        process.exit(1);
    }
    generateText(response.data);
}

// selector between file input and URL link

let type = process.argv[2];
let path = process.argv[3];
if (type === "file") makeText(path);
else if (type === "url") makeTextFromUrl(path);
else {
    console.log(`Source type unrecognized: ${type}`);
    process.exit(1);
}