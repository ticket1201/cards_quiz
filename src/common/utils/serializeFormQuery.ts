export const serializeFormQuery = (searchParam: URLSearchParams, authId?: string) => {
    let temp = {}
    searchParam.forEach((value: string, key: string) => {
        if (authId && key === 'user_id') {
            temp = {...temp, [key]: 'my'}
            return
        }
        temp = {...temp, [key]: value}
    })

    return temp
}