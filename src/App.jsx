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
  const [squares,setSquares] = useState(Array.from({ length:5 }, ()=>Array.from({ length:5}, ()=>[])));

  function handleClick(i,j) {
    const nextSquares = squares.map((row) => {
      return row.map((cell) => {
        return [...cell];}
      );}
    );

    if (xIsNext) {
      nextSquares[i][j].push("X");
    } else {
      nextSquares[i][j].push("O");
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return(
    <>
      <div className = "board">
        <div className = "board-row">
          <Square onSquareClick={() => handleClick(0,0)}/>
          <Square onSquareClick={() => handleClick(0,1)}/>
          <Square onSquareClick={() => handleClick(0,2)}/>
          <Square onSquareClick={() => handleClick(0,3)}/>
          <Square onSquareClick={() => handleClick(0,4)}/>
        </div>
        <div className = "board-row">
          <Square onSquareClick={() => handleClick(1,0)}/>
          <Square onSquareClick={() => handleClick(1,1)}/>
          <Square onSquareClick={() => handleClick(1,2)}/>
          <Square onSquareClick={() => handleClick(1,3)}/>
          <Square onSquareClick={() => handleClick(1,4)}/>
        </div>
        <div className = "board-row">
          <Square onSquareClick={() => handleClick(2,0)}/>
          <Square onSquareClick={() => handleClick(2,1)}/>
          <Square onSquareClick={() => handleClick(2,2)}/>
          <Square onSquareClick={() => handleClick(2,3)}/>
          <Square onSquareClick={() => handleClick(2,4)}/>
        </div>
        <div className = "board-row">
          <Square onSquareClick={() => handleClick(3,0)}/>
          <Square onSquareClick={() => handleClick(3,1)}/>
          <Square onSquareClick={() => handleClick(3,2)}/>
          <Square onSquareClick={() => handleClick(3,3)}/>
          <Square onSquareClick={() => handleClick(3,4)}/>
        </div>
        <div className = "board-row">
          <Square onSquareClick={() => handleClick(4,0)}/>
          <Square onSquareClick={() => handleClick(4,1)}/>
          <Square onSquareClick={() => handleClick(4,2)}/>
          <Square onSquareClick={() => handleClick(4,3)}/>
          <Square onSquareClick={() => handleClick(4,4)}/>
        </div>
      </div>
    </>
  )
}
