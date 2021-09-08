export const objectClipper = (inputObject, requiredFields) => {
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

export const arrayClipper = (inputArray, requiredFields) => {
    let shuddhArray = []
    inputArray.forEach(element => {
        shuddhArray.push(objectClipper(element, requiredFields))
    })

    return shuddhArray
}