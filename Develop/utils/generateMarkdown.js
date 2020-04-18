function generateMarkdown(data) {
  return `
# ${data.title}
${data.description}

You can view the project here: https://${data.userName}.github.io/${data.title}/

<img src="https://img.shields.io/badge/language-${data.language}-green">

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
${data.ssh_url}

https:
${data.clone_url}

## Usage
${data.usage}

## License
${data.license}

## Contributing
If you'd like to contribute you're welcome to. pull requests should include relevant unit tests where applicable

## Tests
My repos aim to use test driven development. they may currently lack tests, but they will have them eventually
This section will contain instructions on running those tests

## Questions
If you have any questions please email me at the link below. frequently asked questions will be added to this section with answers

${data.profileEmail}

<img src="${data.profilePic}" alt="Profile Pic" width="200" height="200">
`;
}

module.exports = generateMarkdown;
