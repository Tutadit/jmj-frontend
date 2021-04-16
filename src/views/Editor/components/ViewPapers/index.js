import React, { useState, useEffect } from "react";
import API from '../../../../utils/API';

import { Table, Button, Icon, Modal, Header, Container } from "semantic-ui-react";
import { Link, useParams} from "react-router-dom";

import './index.css';

const ViewPapers = () => {

    // create variables
    const [fetch, setFetch] = useState(true);
    const [ papers, setPapers] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ currentDelete, setCurrentDelete ] = useState(null);
    let {id} = useParams();   // func = hook

    // fetch all papers by the researcher
    useEffect(() => {
        if(fetch) {
            setFetch(false);
            API.get(`/api/paper/by_researcher/${id}`).then(response => {
                if (response.data.papers)
                    setPapers(response.data.papers);
            }).catch(error => {
                console.log(error);
            })
        }
    },[fetch]);

    // return 
    return (
        <div className="view-papers">
        <Header floated='left'>View Papers by Researcher</Header>
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
            { papers.map(paper => 
                <Table.Row key={paper.id}>
                    <Table.Cell>{paper.title}</Table.Cell>
                    <Table.Cell>{paper.status}</Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Button primary animated='vertical'>
                            <Button.Content hidden>View</Button.Content>
                            <Button.Content visible>
                                <Icon name='eye' />
                            </Button.Content>
                        </Button>
                        <Button secondary animated='vertical'>
                            <Button.Content hidden>Edit</Button.Content>
                            <Button.Content visible>
                                <Icon name='pencil' />
                            </Button.Content>
                        </Button>                                    
                    </Table.Cell>
                </Table.Row>
            )}
            </Table.Body>
        </Table>
    </div>      
    );  
};

export default ViewPapers;