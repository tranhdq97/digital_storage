export const isPasswordValid = (password) => {
    if (password.length < 8) {
        return false;
    }

    if (!/\d/.test(password)) {
        return false;
    }

    if (!/[^a-zA-Z0-9]/.test(password)) {
        return false;
    }

    return true;
}
