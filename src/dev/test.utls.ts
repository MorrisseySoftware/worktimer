export function mockDate_Static_Past() {
    jest.spyOn(global.Date, 'now').mockImplementation(() =>
        new Date('2019-05-14T11:01:58.135Z').valueOf()
    )
}
export function mockDate_Static_Future() {
    jest.spyOn(global.Date, 'now').mockImplementation(() =>
        new Date('2039-05-14T11:01:58.135Z').valueOf()
    )
}
export function mockDate_Add1Mins() {
    jest.spyOn(global.Date, 'now').mockImplementation(() => {
        return new Date().setMinutes(new Date().getMinutes() + 1).valueOf()
    })
}
export function mockDate_Add10Mins() {
    jest.spyOn(global.Date, 'now').mockImplementation(() => {
        return new Date().setMinutes(new Date().getMinutes() + 10).valueOf()
    })
}
