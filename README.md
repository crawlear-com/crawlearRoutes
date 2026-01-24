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

## Design decisions

Design patters: DRY, custom hooks

1) **ONLY keep in Redux state the shared data by a component hierarchy** to avoid prop drilling and avoid pollute Redux state:

 - Routes list, favourites list and events list all using filter and order components

[put here a ItemsList component hierarchy] 

2) **Generic lists of items**: ItemsList + ItemsCardList
- Definition:
  - **ABSTRACTION** of lists of items with search by query, order (by attribute and direction), pagination.

[put here UI of lists]

- Requeriments:
  - follow **DRY principle** and *reuse* the items list
  - **avoid prop drilling** (Pagination, filter by query and order by/direction): using Redux context
  - **keep abstraction**: using Typescript generics \<T>
  - to be used with **any kind of cards**: using render props in ItemsCardList


## Testing

## CI pipeline

<br />
