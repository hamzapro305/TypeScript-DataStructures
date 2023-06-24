type paramsT = number | boolean
let getAnd = (...params: paramsT[]): boolean => params.length > 1 ? params[0] && getAnd(...params.slice(1)) : !!params[0];
export function getStatus(...params: paramsT[]) {
    return ((...params: paramsT[]) => getAnd(...params))(...params)
}