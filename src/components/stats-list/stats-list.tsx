import StatItem from '../stat-item/stat-item'
import { TimeLeft, TimerCompletionState } from '../timer-display/timer-display'
import React from 'react'
import './stats-list.scss'
import { addZeros } from '../../utilities/number.utils'

export interface StatsListProps {
    history: Array<TimerCompletionState>
    deleteCallBack: Function
}

export default class StatsList extends React.Component<StatsListProps> {
    constructor(props: StatsListProps) {
        super(props)
        this.displayHistory = this.displayHistory.bind(this)
        this.displayTotal = this.displayTotal.bind(this)
        this.calculateTimerMilliseconds = this.calculateTimerMilliseconds.bind(
            this
        )
    }

    displayHistory(): boolean {
        return !!(this.props?.history?.length > 0)
    }

    calculateTotalSeconds(): number {
        let totalMilliseconds = 0
        this.props.history.forEach(
            (item) =>
                (totalMilliseconds += this.calculateTimerMilliseconds(
                    item.timer
                ))
        )
        return totalMilliseconds
    }

    calculateTimerMilliseconds(timer: TimeLeft): number {
        return (
            timer.milliseconds +
            timer.seconds * 1000 +
            timer.minutes * 60 * 1000
        )
    }

    displayTotal(): string {
        if (this.displayHistory()) {
            const totalMilliseconds = this.calculateTotalSeconds()
            return `${addZeros(
                Math.floor((totalMilliseconds / 1000 / 60) % 60)
            )}:${addZeros(
                Math.floor((totalMilliseconds / 1000) % 60)
            )}:${addZeros(Math.floor(totalMilliseconds % 100))}`
        } else {
            return 'None'
        }
    }

    render() {
        return (
            <div className="history__container">
                <div className="history__list">
                    {this.displayHistory() ? (
                        this.props.history.map(
                            (item: TimerCompletionState, index: number) => (
                                <StatItem
                                    key={index}
                                    entry={item}
                                    deleteHandler={this.props.deleteCallBack}
                                />
                            )
                        )
                    ) : (
                        <p className="history__item--centered">NO TIMERS</p>
                    )}
                </div>
                <div className="history__total">
                    Total Time - {this.displayTotal()}
                </div>
            </div>
        )
    }
}
