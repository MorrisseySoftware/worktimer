import React from 'react'
import './toggle-button.scss'

export interface ToggleButtonProps {
    off: boolean
    clickHandler: React.MouseEventHandler<HTMLButtonElement>
}

export default class ToggleButton extends React.Component<ToggleButtonProps> {
    constructor(props: ToggleButtonProps) {
        super(props)
    }

    render() {
        return (
            <button
                className={
                    !!this.props.off
                        ? 'toggle__btn button--off'
                        : 'toggle__btn button--on'
                }
                onClick={this.props.clickHandler}
            >
                {!!this.props.off ? 'START TIMER' : 'STOP TIMER'}
            </button>
        )
    }
}
