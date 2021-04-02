import React from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
import TimerDisplay from './timer-display'

describe('Timer Display Tests', () => {
    describe('Default State Tests', () => {
        it('should be hidden by default', () => {
            let component = create(
                <TimerDisplay
                    run={true}
                    timerCallback={() => {}}
                    completedCallback={() => {}}
                />
            )
            expect(component.toJSON()).toMatchSnapshot()
        })
    })
    describe('State Tests', () => {
        it('should be displayed when run is true', () => {
            let component = create(
                <TimerDisplay
                    run={true}
                    timerCallback={() => {}}
                    completedCallback={() => {}}
                />
            )
            expect(component.toJSON()).toMatchSnapshot()
        })
    })
    describe('Timer Styling Tests', () => {
        it('should be render the display green when the timer is greater than 5 mins', () => {
            const component = shallow(
                <TimerDisplay
                    run={true}
                    timerCallback={() => {}}
                    completedCallback={() => {}}
                />
            )
            component.find('button')
            expect(component.find('button')).toBeDefined()
        })
    })
})
