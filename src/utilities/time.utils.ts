export interface TimeLeft {
    minutes: number
    seconds: number
    milliseconds: number
}
export const tallyMilliseconds = (timer: TimeLeft): number => {
    return timer.milliseconds + timer.seconds * 1000 + timer.minutes * 60 * 1000
}
export const printRemainingTime = (val: TimeLeft): string => {
    return `${addZeros(val.minutes)}:${addZeros(val.seconds)}:${addZeros(
        val.milliseconds
    )}`
}
export const printRemainingTimeFromMilliseconds = (val: number): string => {
    return `${addZeros(Math.floor((val / 1000 / 60) % 60))}:${addZeros(
        Math.floor((val / 1000) % 60)
    )}:${addZeros(Math.floor(val % 100))}`
}
export const printClockTime = (val: Date): string => {
    return val.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
    })
}
export const addZeros = (val: number): string => {
    if (val < 10) {
        return `0${val}`
    }
    return val.toString()
}
