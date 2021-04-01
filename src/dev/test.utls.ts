export function mockDateNow() {
    jest.spyOn(global.Date, 'now').mockImplementationOnce(() =>
        new Date('2019-05-14T11:01:58.135Z').valueOf()
    )
}
