/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from "reactstrap";

class ModalSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            newPassword: ""
        };

        this.toggle = this.toggle.bind(this);
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleNewPasswordChange(e) {
        let value = e.target.value
        this.setState({
            newPassword: value
        });
    }

    handleChangePassword() {
      this.props.onChangePassword(this.state.newPassword);
      this.toggle();
    }

    render() {
        return (
            <div>
                <a href="#" className="top" onClick={this.toggle}>Settings</a>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Settings</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Input onChange={this.handleNewPasswordChange} type="password" name="Pass2" id="Pass2" placeholder="New Password"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.handleChangePassword}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalSettings;
