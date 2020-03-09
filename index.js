const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

inquirer
  .prompt([
    {
      type: "input",
      message: "What is your GitHub user name?",
      name: "user"
    },
    {
      type: "input",
      message: "What is your project's name?",
      name: "project"
    },
    {
      type: "input",
      message: "Please write a short description of your project.",
      name: "description"
    },
    {
      type: "input",
      messgae: "What kind of licsense should your project have?",
      name: "license"
    },
    {
      type: "input",
      message: "What command should be run to install dependencies?",
      name: "dependencies"
    },
    {
      type: "input",
      messgae: "What command should be run to run tests?",
      name: "test"
    },
    {
      type: "input",
      message: "What does the user need to know about using the repo?",
      name: "about"
    },
    {
      type: "input",
      message:
        "What does the user need to know about contributing to the repo?",
      name: "contribution"
    }
  ])
  .then(function(response) {
    const api = `https://api.github.com/users/${response.user}`;
    axios.get(api).then(function() {
      const data = `

# ${response.project}
[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)


## Description
${response.description}



## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [License](#License)
* [Contributing](#Contributing)
* [Tests](#Tests)
* [Questions](#Questions)



## Installation
To install necessary dependencies, run the following command:
${response.dependencies}

## Usage
${response.about}

## License
${response.license}
## Contributing
${response.contribution}
## Tests
To perform a test, run the following command:
${response.test}


## Questions


---

<img src="https://avatars0.githubusercontent.com/u/57122209?s=460&v=4"
alt="avatar" style="border-radius: 16px" width="30" />

--
If you have any questions about the repo, please contact me at github.com/${response.user} or tajohnsonn@gmail.com.`;

      fs.writeFile("ReadMe.md", data, function() {
        console.log("Successfully wrote to ReadMe.md!");
      });
    });
  });
