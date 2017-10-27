/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from "reactstrap";


class ModalRegister extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            successModal: false,
            name: "",
            email: ""
        };

        this.toggle = this.toggle.bind(this);
        this.toggleSuccess = this.toggleSuccess.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleCreateUser = this.handleCreateUser.bind(this);

    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    toggleSuccess() {
        this.setState({
            successModal: !this.state.successModal
        });
    }

    handleNameChange(e) {
        let value = e.target.value
        this.setState({
            name: value
        });
    }

    handleEmailChange(e) {
        let value = e.target.value
        this.setState({
            email: value
        });
    }

    handleCreateUser() {
        this.props.onCreateUser(this.state.name, this.state.email);

        this.toggleSuccess();
    }


    render() {
        return (
            <div>
                <a href="#" className="top" onClick={this.toggle}>Register</a>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Register a Friend</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="name">Enter their name</Label>
                                <Input onChange={this.handleNameChange} type="Name" name="name" id="Name"
                                       placeholder="Enter Friends name"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="Email">Send invite to this email</Label>
                                <Input onChange={this.handleEmailChange} type="Email" name="Email" id="Email"
                                       placeholder="Send to e.g. abc123@hotmail.com"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.handleCreateUser}>Register</Button>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                        <Modal isOpen={this.state.successModal} toggle={this.toggleSuccess}>
                            <ModalHeader>Registration Success</ModalHeader>
                            <ModalBody>
                                <p>Registration successful, We have sent an invite to {this.state.email}</p>
                                <p>Please check your spam mail aswell.</p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="success" onClick={this.toggle} href={'/'}>Welcome</Button>
                                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                            </ModalFooter>
                        </Modal>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalRegister;
