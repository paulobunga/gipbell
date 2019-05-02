import React from 'react';
import { StyleSheet } from 'react-native';
import * as actionCreators from '../../actions';
import { connect } from 'react-redux';
import { Form, Item, Input, Label, Text, Button } from 'native-base';
import * as variables from '../../style/variables';
import { validateName, validatePassword, validateUsername, validatePasswords } from "../validation";

class SignUpForm extends React.Component {

    state = {
        username: '',
        password: '',
        verifyPassword: '',
        name: '',
        errorMessage: null,
        isValidUsername: true,
        isValidPassword: true,
        isValidVerifyPassword: true,
        isValidName: true,
    };

    onPasswordChange = ({ nativeEvent }) => {
        this.setState({
            password: nativeEvent.text
        })
    };

    onVerifyPasswordChange = ({ nativeEvent }) => {
        this.setState({
            verifyPassword: nativeEvent.text
        })
    };

    onUsernameChange = ({ nativeEvent }) => {
        this.setState({
            username: nativeEvent.text
        })
    };

    onNameChange = ({ nativeEvent }) => {
        this.setState({
            name: nativeEvent.text
        })
    };

    onSubmit = e => {
        const { username, password, verifyPassword, name } = this.state;
        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);
        const verifyPasswordError = validatePasswords(password, verifyPassword);
        const nameError = validateName(name);
        this.setState({
            errorMessage: usernameError || passwordError || verifyPasswordError || nameError,
            isValidUsername: !usernameError,
            isValidPassword: !passwordError,
            isValidVerifyPassword: !verifyPasswordError,
            isValidName: !nameError
        });
        if (usernameError || passwordError || verifyPasswordError || nameError) {
            return;
        }
        this.props.createUser({
            user_name: username,
            user_password: password,
            user_display_name: name
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
                <Item fixedLabel
                      error={!this.state.isValidVerifyPassword}>
                    <Label>Verify Password</Label>
                    <Input
                        value={this.state.verifyPassword}
                        onChange={this.onVerifyPasswordChange}
                        secureTextEntry={true}
                    />
                </Item>
                <Item fixedLabel
                      error={!this.state.isValidName}>
                    <Label>Name</Label>
                    <Input
                        value={this.state.name}
                        onChange={this.onNameChange}
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
)(SignUpForm);
