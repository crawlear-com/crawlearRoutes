# crawlearRoutes

## Introduction

Plan, record, and share your RC adventures like never before. CrawlearRoutes lets you capture your routes directly from geolocation data or import them from your favorite GPS tracking app, automatically mapping every twist and climb. Explore public trails created by other enthusiasts, find new places to drive, and build your personal collection of routes — all from one intuitive, map-based interface designed for the RC community.

 - Crawler routes repository
 - Crawler events management for Associations and Clubs
 - Public routes search
 - Events discovery by location
 - Management of favorite routes

![alt routes screenshot](/etc/screenshot1.png)
![alt events screenshot](/etc/screenshot2.png)
![alt search routes screenshot](/etc/screenshot3.png)

### Main features
 - sign in / sign up using username and password
 - light / dark theme selector
 - responsive design
 - multilanguage support (en, es, cat) using [react-i18next](https://react.i18next.com/) and lazy loading of language data jsons
 - deploy into ghpages using routeHash and github environment variables for secret keys
 - deploy https://flatline.hopto.org/crawlearRoutes
 - toast notifications and errors [react-hot-toast](https://react-hot-toast.com/)
 - [leafletjs](http://leafletjs.com/) and [leaflet-gpx](https://github.com/mpetazzoni/leaflet-gpx) maps 
 - [full calendar](https://fullcalendar.io/) integration
 - [Redux toolkit](http://redux-toolkit.js.org/) for unified state management (user session, theme, routes lists, route creation, route search)
 - private routes using [React router v7](https://reactrouter.com/)
 - manual code splitting to avoid big bundle files
 - [zod](https://zod.dev/) form validations

### To-do
- input query validation with zod (or not?), but validation
- zod texts into translation
- confirms?
- Precisión de la geolocalización con datos (en lugar de GPS) y en especial con datos de altura (está mas orientado a datos horizontales)

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

 /src/components: generic components
 /src/components/ui: generic UI components
 /src/features: main app use cases
 /src/pages: app router pages
 /src/database: supabase Rpc's
 
 Components are self contained, including (when needed):
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

## Design decisions

Design patters: DRY, kiss, custom hooks, singleton, observer pattern

1) **ONLY keep in Redux state the shared data by a component hierarchy** to avoid prop drilling and avoid pollute Redux state:

 - logged user data: to manage the private routes and get the user uid when needed
 - current theme: to be able to change styles on the fly
 - list data  and parameters (routes and events) to share state in filters and order components

2) **Generic lists of items**: ItemsList + ItemsCardList

![alt example ItemList screenshot](/etc/screenshot4.png)

- Definition: **ABSTRACTION** of lists of items with search by query, order (by attribute and direction), pagination.

![alt ItemList diagram screenshot](/etc/itemListDiagram.png)

- Requeriments:
  - follow **DRY principle** and *reuse* the items list
  - **avoid prop drilling** (Pagination, filter by query and order by/direction): using Redux context
  - **keep abstraction**: using Typescript generics \<T>
  - to be used with **any kind of cards**: using render props in ItemsCardList

## Accessibility

The web page passes the WAVE Web Accessibility Evaluation Tool with 0 errors, 0 contrast errors and 0 Alerts:

![alt wave web accessibility test screenshot](/etc/WebAccessibilityEvaluation.png)

## Testing

## CI pipeline

<br />
