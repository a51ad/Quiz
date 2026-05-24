import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import ChangePassword from './ChangePassword';
import UserInfo from './UserInfo';
import { useState } from 'react';

const Profile = ({ show, setshow }) => {

    const handleClose = () => setshow(false);


    return (
        <div className="profile-container">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                size="xl"
                centered
                dialogClassName="profile-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Profile User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Tabs
                        defaultActiveKey="home"
                        id="uncontrolled-tab-example"
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="Profile" >
                            <UserInfo />
                        </Tab>
                        <Tab eventKey="change password" title="Change Password">
                            <ChangePassword />
                        </Tab>
                        <Tab eventKey="history" title="History" >
                            History
                        </Tab>
                    </Tabs>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Profile;