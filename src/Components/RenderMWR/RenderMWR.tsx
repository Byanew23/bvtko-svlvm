import React from 'react'
import './styleMWR.css'
import { Application } from '@splinetool/runtime'

const splineLink = 'https://prod.spline.design/5M1yyxJPpuyS3au9/scene.splinecode'
export const RenderMWR = () => {
    // const canvas = document.getElementById('canvas3d')
    React.useEffect(() => {
        const canvas = document.getElementById('canvas3d')

        const spline = new Application(canvas as any)
        spline.load(splineLink)
    }, [])

    return <div>
        <canvas id='canvas3d' />
    </div>
}