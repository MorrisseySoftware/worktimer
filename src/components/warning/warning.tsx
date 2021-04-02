import React, { useEffect } from 'react'

export interface WarningSoundProps {
    play: boolean
}

export default function TimerDisplay(props: WarningSoundProps) {
    useEffect(() => {
        if (props.play) {
            const ele = document.getElementById('audio-element') as any
            ele.play()
        }
    })

    return (
        <div>
            <audio id="audio-element">
                <source src="warning.mp3"></source>
            </audio>
        </div>
    )
}
