# Monte Carlo simulations in Typescript

A Typescript project running Monte Carlo simulations for Kanban 

## Libraries used in this project

I'll assume you know the basics of nodejs and nodejs. This projects uses:

* Typescript to compile the source into Javascript
* requirejs to load modules
* Gulp as the build file
* React to display components in the browser 
* Visual Studio Code as it`s IDE

## What you need to know to get you started

1. Clone the repository.
2. Run `npm install`. All packages and dependencies are in `package.json`.
3. Run `gulp`. It will: 
    1. Compile everything in folder `dist`.
    2. Launch a webserver listening on port 9001.
    3. Watch your source files for any modifications.
4. Launch a Chrome browser with URL http://localhost:9001/index.html

## Folders and files description

* `src`: Contains the source code of the Monte Carlo simulations
* `src/components`: React components
* `app.tsx`: Contains the `main()` function where the Monte Carlo simulations are ran
* `index.html`: Your entry point in the browser