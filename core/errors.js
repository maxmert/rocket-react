class required extends Error {
    constructor(what, where) {
        super(`<${what}> is required in ${where}`);
    }
}
