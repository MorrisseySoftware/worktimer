import React, { useEffect, useState } from 'react'
import { TimeLeft } from 'utilities/time.utils'
import { addZeros } from '../../utilities/number.utils'
import './timer-display.scss'

export enum TimerDisplayState {
    DEFAULT = 0,
    START,
    STOP,
    // COMPLETE,
}

export interface TimeState {
    timeleft: TimeLeft
    completionTime: Date
}

export interface TimerProcessState {
    displayed: boolean
    running: boolean
    // completed: boolean
    // timer: TimeState
}

export interface TimerDisplayProps {
    run: boolean
    timerCallback: Function
    completedCallback: Function
}

export default function TimerDisplay(props: TimerDisplayProps) {
    const [timerState, setTimerState] = useState({
        displayed: false,
        running: false,
        // completed: false,
        // timer: {
        //     timeleft: {
        //         minutes: 0,
        //         seconds: 0,
        //         milliseconds: 0
        //     },
        //     completionTime: new Date(Date.now())
        // } as TimeState
    } as TimerProcessState)
    const [displayState, setDisplayState] = useState(TimerDisplayState.DEFAULT)

    // const setTimeLeft = (completionTime: Date): TimeLeft => {
    //     let difference = +completionTime - +new Date(Date.now())
    //     if (difference > 0) {
    //         return {
    //             minutes: Math.floor((difference / 1000 / 60) % 60),
    //             seconds: Math.floor((difference / 1000) % 60),
    //             milliseconds: Math.floor(difference % 100),
    //         } as TimeLeft
    //     }
    //     return {
    //         minutes: 0,
    //         seconds: 0,
    //         milliseconds: 0,
    //     }
    // }

    // const [timer, setTimer] = useState({
    //     minutes: 60,
    //     seconds: 0,
    //     milliseconds: 0,
    // } as TimeLeft)

    // const [timerComplete, setTimerComplete] = useState(true)

    // const isComplete = () =>
    //     !!(timer.minutes + timer.seconds + timer.milliseconds === 0)

    // const stopTimer = () => isComplete() || !props.startTimer

    // const invertTimer = (timer: TimeLeft) => {
    //     return {
    //         minutes: 59 - timer.minutes,
    //         seconds: 59 - timer.seconds,
    //         milliseconds: 100 - timer.milliseconds,
    //     } as TimeLeft
    // }

    const _checkRunPropValue = () => {
        if (!timerState.displayed && props.run) {
            setTimerState({
                ...timerState,
                displayed: props.run,
            })
        }
        if (props.run !== timerState.running) {
            setTimerState({
                ...timerState,
                running: props.run,
            })
            if (props.run) {
                setDisplayState(TimerDisplayState.START)
            } else if (timerState.displayed) {
                setDisplayState(TimerDisplayState.STOP)
            }
        }
    }

    useEffect(() => {
        _checkRunPropValue()
        switch (displayState) {
            case TimerDisplayState.START:
                setDisplayState(TimerDisplayState.DEFAULT)
                break
            case TimerDisplayState.STOP:
                props.timerCallback()
                setDisplayState(TimerDisplayState.DEFAULT)
                break
            default:
                break
        }
        //     let counter: any = undefined
        //     if (!shown) {
        //         setShown(props.startTimer)
        //     }
        //     if (shown) {
        //         if (stopTimer()) {
        //             if (!timerComplete) {
        //                 props.completionCallback({
        //                     timer: invertTimer(timer),
        //                     completionTime: props.completionTime,
        //                     completed: isComplete(),
        //                 } as TimerCompletionState)
        //                 setTimerComplete(true)
        //             }
        //         } else {
        //             counter = setTimeout(() => {
        //                 setTimer(setTimeLeft(props.completionTime))
        //             }, 100)
        //             setTimerComplete(false)
        //         }
        //     }
        //     return () => {
        //         if (counter) {
        //             clearTimeout(counter)
        //         }
        //     }
    })

    // const stateClassName = () => {
    //     if (timerState.completed) {
    //         return 'completed'
    //     }
    //     if (timerState.timer.timeleft.minutes < 5) {
    //         return 'warning'
    //     }
    //     return ''
    // }

    // <div className={'container ' + stateClassName()}>
    //         {timerState.displayed ? (
    //             <div className={'timer__container--base'}>
    //                 <p className={'timer__label'}>Time remaining</p>
    //                 <p className={'timer'}>
    //                     {addZeros(timer.minutes)}
    //                     {':'}
    //                     {addZeros(timer.seconds)}
    //                     {':'}
    //                     {addZeros(timer.milliseconds)}
    //                 </p>
    //                 <p className={'completion__label'}>
    //                     Completion Time:{' '}
    //                     {timerState.timer.completionTime.toLocaleTimeString()}
    //                 </p>
    //             </div>
    //         ) : null}

    return (
        <div>
            {timerState.displayed ? (
                <div className={'timer__container--base'}></div>
            ) : null}
        </div>
    )
}
