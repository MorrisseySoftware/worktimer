import { TimerCompletionState } from 'components/timer-display/timer-display'
import React from 'react'
import { addZeros } from '../../utilities/number.utils'
import './stat-item.scss'

export interface StatItemProps {
    entry: TimerCompletionState
    deleteHandler: Function
}

export default class StatItem extends React.Component<StatItemProps> {
    constructor(props: StatItemProps) {
        super(props)
        this.displayClock = this.displayClock.bind(this)
        this.displayLapsed = this.displayLapsed.bind(this)
        this.deleteItem = this.deleteItem.bind(this)
    }

    displayClock(): string {
        if (this.props?.entry?.completionTime) {
            return this.props.entry.completionTime.toLocaleTimeString('en-US', {
                hour12: true,
                hour: '2-digit',
                minute: '2-digit',
            })
        } else {
            return 'No Clock Time'
        }
    }

    displayLapsed(): string {
        if (this.props?.entry?.timer) {
            return `${addZeros(this.props.entry.timer.minutes)}:${addZeros(
                this.props.entry.timer.seconds
            )}:${addZeros(this.props.entry.timer.milliseconds)}`
        }
        return 'No Lapsed Time'
    }

    displayStat(): string {
        return `${this.displayClock()} - ${this.displayLapsed()}`
    }

    deleteItem() {
        this.props.deleteHandler(this.props.entry)
    }

    render() {
        return (
            <p className="stat__container">
                <span className="stat__label">{this.displayStat()}</span>
                <button className="delete__btn" onClick={this.deleteItem}>
                    Delete
                </button>
            </p>
        )
    }
}
