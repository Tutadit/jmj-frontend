import React, { useState, useEffect } from "react";
import API from '../../../../utils/API';

import { Table, Button, Icon, Modal, Header, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

import './index.css'

const ResearchersList= () => {

    // declare variables
    const [fetch, setFetch] = useState(true);
    const [ users, setUsers ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ currentDelete, setCurrentDelete ] = useState(null);

    // fetch users method
    useEffect(() => {
        if(fetch) {
            setFetch(false);
            API.get('/api/users/of_type/researcher').then(response => {
                if (response.data.users)
                    setUsers(response.data.users);
            }).catch(error => {
                console.log(error);
            })
        }
    },[fetch]);

    // return 
    return (
        <div className="researchers-list">
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                { users.map(user => 
                    <Table.Row key={user.id}>
                        <Table.Cell>{user.first_name + ' ' + user.last_name}</Table.Cell>
                        <Table.Cell textAlign='center'>
                            <Button primary animated='vertical'
                                    to={`/editor/researchers/${user.id}/view`}
                                    as={Link}>
                                <Button.Content hidden>View</Button.Content>
                                <Button.Content visible>
                                    <Icon name='eye' />
                                </Button.Content>
                            </Button>
                            <Button secondary animated='vertical'
                                    to={`/editor/researchers/${user.id}/papers`}
                                    as={Link}>
                                <Button.Content hidden>Papers</Button.Content>
                                <Button.Content visible>
                                    <Icon name='file text' />
                                </Button.Content>
                            </Button>                                    
                        </Table.Cell>
                    </Table.Row>
                )}
                </Table.Body>
            </Table>
        </div>       
    )  
}

export default ResearchersList;