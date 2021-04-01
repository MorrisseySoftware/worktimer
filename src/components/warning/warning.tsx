import React, { useEffect } from 'react'

export interface WarningSoundProps {
    play: boolean
}

export default function TimerDisplay(props: WarningSoundProps) {
    useEffect(() => {
        if (props.play) {
            const ele = document.getElementsByClassName(
                'audio-element'
            )[0] as any
            ele.play()
        }
    })

    return (
        <div>
            <audio className="audio-element">
                <source src="warning.mp3"></source>
            </audio>
        </div>
    )
}
