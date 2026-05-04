import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function Square() {
  return <button className = "square"></button>  
}

export default function Board() {
  return(
    <>
      <div className = "board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
      <div className = "board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
      <div className = "board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
      <div className = "board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
      <div className = "board-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
    </>
  )
}
