import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/selectors/user"

import { Menu } from 'semantic-ui-react';

import {
    Switch,
    Route,
    Redirect,
    NavLink
  } from "react-router-dom";

import Login from "../Login";
import PrivateRoute from "../PrivateRoute";
import Register from "../Register";

import Admin from '../../views/Admin';
import Editor from '../../views/Editor';
import Researcher from '../../views/Researcher';
import Reviewer from '../../views/Reviewer';
import Viewer from '../../views/Viewer';


import 'semantic-ui-less/semantic.less'
import './index.css';

const App = () => {

    const user = useSelector(selectUser);
   
    return (    
        <>
            { !user &&            
            <Menu>
                <Menu.Item exact to="/login" 
                    as={NavLink}>
                    Login
                </Menu.Item>
                <Menu.Item exact to="/register" 
                    as={NavLink}>
                    Register
                </Menu.Item>
            </Menu>
            }
            <Switch>
                <Route exact path="/">
                    <Redirect to="login" />
                </Route>
                <Route  path="/login" 
                        component={Login} />                    
                <Route  path="/register" 
                        component={Register} />    
                <PrivateRoute path="/admin"
                                type="admin" > 
                    <Admin />
                </PrivateRoute>
                <PrivateRoute path="/viewer"
                                type="viewer" >
                    <Viewer />
                </PrivateRoute>  
                <PrivateRoute path="/editor"
                                type="editor" > 
                    <Editor />                   
                </PrivateRoute> 
                <PrivateRoute path="/reviewer"
                                type="reviewer" >
                    <Reviewer />                    
                </PrivateRoute>          
                <PrivateRoute path="/researcher"
                            type="researcher" >  
                    <Researcher />                  
                </PrivateRoute> 
            </Switch> 
        </>     
    );  
};

export default App;
