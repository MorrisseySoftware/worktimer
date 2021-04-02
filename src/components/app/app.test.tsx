import React from 'react'
import { create } from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import App from './app'
import { mockDateNow } from '../../dev/test.utls'

describe('App Tests', () => {
    beforeEach(() => {
        mockDateNow()
    })
    describe('Default State Tests', () => {
        it('should display valid html', () => {
            jest.spyOn(global.Date, 'now').mockImplementationOnce(() =>
                new Date('2019-05-14T11:01:58.135Z').valueOf()
            )
            let component = create(<App />)
            expect(component.toJSON()).toMatchSnapshot()
        })
        it('should show the toggle button in the OFF state.', () => {
            // const component = mount(<App />)
            // const btn = component.find('button')
            // expect(btn.text().trim()).toBe('START TIMER')
        })
        it('should not show the timer display.', () => {
            // const component = mount(<App />)
            // const div = component.find('.timer__container--base')
            // expect(div.length).toBe(0)
        })
        it('should show an empty stats list.', () => {
            // const component = mount(<App />)
            // const div = component.find('.history__list')
            // expect(div.text().trim()).toBe('NO TIMERS')
        })
    })
    describe('Existing History Default State', () => {
        it('should show existing stats in the stats list.', () => {})
    })
    describe('Press Toggle Button', () => {
        it('should display valid html', () => {
            // jest.spyOn(global.Date, 'now').mockImplementationOnce(() =>
            //     new Date('2019-05-14T11:01:58.135Z').valueOf()
            // )
            // let component = mount(<App />)
            // const btn = component.find('button')
            // btn.simulate('click')
            // expect(toJson(component)).toMatchSnapshot()
        })
        it('should show the toggle button in the ON state.', () => {
            // let component = mount(<App />)
            // const btn = component.find('button')
            // btn.simulate('click')
            // expect(btn.text().trim()).toBe('STOP TIMER')
        })
        it('should not show the timer display.', () => {
            // let component = mount(<App />)
            // const btn = component.find('button')
            // btn.simulate('click')
            // const div = component.find('.timer__container--base')
            // expect(div.length).toBe(1)
        })
    })
    describe('Press Toggle Button twice', () => {
        it('should display valid html', () => {
            // jest.spyOn(global.Date, 'now').mockImplementationOnce(() =>
            //     new Date('2019-05-14T11:01:58.135Z').valueOf()
            // )
            // let component = mount(<App />)
            // const btn = component.find('button')
            // btn.simulate('click')
            // btn.simulate('click')
            // expect(toJson(component)).toMatchSnapshot()
        })
        it('should show the toggle button in the ON state.', () => {
            // let component = mount(<App />)
            // const btn = component.find('button')
            // btn.simulate('click')
            // btn.simulate('click')
            // expect(btn.text().trim()).toBe('START TIMER')
        })
        it('should not show the timer display.', () => {
            // let component = mount(<App />)
            // const btn = component.find('button')
            // btn.simulate('click')
            // btn.simulate('click')
            // const div = component.find('.timer__container--base')
            // expect(div.length).toBe(1)
        })
        it('should not show the timer display.', () => {
            // let component = mount(<App />)
            // const btn = component.find('button')
            // btn.simulate('click')
            // btn.simulate('click')
            // const div = component.find('.history__list')
            // expect(div.text().trim()).toBe('<test />')
        })
    })
    describe('Remove a History Item', () => {
        it('should remove an item when the delete button is pressed', () => {})
    })
})
