// VALIDATE NAME
// to avoid empty or names that break list
// allows a-z, 0-9 and _, name size must be 2-16 symbols

const isNameValid = (name) => {
        const pattern = /^\w{2,16}$/;
    return pattern.test(name);
};