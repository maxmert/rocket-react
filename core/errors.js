export class required extends Error {
    constructor(what, where) {
        super(`${what} is required in ${where}`);
    }
}

export class type extends Error {
    constructor(name, what, where, should) {
        super(`${name} ${where} has wrong type '${typeof what}'. Should be ${should}.`);
    }
}
