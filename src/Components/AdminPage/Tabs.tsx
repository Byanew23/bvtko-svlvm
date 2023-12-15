import React from 'react'

import { Options } from './AdminPage'
export const Tabs = ({ options, changeTab }: { options: Options[], changeTab: React.Dispatch<React.SetStateAction<Options>> }) => {
    return <div className="tabs">{options.map(option => {
        return <div key={option} className="tab" onClick={() => changeTab(option)}><>{option}</></div>
    })}</div>
}