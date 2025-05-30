const inquirer = require('inquirer');
const fs = require('fs');

inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Please provide a description of your project:'
    },
    // Add more prompts as needed for Installation, Usage, License, etc.
])
.then(answers => {
    const readmeContent = `
# ${answers.title}

## Description
${answers.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
// Installation instructions here

## Usage
// Usage information here

## License
// License information here

## Contributing
// Contribution guidelines here

## Tests
// Test instructions here

## Questions
// Contact information here
    `;

    fs.writeFile('README.md', readmeContent, (err) => {
        if (err) throw err;
        console.log('README.md has been generated!');
    });
});
//  Create an array of questions for user input
const questions = [];

//  Create a function to write README file
function writeToFile(fileName, data) {}

//  Create a function to initialize app
function init() {}

// Function call to initialize app
init();
