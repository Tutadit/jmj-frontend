# Juan Mo' Journals Frontend Developing Guide

> Note: First follow the guide to setting up the backend. From there use the ubuntu terminal from your windows machine to start this frontend

## Structure 

The web app is built using [React](https://reactjs.org/docs/getting-started.html), with [React Redux](https://react-redux.js.org/) for site state management, with [Axios](https://react-redux.js.org/) for api calls and [React Router](https://reactrouter.com/web/guides/quick-start) for routing. It is themed using [semantic ui](https://react.semantic-ui.com/).

### `src` folder

In the `src` folder you will find the heart of the frontend system. It has been bootstrapped with an authentication system (login/register) that will route the logged in user to their respective view depending on the user type (admin, editor, researcher, reviewer, and viewer). 

#### `src/store` folder

In the `src/store` folder you will find all the files needed by the redux store. Speciffically you will find the reducers in the `src/store/reducers`, the actions in the `src/store/actions` and selectors in `src/store/selectors`

#### `src/utils` folder

General utilities for the app are in the `src/utils` folder. As of now there is only one utility, `API` which is an axios instance configured to talk to the backend using credentials. **Always use API util instead of axios**

#### `src/components` folder

In the `src/components` folder you will find components that are general to the entire site. Any view-specific component should be placed under the respective `components` folder for that view.

#### `src/views/` folder

In the `src/views/` folder are the views for each type of user. This are bare components and need to be built.

Each view has been initialized with a `components` folder, and an `index.js` entrypoint.

There are two premade components in each view: `Navigation` and `Home` feel free to add any components you need.

## How to run it?

### Before anything 

Install npm and nodejs;

```
sudo apt install nodejs npm
```

Clone this repo, and cd into it

Before you can run the system you must install its dependencies using:

```
npm install typescript

npm install
```


This is only necessary once. After you have installed the dependencies they will stay installed unless you remove the `node_modules` folder.

### Running the app

Since this web app is dependent on the backend system, you must first start the backend system. Once that is up and running, run the following command in the root of the application.

`npm start`

### Premade accounts

There are premade user accounts to facilitate testing:

- Admin:
    - email: admin@mail.com
    - password: password
- Editor: 
    - email: editor@mail.com
    - password: password
- Researcher:
    - email: researcher@mail.com
    - password: password\
- Reviewer:
    - email: reviewer@mail.com
    - password: password
- Viewer:
    - email: viewer@mail.com
    - password: password
