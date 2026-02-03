# crawlearRoutes

![alt routes screenshot](/etc/logo-white.png)

## Introduction

Plan, record, and share your RC adventures like never before. CrawlearRoutes lets you capture your routes directly from geolocation data or import them from your favorite GPS tracking app, automatically mapping every twist and climb. Explore public trails created by other enthusiasts, find new places to drive, and build your personal collection of routes — all from one intuitive, map-based interface designed for the RC community.

 - Crawler routes repository
 - Crawler events management for Associations and Clubs
 - Public routes search
 - Events discovery near you
 - Management of favorite routes

![alt routes screenshot](/etc/screenshot1.png)
![alt events screenshot](/etc/screenshot2.png)
![alt search routes screenshot](/etc/screenshot3.png)
![alt route detail screenshot](/etc/screenshot4.png)

### Main features
 - sign in / sign up using username and password
 - light / dark theme selector
 - responsive design
 - multilanguage support (en, es, cat)
 - shareable route URLs
 - manual code splitting to avoid big bundle files
 - prepared to be deployed into ghpages using routeHash and github environment variables for secret keys
 - deployed at https://flatline.hopto.org/crawlearRoutes
 
 ### 3rd party dependecies
 - [React](https://es.react.dev/)
 - [Redux toolkit](http://redux-toolkit.js.org/) for unified state management
 - private routes using [React router v7](https://reactrouter.com/)
 - [react-i18next](https://react.i18next.com/) for multilanguage support
 - [react-hot-toast](https://react-hot-toast.com/) for notifications and errors 
 - [leafletjs](http://leafletjs.com/) and [leaflet-gpx](https://github.com/mpetazzoni/leaflet-gpx) maps 
 - [full calendar](https://fullcalendar.io/) integration
 - [zod](https://zod.dev/) form validations
 - [uuid](https://github.com/uuidjs/uuid) to generate unique identifiers
 - [react google charts](https://www.react-google-charts.com/) for statistics
 - [react tabs](https://reactcommunity.org/react-tabs/) for content tabs
 - [tailwindcss](https://tailwindcss.com/) css framework
 - [supabase](https://supabase.com/) for database using SQL function and Rpc calls to implement business logic

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

<pre>
/src/components: generic components
/src/components/ui: generic UI components
/src/features: main app use cases
/src/pages: app router pages
/src/database: supabase Rpc's
</pre>

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

## Design decisions

![alt example ItemList screenshot](/etc/screenshotSmartphone.png)

**Requeriments**:
  - Custom title
  - Custom item cards
  - Filter items by string
  - order items using any data
  - change order direction
  - Automatic pagination
  - no prop drilling

**Solution**:

1) **keep in Redux state the shared data by the component hierarchy** to avoid prop drilling:
  - items array
  - query parameter
  - filter parameters
  - pagination parameters

2) **ABSTRACTION of lists of items** using TypeScript Generics <T>
3) **Any kind of item card** using **Render Props**

- Implementation:
  - /components/ItemList: full list implementation including title, filter, paginator and a list of items
  - /components/ItemCardList: list of items rendering custom cards using render props

![alt ItemList diagram screenshot](/etc/itemListDiagram.png)

**Design patters**: DRY, kiss, custom hooks, singleton, observer pattern always using Clean code, SOLID and clean arquitecture principles

## REDUX usage

**keep in Redux state the shared data by a component hierarchy** to avoid prop drilling and avoid pollute Redux state:
   - logged user data: to manage the private routes and get the user uid when needed
   - current theme: to be able to change styles on the fly
   - list data  and parameters (routes and events) to share state in filters and order components

## Accessibility

The web page passes the WAVE Web Accessibility Evaluation Tool with 0 errors, 0 contrast errors and 0 Alerts:

![alt wave web accessibility test screenshot](/etc/WebAccessibilityEvaluation.png)

## Testing

### To-do
- input query validation with zod (or not?), but validation
- zod texts into translation
- confirms?
- Precisión de la geolocalización con datos (en lugar de GPS) y en especial con datos de altura (está mas orientado a datos horizontales)

<br />
