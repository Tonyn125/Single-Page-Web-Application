/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from "reactstrap";

class ModalLogOut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div id="logOut">
                <button className="button" onClick={this.toggle}><span>
          Log Out/Sign In
        </span></button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Log Out</ModalHeader>
                    <ModalBody>
                        <p>
                            You were logged out successfully
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.toggle}>Ok</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalLogOut;
