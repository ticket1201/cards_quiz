export const convertDateFromIso8601 = (date: string) => {
    const datetime = new Date(Date.parse(date));
    return datetime.toLocaleDateString() + ' ' + datetime.toLocaleTimeString()
}