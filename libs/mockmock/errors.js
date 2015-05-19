export class required extends Error {
    constructor(what, where, additionalInfo) {
        return super(`${what} is required in ${where}${additionalInfo ? additionalInfo : ''}`);
    }
}

export class type extends Error {
    constructor(name, what, where, should, additionalInfo) {
        return super(`${name} ${where} has wrong type '${typeof what}'. Should be ${should}.${additionalInfo ? additionalInfo : ''}`);
    }
}

export class exist extends Error {
    constructor(name, where, additionalInfo) {
        return super(`${name} ${where} is not exist.${additionalInfo ? additionalInfo : ''}`);
    }
}
