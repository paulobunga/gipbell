import React from 'react';
import { StyleSheet, ScrollView, FlatList } from 'react-native';
import * as actionCreators from '../actions';
import { connect } from 'react-redux';
import { View, Button, Text, Form, Item, Label, Input, Spinner } from 'native-base';
import * as variables from "../style/variables";
import { validateName, validatePassword, validatePasswords, validateUsername } from "../util/validation";

class EditInfo extends React.Component {

    state = {
        usernameErrorMessage: null,
        nameErrorMessage: null,
        newPasswordErrorMessage: null,
        username: this.props.user_name,
        name: this.props.user_display_name,
        newPassword: '',
        isValidUsername: true,
        isValidName: true,
        isValidNewPassword: true,
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

    onNewPasswordChange = ({ nativeEvent }) => {
        this.setState({
            newPassword: nativeEvent.text
        })
    };

    changeUsername = e => {
        const { username } = this.state;
        const usernameError = validateUsername(username);
        this.setState({
            usernameErrorMessage: usernameError,
            isValidUsername: !usernameError
        });
        if (usernameError) {
            return;
        }
        this.props.changeUsername(username, this.props.user_id);
    };

    changeName = e => {
        const { name } = this.state;
        const nameError = validateName(name);
        this.setState({
            nameErrorMessage: nameError,
            isValidUsername: !nameError
        });
        if (nameError) {
            return;
        }
        this.props.changeName(name, this.props.user_id);
    };

    changePassword = e => {
        const { newPassword } = this.state;
        const newPasswordError = validatePassword(newPassword);
        this.setState({
            newPasswordErrorMessage: newPasswordError,
            isValidNewPassword: !newPasswordError
        });
        if (newPasswordError) {
            return;
        }
        this.props.changePassword(newPassword, this.props.user_id);
    };


    render() {
        return (
            <ScrollView style={style.container}>
                <Form style={style.form}>
                    <View style={style.formBlock}>
                        <Item fixedLabel error={!this.state.isValidUsername}>
                            <Label>Username</Label>
                            <Input
                                value={this.state.username}
                                onChange={this.onUsernameChange}
                            />
                        </Item>
                        {this.props.usernameChange.isAwaitingResponse ?
                            <Spinner />
                             : <Button
                                block
                                primary
                                style={style.submit}
                                onPress={this.changeUsername}
                            >
                                <Text>Change username</Text>
                            </Button>}

                        <Text style={style.errorMessage}>
                            {this.state.usernameErrorMessage || this.props.usernameChange.errorMessage}
                        </Text>
                    </View>

                    <View style={style.formBlock}>
                        <Item fixedLabel error={!this.state.isValidName}>
                            <Label>Name</Label>
                            <Input
                                value={this.state.name}
                                onChange={this.onNameChange}
                            />
                        </Item>
                        {this.props.nameChange.isAwaitingResponse ?
                            <Spinner />
                            :  <Button
                                block
                                primary
                                style={style.submit}
                                onPress={this.changeName}
                            >
                                <Text>Change name</Text>
                            </Button>}
                        <Text style={style.errorMessage}>
                            {this.state.nameErrorMessage || this.props.nameChange.errorMessage}
                        </Text>
                    </View>

                    <View style={style.formBlock}>
                        <Item fixedLabel error={!this.state.isValidNewPassword}>
                            <Label>New password</Label>
                            <Input
                                value={this.state.newPassword}
                                onChange={this.onNewPasswordChange}
                                secureTextEntry={true}
                            />
                        </Item>
                        {this.props.passwordChange.isAwaitingResponse ?
                            <Spinner />
                            :  <Button
                                block
                                primary
                                style={style.submit}
                                onPress={this.changePassword}
                            >
                                <Text>Change password</Text>
                            </Button>}
                        <Text style={style.errorMessage}>
                            {this.state.newPasswordErrorMessage || this.props.passwordChange.errorMessage}
                        </Text>
                    </View>
                </Form>
            </ScrollView>
        );
    }
}

const style = StyleSheet.create({
    container: {
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '90%',
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 50,
        marginTop: 100,
    },
    submit: {
        marginTop: 30
    },
    errorMessage: {
        marginTop: 10,
        color: variables.dangerTextColor,
        textAlign: 'center'
    },
    formBlock: {
        marginBottom: 20,
        width: '100%'
    }
});

const mapStateToProps = state => state.user;

export default connect(
    mapStateToProps,
    actionCreators,
)(EditInfo);
