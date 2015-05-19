export function strings(...params) {
    let result = true;
    params.forEach(param => result = typeof param === 'string' && result);
    return result;
}
