export const convertObjectToSearchParam = (params: Object) => {
    let res = {}
    Object.entries(params).forEach(entry => {
        const [key, value] = entry;
        if (value) {
            res = {...res, [key]: value}
        }
    })

    return res //as URLSearchParams
}