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

import './index.css';

const Editor = () => {

    let { path, url } = useRouteMatch();

    return (
        <div className="editor">
            <Navigation url={url} />
            <div className="ui container middle">
                <Switch>
                    <Route exact path={path}>
                        <Redirect to = {`${path}/papers`} />
                    </Route>
                    <Route path={`${path}/papers`}>
                        <PapersList />
                    </Route>
                    <Route path={`${path}/researchers`}>
                        <ResearchersList />
                    </Route>
                    <Route path={`${path}/reviewers`}>
                        <ReviewersList />
                    </Route>
                    <Route path={`${path}/signups`}>
                        <SignupsList />
                    </Route>
                    <Route path={`${path}/publications`}>
                        <PublicationsList />
                    </Route>
                </Switch>
            </div>
        </div>       
    );  
};

export default Editor;
