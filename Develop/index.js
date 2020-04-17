const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");


const questions = [
  { answerName: "userName", text: "What is your github username?", answer: null },
  { answerName: "repoName", question: "What is your repo name?", answer: null }
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}

let main = async function () {
  let userName = null;
  let repoName = null;

  // i did it like this so you could add more questions if you like without having to alter this code
  for (const question in questions) {
    if (questions.hasOwnProperty(question)) {
      currentQuestion = questions[question]
      let askQuestionResponse = await askQuestion(currentQuestion);
      currentQuestion.answer = askQuestionResponse[currentQuestion.answerName];
      if (currentQuestion.answerName === "userName") {
        userName = currentQuestion.answer;
      } else if (currentQuestion.answerName === "repoName") {
        repoName = currentQuestion.answer;
      }
    }
  }

  data = {};
  let gitHubRepoData = await getGitHubRepoData(userName,repoName)
  let gitHubUserData = await getGitHubRepoData(userName,repoName)
  data = addGitHubRepoDataToDataObject(gitHubRepoData,data);
  data = addGitHubUserDataToDataObject(gitHubUserData,data);

  let readmeText = generateMarkdown(data);

  writeToFile("readme.md",readmeText);

}

let addGitHubRepoDataToDataObject = function (gitHubData,data){
  data.title = gitHubData.name;
  data.description = gitHubData.description;
  return data;
};

let addGitHubUserDataToDataObject = function (gitHubData,data){
  data.profilePic = gitHubData.avatar_url;
  data.profileEmail = gitHubData.email;
  return data;
};

let askQuestion = async function (question) {
  return await inquirer.prompt({
    message: question.text,
    name: question.answerName
  })
};

let createDataObject = function () {
  data = 1
};

let getGitHubRepoData = async function (userName, repoName) {
  const queryUrl = `https://api.github.com/repos/${userName}/${repoName}`;
  return await axios.get(queryUrl)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })

}

let getGitHubUserData = async function (userName) {
  const queryUrl = `https://api.github.com/users/${userName}`;
  return await axios.get(queryUrl)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    })
}

async function init() {
  await main();
}

init();
