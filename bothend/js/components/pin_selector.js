import React from "react";
import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Button,
    ButtonGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from "reactstrap";
import ModalPinSelector from "./modalPinSelector";

export default class PinSelector extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.setMode = this.setMode.bind(this);
        this.toggleSuccess = this.toggleSuccess.bind(this);
        this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

        this.state = {

            dropdownOpen: false,
            modal: false,
            successModal: false,
            modes: [
                {
                    "mode": "global",
                    "option1": "Chat about Life ...",
                    "option2": "Meet for Coffee",
                    "option3": "Walk and Talk",
                    "option4": "Personal Issues"
                }, {
                    "mode": "educational",
                    "option1": "High School Help",
                    "option2": "University Help",
                    "option3": "Willing To Learn",
                    "option4": "Tutoring For"
                }, {
                    "mode": "group",
                    "option1": "Food Discount",
                    "option2": "Movie Discount",
                    "option3": "Concert Discount",
                    "option4": "Other Discount"
                }
            ],

            currMode: {

                "mode": "Null",
                "option1": "ToolTip",
                "option2": "To create an event, select one of the buttons",
                "option3": "Buttons will display different options",
                "option4": "The Triangle is to further filter events."

            }

        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
            modal: !this.state.modal
        });
    }

    onRadioBtnClick(rSelected) {
      console.log(rSelected)
      if(rSelected == 1){this.props.GrabMode("global");}
      else if(rSelected == 2){this.props.GrabMode("educational");}
        else if(rSelected == 3){this.props.GrabMode("group");}

        this.setState({rSelected});
        this.setMode(rSelected - 1);
    }

    setMode(mode) {
        this.setState({
            currMode: this.state.modes[mode],

        });
    }

    toggleSuccess() {
        this.setState({
            successModal: !this.state.successModal
        });
    }

    render() {
        return (
            <div id="pin-selector">
                <ButtonGroup className="pinSelector">
                    <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret>
                            Create an event
                        </DropdownToggle>
                        <DropdownMenu>

                            <ModalPinSelector viewer={this.props.viewer} onCreate={this.props.onCreate}
                                              option={this.state.currMode.option1} type={this.state.currMode.mode}/>
                            <ModalPinSelector viewer={this.props.viewer} onCreate={this.props.onCreate}
                                              option={this.state.currMode.option2} type={this.state.currMode.mode}/>
                            <ModalPinSelector viewer={this.props.viewer} onCreate={this.props.onCreate}
                                              option={this.state.currMode.option3} type={this.state.currMode.mode}/>
                            <ModalPinSelector viewer={this.props.viewer} onCreate={this.props.onCreate}
                                              option={this.state.currMode.option4} type={this.state.currMode.mode}/>

                        </DropdownMenu>
                    </ButtonDropdown>
                    <Button id="btn-global" outline color="success" onClick={() => this.onRadioBtnClick(1)}
                            active={this.state.rSelected === 1}></Button>
                    <Button id="btn-educational" outline color="success" onClick={() => this.onRadioBtnClick(2)}
                            active={this.state.rSelected === 2}></Button>
                    <Button id="btn-group" outline color="success" onClick={() => this.onRadioBtnClick(3)}
                            active={this.state.rSelected === 3}></Button>
                    <Button id="btn-filter" outline color="info" onClick={this.toggleSuccess}></Button>
                    <Modal isOpen={this.state.successModal} toggle={this.toggleSuccess}>
                        <ModalHeader>
                            Further Filter
                        </ModalHeader>
                        <ModalBody>
                            <p>Further filtering for the events, after clicking on one of the buttons</p>
                            <Form>
                                <FormGroup>
                                    <Label for="KeywordT">Search through titles and descriptions with Keyword</Label>
                                    <Input onChange={this.props.filter} type="keyword" name="KeywordT" id="KeywordT"
                                           placeholder="Keyword e.g Pizza"/>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" onClick={this.toggleSuccess}>Search</Button>
                            <Button color="secondary" onClick={this.toggleSuccess}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                </ButtonGroup>

            </div>

        );
    }
}
