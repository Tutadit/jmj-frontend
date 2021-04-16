import React, { useState, useEffect } from "react";

import { 
    Container,
    Header,
    Button,
    Segment,
    Icon,
    Table,
    Loader,
    Divider,
    Modal,
    Embed
 } from 'semantic-ui-react'

import { 
    Link,
    useParams
} from 'react-router-dom'
import API from "../../../../utils/API";

const ViewPaper = () => {

    let {id} = useParams();

    const [ fetchPaper, setFetchPaper ] = useState(true);
    const [ paper, setPaper ] = useState(null);
    const [ nominated, setNominated ] = useState(null);
    const [ viewPaper, setViewPaper ] = useState(false);

    useEffect(() => {
        if(fetchPaper) {
            setFetchPaper(false);
            API.get(`/api/paper/${id}`).then(response => {
                if (response.data.paper) {
                    setPaper(response.data.paper);
                }
                if (response.data.nominated)
                    setNominated(response.data.nominated);
            }).catch(error => {
                
            })
        }
    }, [fetchPaper, id])

    if (!paper) 
        return (
            <Container><Loader active inline='centered' /></Container>
        )
    return (
        <Container>
            <Segment clearing vertical>
                <Header floated='left' >Paper Info</Header>
                <Button floated='right'
                        icon
                        secondary
                        to={`/researcher/papers/${id}/edit`}
                        as={Link}
                        labelPosition='left'
                        size='small'>
                    <Icon name='plus' />
                    Edit Paper
                </Button>
            </Segment>
            <Table definition>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Title</Table.Cell>
                        <Table.Cell>{paper.title}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Status</Table.Cell>
                        <Table.Cell>{paper.status}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Editor</Table.Cell>
                        <Table.Cell>{paper.editor_email}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Evaluation Metric</Table.Cell>
                        <Table.Cell>{paper.em_name}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>File</Table.Cell>
                        <Table.Cell>
                            <Button secondary
                                    icon
                                    onClick={e => {
                                        setViewPaper(true);
                                    }}
                                    labelPosition='left'>
                                <Icon name="file alternate" />
                                View File
                            </Button>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Divider />
            <Segment clearing vertical>
                <Header floated='left' >Nominated Reviewers</Header>
            </Segment>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Reviewer Email</Table.HeaderCell>   
                    </Table.Row>
                </Table.Header>
                <Table.Body>                   
                    {nominated && nominated.map(nominee => 
                        <Table.Row key={nominee.id}>
                            <Table.Cell>{nominee.reviewer_email}</Table.Cell>
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
    )
}

export default ViewPaper