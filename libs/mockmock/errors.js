export class required extends Error {
    constructor(what, where, additionalInfo) {
        super(`${what} is required in ${where}${additionalInfo}`);
    }
}

export class type extends Error {
    constructor(name, what, where, should, additionalInfo) {
        super(`${name} ${where} has wrong type '${typeof what}'. Should be ${should}.${additionalInfo}`);
    }
}

export class exist extends Error {
    constructor(name, where, additionalInfo) {
        super(`${name} ${where} is not exist.${additionalInfo}`);
    }
}
