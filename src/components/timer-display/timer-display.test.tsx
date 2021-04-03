import React from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
import TimerDisplay from './timer-display'
import toJson from 'enzyme-to-json'

describe('Timer Display Tests', () => {
    describe('Prop Tests', () => {
        it('should be hidden when run is false', () => {
            let component = mount(
                <TimerDisplay
                    run={false}
                    timerCallback={() => {}}
                    completedCallback={() => {}}
                />
            )
            expect(toJson(component)).toMatchSnapshot()
        })
        it('should be displayed when run is true', () => {
            let component = mount(
                <TimerDisplay
                    run={true}
                    timerCallback={() => {}}
                    completedCallback={() => {}}
                />
            )
            expect(toJson(component)).toMatchSnapshot()
        })
    })
    // describe('Timer Styling Tests', () => {
    //     it('should be render the display green when the timer is greater than 5 mins', () => {
    //         const component = shallow(
    //             <TimerDisplay
    //                 run={true}
    //                 timerCallback={() => {}}
    //                 completedCallback={() => {}}
    //             />
    //         )
    //         component.find('button')
    //         expect(component.find('button')).toBeDefined()
    //     })
    //     it('should be render the display yellow when 0 < timer < 5 mins', () => {
    //         const component = shallow(
    //             <TimerDisplay
    //                 run={true}
    //                 timerCallback={() => {}}
    //                 completedCallback={() => {}}
    //             />
    //         )
    //         component.find('button')
    //         expect(component.find('button')).toBeDefined()
    //     })
    //     it('should be render the display red when timer = 0 mins', () => {
    //         const component = shallow(
    //             <TimerDisplay
    //                 run={true}
    //                 timerCallback={() => {}}
    //                 completedCallback={() => {}}
    //             />
    //         )
    //         component.find('button')
    //         expect(component.find('button')).toBeDefined()
    //     })
    // })
})
