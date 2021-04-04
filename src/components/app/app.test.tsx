import React from 'react'
import { create } from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from './app'
import {
    mockDate_Static_Future,
    mockDate_Static_Past,
} from '../../dev/test.utls'
import { TimeLeft } from 'utilities/time.utils'
import { TimeState } from 'components/timer-display/timer-display'

describe('App Tests', () => {
    beforeAll(() => {
        jest.spyOn(global.Storage.prototype, 'getItem').mockImplementation(
            (key: string) => {
                return ''
            }
        )
    })
    afterAll(() => {
        ;(global.Storage.prototype.getItem as any).mockReset()
    })
    beforeEach(() => {
        mockDate_Static_Past()
    })
    describe('Default State Tests', () => {
        it('should display valid html', () => {
            let component = create(<App />)
            expect(component.toJSON()).toMatchSnapshot()
        })
        it('should show the toggle button in the OFF state.', () => {
            const component = mount(<App />)
            const btn = component.find('button')
            expect(btn.text().trim()).toBe('START TIMER')
        })
        it('should not show the timer display.', () => {
            const component = mount(<App />)
            const div = component.find('.timer__container--base')
            expect(div.length).toBe(0)
        })
        it('should show an empty stats list.', () => {
            const component = mount(<App />)
            const div = component.find('.history__list')
            expect(div.text().trim()).toBe('NO TIMERS')
        })
    })
    describe('Press Toggle Button', () => {
        it('should show the toggle button in the ON state.', () => {
            let component = mount(<App />)
            const btn = component.find('button')
            btn.simulate('click')
            expect(btn.text().trim()).toBe('STOP TIMER')
        })
        it('should show the timer display.', () => {
            let component = mount(<App />)
            const btn = component.find('button')
            btn.simulate('click')
            const div = component.find('.timer__container--base')
            expect(div.length).toBe(1)
        })
    })
    describe('Press Toggle Button twice', () => {
        it('should show the toggle button in the ON state.', () => {
            let component = mount(<App />)
            const btn = component.find('button')
            btn.simulate('click')
            btn.simulate('click')
            expect(btn.text().trim()).toBe('START TIMER')
        })
        it('should show the timer display.', () => {
            let component = mount(<App />)
            const btn = component.find('button')
            btn.simulate('click')
            btn.simulate('click')
            const div = component.find('.timer__container--base')
            expect(div.length).toBe(1)
        })
    })
    describe('Remove a History Item', () => {
        it('should remove an item when the delete button is pressed', () => {
            let component = mount(<App />)
            const btn = component.find('button')
            btn.simulate('click')
            btn.simulate('click')
            let div = component.find('.history__list')
            expect(div.text().trim()).not.toBe('NO TIMERS')
            const del_btn = component.find('.delete__btn')
            del_btn.simulate('click')
            div = component.find('.history__list')
            expect(div.text().trim()).toBe('NO TIMERS')
        })
    })
    describe('Existing History Tests', () => {
        beforeAll(() => {
            jest.spyOn(global.Storage.prototype, 'getItem').mockImplementation(
                (key: string) => {
                    return JSON.stringify([
                        {
                            timeleft: {
                                minutes: 15,
                                seconds: 27,
                                milliseconds: 75,
                            } as TimeLeft,
                            completionTime: new Date(2019, 1, 1, 7, 11, 0, 0),
                        } as TimeState,
                    ])
                }
            )
        })
        afterAll(() => {
            ;(global.Storage.prototype.getItem as any).mockReset()
        })
        it('should show existing stats in the stats list.', () => {
            let component = mount(<App />)
            const div = component.find('.history__list')
            expect(div.text().trim()).not.toBe('NO TIMERS')
        })
        it('should update localstorage with new stats', () => {
            const setLocalStorage = jest
                .spyOn(global.Storage.prototype, 'setItem')
                .mockImplementation((key: string, value: string) => {
                    return
                })
            let component = mount(<App />)
            const btn = component.find('button.toggle__btn')
            btn.simulate('click')
            btn.simulate('click')
            expect(setLocalStorage).toHaveBeenCalledTimes(1)
            setLocalStorage.mockReset()
        })
        it('should delete stat from localstorage', () => {
            const setLocalStorage = jest
                .spyOn(global.Storage.prototype, 'setItem')
                .mockImplementation((key: string, value: string) => {
                    return
                })
            let component = mount(<App />)
            const del_btn = component.find('.delete__btn')
            del_btn.simulate('click')
            expect(setLocalStorage).toHaveBeenCalledTimes(1)
            setLocalStorage.mockReset()
        })
    })
})
