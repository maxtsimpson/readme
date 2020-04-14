const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const markdown = require("./utils/generateMarkdown");

const questions = [
    "What is your github username?",
    "What is your repo name?"
];

function writeToFile(fileName, data) {
    fs.writeFile(fileName,data,(err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
}

function init() {

}

init();
