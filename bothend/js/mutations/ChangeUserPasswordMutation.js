import Relay from "react-relay";

export default class ChangeUserPasswordMutation extends Relay.Mutation {
  static fragments = {
      viewer: () => Relay.QL`fragment on Viewer {
    id
    users {
      count
    }
  }`
  };
    getMutation() {
        return Relay.QL`mutation{updateUser}`;
    }

    getVariables() {
        return {
            id: this.props.id,
            password: this.props.password
        };
    }

    getFatQuery() {
        return Relay.QL`
      fragment on updateUserPayload {
        changedUser {
          id
          password
        }
      }
    `;
    }

    getConfigs() {
        return [{
            type: 'FIELDS_CHANGE',
            fieldIDs: {
              changedUser: this.props.id
            }
        }];
    }

    getOptimisticResponse() {
        return {
          changedUser: {
            id: this.props.id,
            password: this.props.password
          }
      };
    }
}
