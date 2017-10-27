/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, Row, Col} from "reactstrap";

class ModalKarma extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
        this.handleK5 = this.handleK5.bind(this);
        this.handleK10 = this.handleK10.bind(this);
        this.handleK30 = this.handleK30.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }
    handleK5(){
      this.setState({
        karma:5
      });
      this.props.kChange(this.state.karma)
    }
    handleK10(){
      this.setState({
        karma:10
      });
      this.props.kChange(this.state.karma)
    }
    handleK30(){
      this.setState({
        karma:30
      });
      this.props.kChange(this.state.karma)
    }

    render() {
        return (
            <div id="Modal-s">
                <a id="karma" className="top" href="#" onClick={this.toggle}>Karma</a>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Karma</ModalHeader>
                    <ModalBody>
                        <Container id="klist" style={{width: '100%', height: '100%'}}>
                            <Row><Col>All vouchers will be sent via email</Col></Row>
                            <Row><Col>Karma Points: {this.props.passkarma}</Col></Row>
                            <Row>
                                <Col style={{
                                    borderRadius: '10px',
                                    backgroundColor: '#e7e7e7',
                                    marginLeft: '5.5px',
                                    marginTop: '10px',
                                    borderStyle: 'solid'
                                }}>
                                    <h4></h4>
                                    <h3>McDonalds</h3>
                                    <p>This voucher provides you with a free Large Fries
                                        with szechuan sauce</p>
                                    <button className="bb" onClick={() => this.handleK5()} >5 Karma</button>
                                </Col>
                                <Col style={{
                                    borderRadius: '10px',
                                    marginLeft: '5.5px',
                                    marginTop: '10px',
                                    backgroundColor: '#ffffff',
                                    borderStyle: 'solid'
                                }}>
                                    <h5></h5>
                                    <h3>Starbucks Coffee</h3>
                                    <p>This voucher provides you with a free Large Coffee</p>
                                    <button className="bb" onClick={() => this.handleK10()}>10 Karma</button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{
                                    borderRadius: '10px',
                                    backgroundColor: '#ffffff',
                                    marginLeft: '5.5px',
                                    marginTop: '10px',
                                    borderStyle: 'solid'
                                }}>
                                    <h6></h6>
                                    <h3>OfficeWorks</h3>
                                    <p>This voucher provides you a bag of 10 Free Pens</p>
                                    <button className="bb" onClick={() => this.handleK30()}>30 Karma</button>
                                </Col>
                                <Col style={{
                                    borderRadius: '10px',
                                    backgroundColor: '#e7e7e7',
                                    marginLeft: '5.5px',
                                    marginTop: '10px',
                                    borderStyle: 'solid'
                                }}>
                                    <h7></h7>
                                    <h3>H&M</h3>
                                    <p>This voucher provides you with 5$ off any one purchase</p>
                                  <button className="bb" onClick={() => this.handleK10()}>10 Karma</button>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{
                                    borderRadius: '10px',
                                    backgroundColor: '#e7e7e7',
                                    marginLeft: '5.5px',
                                    marginTop: '10px',
                                    borderStyle: 'solid'
                                }}>
                                    <h8></h8>
                                    <h3>Myers</h3>
                                    <p>This voucher provides you with 5$ off any one purchase</p>
                                    <button className="bb" onClick={() => this.handleK5()}>5 Karma</button>
                                </Col>
                                <Col style={{
                                    borderRadius: '10px',
                                    backgroundColor: '#ffffff',
                                    marginLeft: '5.5px',
                                    marginTop: '10px',
                                    borderStyle: 'solid'
                                }}>
                                    <h9></h9>
                                    <h3>Uniqlo</h3>
                                    <p>This voucher provides you with 5$ off any one purchase</p>
                                    <button className="bb" onClick={() => this.handleK10()}>10 Karma</button>
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.toggle}>Return</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default ModalKarma;
