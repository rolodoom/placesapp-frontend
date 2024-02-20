# PlacesApp

PlacesApp is a React+Vite frontend for sharing places built following the code from [Build fullstack React.js applications with Node.js, Express.js &amp; MongoDB (MERN) with this project-focused course](https://udemy.com/course/react-nodejs-express-mongodb-the-mern-fullstack-guide) by [Maximilian Schwarzmüller](https://academind.com/).

This frontend uses the [PlacesApp-API](https://github.com/rolodoom/placesapp-api)

## Status

[![GitHub license](https://img.shields.io/badge/license-GPL--3.0-blue)](https://raw.githubusercontent.com/rolodoom/placesapp-frontend/main/LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/8844f4a2-1899-47ee-8a25-794ebf804d6d/deploy-status)](https://app.netlify.com/sites/placesapp-rolodoom/deploys)

## Preview

[![PlacesApp Preview](src/screenshots/screenshot.jpg)](https://placesapp-rolodoom.netlify.app/)

**[View Live Preview](https://placesapp-rolodoom.netlify.app/)**

## Usage

### Basic Usage

After downloading, simply edit the HTML and CSS files included with `dist` directory. These are the only files you need to worry about, you can ignore everything else! To preview the changes you make to the code, you can open the `index.html` file in your web browser.

### Advanced Usage

Clone the source files of the theme and navigate into the theme's root directory. Run `npm install` and then run `npm start` which will open up a preview of the template in your default browser, watch for changes to core template files, and live reload the browser when changes are saved. You can view the `package.json` file to see which scripts are included.

#### npm Scripts

- `npm run build` builds the project - this builds assets, HTML, JS, and CSS into `dist`
- `npm run build:assets` copies the files in the `src/assets/` directory into `dist`
- `npm run build:pug` compiles the Pug located in the `src/pug/` directory into `dist`
- `npm run build:scripts` brings the `src/js/scripts.js` file into `dist`
- `npm run build:scss` compiles the SCSS files located in the `src/scss/` directory into `dist`
- `npm run clean` deletes the `dist` directory to prepare for rebuilding the project
- `npm run start:debug` runs the project in debug mode
- `npm start` or `npm run start` runs the project, launches a live preview in your default browser, and watches for changes made to files in `src`

You must have npm installed in order to use this build environment.

## Bugs and Issues

Have a bug or an issue with this template? [Open a new issue](https://github.com/rolodoom/placesapp-frontend/issues) here on GitHub.

## License

This code is released under the [GPL-3.0](https://github.com/rolodoom/placesapp-frontend/blob/main/LICENSE) license, which means you have the four freedoms to run, study, share, and modify the software. Any derivative work must be distributed under the same or equivalent license terms.
