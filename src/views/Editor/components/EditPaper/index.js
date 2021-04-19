import { useState, useEffect } from "react";
import {Container, Header, Button, Segment, Icon, Table, Divider, Modal, Embed} from 'semantic-ui-react'
import {useParams} from 'react-router-dom'
import API from "../../../../utils/API";

const EditPaper = () => {
    // varaibles
    let { id } = useParams();       // get id of current paper

    const [fetchPaper, setFetchPaper] = useState(true);         // initially fetch paper
    const [paper, setPaper] = useState({
        id: "",
        title: "",
        status: "",
        file_path: "",
        researcher: "",
        researcher_id: "",
        editor: "",
        editor_id: "",
        editor_email: "",
        researcher_email: "",
        em_name: ""
    });
    const [nominated, setNominated] = useState(null);           // store nominated
    const [assigned, setAssigned] = useState(null);             // store assigned

    const [viewPaper, setViewPaper] = useState(false);                  // view paper pdf
    const [approveNomiRev, setApproveNomiRev] = useState(null);         // store approved nominated rev
    const [deleteRev, setDeleteRev] = useState(null);                   // store rev to reject/remove

    const [removeNomi, setRemoveNomi] = useState(false);            // remove nominated rev
    const [removeAssigned, setRemoveAssigned] = useState(false);    // remove assigned rev
    const [action, setAction] = useState(null);
    const [openConfirmation, setOpenConfirmation] = useState(false);

    // fetch paper
    useEffect(() => {
        if (fetchPaper) {
            setFetchPaper(false);
            API.get(`/api/paper/${id}`).then(response => {
                if (response.data.paper)
                    setPaper(response.data.paper);
                if (response.data.nominated)
                    setNominated(response.data.nominated);
                if (response.data.assigned)
                    setAssigned(response.data.assigned);
            }).catch((error) => {
                console.error(error);
            })
        }
    }, [fetchPaper, id])

    // remove nominated/assigned reviewer
    const removeRev = () => {
        if(removeNomi) {
            // remove nomi
            API.post(`/api/nominated/remove`, {
                paper_id: deleteRev.paper_id,
                reviewer_email: deleteRev.email
            }).then(response => {
                if (response.data.success) {
                    setFetchPaper(true);
                    setRemoveNomi(false);
                }
            }).catch((error => {
                console.error(error.response);
            }))

        } else if (removeAssigned) {
            // remove assigned
            API.post(`/api/assigned/remove`, {
                paper_id: deleteRev.paper_id,
                reviewer_email: deleteRev.email
            }).then(response => {
                if (response.data.success) {
                    setFetchPaper(true);
                    setRemoveAssigned(false);
                }
            }).catch((error => {
                console.error(error.response);
            }))
            
        } 
    }

    // approve nominated reviewer
    const approveNomiRevMethod = () => {
        // add to assign
        API.post('/api/assigned/new', {
            paper_id: 1,//approveNomiRev.paper_id,
            researcher_email: 'researcher1@mail.com',//approveNomiRev.researcher_email,
            reviewer_email: approveNomiRev.reviewer_email,
            minor_rev_dealine: approveNomiRev.minor_rev_dealine,
            major_rev_deadkine: approveNomiRev.major_rev_deadkine
        }).then(respomse => {
            if (respomse.data.success) {
                // remove from nomi
                setDeleteRev({
                    name: '',
                    email: approveNomiRev.reviewer_email,
                    paper_id: approveNomiRev.paper_id,
                    user_id: 1
                });
                setRemoveNomi(true);
                removeRev();
                setFetchPaper(true);
            }
        }).catch((error => {
            console.error(error.response);
        }))
    }

    // return 
    return (
        <Container>
            <Segment clearing vertical>
                <Header floated='left' >Edit Paper</Header>
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
                        <Table.Cell>Researcher</Table.Cell>
                        <Table.Cell>{paper.researcher}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Researcher Email</Table.Cell>
                        <Table.Cell>{paper.researcher_email}</Table.Cell>
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
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {nominated && nominated.map(nomi => 
                        <Table.Row key={nomi.id}>
                            <Table.Cell>{nomi.reviewer}</Table.Cell>
                            <Table.Cell>{nomi.reviewer_email}</Table.Cell>
                            <Table.Cell textAlign='center'>
                                <Button color='green' animated='vertical'
                                        onClick={(e) => {
                                            setApproveNomiRev({
                                                paper_id: paper.id,
                                                researcher_email: paper.researcher_email,
                                                reviewer_email: nomi.reviewer_email,
                                                minor_rev_dealine: '2021-01-02',
                                                major_rev_deadkine: '2021-01-03',
                                            })
                                            approveNomiRevMethod();
                                        }}>
                                    <Button.Content hidden>Add</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='checkmark' />
                                    </Button.Content>
                                </Button>
                                <Button color='red' animated='vertical'
                                        onClick={(e) => {
                                            setDeleteRev({
                                                name: nomi.reviewer,
                                                email: nomi.reviewer_email,
                                                paper_id: paper.id,
                                                user_id: nomi.id
                                            });
                                            setRemoveNomi(true);
                                            setAction({
                                                action: 'Are you sure you want to reject the nominated reviewer:'
                                            })
                                            setOpenConfirmation(true);
                                        }}>
                                    <Button.Content hidden>Remove</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='x' />
                                    </Button.Content>
                                </Button>                                     
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            <Divider />
            <Segment clearing vertical>
                <Header floated='left' >Assigned Reviewers</Header>
            </Segment>
            <Table celled >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Email</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Actions</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {assigned && assigned.map(assign => 
                        <Table.Row key={assign.id}>
                            <Table.Cell>{assign.reviewer}</Table.Cell>
                            <Table.Cell>{assign.reviewer_email}</Table.Cell>
                            <Table.Cell textAlign='center'>
                                <Button color='red' animated='vertical'
                                        onClick={(e) => {
                                            setDeleteRev({
                                                name: assign.reviewer,
                                                email: assign.reviewer_email,
                                                user_id: assign.id,
                                                paper_id: paper.id
                                            });
                                            setRemoveAssigned(true);
                                            setAction({
                                                action: 'Are you sure you want to remove the assigned reviewer:'
                                            })
                                            setOpenConfirmation(true);
                                        }}>
                                    <Button.Content hidden>Remove</Button.Content>
                                    <Button.Content visible>
                                        <Icon name='x' />
                                    </Button.Content>
                                </Button>                                     
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
            <Modal
                basic
                onClose={() => setOpenConfirmation(false)}
                onOpen={() => setOpenConfirmation(true)}
                open={openConfirmation}
                dimmer='blurring'
                size='small'>
                <Header icon textAlign='center'>
                    <Icon name='book' />
                   {action?.action} {deleteRev?.name}
                </Header>
                <Modal.Content>
                    <Container textAlign='center'>
                    <p className="align center">
                        This will remove the reviewer from the paper.
                    </p>
                    </Container>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='blue' inverted onClick={() => setOpenConfirmation(false)}>
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='red' inverted onClick={() => {
                        removeRev()
                        setOpenConfirmation(false);
                    }}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                </Modal.Actions>
            </Modal> 
        </Container>
    );
}

export default EditPaper;