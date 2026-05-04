import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function Square({onSquareClick}) {
  return <button className = "square" onClick = {onSquareClick}></button>  
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
          <Square onSquareClick={() => handleClick(0)}/>
          <Square onSquareClick={() => handleClick(1)}/>
          <Square onSquareClick={() => handleClick(2)}/>
          <Square onSquareClick={() => handleClick(3)}/>
          <Square onSquareClick={() => handleClick(4)}/>
        </div>
        <div className = "board-row">
          <Square onSquareClick={() => handleClick(5)}/>
          <Square onSquareClick={() => handleClick(6)}/>
          <Square onSquareClick={() => handleClick(7)}/>
          <Square onSquareClick={() => handleClick(8)}/>
          <Square onSquareClick={() => handleClick(9)}/>
        </div>
        <div className = "board-row">
          <Square onSquareClick={() => handleClick(10)}/>
          <Square onSquareClick={() => handleClick(11)}/>
          <Square onSquareClick={() => handleClick(12)}/>
          <Square onSquareClick={() => handleClick(13)}/>
          <Square onSquareClick={() => handleClick(14)}/>
        </div>
        <div className = "board-row">
          <Square onSquareClick={() => handleClick(15)}/>
          <Square onSquareClick={() => handleClick(16)}/>
          <Square onSquareClick={() => handleClick(17)}/>
          <Square onSquareClick={() => handleClick(18)}/>
          <Square onSquareClick={() => handleClick(19)}/>
        </div>
        <div className = "board-row">
          <Square onSquareClick={() => handleClick(20)}/>
          <Square onSquareClick={() => handleClick(21)}/>
          <Square onSquareClick={() => handleClick(22)}/>
          <Square onSquareClick={() => handleClick(23)}/>
          <Square onSquareClick={() => handleClick(24)}/>
        </div>
      </div>
    </>
  )
}
