# Monte Carlo simulations in Typescript

A Typescript project running Monte Carlo simulations for Kanban 

## Continuous integration status

* TravisCI: [![Build Status](https://travis-ci.org/lpcarignan/montecarlo-simulations-typescript.svg?branch=master)](https://travis-ci.org/lpcarignan/montecarlo-simulations-typescript)

## Libraries used in this project

I'll assume you know the basics of nodejs and nodejs. This projects uses:

* Typescript to compile the source into Javascript
* Gulp as the build file
* Webpack to bundle everything into a single file
* React to display components in the browser
* material-ui for UI framework
* Jest to unit tests code
* Visual Studio Code as it's IDE

## What you need to know to get you started

1. Fork  the repository.
2. Run `npm install`. All packages and dependencies are in `package.json`.
3. Run `gulp`. It will: 
    1. Compile everything in folder `dist`.
    2. Run the tests
4. Launch a Chrome browser with URL http://localhost:9001/index.html

## Folders and files description

* `src`: Contains the source code of the Monte Carlo simulations
* `src/components`: React components
* `dist`: Contains the build output
* `main.tsx`: Contains the `ReactDOM.render` function where the application starts
* `index.html`: Your entry point in the browser. It contains `bundle.js`, the output of `Webpack` where `main.tsx` resides
