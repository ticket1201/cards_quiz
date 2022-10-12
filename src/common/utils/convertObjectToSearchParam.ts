export const convertObjectToSearchParam = (params: Object) => {
    let res = {};

    Object.entries(params).forEach(entry => {
        const [key, value] = entry;
        if (value) {
            // res.set(key, value)
            res = {...res, [key]: value}
        }
    })

    return res
}