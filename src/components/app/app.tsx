import './App.scss'
import React from 'react'
import ToggleButton from '../toggle-button/toggle-button'
import TimerDisplay, {
    TimerCompletionState,
} from '../timer-display/timer-display'
import WarningSound from '../warning/warning'
import StatsList from '../stats-list/stats-list'

export interface AppProps {}

export interface AppState {
    startTimer: boolean
    completionTime: Date
    soundWarning: boolean
    timerHistory: Array<TimerCompletionState>
}

export default class App extends React.Component<AppProps, AppState> {
    constructor(props: any) {
        super(props)
        this.state = {
            startTimer: false,
            completionTime: new Date(Date.now()),
            soundWarning: false,
            timerHistory: [],
        }

        this.timerSet = this.timerSet.bind(this)
        this.completeTimer = this.completeTimer.bind(this)
    }

    timerSet() {
        let dt = new Date(Date.now())
        dt.setHours(dt.getHours() + 1)
        this.setState({
            ...this.state,
            startTimer: !this.state.startTimer,
            completionTime: !this.state.startTimer
                ? dt
                : this.state.completionTime,
        })
    }

    completeTimer(item: TimerCompletionState) {
        this.setState({
            ...this.state,
            timerHistory: [...this.state.timerHistory, item],
            soundWarning: this.state.soundWarning,
        })
    }

    render() {
        return (
            <div className={'container'}>
                <ToggleButton
                    off={!this.state.startTimer}
                    clickHandler={this.timerSet}
                />
                <TimerDisplay
                    startTimer={this.state.startTimer}
                    completionTime={this.state.completionTime}
                    completionCallback={this.completeTimer}
                />
                <StatsList history={this.state.timerHistory} />
                <WarningSound play={this.state.soundWarning} />
            </div>
        )
    }
}
