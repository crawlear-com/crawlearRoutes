# crawlearRoutes

## Introduction

### Features
 - sign in / sign up
 - light / dark theme
 - responsive design
 - multilanguage support with react-i18next and lazy load of language data
 - deploy into ghpages using routeHash and github environment variables for secret keys
 - toast notifications and errors (https://react-hot-toast.com/)
 - redux (user session, theme)
 - private routes using React router v7

### To-do

- dinamyc imports to split code
- deploy home server // crawlear.com
- toast async
- create route
- adjust click search points (modificators)
- move useRoutesProvider to another place
- input query validation with zod (or not?), but validation
- zod texts into translation
- check console.error()
- reset page when filtering in routeslist
- route card difficulty levels (moderate, easy...)
- delete my routes confirm

## Install and run

1. Clone this repo:
```bash
$ git clone https://github.com/crawlear-com/crawlearRoutes.git
```
2. Install the dependencies:
```bash
$ npm install
```
3. Run in dev mode:
```bash
$ npm run dev
```
4. Or run it on production mode:
```bash
$ npm run build
$ npm run preview
```
5. Run the tests:
```bash
$ npm run test
```
6. Run the tests report in browser:
```bash
$ npm run test:ui
```
7. Run the tests coverage
```bash
$ npm run test:coverage
```
8. Run the linter analisis:
```bash
$ npm run lint
```

<br>

## Project structure

## Components diagram: 

## Considerations

## Testing

## CI pipeline

<br />
