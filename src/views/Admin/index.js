import React from "react";

import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
  } from "react-router-dom";

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import UserList from "./components/UsersList";

import './index.css';

const Admin = () => {

    let { path, url } = useRouteMatch();

    return (
        <div className="admin">
            <Navigation url={url} />
            <div className="ui container middle">
                <Switch>
                    <Route exact path={path}>
                        <Redirect to = {`${path}/users`} />
                    </Route>
                    <Route path={`${path}/users`}>
                        <UserList />
                    </Route>
                    <Route path={`${path}/publications`}>
                        publications
                    </Route>
                    <Route path={`${path}/withdrawls`}>
                        withdrawls
                    </Route>
                </Switch>
            </div>
        </div>       
    );  
};

export default Admin;
