# crawlearRoutes

![alt routes screenshot](/etc/logo-white.png)

## Introduction

Plan, record, and share your RC adventures like never before. CrawlearRoutes lets you capture your routes directly from geolocation data or import them from your favorite GPS tracking app, automatically mapping every twist and climb. Explore public trails created by other enthusiasts, find new places to drive, and build your personal collection of routes — all from one intuitive, map-based interface designed for the RC community.

![alt routes screenshot](/etc/screenshot1.png)
![alt events screenshot](/etc/screenshot2.png)
![alt search routes screenshot](/etc/screenshot3.png)
![alt route detail screenshot](/etc/screenshot4.png)

### Use cases:
 - Crawler routes repository
 - Crawler route events management for Associations and Clubs
 - Management of favorite routes
 - Public routes visual search using maps
 - Public routes search using by name and description
 - Events discovery near you
 - Routes and route events statistics
 - Share public routes (open to no registered users)
 - Share route events (needs register to view route events)

### Main features
 - sign in / sign up using username and password
 - light / dark theme selector
 - responsive design
 - multilanguage support (en, es, cat)
 - shareable route and route event URLs
 - manual code splitting to avoid big bundle files
 - prepared to be deployed into ghpages using routeHash and github environment variables for secret keys
 - deployed at https://flatline.hopto.org/crawlearRoutes
 - testing of core functionalities
 - PWA able to install, caching and offline features
 
 ## 3rd party dependecies
 - [vite](https://es.react.dev/) project
 - [vite PWA plugin](https://vite-pwa-org.netlify.app/) for basic pwa configuration
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
3. Run in dev mode: (no PWA features)
```bash
$ npm run dev
```
4. Or run it on production mode: (to get full PWA features)
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

## Design decisions

A) Create a generic list of items to list routes and events (or whatever) with customizable cards, filter, order and pagination:

![alt example ItemList screenshot](/etc/screenshotSmartphone1.png)
![alt example ItemList screenshot](/etc/screenshotSmartphone2.png)

**Requeriments**:
  - no prop drilling
  - generic for all kinds of lists
  - Custom title
  - Custom item cards
  - Filter items by string
  - order items using any data
  - change order direction
  - Automatic pagination

### Solution:

1) **keep in Redux state the shared data by the component hierarchy** to avoid prop drilling:
  - items array
  - query parameter
  - filter parameters
  - pagination parameters
  
  This allows to keep the list state when navigating between pages. For instance visiting the route URL of a list and then going back to the routes list.

2) **ABSTRACTION of lists of items** using TypeScript Generics < T >

This allows reuse the ItemsList with any type of data.

3) **Any kind of item card** using **Render Props**

This allows to create ItemsList with any kind of data and custom visualization of the items in the list.

- Implementation:
  - /components/ItemList: full list implementation including title, filter, paginator and a list of items
  - /components/ItemCardList: list of items rendering custom cards using render props

![alt ItemList diagram screenshot](/etc/itemListDiagram.png)

B) REDUX usage: **keep in Redux state the shared data by a component hierarchy** to avoid prop drilling and avoid pollute Redux state:
   - logged user data: to manage the private routes and get the user uid when needed
   - current theme: to be able to change styles on the fly
   - list data  and parameters (routes and events) to share state in filters and order components

C) Use clean code and solid principles:

- The domain is defined in /src/domain
- The features are declared in /src/features
- The infrastructure to database layer is defined in /src/infrastructure usinf providers and repositoies aproach (pots and adapters pattern)
- Separate always logic from ui using custom hooks in any component. This way the component only defines UI and logic is done in a separated custom hook

**Design patters**: DRY, kiss, custom hooks, singleton, observer, ports and adapters patterns always using Clean code, SOLID and clean arquitecture principles

### Project structure

<pre>
/src/components: generic components
/src/components/ui: generic UI components
/src/features: main app use cases
/src/pages: app router pages
/src/infrastructure: implementation details about persistance of domain entities
/src/assets: generic images and language json token traductions fot i18n
/src/hooks: generic hooks
/src/layouts: page layout including header, main content and footer
/src/store: redux store definition
/src/styles: generic css
/src/domain: domain entities and repositories definition
</pre>

At React level, components are self contained, including (when needed):
  - helpers: utils js for the component
  - hooks: custom hooks that encapsulates the component logic
  - test: vitests for the component
  - styles: reusable tailwind css code for the component 
  - assets: custom assets for the component
  - types.ts files for typescript types and interfaces
  - store: custom store code for the component
    - selectors
    - slices

## PWA and Offline mode

The PWA is implemented using [vite PWA plugin](https://vite-pwa-org.netlify.app/) for a zero config solution. It acomplish all the requeriments of the solution with no effort (just declaring the manifest entries in vite.config.mts). 

***Giving data to the user in offline mode***: as supabase is doing POST fetch requests to the database, the requests will not be cached at service-worker level. This way an offline mode will not get any data from database doing Offline mode useless.

***Solution***: the web app is capable of caching Rpc calls to supabase functions using localStorage. When a getter rpc funcion is called in online mode, the result will be cached into localStorage. If the user enters offline mode and there is a previous Rpc call cached with exactly use the same parameters, it will return the localStorage data. That way the offline mode has some content and minimum interaction showing data to the user.

Features **working by offline mode**:
- all the ones getting data from supabase not requiring geolocation:
- Routes and events statistics
   * My routes list
   * My favorites list
   * Today events
   * My events
   * Events calendar

 Features **NOT managed by offline mode**:
 - all the ones requiring geolocation: visual search using map and events near you
 - all the ones requiring insert or modify data: create or modify a route, create or modify an event, favorite and unfavorite a route, remove route or event

 ***NOTE***: in localhost the service-worker is only built in production mode using ***npm run build***

## Accessibility

The web page passes the WAVE Web Accessibility Evaluation Tool with 0 errors, 0 contrast errors and 0 Alerts:

![alt wave web accessibility test screenshot](/etc/WebAccessibilityEvaluation.png)

## Testing

As this is a limited time project with no further usage, i decided to test just core features and some use cases:

 - ItemsCardList, ItemsList and SearchInput including filter and pagination functionality
 - RouteEventsCard used in route events lists
 - StepProcess used in route creation
 - EventsCalendar use cases
 - EventsFromUser to test route events list from user
 - RouteEventsCard
 - Route events form creation logic
 - ToggleTheme for visual theme management 
 - and other components like YoutubeEmbed or custom hooks like useSession (used to get user information in pages and redirect to landing if user is not logged in)

***To-do***
- zod texts into translation
- input query validation in filter / search inputs
- custom confirm ui
- ---> (high accurancy mode activated to solve this problem) The web location API is not much accurated as needed for this king of app. To solve this problem and get more accurated GPS data it is needed to:
   - create an hybrid app (with Cordova for example) and use native GPS hardware
   - create a PWA for offline mode (and push notifications for future functionalities)
   - generate leaflet offline maps https://gis.stackexchange.com/questions/329468/getting-leaflet-map-to-work-offline

<br />
