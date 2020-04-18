const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");


const questions = [
  { answerName: "userName", text: "What is your github username?", answer: null },
  { answerName: "repoName", question: "What is your repo name?", answer: null },
  { answerName: "licenseType", question: "What sort of license do you want to use", answer: null }
];

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) throw err;
    console.log('The readme has been generated!');
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
      } else if (currentQuestion.answerName === "licenseType") {
        licenseType = currentQuestion.answer;
      }
    }
  }

  data = {};
  let gitHubRepoData = await getGitHubRepoData(userName,repoName)
  let gitHubUserData = await getGitHubUserData(userName)
  addGitHubRepoDataToDataObject(gitHubRepoData,data);
  addGitHubUserDataToDataObject(gitHubUserData,data);
  addLicenseDataToDataObject(data,licenseType);

  let readmeText = generateMarkdown(data);

  writeToFile("./Develop/generated/readme.md",readmeText);

}

let addGitHubRepoDataToDataObject = function (gitHubRepoData,data){

  data.title = gitHubRepoData.name;
  data.description = gitHubRepoData.description;
  data.ssh_url = 
  "```" +
  "git clone " + gitHubRepoData.ssh_url +
  "```";
  data.clone_url = 
  "```" +
  "git clone " + gitHubRepoData.clone_url +
  "```";
  data.language = gitHubRepoData.language;
  data.updated_at = gitHubRepoData.updated_at;
  data.lastupdatedhtml = gitHubRepoData.updated_at.replace(/-/g,"%20")
  return data;
};

let addGitHubUserDataToDataObject = function (gitHubUserData,data){
  data.profilePic = gitHubUserData.avatar_url;
  data.profileEmail = gitHubUserData.email;
  data.userName = gitHubUserData.login;
  data.name = gitHubUserData.name;
  return data;
};

let addLicenseDataToDataObject = function(data,licenseType = "MIT") {
  licenseString = fs.readFileSync(`./Develop/utils/${licenseType}license.txt`,"utf-8")
  licenseString = licenseString.replace('[year]',data.updated_at.split("-")[0]);
  licenseString = licenseString.replace('[fullname]',data.name);
  data.license = licenseString;
}

let askQuestion = async function (question) {
  return await inquirer.prompt({
    message: question.text,
    name: question.answerName
  })
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
