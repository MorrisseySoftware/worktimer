import React from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
import {
    TimeLeft,
    TimerCompletionState,
} from 'components/timer-display/timer-display'
import toJson from 'enzyme-to-json'
import StatItem from './stat-item'

describe('Stat Item Tests', () => {
    describe('Valid Data Tests', () => {
        it('should display a valid stat value - HH:MM(A|PM) - MM:SS', () => {
            const statVal = {
                completionTime: new Date(2020, 2, 1, 11, 0, 0),
                timer: {
                    minutes: 2,
                    seconds: 30,
                    milliseconds: 0,
                } as TimeLeft,
                completed: false,
            } as TimerCompletionState
            const component = mount(
                <StatItem entry={statVal} deleteHandler={() => {}} />
            )
            const lbl = component.find('.stat__label')
            expect(lbl.text()).toBe('11:00 AM - 02:30:00')
            expect(toJson(component)).toMatchSnapshot()
        })
        it('should call a delete callback when delete is pressed', () => {
            let result = ''
            const deleteCallback = () => {
                result = 'delete called!'
            }
            const component = mount(
                <StatItem
                    entry={{} as TimerCompletionState}
                    deleteHandler={deleteCallback}
                />
            )
            component.find('button').simulate('click')
            expect(result).toBe('delete called!')
        })
    })
    describe('Invalid Data Tests', () => {
        it('should show "No Clock Time - MM:SS" when no completetionDate provided', () => {
            const statVal = {
                timer: {
                    minutes: 2,
                    seconds: 30,
                    milliseconds: 0,
                } as TimeLeft,
                completed: false,
            } as TimerCompletionState
            const component = mount(
                <StatItem entry={statVal} deleteHandler={() => {}} />
            )
            const lbl = component.find('.stat__label')
            expect(lbl.text()).toBe('No Clock Time - 02:30:00')
        })
        it('should show "HH:MM(A|PM) - No Lapsed Time" when no timer provided', () => {
            const statVal = {
                completionTime: new Date(2020, 2, 1, 11, 0, 0),
                completed: false,
            } as TimerCompletionState
            const component = mount(
                <StatItem entry={statVal} deleteHandler={() => {}} />
            )
            const lbl = component.find('.stat__label')
            expect(lbl.text()).toBe('11:00 AM - No Lapsed Time')
        })
    })
})
