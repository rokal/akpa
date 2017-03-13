# Agile/Kanban Planning Application (AKPA)

A Typescript/ReactJs project running Monte Carlo simulations to forecast Agile/Kanban projects.

## Continuous integration status

* TravisCI: [![Build Status](https://travis-ci.org/lpcarignan/akpa.svg?branch=master)](https://travis-ci.org/lpcarignan/akpa)

## Libraries used in this project

This projects uses:

* Typescript to compile the source into Javascript
* Gulp as the build file
* Webpack to bundle everything into a single file
* ReactJs to display components in the browser
* material-ui as the UI framework
* Jest to unit tests code
* Visual Studio Code as it's IDE
* Based on the JAM (Javascript-API-Markup) stack

## What you need to know to get you started

1. Fork the repository.
2. Run `npm install`. All packages and dependencies are in `package.json`.
3. Run `gulp compile` to compile the source: 
4. Run `npm test`. It will:
    1. Compile everything to folder `dist`.
    2. Run the unit tests
5. Run `gulp webpack` to create JAM app
6. Launch a Chrome browser with URL http://localhost:9001/index.html

## Folders and files description

* `src`: Contains the source code of the project
* `src/components`: ReactJs components
* `dist`: Contains the build output
* `main.tsx`: Contains the `ReactDOM.render` function where the application starts
* `index.html`: Your entry point in the browser. It contains `akpa.js`, the output of `Webpack` where `main.tsx` resides
