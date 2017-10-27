/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText} from "reactstrap";

class ModalTC extends React.Component {
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
            <div>
                <a className="bottom" id="tc" href="#" onClick={this.toggle}>T&C</a>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Terms and Conditions</ModalHeader>
                    <ModalBody>
                        <p>
                            By using our website you agree to our terms and conditions. You agree to give us access to
                            your location at all times so that you can be tracked to help us in creating events, it will
                            not otherwise be stored. You also agree to use this site for its intended purposes and to
                            not create fake events or not show up to them. Doing so will result in your karma score
                            dropping and we reserve our right to remove users who abuse the system. Our vouchers also at
                            the moment mean nothing so do not try and use them to redeem for goods and services they are
                            example only.
                        </p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.toggle}>I Agree</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalTC;
