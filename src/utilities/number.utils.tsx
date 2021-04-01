export const addZeros = (val: number): string => {
    if (val < 10) {
        return `0${val}`
    }
    return val.toString()
}
