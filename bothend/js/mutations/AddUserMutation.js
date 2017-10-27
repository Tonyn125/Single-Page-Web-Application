import Relay from "react-relay";

export default class AddUserMutation extends Relay.Mutation {
    static fragments = {
        viewer: () => Relay.QL`fragment on Viewer {
      id
      users {
        count
      }
    }`
    };

    getMutation() {
        return Relay.QL`mutation{addUser}`;
    }

    getVariables() {
        return {
            name: this.props.name,
            email: this.props.email,
            karma: 100,
        };
    }

    getFatQuery() {
        return Relay.QL`
      fragment on addUserPayload {
        changedUserEdge
        viewer {
          users {
            count
          }
        }
      }
    `;
    }

    getConfigs() {
        return [{
            type: 'RANGE_ADD',
            parentID: this.props.viewer.id,
            connectionName: 'users',
            edgeName: 'changedUserEdge',
            rangeBehaviors: {
                '': 'prepend'
            }
        }];
    }

    getOptimisticResponse() {
        return {
            changedUserEdge: {
                node: {
                    name: this.props.name,
                    email: this.props.email
                }
            },
            viewer: {
                id: this.props.viewer.id,
                users: {
                    count: this.props.viewer.users.count + 1
                }
            }
        };
    }
}
