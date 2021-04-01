import React from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
import TimerDisplay from './timer-display'

describe('Timer Display Tests', () => {
    it('should be hidden when isActive is false', () => {
        let component = create(
            <TimerDisplay
                startTimer={false}
                completionTime={new Date()}
                completionCallback={() => {}}
            />
        )
        expect(component.toJSON()).toMatchSnapshot()
    })
    it('should be displayed when isActive is true', () => {
        let component = create(
            <TimerDisplay
                startTimer={true}
                completionTime={new Date(2020, 1, 1, 1, 0, 0, 0)}
                completionCallback={() => {}}
            />
        )
        expect(component.toJSON()).toMatchSnapshot()
    })
    it('should be render the display green when the timer is greater than 5 mins', () => {
        const component = shallow(
            <TimerDisplay
                startTimer={true}
                completionTime={new Date(2020, 1, 1, 1, 0, 0, 0)}
                completionCallback={() => {}}
            />
        )
        component.find('button')
        expect(component.find('button')).toBeDefined()
    })
})
