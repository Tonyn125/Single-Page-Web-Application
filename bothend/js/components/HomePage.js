import React from "react";
import {css} from "glamor";
import {Container} from "reactstrap";
import Relay from "react-relay";
import SimpleMap from "./map";
import PinSelector from "./pin_selector";
import AddEventMutation from "../mutations/AddEventMutation";
import AddUserMutation from "../mutations/AddUserMutation";
import ChangeUserPasswordMutation from "../mutations/ChangeUserPasswordMutation";
import ChangeKarma from "../mutations/ChangeKarma";
import Footer from "./footer";
import ModalLogin from "./modalLogin";
import ModalKarma from "./modalKarma";
import ModalTC from "./modalTC";
import ModalSettings from "./modalSettings";
import ModalReg from "./Register";
import logo from "../../assets/Target.png";
import {slide as Menu} from "react-burger-menu";
// import Popup from 'react-popup'

const footerHeight = '40px';

const footerStyle = css({
    position: 'absolute',
    bottom: 0, width: '100%', lineHeight: footerHeight, height: footerHeight
});


class HomePage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            lat: "",
            lng: "",

            currentUserId: "",
            currentUserEmail: "",
            currentUserKarma: "",

            users: this.setUsers()
        };


          this.getLocation();


    }


    getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((loc)=> {
                this.setState({
                    userLoc: {
                        lat: loc.coords.latitude,
                        lng: loc.coords.longitude,
                    }
                })
            })
        } else {
            this.setState({
                userLoc: {
                    lat: 0,
                    lng: 0,
                }
            })
        }
    }
    setCurrentFilter= (event)=>{
      this.setState({
        filterKeywords:event.target.value
      })
    }
    GrabMode =(eventType) =>{
      this.setState({
        filterEventType:eventType
      })
    }


    setUsers() {
      let fetchedUsers = this.props.viewer.users.edges.map(edge=>edge.node);
      return fetchedUsers;

    }

    handleCreateEvent = (title, description, eventType) => {
        const lat = this.state.lat;
        const lng = this.state.lng;
        Relay.Store.update(new AddEventMutation({
            lat, lng, title, description,
            eventType, viewer: this.props.viewer
        }));
    }

    handleCreateUser = (name, email) => {

        Relay.Store.update(new AddUserMutation({name, email, viewer: this.props.viewer}));

    }

    handleChangePassword = (password) => {
      let id = this.state.currentUserId;
      Relay.Store.update(new ChangeUserPasswordMutation({id, password}));

    }

    kChange = (karma) =>{
      let id = this.state.currentUserId;
      let hold = this.state.currentUserKarma;
      karma = hold - karma;
      Relay.Store.update(new ChangeKarma({id, karma}));
    }



    setCenter = (newLat, newLng) => {
        this.setState({
            lat: newLat,
            lng: newLng
        });
    }


    handleLogin = (email, password) => {

      for(let i=0; i<this.state.users.length; i++){

      if(email===this.state.users[i].email) {
        if(password===this.state.users[i].password){
          this.setState({
            currentUserId: this.state.users[i].id,
            currentUserEmail: this.state.users[i].email,
            currentUserKarma: this.state.users[i].karma
            });
            return true;
          }
        }
      }

      return false;

  }



    render() {
        let icons = this.props.viewer.events.edges.map(edge=>edge.node).filter(
          (item) => {
            return ((item.eventType === this.state.filterEventType) && (!item.description.search(new RegExp(this.state.filterKeywords, "i")) ||
            !item.title.search(new RegExp(this.state.filterKeywords, "i"))));
        });

        if (this.state.userLoc) {
            icons.push({
                title: "Current Location",
                lat: this.state.userLoc.lat,
                lng: this.state.userLoc.lng,
                eventType: "Hist" // todo get more appropriate icon
            });
        }
        return (
            <div>
                <ModalLogin onLogin={this.handleLogin}/>
                <Menu id="hamburger-menu" styles={styles}>
                    <ModalKarma kChange={this.kChange} passkarma={this.state.currentUserKarma}/>
                    <ModalTC/>
                    <ModalReg onCreateUser={this.handleCreateUser}/>
                    <ModalSettings onChangePassword={this.handleChangePassword}/>
                    <hr/>
                    <a className="bottom" id="Lo" href= '/'> Log Out </a>
                    <a href= "https://sonderconnection.wordpress.com/about"> About Us </a>
                </Menu>

                <img id="center" src={logo}/>
                <div style={{width: '100%', height: '100vh'}}>
                    <PinSelector GrabMode= {this.GrabMode} filter={this.setCurrentFilter} viewer={this.props.viewer} onCreate={this.handleCreateEvent}/>
                    <SimpleMap onCenterChange={this.setCenter} places={icons}/>
                </div>
            </div>
        );
    }
}

let styles = {
    bmBurgerButton: {
        position: 'fixed',
        width: '36px',
        height: '30px',
        left: '36px',
        top: '36px'
    },
    bmBurgerBars: {
        background: '#373a47'
    },

    bmCross: {
        background: '#bdc3c7'
    },

    bmMenu: {
        background: 'linear-gradient(360deg, #ffffff 85%, #7D371B 15%)',
        padding: '2.39em 1.5em ',
        fontSize: '1.65em',
        textAlign: 'center',
    },
    bmItemList: {
        padding: '3em 0 3em',
    }
};

HomePage = Relay.createContainer(HomePage, {
    prepareVariables() {
        return {
            limit: 100
        };
    },

    fragments: {
        viewer: () => Relay.QL`
      fragment on Viewer {
        __typename
        events(first: $limit) {
          edges {
            node {
              id
              title
              description
              lat
              lng
              eventType
            }
          }
        }
        users(first: $limit) {
          edges {
            node {
              id
              name
              email
              password
              karma
            }
          }
        }
          ${AddEventMutation.getFragment('viewer')}
          ${AddUserMutation.getFragment('viewer')}
          ${ChangeUserPasswordMutation.getFragment('viewer')}
          ${ChangeKarma.getFragment('viewer')}
      }
    `,
        events: () => Relay.QL`
      fragment on EventConnection {
        count
          edges {
            node {
              id
              title
              description
              lat
              lng
              eventType
            }
          }
        }`,
        users: () => Relay.QL`
      fragment on UserConnection {
        count
          edges {
            node {
              id
              name
              email
              karma
            }
          }
        }`
    }
});

export default HomePage;
