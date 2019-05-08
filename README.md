# static-site-template
Boilerplate template for the creation of static websites with TypeScript, SCSS, and HTML.

## Installation
```bash
git clone https://github.com/emensch/static-site-template
```
```bash
cd static-site-template
```
```bash
npm install
```

## Usage
`src/` contains all of your site assets: scripts, styles, etc.

**And then...**

### Development ###
To run the built-in webpack dev server (with HMR!):
```bash
npm start 
```
Your site will be served on `http://localhost:1337/` :innocent:

### Production ###
To create a production-ready bundle:
```bash
npm run build
```

To deploy, serve the contents of `dist/` from a web server!