export const objectClipper = (inputObject, requiredFields) => {
    if(inputObject) {
        let keys = Object.keys(inputObject)
   
        let unusedFields = []
        
        keys.forEach(key => {
            if(!requiredFields.includes(key)) {
                unusedFields.push(key)
            }
        })
    
        unusedFields.forEach(unusedField => {
          delete inputObject[unusedField]
        })
        return inputObject
    }
}

export const arrayClipper = (inputArray, requiredFields) => {
    if(inputArray) {
        let shuddhArray = []
        inputArray.forEach(element => {
            shuddhArray.push(objectClipper(element, requiredFields))
        })
    
        return shuddhArray
    }
}