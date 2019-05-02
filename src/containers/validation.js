const MIN_PASS_LENGTH = 6;
const MAX_PASS_LENGTH = 40;
const MIN_USERNAME_LENGTH = 2;
const MAX_USERNAME_LENGTH = 40;

const EMPTY_USERNAME = 'Enter username';
const EMPTY_PASSWORD = 'Enter password';
const SHORT_PASSWORD = `Password must be longer than ${MIN_PASS_LENGTH} symbols`;
const LONG_PASSWORD = `Password must be shorter than ${MAX_PASS_LENGTH} symbols`;
const SHORT_USERNAME = `Username must be longer than ${MIN_USERNAME_LENGTH} symbols`;
const LONG_USERNAME = `Username must be shorter than ${MAX_USERNAME_LENGTH} symbols`;

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
};
