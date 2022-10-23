const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export default function removeNullProperties(obj) {

    let newObj = {}
    for (const [key, value] of Object.entries(obj)) {
        if (value !== null) {
            newObj[camelToSnakeCase(key)] = value;
        }
    }
    return newObj;
}