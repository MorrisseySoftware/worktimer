import React from 'react'
import { mount } from 'enzyme'
import StatsList from './stats-list'
import { TimeState } from 'components/timer-display/timer-display'
import { TimeLeft } from 'utilities/time.utils'
import toJson from 'enzyme-to-json'

describe('Stats List Tests', () => {
    it('should display "NO TIMERS" when the history prop is empty', () => {
        const component = mount(
            <StatsList history={[]} deleteCallBack={() => {}} />
        )
        const lbl = component.find('.history__item--centered')
        expect(lbl.text()).toBe('NO TIMERS')
    })
    it('should display "Total Time - None" when the history prop is empty', () => {
        const component = mount(
            <StatsList history={[]} deleteCallBack={() => {}} />
        )
        const lbl = component.find('.history__total')
        expect(lbl.text()).toBe('Total Time - None')
    })
    it('should display the Total Time when the history prop is not empty', () => {
        const historyItems = [
            {
                timeleft: {
                    minutes: 15,
                    seconds: 27,
                    milliseconds: 75,
                } as TimeLeft,
                completionTime: new Date(2019, 1, 1, 7, 11, 0, 0),
            } as TimeState,
        ]
        const component = mount(
            <StatsList history={historyItems} deleteCallBack={() => {}} />
        )
        const lbl = component.find('.history__total')
        expect(lbl.text()).toBe('Total Time - 15:27:75')
    })
    it('should update the display list when the history prop changes', () => {
        const historyItems = [
            {
                timeleft: {
                    minutes: 15,
                    seconds: 27,
                    milliseconds: 75,
                } as TimeLeft,
                completionTime: new Date(2019, 1, 1, 7, 11, 0, 0),
            } as TimeState,
        ]
        const component = mount(
            <StatsList history={[]} deleteCallBack={() => {}} />
        )
        expect(toJson(component)).toMatchSnapshot()
        component.setProps({ history: historyItems })
        expect(toJson(component)).toMatchSnapshot()
    })
})
