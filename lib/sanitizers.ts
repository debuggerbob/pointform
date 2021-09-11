import { sanitizer } from "@/lib/helpers"

// psuedo code
// 1. Get keys of the parent object
// 2. Use the keys to get values
// 3. Check the value types (Array, Object, String, Number)
// 4. Depending on the type - Loop through the object/array and sanitize all the values
 
export const safayi = (inputObject) => {
    let sanitizedObject = {}
    let keys = Object.keys(inputObject)

    keys.forEach(key => {
        if(typeof inputObject[key] === "string" || typeof inputObject[key] === "number" || typeof inputObject[key] === "boolean") {
        	sanitizedObject[sanitizer(key)] = sanitizer(inputObject[key])
        }
        if(typeof inputObject[key] === "object") {
            let e = inputObject[key]
            sanitizedObject[sanitizer(key)] = safayi(e)
        }
        if(Array.isArray(inputObject[key])) {
            sanitizedObject[sanitizer(key)] = []
            let a = inputObject[key]
            a.forEach(e => {
                if(typeof e === "object") {
					sanitizedObject[sanitizer(key)].push(safayi(e))
                }
            })
        }
    })
    
    return sanitizedObject
}