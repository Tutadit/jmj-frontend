import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from '../../../../utils/API';

import { Container, Header, Loader, Table, Icon, Button, Segment, Modal, Embed} from "semantic-ui-react";
import { Link } from "react-router-dom";

import './index.css';

const ViewPapersRes = () => {

    // create variables
    const [fetch, setFetch] = useState(true);
    const [ papers, setPapers] = useState([]);
    const [ assigned, setAssigned] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [ currentDelete, setCurrentDelete ] = useState(null);
    const [ viewPaper, setViewPaper ] = useState(false);
    const [ paper, setPaper ] = useState(null);
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
        <Container className="view-papers-res">
            <Header floated='left'>View Papers By Researcher</Header>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Researcher Email</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Date Submitted</Table.HeaderCell>
                        <Table.HeaderCell>File</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {papers.map(paper => <Table.Row key={paper.id}>
                            <Table.Cell>{paper.title}</Table.Cell>
                            <Table.Cell>{paper.researcher_email}</Table.Cell>
                            <Table.Cell>{paper.status}</Table.Cell>
                            <Table.Cell>{paper.created_on}</Table.Cell>
                            <Table.Cell>
                                <Button secondary
                                        icon
                                        onClick={e => {
                                            setPaper(paper)
                                            setViewPaper(true);
                                        }}
                                        labelPosition='center'>
                                    <Icon name="file alternate" />
                                    {paper.file_path}
                                </Button>                                
                            </Table.Cell>
                        </Table.Row>)}
                </Table.Body>
            </Table>

            <Modal
                dimmer='inverted'
                onClose={() => setViewPaper(false)}
                onOpen={() => setViewPaper(true)}
                open={viewPaper}
                size='fullscreen'>
                <Segment clearing vertical padded>
                    <Container className='file-view-header'>
                    <Button primary 
                            floated='right'
                            onClick={(e) => {
                                setViewPaper(false);
                                setPaper(null);
                        }}>
                            <Icon name='check' /> Done
                        </Button>
                        <Header textAlign='center'
                                floated='left'>
                            { paper?.title }
                            <Header.Subheader>
                                {paper?.researcher_email}
                            </Header.Subheader>
                        </Header>
                    </Container>
                </Segment>
                <Modal.Content>       
                    <Embed
                        defaultActive
                        icon='right circle arrow'
                        placeholder='/images/image-16by9.png'
                        url={`http://localhost/storage/${paper?.file_path}`}
                    />                    
                </Modal.Content>
            </Modal> 
        </Container>      
    );  
};

export default ViewPapersRes;