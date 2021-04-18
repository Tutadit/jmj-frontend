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
    Embed,
    Message,
    Card
} from 'semantic-ui-react'

import {
    Link,
    useParams
} from 'react-router-dom'
import API from "../../../../utils/API";

const ViewPaper = () => {

    let { id } = useParams();

    const [fetchPaper, setFetchPaper] = useState(true);
    const [paper, setPaper] = useState(null);
    const [nominated, setNominated] = useState(null);
    const [viewPaper, setViewPaper] = useState(false);
    const [assigned, setAssigned] = useState(null);
    const [withdraw, setWithdraw] = useState(false);
    const [evaluationMetric, setEvaluationMetric] = useState(null);

    useEffect(() => {
        if (fetchPaper) {
            setFetchPaper(false);
            API.get(`/api/paper/${id}`).then(response => {
                if (response.data.paper) {
                    setPaper(response.data.paper);
                }
                if (response.data.nominated)
                    setNominated(response.data.nominated);
                if (response.data.assigned)
                    setAssigned(response.data.assigned);
                if (response.data.withdraw)
                    setWithdraw(response.data.withdraw);
                if (response.data.evaluation_metric)
                    setEvaluationMetric(response.data.evaluation_metric)
            }).catch(error => {

            })
        }
    }, [fetchPaper, id])

    const confirmRejection = e => {
        API.post(`/api/paper/${id}/request_withdraw`).then(response => {
            if (response.data.success) {
                setWithdraw(false);
            }
        }).catch(error => {

        })
    }

    if (!paper)
        return (
            <Container><Loader active inline='centered' /></Container>
        )
    return (
        <Container>
            { withdraw &&
                <Message color='yellow'>
                    {withdraw === 'awaiting' ?
                        <>
                            <Icon name='exclamation' /> The author of this paper has requested a withdrawl.
                        </>
                        : <>

                            <Icon name='exclamation' /> The withdrawl request has been rejected.
                            <Button secondary size='small' onClick={e => confirmRejection()}>Ok :(</Button>

                        </>}
                </Message>}
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
                        <Table.Cell>{paper.editor}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Editor email</Table.Cell>
                        <Table.Cell>{paper.editor_email}</Table.Cell>
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
                <Header>Evaluation Metric: {evaluationMetric?.name}</Header>
            </Segment>
            <Divider hidden />
            <Card.Group>
                {evaluationMetric?.questions.map(metric =>
                    <Card>
                        <Card.Content>
                            <Card.Header>{metric.question}</Card.Header>
                            <Card.Meta>
                                <span>{metric.answer_type}</span>
                            </Card.Meta>

                        </Card.Content>
                    </Card>)}
            </Card.Group>
            <Divider />
            <Segment clearing vertical>
                <Header floated='left' >Nominated Reviewers</Header>
            </Segment>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Reviewer</Table.HeaderCell>
                        <Table.HeaderCell>Reviewer Email</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {nominated && nominated.map(nominee =>
                        <Table.Row key={nominee.id}>
                            <Table.Cell>{nominee.reviewer}</Table.Cell>
                            <Table.Cell>{nominee.reviewer_email}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            <Divider />
            <Segment clearing vertical>
                <Header floated='left' >Assigned Reviewers</Header>
            </Segment>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Reviewer</Table.HeaderCell>
                        <Table.HeaderCell>Reviewer Email</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {assigned && assigned.map(nominee =>
                        <Table.Row key={nominee.id}>
                            <Table.Cell>{nominee.reviewer}</Table.Cell>
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
                            {paper?.title}
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