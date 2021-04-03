import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../../store/selectors/user";
import { logout } from "../../store/actions/user";
import './index.css';
import { Menu } from "semantic-ui-react";
import API from "../../utils/API";

const UserNav = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const handleLogout = e => {        
        API.get('/logout').then(response => {
            dispatch(logout());
        }).catch(err => {

        })
    }

    return (
        <Menu.Menu position='right'>
            { user && <>            
            <Menu.Item>
                <p>{user.firstName} {user.lastName}</p>
            </Menu.Item>
            <Menu.Item
                name='Logout' 
                onClick={handleLogout}/> 
            </>}
        </Menu.Menu>
    );  
};

export default UserNav;
