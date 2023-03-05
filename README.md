# github-users-favorite-program

Github API to fetch all of the user's public Github repos, each of which includes the name of the dominant language for the repository.

## How to Create the project

To use this application, you'll need to have Node.js installed on your computer. You can download Node.js from the official website. Once you have Node.js installed, you can download this repository and run the following command to install the necessary dependencies:

npx create-nodejs-express-app <project-name>

used npm package to setup the express project.

## How application works

User goes to homepage of the application and enters a github username to find whats the favorite programming language.

Application is created with the help of Jade/Pug

Application includes logger middleware to capture all the logs.

Application includes validation on the user input and form

## How to run the applciation

Download the project from Github

npm install

To run Test Cases

npm run test

To run the application as user facing

npm start

Please remember to add .env file with the share env variables

# Test Cases

## View Homepage

1. Validate Homepage, Homepage should contain input and submit button

## Username Validations

2. API request should container username (Invalid value)
3. When API requested with no username (Username is required)

## Favorite Programming Lanugage

4. When user does not exist in github or Does not own a public repo
5. Finds out the favorite programming language for given username

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements

This project was built using Node.js and Express, and jest, it uses the Github API to fetch data. Thanks for the opportunity to work on this exercise.
