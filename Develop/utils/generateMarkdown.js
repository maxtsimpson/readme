function generateMarkdown(data) {
  return `
# ${data.title}
${data.description}
You can view the project here: https://${data.userName}.github.io/${data.title}/
## Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Tests](#Tests)
- [Questions](#Questions)
## Installation
${data.installation}
You can download a copy of the code by using the below command in git bash or your terminal
ssh:
git clone ${data.ssh_url}

https:
git clone ${data.clone_url}

## Usage
${data.usage}
## License
${data.license}
## Contributing
${data.contributing}
## Tests
${data.tests}
## Questions
${data.questions}

${data.profilePic}
${data.profileEmail}
`;
}

module.exports = generateMarkdown;
