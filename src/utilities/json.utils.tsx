export const dateReviver = (key: string, value: string) => {
    const dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/
    if (typeof value === 'string' && dateFormat.test(value)) {
        return new Date(value)
    }
    return value
}
