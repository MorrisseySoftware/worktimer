import './App.scss'
import React from 'react'
import ToggleButton from '../toggle-button/toggle-button'
import TimerDisplay, { TimeState } from '../timer-display/timer-display'
import WarningSound from '../warning/warning'
import StatsList from '../stats-list/stats-list'
import { dateReviver } from '../../utilities/json.utils'

export interface AppProps {}

export interface AppState {
    startTimer: boolean
    completionTime: Date
    soundWarning: boolean
    timerHistory: Array<TimeState>
}

export default class App extends React.Component<AppProps, AppState> {
    STORAGE_KEY = 'WorkTimer'

    constructor(props: any) {
        super(props)
        const historyJson = localStorage.getItem(this.STORAGE_KEY) ?? ''
        const currentHistory = historyJson
            ? JSON.parse(historyJson, dateReviver) ?? []
            : []

        this.state = {
            startTimer: false,
            completionTime: new Date(Date.now()),
            soundWarning: false,
            timerHistory: currentHistory,
        }

        this.timerSet = this.timerSet.bind(this)
        this.completeTimer = this.completeTimer.bind(this)
        this.deleteStatItem = this.deleteStatItem.bind(this)
        this.timerBand = this.timerBand.bind(this)
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

    completeTimer(item: TimeState) {
        const newHistory = [...this.state.timerHistory, item]
        this.setState({
            ...this.state,
            timerHistory: newHistory,
            soundWarning: this.state.soundWarning,
        })
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newHistory))
    }

    deleteStatItem(item: TimeState) {
        const newHistory = [
            ...this.state.timerHistory.filter((x) => x !== item),
        ]
        this.setState({
            ...this.state,
            timerHistory: newHistory,
        })
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(newHistory))
    }

    timerBand(): Date {
        return new Date(
            new Date().setHours(new Date().getHours() + 1).valueOf()
        )
    }

    render() {
        return (
            <div className={'container'}>
                <ToggleButton
                    off={!this.state.startTimer}
                    clickHandler={this.timerSet}
                />
                <TimerDisplay
                    run={this.state.startTimer}
                    completionTime={this.timerBand()}
                    completeCallback={this.completeTimer}
                    timerCallback={this.completeTimer}
                />
                <StatsList
                    history={this.state.timerHistory}
                    deleteCallBack={this.deleteStatItem}
                />
                <WarningSound play={this.state.soundWarning} />
            </div>
        )
    }
}
