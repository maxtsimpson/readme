function generateMarkdown(data) {
  return `
# ${data.title}
${data.description}
## Contents
## Installation
## Usage
## License
## Contributing
## Tests
## Questions
${data.profilePic}
${data.profileEmail}
`;
}

module.exports = generateMarkdown;
