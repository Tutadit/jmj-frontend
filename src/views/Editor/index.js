import React from "react";

import {
    Switch,
    Route,
    useRouteMatch,
    Redirect
  } from "react-router-dom";

import Navigation from "./components/Navigation";
import PapersList from "./components/PapersList";
import ResearchersList from "./components/ResearchersList"
import ReviewersList from "./components/ReviewersList"
import SignupsList from "./components/SignupsList"

import ViewResearcher from "./components/ViewResearcher"
import ViewReviewer from "./components/ViewReviewer"
import ViewSignup from "./components/ViewSignup"

import ViewPapersRes from "./components/ViewPapersRes"
import ViewPapersRev from "./components/ViewPapersRev"

import './index.css';
import ViewPublication from "../Admin/components/ViewPublication";
import EditPublication from "../Admin/components/EditPublication";
import PublicationsList from "../Admin/components/PublicationsList";

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
                    
                    
                    <Route exact path={`${path}/researchers`}>
                        <ResearchersList />
                    </Route>
                    <Route exact path={`${path}/researchers/:id`}>
                        <Redirect to={`${path}/researchers/:id/view`} />
                    </Route>
                    <Route path={`${path}/researchers/:id/view`}>
                        <ViewResearcher />
                    </Route>
                    <Route path={`${path}/researchers/:id/papers`}>
                        <ViewPapersRes />
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
                    <Route path={`${path}/reviewers/:id/papers`}>
                        <ViewPapersRev />
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
                    <Route path={`${path}/publications/:id/edit`}>
                        <EditPublication />
                    </Route>
                </Switch>
            </div>
        </div>       
    );  
};

export default Editor;
