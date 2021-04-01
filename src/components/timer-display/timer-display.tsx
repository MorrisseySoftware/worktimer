import React, { useEffect, useState } from 'react'
import { addZeros } from '../../utilities/number.utils'
import './timer-display.scss'

export interface TimeLeft {
    minutes: number
    seconds: number
    milliseconds: number
}

export interface TimerCompletionState {
    timer: TimeLeft
    completionTime: Date
    completed: boolean
}

export interface TimerDisplayProps {
    startTimer: boolean
    completionTime: Date
    completionCallback: Function
}

export default function TimerDisplay(props: TimerDisplayProps) {
    const setTimeLeft = (completionTime: Date): TimeLeft => {
        let difference = +completionTime - +new Date()
        if (difference > 0) {
            return {
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                milliseconds: Math.floor(difference % 100),
            } as TimeLeft
        }
        return {
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
        }
    }

    const [timer, setTimer] = useState({
        minutes: 60,
        seconds: 0,
        milliseconds: 0,
    } as TimeLeft)

    const [shown, setShown] = useState(false)

    const [timerComplete, setTimerComplete] = useState(true)

    const isComplete = () =>
        !!(timer.minutes + timer.seconds + timer.milliseconds === 0)

    const stopTimer = () => isComplete() || !props.startTimer

    const invertTimer = (timer: TimeLeft) => {
        return {
            minutes: 59 - timer.minutes,
            seconds: 59 - timer.seconds,
            milliseconds: 100 - timer.milliseconds,
        } as TimeLeft
    }

    useEffect(() => {
        let counter: any = undefined
        if (!shown) {
            setShown(props.startTimer)
        }
        if (shown) {
            if (stopTimer()) {
                if (!timerComplete) {
                    props.completionCallback({
                        timer: invertTimer(timer),
                        completionTime: props.completionTime,
                        completed: isComplete(),
                    } as TimerCompletionState)
                    setTimerComplete(true)
                }
            } else {
                counter = setTimeout(() => {
                    setTimer(setTimeLeft(props.completionTime))
                }, 100)
                setTimerComplete(false)
            }
        }
        return () => {
            if (counter) {
                clearTimeout(counter)
            }
        }
    })

    const stateClassName = () => {
        if (stopTimer()) {
            return 'completed'
        }
        if (timer.minutes < 5) {
            return 'warning'
        }
        return ''
    }

    return (
        <div className={'container ' + stateClassName()}>
            {shown ? (
                <div className={'timer__container--base'}>
                    <p className={'timer__label'}>Time remaining</p>
                    <p className={'timer'}>
                        {addZeros(timer.minutes)}
                        {':'}
                        {addZeros(timer.seconds)}
                        {':'}
                        {addZeros(timer.milliseconds)}
                    </p>
                    <p className={'completion__label'}>
                        Completion Time:{' '}
                        {props.completionTime.toLocaleTimeString()}
                    </p>
                </div>
            ) : null}
        </div>
    )
}
