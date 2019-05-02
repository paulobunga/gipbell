const MIN_PASS_LENGTH = 6;
const MAX_PASS_LENGTH = 40;
const MIN_USERNAME_LENGTH = 2;
const MAX_USERNAME_LENGTH = 40;
const MAX_NAME_LENGTH = 40;

const EMPTY_USERNAME = 'Enter username';
const EMPTY_PASSWORD = 'Enter password';
const SHORT_PASSWORD = `Password must be longer than ${MIN_PASS_LENGTH} symbols`;
const LONG_PASSWORD = `Password must be shorter than ${MAX_PASS_LENGTH} symbols`;
const SHORT_USERNAME = `Username must be longer than ${MIN_USERNAME_LENGTH} symbols`;
const LONG_USERNAME = `Username must be shorter than ${MAX_USERNAME_LENGTH} symbols`;
const EMPTY_NAME = 'Enter name';
const LONG_NAME = `Name must be shorter than ${MAX_NAME_LENGTH} symbols`;
const PASSWORDS_ARE_NOT_THE_SAME = 'Passwords are not the same';

export const validateUsername = username => {
    if (username === '') {
        return EMPTY_USERNAME;
    }
    if (username.length < MIN_USERNAME_LENGTH) {
        return SHORT_USERNAME;
    }
    if (username.length > MAX_USERNAME_LENGTH) {
        return LONG_USERNAME;
    }
    return null;
};

export const validatePassword = password => {
    if (password === '') {
        return EMPTY_PASSWORD;
    }
    if (password.length < MIN_PASS_LENGTH) {
        return SHORT_PASSWORD;
    }
    if (password.length > MAX_PASS_LENGTH) {
        return LONG_PASSWORD;
    }
    return null;
};

export const validateName = name => {
    if (name === '') {
        return EMPTY_NAME;
    }
    if (name > MAX_NAME_LENGTH) {
        return LONG_NAME;
    }
    return null;
};

export const validatePasswords = (password1, password2) => {
    if (password1 !== password2) {
        return PASSWORDS_ARE_NOT_THE_SAME;
    }
    return null;
};
