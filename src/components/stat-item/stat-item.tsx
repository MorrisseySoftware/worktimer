import { TimeState } from 'components/timer-display/timer-display'
import React from 'react'
import { printClockTime, printRemainingTime } from '../../utilities/time.utils'
import './stat-item.scss'

export interface StatItemProps {
    entry: TimeState
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
            return printClockTime(this.props.entry.completionTime)
        } else {
            return 'No Clock Time'
        }
    }

    displayLapsed(): string {
        if (this.props?.entry?.timeleft) {
            return printRemainingTime(this.props.entry.timeleft)
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
