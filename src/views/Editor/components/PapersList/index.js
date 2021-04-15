import React, { useState, useEffect } from "react";
import API from '../../../../utils/API';

import { Table, Button, Icon, Modal, Header, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

import './index.css';

const PapersList = () => {

    // create variables
    const [fetch, setFetch] = useState(true);
    const [ users, setUsers ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ currentDelete, setCurrentDelete ] = useState(null);

    // fetch method
    useEffect(() => {
        if(fetch) {
            setFetch(false);
            API.get('/api/users/all').then(response => {
                if (response.data.users)
                    setUsers(response.data.users);
            }).catch(error => {
                console.log(error);
            })
        }
    },[fetch]);

    // return 
    return (
        <div className="papers-list">
           papers_list is amazzing
        </div>       
    );  
};

export default PapersList;