import React from 'react';
import { StyleSheet } from 'react-native';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { Form, Item, Input, Label, Text, Button } from 'native-base';
import * as variables from '../style/variables';
import { validatePassword, validateUsername } from "../util/validation";

class SignInForm extends React.Component {

    state = {
        username: '',
        password: '',
        errorMessage: null,
        isValidUsername: true,
        isValidPassword: true
    };

    onPasswordChange = ({ nativeEvent }) => {
        this.setState({
            password: nativeEvent.text
        })
    };

    onUsernameChange = ({ nativeEvent }) => {
        this.setState({
            username: nativeEvent.text
        })
    };

    onSubmit = e => {
        const { username, password } = this.state;
        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);
        this.setState({
            errorMessage: usernameError || passwordError,
            isValidUsername: !usernameError,
            isValidPassword: !passwordError
        });
        if (usernameError || passwordError) {
            return;
        }
        this.props.auth({
            username,
            password
        })
    };

    componentDidUpdate() {
        if (this.props.isAuthorized) {
            this.props.onLogin();
        }
    }

    componentWillUnmount() {
        if (!this.props.isAuthorized) {
            this.props.clearUserData();
        }
    }

    render() {
        return (
            <Form style={style.form}>
                <Item fixedLabel
                      error={!this.state.isValidUsername}>
                    <Label>Username</Label>
                    <Input
                        value={this.state.username}
                        onChange={this.onUsernameChange}
                    />
                </Item>
                <Item fixedLabel
                      error={!this.state.isValidPassword}>
                    <Label>Password</Label>
                    <Input
                        value={this.state.password}
                        onChange={this.onPasswordChange}
                        secureTextEntry={true}
                    />
                </Item>
                <Button
                    block
                    primary
                    style={style.submit}
                    onPress={this.onSubmit}
                    disabled={this.props.isAwaitingResponse}
                >
                    <Text>Submit</Text>
                </Button>
                <Text style={style.errorMessage}>{this.state.errorMessage || this.props.errorMessage}</Text>
            </Form>
        )
    }
}

const style = StyleSheet.create({
    form: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '90%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 50
    },
    submit: {
        marginTop: 30
    },
    errorMessage: {
        marginTop: 10,
        color: variables.dangerTextColor
    }
});

const mapStateToProps = state => state.user;

export default connect(
    mapStateToProps,
    actionCreators,
)(SignInForm);
