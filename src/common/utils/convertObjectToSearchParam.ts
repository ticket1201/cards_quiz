export const convertObjectToSearchParam = (params: Object): URLSearchParams => {
    let res = new URLSearchParams();

    Object.entries(params).forEach(entry => {
        const [key, value] = entry;
        if (value) {
            res.set(key, value)
        }
    })

    return res
}