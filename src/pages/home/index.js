import React,{ useEffect } from "react"

import style from "./index.module.css"

export default function Home() { 

    useEffect(() => {
        console.log('fine')
    })

    return (<div className={style.home}>
        <h1> Home </h1>
    </div>)
}