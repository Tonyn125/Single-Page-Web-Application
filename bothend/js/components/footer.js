import React from "react";
import {css} from "glamor";
import {Button, ButtonGroup} from "reactstrap";
import ModalLogOut from "./modalLogOut";

export default class Footer extends React.Component {

    render() {

        return (

            <div id="footer">
                <ButtonGroup className="footer">
                    <Button color="success" href="http://sonderconnection.wordpress.com">
                        Blog
                    </Button>
                    <Button color="success" href="https://sonderconnection.wordpress.com/about/">
                        About Us
                    </Button>
                    <ModalLogOut/>
                </ButtonGroup>
            </div>
        );
    }

}
