import React from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
import StatsList from './stats-list'
import {
    TimeLeft,
    TimerCompletionState,
} from 'components/timer-display/timer-display'

describe('Stats List Tests', () => {
    it('should update the display list when the history prop changes', () => {
        const historyItems = [
            {
                timer: {
                    minutes: 15,
                    seconds: 27,
                    milliseconds: 75,
                } as TimeLeft,
                completionTime: new Date(2019, 1, 1, 7, 11, 0, 0),
                completed: false,
            } as TimerCompletionState,
        ]
        let component: ReactTestRenderer = {} as ReactTestRenderer
        act(() => {
            component = create(
                <StatsList history={[]} deleteCallBack={() => {}} />
            )
        })
        expect(component.toJSON()).toMatchSnapshot()
        act(() => {
            component.update(
                <StatsList history={historyItems} deleteCallBack={() => {}} />
            )
        })
        expect(component.toJSON()).toMatchSnapshot()
    })
    // it('should toggle the button state from OFF to ON', () => {
    //     let component: ReactTestRenderer = {} as ReactTestRenderer
    //     act(() => {
    //         component = create(<StatsList history={[]} />)
    //     })
    //     expect(component.toJSON()).toMatchSnapshot()
    //     act(() => {
    //         component.update(<StatsList history={[]} />)
    //     })
    //     expect(component.toJSON()).toMatchSnapshot()
    // })
    // it('should call a click handler when the toggle button is clicked', () => {
    //     const component = shallow(<StatsList history={[]} />)
    //     component.find('button').simulate('click')
    //     expect([]).toBe('called!')
    // })
})
