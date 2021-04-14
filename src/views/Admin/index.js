import React from "react";

import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
  } from "react-router-dom";

import Navigation from "./components/Navigation";
import UserList from "./components/UsersList";
import ViewUser from "./components/ViewUser";
import EditUser from "./components/EditUser";

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
                    <Route exact path={`${path}/users`}>
                        <UserList />
                    </Route>

                    <Route exact path={`${path}/users/:id`}>
                        <Redirect to={`${path}/users/:id/view`} />
                    </Route>
                    <Route path={`${path}/users/:id/view`}>
                        <ViewUser />
                    </Route>
                    <Route path={`${path}/users/:id/edit`}>
                        <EditUser />
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
