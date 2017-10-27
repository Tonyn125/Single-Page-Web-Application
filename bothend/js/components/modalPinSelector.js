import React from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    DropdownItem,
    Form,
    FormGroup,
    FormText,
    Input,
    Label
} from "reactstrap";

class ModalPinSelector extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            modal: false,
            title: "",
            description: ""

        };

        this.toggle = this.toggle.bind(this);

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handleCreateEvent = this.handleCreateEvent.bind(this);

    }

    toggle() {
        this.setState({
            modal: !this.state.modal

        });
    }

    handleTitleChange(e) {
        let value = e.target.value
        this.setState({
            title: value
        });
    }

    handleDescriptionChange(e) {
        let value = e.target.value
        this.setState({
            description: value
        });
    }

    handleCreateEvent() {
        this.props.onCreate(this.state.title, this.state.description, this.props.type);
        this.toggle();
    }


    render() {
        return (
            <div>
                <DropdownItem onClick={this.toggle}>{this.props.option}</DropdownItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader>Create Event</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="eventTitle"></Label>
                                <Input onChange={this.handleTitleChange} type="text" ref="title"
                                       placeholder="Event Title"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="eventDescription"></Label>
                                <Input onChange={this.handleDescriptionChange} type="textarea" ref="description"
                                       placeholder="Write a Descrition, Add Your desired Date and Time for the event"/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.handleCreateEvent}>Create Pin</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


export default ModalPinSelector;
