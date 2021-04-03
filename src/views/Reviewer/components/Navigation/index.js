import React from "react";
import { Menu } from 'semantic-ui-react'

import UserNav from "../../../../components/UserNav";
import {
    NavLink
  } from "react-router-dom";

import './index.css';

const ReviewerNavigation = ({url}) => {

    return (
        <Menu>
            <Menu.Item exact to={`${url}`}
                as={NavLink}>
                Home
            </Menu.Item>
            <Menu.Item exact to={`${url}/example`}
                as={NavLink}>
                Example
            </Menu.Item>
            <UserNav />
        </Menu>   
    );  
};

export default ReviewerNavigation;
