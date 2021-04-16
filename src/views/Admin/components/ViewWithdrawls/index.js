import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import API from '../../../../utils/API';
import { useHistory } from "react-router-dom";
import { Container, Header, Loader, Table, Icon, Button, Segment, Modal, Embed, Form} from 'semantic-ui-react';

import './index.css'

const status_types = [
    {key:'pending', text: 'Pending', value: 'pending'},
    {key:'approved', text: 'Approved', value: 'approved'},
    {key:'rejected', text: 'Rejected', value: 'rejected'}
]

const ViewWithdrawls = () => {


    const [ fetchPapers, setFetchPapers ] = useState(true);
    const [ papers, setPapers ] = useState(null);
   
    const [ viewPaper, setViewPaper ] = useState(false);
    const [ paper, setPaper ] = useState(null);

    useEffect(() => {
        if (fetchPapers) {
            setFetchPapers(false);
            API.get('/api/paper/withdrawn').then((response) =>{
                if(response.data.papers) {
                    setPapers(response.data.papers);
                }
            }).catch((error) => {
                console.error(error);
            })
        }
    }, [fetchPapers])

    const withdrawPaper = (id, approved=true) => {
        API.post(`/api/paper/${id}/withdraw`,{
            approved:approved
        }).then((response) => {
            if(response.data.success) {
                setPapers(papers.map(paper => paper.id === id ? {
                    ...paper,
                    status:approved ? 'withdrawn' : 'withdraw_request'
                } : paper));
            }
        }).catch((error) => {

        })
    }

    if (!papers)
        return <Container><Loader active inline='centered' /></Container>

    return(
        <Container className="edit-publication">
            <Header dividing>Paper withrawal requests</Header>            
            <Table>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Researcher</Table.HeaderCell>       
                    <Table.HeaderCell>File</Table.HeaderCell>
                    <Table.HeaderCell>Status</Table.HeaderCell>
                    <Table.HeaderCell>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                { papers && papers.map(paper => 
                    <Table.Row key={paper.id}>
                        <Table.Cell>{paper.title}</Table.Cell>
                        <Table.Cell>{paper.researcher_email}</Table.Cell>
                        <Table.Cell>
                            <Button secondary
                                    icon
                                    onClick={e => {
                                        setPaper(paper)
                                        setViewPaper(true);
                                    }}
                                    labelPosition='left'>
                                <Icon name="file alternate" />
                                {paper.file_path}
                            </Button>
                        </Table.Cell>
                        <Table.Cell>{paper.status}</Table.Cell>
                        <Table.Cell>
                            { paper.status === 'withdrawn' ? 
                            <Button icon 
                                    color='red'
                                    onClick={() => withdrawPaper(paper.id, false)}
                                    labelPosition='left'>
                                <Icon name="remove" />
                                Reject
                            </Button> :
                            <Button icon 
                                    onClick={() => withdrawPaper(paper.id)}
                                    color='blue'
                                    labelPosition='left'>
                                <Icon name="check" />
                                Approve
                            </Button>
                            }
                        </Table.Cell> 
                    </Table.Row>
                )}
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
}

export default ViewWithdrawls;