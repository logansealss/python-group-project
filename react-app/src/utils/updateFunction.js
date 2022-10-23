const camelToSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);

export default function removeNullProperties(obj) {

    let newObj = {}
    for (const [key, value] of Object.entries(obj)) {
        console.log("kvp:", [key, value])
        if (value !== null) {
            newObj[camelToSnakeCase(key)] = value;
        }
    }
    console.log("return obj", newObj)
    return newObj;
}