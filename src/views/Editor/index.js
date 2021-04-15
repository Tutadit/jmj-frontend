import React from "react";

import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
  } from "react-router-dom";

import Home from "./components/Home";
import Navigation from "./components/Navigation";
import PapersList from "./components/PapersList";
import ResearchersList from "./components/ResearchersList"
import ReviewersList from "./components/ReviewersList"
import SignupsList from "./components/SignupsList"
import PublicationsList from "./components/PublicationsList"

import ViewPaper from "./components/ViewPaper"
import ViewResearcher from "./components/ViewResearcher"
import ViewReviewer from "./components/ViewReviewer"
import ViewSignup from "./components/ViewSignup"
import ViewPublication from"./components/ViewPublication"


import './index.css';

const Editor = () => {

    let { path, url } = useRouteMatch();

    return (
        <div className="editor">
            <Navigation url={url} />
            <div className="ui container middle">
                <Switch>
                    
                    <Route exact path={path}>
                        <Redirect to={`${path}/papers`} />
                    </Route>

                    
                    <Route exact path={`${path}/papers`}>
                        <PapersList />
                    </Route>
                    <Route exact path={`${path}/papers/:id`}>
                        <Redirect to={`${path}/papers/:id/view`} />
                    </Route>
                    <Route path={`${path}/papers/:id/view`}>
                        <ViewPaper />
                    </Route>
                    
                    
                    <Route exact path={`${path}/researchers`}>
                        <ResearchersList />
                    </Route>
                    <Route exact path={`${path}/researchers/:id`}>
                        <Redirect to={`${path}/researchers/:id/view`} />
                    </Route>
                    <Route path={`${path}/researchers/:id/view`}>
                        <ViewResearcher />
                    </Route>


                    <Route exact path={`${path}/reviewers`}>
                        <ReviewersList />
                    </Route>
                    <Route exact path={`${path}/reviewers/:id`}>
                        <Redirect to={`${path}/reviewers/:id/view`} />
                    </Route>
                    <Route path={`${path}/reviewers/:id/view`}>
                        <ViewReviewer />
                    </Route>


                    <Route exact path={`${path}/signups`}>
                        <SignupsList />
                    </Route>
                    <Route exact path={`${path}/signups/:id`}>
                        <Redirect to={`${path}/signups/:id/view`} />
                    </Route>
                    <Route path={`${path}/signups/:id/view`}>
                        <ViewSignup />
                    </Route>


                    <Route exact path={`${path}/publications`}>
                        <PublicationsList />
                    </Route>
                    <Route exact path={`${path}/publications/:id`}>
                        <Redirect to={`${path}/publications/:id/view`} />
                    </Route>
                    <Route path={`${path}/publications/:id/view`}>
                        <ViewPublication />
                    </Route>
                </Switch>
            </div>
        </div>       
    );  
};

export default Editor;
