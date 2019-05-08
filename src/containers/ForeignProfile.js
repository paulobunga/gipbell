import React from 'react';
import { Form, Item, Input, Label, Text, Button } from 'native-base';
import { getUserDataById } from "../api/user";
import Loader from '../components/Loader';


export default class ForeignProfile extends React.Component {

    state = {
        isGettingData: false,
        userData: null
    };

    async componentDidMount() {
        this.setState({
            isGettingData: true
        });
        const userData = await getUserDataById(this.props.user_id);
        this.setState({
            userData,
            isGettingData: false
        });
    }

    render() {
        if (this.state.isGettingData) {
            return <Loader />
        } else if (this.state.userData) {
            return <Text>{this.state.userData.user_display_name}</Text>
        } else {
            return null
        }

    }
}
