import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function Square() {
  return <button className = "square"></button>  
}

export default function Board() {
  const [xIsNext,setXIsNext] = useState(true);
  const [squares,setSquares] = useState(Array.from({ length:25 }, ()=>[]));

  function handleClick(i) {
    const nextSquares = squares.map((list) => {return [...list];});

    if (xIsNext) {
      nextSquares[i].push("X");
    } else {
      nextSquares[i].push("O");
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return(
    <>
      <div className = "board">
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
      </div>
    </>
  )
}
