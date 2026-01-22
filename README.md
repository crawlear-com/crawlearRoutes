# crawlearRoutes

## Introduction

### Features
 - sign in / sign up
 - light / dark theme
 - responsive design
 - multilanguage support with react-i18next and lazy load of language data
 - deploy into ghpages using routeHash and github environment variables for secret keys
 - deploy https://flatline.hopto.org/crawlearRoutes
 - toast notifications and errors (https://react-hot-toast.com/)
 - leaflet and leaflet-gpx maps
 - full calendar integration
 - redux (user session, theme, routes lists, route creation, route search)
 - private routes using React router v7
 - manual code splitting
 - zob form validations

### To-do
- toast async
- input query validation with zod (or not?), but validation
- zod texts into translation
- reset page when filtering in routeslist
- delete my routes confirm
- do i keep useWakeLock ??
- maintain FullCalendar events in Redux?
- UX / UI
- Accesibilidad
- All common code in layouts

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

 /src/components
 /src/features: events / maps / routeCreation / routes / statistics / users
 /src/pages
 /src/database
 
 Components self contained:
  - helpers
  - hooks
  - test
  - styles
  - assets
  - types in separated files
  - store:
    - selectors
    - slices

## Components diagram: 

## Considerations

## Testing

## CI pipeline

<br />
