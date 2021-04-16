import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from '../../../../utils/API';

import { Container, Header, Loader, Table, Icon, Button, Segment, Modal, Embed} from "semantic-ui-react";
import { Link } from "react-router-dom";

import './index.css';

const ViewPapersRev = () => {

    // create variables
    const [fetch, setFetch] = useState(true);
    const [ assigned, setAssigned] = useState([]);
    //const [ assigned, setAssigned] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ currentDelete, setCurrentDelete ] = useState(null);
    const [ viewPaper, setViewPaper ] = useState(false);
    const [ paper, setPaper ] = useState(null);
    let {id} = useParams();   // func = hook

    // fetch all papers by the researcher
    useEffect(() => {
        if(fetch) {
            setFetch(false);
            API.get(`/api/assigned/reviewer/${id}`).then(response => {
                if (response.data.assigned)
                    setAssigned(response.data.assigned);
            }).catch(error => {
                console.log(error);
            })
        }
    },[fetch]);

    // return 
    return (
        <Container className="view-papers-rev">
            <Header floated='left'>View Papers Assigned to Reviewer</Header>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Paper Id</Table.HeaderCell>
                        <Table.HeaderCell>Researcher Email</Table.HeaderCell>
                        <Table.HeaderCell>Reviewer Email</Table.HeaderCell>
                        <Table.HeaderCell>Major Revision Deadline</Table.HeaderCell>
                        <Table.HeaderCell>Minor Revision Deadline</Table.HeaderCell>
                        <Table.HeaderCell>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {assigned.map(assign => <Table.Row key={assign.id}>
                            <Table.Cell>{assign.id}</Table.Cell>
                            <Table.Cell>{assign.researcher_email}</Table.Cell>
                            <Table.Cell>{assign.reviewer_email}</Table.Cell>
                            <Table.Cell>{assign.minor_rev_deadline}</Table.Cell>
                            <Table.Cell>{assign.major_rev_deadline}</Table.Cell>
                            <Table.Cell>
                                <Button secondary
                                        icon
                                        onClick={e => {
                                            setPaper(paper)
                                            setViewPaper(true);
                                        }}
                                        labelPosition='center'>
                                    <Icon name="file alternate" />
                                    View File
                                </Button>                                
                            </Table.Cell>
                        </Table.Row>)}
                </Table.Body>
            </Table>
        </Container>      
    );  
};

export default ViewPapersRev;