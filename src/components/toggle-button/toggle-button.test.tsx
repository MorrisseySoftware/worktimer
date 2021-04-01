import React from 'react'
import { act, create, ReactTestRenderer } from 'react-test-renderer'
import { shallow, mount, render } from 'enzyme'
import ToggleButton from './toggle-button'

describe('Toggle Button Tests', () => {
    it('should toggle the button state from OFF to ON', () => {
        let component: ReactTestRenderer = {} as ReactTestRenderer
        act(() => {
            component = create(
                <ToggleButton off={true} clickHandler={() => {}}></ToggleButton>
            )
        })
        expect(component.toJSON()).toMatchSnapshot()
        act(() => {
            component.update(
                <ToggleButton
                    off={false}
                    clickHandler={() => {}}
                ></ToggleButton>
            )
        })
        expect(component.toJSON()).toMatchSnapshot()
    })

    it('should call a click handler when the toggle button is clicked', () => {
        var testState = ''
        var testHandler = () => {
            testState = 'called!'
        }
        const component = shallow(
            <ToggleButton off={true} clickHandler={testHandler}></ToggleButton>
        )
        component.find('button').simulate('click')
        expect(testState).toBe('called!')
    })
})
