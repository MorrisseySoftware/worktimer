import React, { useEffect, useState } from 'react'
import {
    hasTimeLeft,
    printClockTime,
    printRemainingTime,
    TimeLeft,
    timeLeftFromDate,
} from '../../utilities/time.utils'
import './timer-display.scss'

export enum TimerDisplayState {
    DEFAULT = 0,
    START,
    STOP,
    COMPLETE,
}

export interface TimeState {
    origin: TimeLeft
    timeleft: TimeLeft
    completionTime: Date
}

export interface TimerProcessState {
    displayed: boolean
    running: boolean
    timer: TimeState
    complete: boolean
}

export interface TimerDisplayProps {
    run: boolean
    completionTime: Date
    timerCallback: Function
    completeCallback: Function
}

export default function TimerDisplay(props: TimerDisplayProps) {
    const [timerState, setTimerState] = useState({
        displayed: false,
        running: false,
        complete: false,
        timer: {
            origin: timeLeftFromDate(props.completionTime),
            timeleft: timeLeftFromDate(props.completionTime),
            completionTime: props.completionTime,
        } as TimeState,
    } as TimerProcessState)
    let displayState = TimerDisplayState.DEFAULT

    const _checkRunPropValue = (
        _timerState: TimerProcessState
    ): TimerProcessState => {
        _timerState = {
            ..._timerState,
            displayed: props.run || _timerState.displayed,
        }
        if (props.run !== _timerState.running) {
            _timerState = {
                ..._timerState,
                running: props.run,
            }
            if (props.run) {
                displayState = TimerDisplayState.START
            } else if (timerState.displayed) {
                displayState = TimerDisplayState.STOP
            }
        }
        return _timerState
    }

    const _checkCompletion = (
        _timerState: TimerProcessState
    ): TimerProcessState => {
        if (_timerState.running && _timerState.complete) {
            _timerState = {
                ..._timerState,
                running: false,
            }
            displayState = TimerDisplayState.COMPLETE
        }
        return _timerState
    }

    const _buildTimerCompleteValue = (): TimeState => {
        return {
            origin: {} as TimeLeft,
            timeleft: {
                minutes:
                    timerState.timer.origin.minutes -
                    timerState.timer.timeleft.minutes,
                seconds:
                    timerState.timer.origin.seconds -
                    timerState.timer.timeleft.seconds,
                milliseconds:
                    timerState.timer.origin.milliseconds -
                    timerState.timer.timeleft.milliseconds,
            } as TimeLeft,
            completionTime: new Date(Date.now()),
        }
    }

    const _stopInterval = (interval: NodeJS.Timer) => {
        if (interval) {
            clearInterval(interval)
        }
    }

    useEffect(() => {
        let _counter: any
        let _timerState = {
            ...timerState,
        }
        _timerState = _checkRunPropValue(_timerState)
        _timerState = _checkCompletion(_timerState)
        switch (displayState) {
            case TimerDisplayState.START:
                _timerState = {
                    ..._timerState,
                    timer: {
                        completionTime: props.completionTime,
                        origin: timeLeftFromDate(props.completionTime),
                        timeleft: timeLeftFromDate(props.completionTime),
                    } as TimeState,
                }
                _counter = setInterval(() => {
                    const _newTimeLeft = timeLeftFromDate(
                        _timerState.timer.completionTime
                    )
                    const _noTimeLeft = !hasTimeLeft(_newTimeLeft)
                    setTimerState({
                        ..._timerState,
                        timer: {
                            ..._timerState.timer,
                            timeleft: _newTimeLeft,
                        },
                        complete: _noTimeLeft,
                    })
                }, 50)
                displayState = TimerDisplayState.DEFAULT
                break
            case TimerDisplayState.STOP:
                props.timerCallback(_buildTimerCompleteValue())
                _stopInterval(_counter)
                displayState = TimerDisplayState.DEFAULT
                break
            case TimerDisplayState.COMPLETE:
                props.completeCallback(_buildTimerCompleteValue())
                _stopInterval(_counter)
                displayState = TimerDisplayState.DEFAULT
                break
            default:
                break
        }
        setTimerState(_timerState)
        return () => {
            _stopInterval(_counter)
        }
    }, [props.run, timerState.complete])

    const _stateClassName = () => {
        if (timerState.complete || !props.run) {
            return 'completed'
        }
        if (timerState.timer.timeleft.minutes < 5) {
            return 'warning'
        }
        return ''
    }

    return (
        <div className={'container ' + _stateClassName()}>
            {timerState.displayed ? (
                <div className={'timer__container--base'}>
                    <p className={'timer__label'}>Time remaining</p>
                    <p className={'timer'}>
                        {printRemainingTime(timerState.timer.timeleft)}
                    </p>
                    <p className={'completion__label'}>
                        Completion Time:{' '}
                        {printClockTime(timerState.timer.completionTime)}
                    </p>
                </div>
            ) : null}
        </div>
    )
}
