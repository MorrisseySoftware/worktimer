import StatItem from '../stat-item/stat-item'
import { TimeState } from '../timer-display/timer-display'
import React from 'react'
import './stats-list.scss'
import {
    printRemainingTimeFromMilliseconds,
    tallyMilliseconds,
} from '../../utilities/time.utils'

export interface StatsListProps {
    history: Array<TimeState>
    deleteCallBack: Function
}

export default class StatsList extends React.Component<StatsListProps> {
    constructor(props: StatsListProps) {
        super(props)
        this.displayHistory = this.displayHistory.bind(this)
        this.displayTotal = this.displayTotal.bind(this)
    }

    displayHistory(): boolean {
        return !!(this.props?.history?.length > 0)
    }

    calculateTotalSeconds(): number {
        let totalMilliseconds = 0
        this.props.history.forEach(
            (item) => (totalMilliseconds += tallyMilliseconds(item.timeleft))
        )
        return totalMilliseconds
    }

    displayTotal(): string {
        if (this.displayHistory()) {
            return printRemainingTimeFromMilliseconds(
                this.calculateTotalSeconds()
            )
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
                            (item: TimeState, index: number) => (
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
