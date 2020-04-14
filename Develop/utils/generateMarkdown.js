function generateMarkdown(data) {
  return `
# ${data.title}
${data.description}
## Contents
${data.contents}
## Installation
${data.installation}
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
