import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import API from '../../../../utils/API';
import { 
    Container, 
    Header,
    Loader, 
    Table, 
    Icon, 
    Button, 
    Form, 
} from 'semantic-ui-react';


const EditUser = () => {

    let { id } = useParams();

    const [ fetch, setFetch ] = useState(true);
    const [ fetchDegrees, setFetchDegrees ] = useState(false);
    const [ user, setUser ] = useState(null);
    const [ degrees, setDegrees ] = useState([]);
    const [ error, setError ] = useState({});
    const [ changed, setChanged ] = useState({});
    
    useEffect(() => {
        if(fetch){
            setFetch(false);
            API.get(`/api/users/${id}`).then((response) => {
                if (response.data.user) {
                    setUser(response.data.user);

                    if (response.data.user.type === 'researcher')
                        setFetchDegrees(true);
                }

            }).catch((error) => {
                console.log(error.response);
            })
        }
    },[fetch, id]);

    useEffect(() => {
        if (fetchDegrees && user?.type === 'researcher') {
            setFetchDegrees(false);
            API.get(`/api/users/${id}/degrees`).then((response => {
                if (response.data.degrees)
                    setDegrees(response.data.degrees);
            })).catch((error) => {
                console.log(error);
            })
        }

    }, [user, fetchDegrees, id]);

    const handleChange = (e, {name, value}) => {
        setUser({
            ...user,
            [name]: value
        })
        setChanged({
            ...changed,
            [name]: true
        });
    }

    const saveField = (name, value) => { 
        API.post(`/api/users/${id}/edit`, {
            [name]:value
        }).then((response) => {
            if(response.data.success) {
                setChanged({
                    ...changed,
                    [name]:false
                })
                setError({
                    ...error,
                    [name]:false
                })
            }
        }).catch((error) => {
            if (error.response.data.errors)
                setError(error.response.data.errors);            
        })
    }

    const saveAll = (e) => {
        API.post(`/api/users/${id}/edit`, user).then((response) => {
            if(response.data.success) {
                setChanged({})
                setError({});
            }
        }).catch((error) => {
            if (error.response.data.errors)
                setError(error.response.data.errors);            
        })
    }

    if (!user)
        return <Container><Loader active inline='centered' /></Container>

    return(
        <Container className="edit-user">
              <Header dividing>User Info</Header>
                <Table definition>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell />
                            <Table.HeaderCell>
                                {Object.keys(changed).length > 0 &&
                                Object.keys(changed).reduce((acc, current) => 
                                    acc || changed[current], false) ?
                                    <Button labelPosition='left'
                                        floated='right'
                                        icon
                                        onClick={saveAll}
                                        secondary
                                        size='small'>
                                        <Icon name='save' />
                                        Save User
                                    </Button> : 
                                    <Button labelPosition='left'
                                            floated='right'
                                            icon
                                            disabled
                                            primary
                                            size='small'>
                                            <Icon name='save' />
                                            Saved
                                    </Button> }
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    <Table.Row>
                            <Table.Cell>First Name</Table.Cell>
                            <Table.Cell>
                                <Form.Field>
                                    <Form.Input placeholder="First Name"
                                                type="text"           
                                                name='first_name'               
                                                error={ error && error.first_name && 
                                                    { content: error.first_name.join(' & '),
                                                    pointing:'left' }}
                                                icon={ changed?.first_name && { 
                                                    name: 'save', 
                                                    circular: true, 
                                                    link:true,
                                                    onClick: e => saveField('first_name',user.first_name)
                                                }}                      
                                                onChange={handleChange}
                                                value={user.first_name} />
                                </Form.Field>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Last Name</Table.Cell>
                            <Table.Cell>
                                <Form.Field>
                                    <Form.Input placeholder="Last Name"
                                                name='last_name'
                                                type="text"
                                                error={ error && error.last_name && 
                                                    { content: error.last_name.join(' & '),
                                                    pointing:'left' }}
                                                icon={ changed?.last_name ? { 
                                                    name: 'save', 
                                                    circular: true, 
                                                    link:true,
                                                    onClick: e => saveField('last_name',user.last_name)
                                                } : null}
                                                onChange={handleChange}
                                                value={user.last_name} />
                                </Form.Field>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>User Type</Table.Cell>
                            <Table.Cell>
                                <Form.Field>
                                    <Form.Input placeholder="User Type"
                                                type="text"
                                                name='type'
                                                error={ error && error.type && 
                                                    { content: error.type.join(' & '),
                                                    pointing:'left' }}
                                                onChange={handleChange}
                                                icon={ changed?.type ? { 
                                                    name: 'save', 
                                                    circular: true, 
                                                    link:true,
                                                    onClick: e => saveField('type',user.type)
                                                } : null}
                                                value={user.type} />
                                </Form.Field>
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Email</Table.Cell>
                            <Table.Cell>
                                <Form.Field>
                                    <Form.Input placeholder="Email"
                                                type="email"
                                                name='email'
                                                error={ error && error.email && 
                                                    { content: error.email.join(' & '),
                                                    pointing:'left' }}
                                                icon={ changed?.email ? { 
                                                    name: 'save', 
                                                    circular: true, 
                                                    link:true,
                                                    onClick: e => saveField('email',user.email)
                                                } : null}
                                                onChange={handleChange}
                                                value={user.email} />
                                </Form.Field>
                            </Table.Cell>
                        </Table.Row>
                        { user.admin_email && <Table.Row>
                            <Table.Cell>Admin Email</Table.Cell>
                            <Table.Cell>
                                <Form.Field>
                                    <Form.Input placeholder="Admin Email"
                                                name='admin_email'
                                                type="email"
                                                error={ error && error.admin_email && 
                                                    { content: error.admin_email.join(' & '),
                                                    pointing:'left' }}
                                                onChange={handleChange}
                                                icon={ changed?.admin_email ? { 
                                                    name: 'save', 
                                                    circular: true, 
                                                    link:true,
                                                    onClick: e => saveField('admin_email',user.admin_email)
                                                } : null}
                                                value={user.admin_email} />
                                </Form.Field>
                            </Table.Cell>
                        </Table.Row>}
                        <Table.Row>
                            <Table.Cell>ID</Table.Cell>
                            <Table.Cell>{user.id}</Table.Cell>
                        </Table.Row>
                        
                    </Table.Body>
                </Table>
                
            { user.type === "researcher" && <>
            <Header dividing>Degrees</Header>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Title</Table.HeaderCell>
                        <Table.HeaderCell>Intitution</Table.HeaderCell>
                        <Table.HeaderCell>Received</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { degrees.map(degree => <Table.Row key={degree.id}>
                        <Table.Cell>{degree.title}</Table.Cell>
                        <Table.Cell>{degree.institution}</Table.Cell>
                        <Table.Cell>{degree.received}</Table.Cell>
                    </Table.Row>)}
                </Table.Body>
            </Table>
            </>}
        </Container>
    );
}

export default EditUser;