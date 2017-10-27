/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from "reactstrap";

//The modal to allow the user to login and access the app
class ModalLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: true,
            email: "",
            password: ""
        };

        this.toggle = this.toggle.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    handleChangeEmail(e) {
      let value = e.target.value
      this.setState({
          email: value
      });
    }

    handleChangePassword(e) {
      let value = e.target.value
      this.setState({
          password: value
      });
    }

    handleLogin() {
      if(this.props.onLogin(this.state.email, this.state.password)){

        this.setState({
            modal: !this.state.modal
        });
      }
    }

    //Render the modal
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={true} className={this.props.className}>
                    <ModalHeader>Sign In</ModalHeader>
                    {/*Login Form*/}
                    <ModalBody>
                        <Form>
                            {/*Username*/}
                            <FormGroup>
                                <Label for="Username">Username (E-mail Address)</Label>
                                <Input onChange={this.handleChangeEmail} type="User" name="Username" id="Username" placeholder="Email"/>
                            </FormGroup>
                            {/*Password*/}
                            <FormGroup>
                                <Label for="Password">Password</Label>
                                <Input onChange={this.handleChangePassword} type="password" name="Password" id="Password" placeholder="Password"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    {/*Submission*/}
                    <ModalFooter>
                        <Button color="success" onClick={this.handleLogin}>Sign In</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalLogin;
