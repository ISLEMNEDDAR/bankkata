const fromObjToArray = (obj)=>{
    const array = []
    for(const key in obj ){
        if(obj.hasOwnProperty(key)) {
            array.push(obj[key])
        }
    }
    return array
}

export const generalUtil = {
    fromObjToArray
}
