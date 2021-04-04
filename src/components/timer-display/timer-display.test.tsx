import React from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
import TimerDisplay, { TimeState } from './timer-display'
import toJson from 'enzyme-to-json'
import {
    mockDate_Add10Mins,
    mockDate_Add1Mins,
    mockDate_Static_Past,
} from '../../dev/test.utls'
import { printClockTime, printRemainingTime } from '../../utilities/time.utils'

describe('-Timer Display Tests-', () => {
    beforeEach(() => {
        mockDate_Static_Past()
    })
    describe('-Prop Tests-', () => {
        it('-should be hidden when run is false-', () => {
            let component = mount(
                <TimerDisplay
                    run={false}
                    completionTime={new Date(Date.now())}
                    timerCallback={() => {}}
                    completeCallback={() => {}}
                />
            )
            expect(toJson(component)).toMatchSnapshot()
        })
        it('-should be displayed when run is true-', () => {
            let component = mount(
                <TimerDisplay
                    run={true}
                    completionTime={new Date(Date.now())}
                    timerCallback={() => {}}
                    completeCallback={() => {}}
                />
            )
            expect(toJson(component)).toMatchSnapshot()
        })
        it('-should not be hidden after its been displayed-', () => {
            let component = mount(
                <TimerDisplay
                    run={true}
                    completionTime={new Date(Date.now())}
                    timerCallback={() => {}}
                    completeCallback={() => {}}
                />
            )
            component.setProps({ run: false })
            expect(toJson(component)).toMatchSnapshot()
        })
        it('-should trigger timerCallback when run value changes from true to false-', () => {
            mockDate_Add10Mins()
            let result = 'failed'
            const callbk = (val: TimeState) => {
                result = printRemainingTime(val.timeleft)
            }
            const component = mount(
                <TimerDisplay
                    run={true}
                    completionTime={new Date(Date.now())}
                    timerCallback={callbk}
                    completeCallback={() => {}}
                />
            )
            component.setProps({ run: false })
            expect(result).toBe('00:00:00')
        })
        it('-should not trigger timerCallback when run value changes from false to true-', () => {
            mockDate_Add1Mins()
            let result = 'passed'
            const callbk = (val: TimeState) => {
                result = printRemainingTime(val.timeleft)
            }
            const component = mount(
                <TimerDisplay
                    run={false}
                    completionTime={new Date(Date.now())}
                    timerCallback={callbk}
                    completeCallback={() => {}}
                />
            )
            component.setProps({ run: true })
            expect(result).toBe('passed')
        })
        it('-should trigger completeCallback when completionTime has passed-', () => {
            let result = 'failed'
            const callbk = (val: TimeState) => {
                result = printRemainingTime(val.timeleft)
            }
            const component = mount(
                <TimerDisplay
                    run={true}
                    completionTime={new Date(Date.now())}
                    timerCallback={() => {}}
                    completeCallback={callbk}
                />
            )
            expect(result).toBe('00:00:00')
        })
    })
    describe('Timer Styling Tests', () => {
        it('should be render the display green when the timer is greater than 5 mins', () => {
            mockDate_Add10Mins()
            const component = mount(
                <TimerDisplay
                    run={true}
                    completionTime={new Date(Date.now())}
                    timerCallback={() => {}}
                    completeCallback={() => {}}
                />
            )
            const container = component.find('.container')
            expect(container).toBeDefined()
            expect(container.hasClass('completed')).toBeFalsy()
            expect(container.hasClass('warning')).toBeFalsy()
        })
        it('should be render the display yellow when 0 < timer < 5 mins', () => {
            mockDate_Add1Mins()
            const component = mount(
                <TimerDisplay
                    run={true}
                    completionTime={new Date(Date.now())}
                    timerCallback={() => {}}
                    completeCallback={() => {}}
                />
            )
            const container = component.find('.container')
            expect(container).toBeDefined()
            expect(container.hasClass('completed')).toBeFalsy()
            expect(container.hasClass('warning')).toBeTruthy()
        })
        it('should be render the display red when timer = 0 mins', () => {
            mockDate_Static_Past()
            const component = mount(
                <TimerDisplay
                    run={true}
                    completionTime={new Date(Date.now())}
                    timerCallback={() => {}}
                    completeCallback={() => {}}
                />
            )
            const container = component.find('.container')
            expect(container).toBeDefined()
            expect(container.hasClass('completed')).toBeTruthy()
            expect(container.hasClass('warning')).toBeFalsy()
        })
        it('should be render the display red when timer stopped', () => {
            mockDate_Add10Mins()
            const component = mount(
                <TimerDisplay
                    run={true}
                    completionTime={new Date(Date.now())}
                    timerCallback={() => {}}
                    completeCallback={() => {}}
                />
            )
            component.setProps({ run: false })
            const container = component.find('.container')
            expect(container).toBeDefined()
            expect(container.hasClass('completed')).toBeTruthy()
            expect(container.hasClass('warning')).toBeFalsy()
        })
    })
})
