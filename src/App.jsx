import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

function Square({ onSquareClick }) {
  return <button className="square" onClick={onSquareClick}></button>;
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => [])),
  );

  function handleClick(i, j) {
    const nextSquares = squares.map((row) => {
      return row.map((cell) => {
        return [...cell];
      });
    });

    if (xIsNext) {
      nextSquares[i][j].push('X');
    } else {
      nextSquares[i][j].push('O');
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <>
      <div className="board">
        <div className="board-row">
          <Square onSquareClick={() => handleClick(0, 0)} />
          <Square onSquareClick={() => handleClick(0, 1)} />
          <Square onSquareClick={() => handleClick(0, 2)} />
          <Square onSquareClick={() => handleClick(0, 3)} />
          <Square onSquareClick={() => handleClick(0, 4)} />
        </div>
        <div className="board-row">
          <Square onSquareClick={() => handleClick(1, 0)} />
          <Square onSquareClick={() => handleClick(1, 1)} />
          <Square onSquareClick={() => handleClick(1, 2)} />
          <Square onSquareClick={() => handleClick(1, 3)} />
          <Square onSquareClick={() => handleClick(1, 4)} />
        </div>
        <div className="board-row">
          <Square onSquareClick={() => handleClick(2, 0)} />
          <Square onSquareClick={() => handleClick(2, 1)} />
          <Square onSquareClick={() => handleClick(2, 2)} />
          <Square onSquareClick={() => handleClick(2, 3)} />
          <Square onSquareClick={() => handleClick(2, 4)} />
        </div>
        <div className="board-row">
          <Square onSquareClick={() => handleClick(3, 0)} />
          <Square onSquareClick={() => handleClick(3, 1)} />
          <Square onSquareClick={() => handleClick(3, 2)} />
          <Square onSquareClick={() => handleClick(3, 3)} />
          <Square onSquareClick={() => handleClick(3, 4)} />
        </div>
        <div className="board-row">
          <Square onSquareClick={() => handleClick(4, 0)} />
          <Square onSquareClick={() => handleClick(4, 1)} />
          <Square onSquareClick={() => handleClick(4, 2)} />
          <Square onSquareClick={() => handleClick(4, 3)} />
          <Square onSquareClick={() => handleClick(4, 4)} />
        </div>
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const index = [
    [
      [0, 0, 0],
      [0, 1, 0],
      [0, 2, 0],
      [0, 3, 0],
      [0, 4, 0],
    ], //z=0で横が揃った時
    [
      [1, 0, 0],
      [1, 1, 0],
      [1, 2, 0],
      [1, 3, 0],
      [1, 4, 0],
    ],
    [
      [2, 0, 0],
      [2, 1, 0],
      [2, 2, 0],
      [2, 3, 0],
      [2, 4, 0],
    ],
    [
      [3, 0, 0],
      [3, 1, 0],
      [3, 2, 0],
      [3, 3, 0],
      [3, 4, 0],
    ],
    [
      [4, 0, 0],
      [4, 1, 0],
      [4, 2, 0],
      [4, 3, 0],
      [4, 4, 0],
    ],
    [
      [0, 0, 1],
      [0, 1, 1],
      [0, 2, 1],
      [0, 3, 1],
      [0, 4, 1],
    ], //z=１で横が揃った時
    [
      [1, 0, 1],
      [1, 1, 1],
      [1, 2, 1],
      [1, 3, 1],
      [1, 4, 1],
    ],
    [
      [2, 0, 1],
      [2, 1, 1],
      [2, 2, 1],
      [2, 3, 1],
      [2, 4, 1],
    ],
    [
      [3, 0, 1],
      [3, 1, 1],
      [3, 2, 1],
      [3, 3, 1],
      [3, 4, 1],
    ],
    [
      [4, 0, 1],
      [4, 1, 1],
      [4, 2, 1],
      [4, 3, 1],
      [4, 4, 1],
    ],
    [
      [0, 0, 2],
      [0, 1, 2],
      [0, 2, 2],
      [0, 3, 2],
      [0, 4, 2],
    ], //z=2で横が揃った時
    [
      [1, 0, 2],
      [1, 1, 2],
      [1, 2, 2],
      [1, 3, 2],
      [1, 4, 2],
    ],
    [
      [2, 0, 2],
      [2, 1, 2],
      [2, 2, 2],
      [2, 3, 2],
      [2, 4, 2],
    ],
    [
      [3, 0, 2],
      [3, 1, 2],
      [3, 2, 2],
      [3, 3, 2],
      [3, 4, 2],
    ],
    [
      [4, 0, 2],
      [4, 1, 2],
      [4, 2, 2],
      [4, 3, 2],
      [4, 4, 2],
    ],
    [
      [0, 0, 3],
      [0, 1, 3],
      [0, 2, 3],
      [0, 3, 3],
      [0, 4, 3],
    ], //z=3で横が揃った時
    [
      [1, 0, 3],
      [1, 1, 3],
      [1, 2, 3],
      [1, 3, 3],
      [1, 4, 3],
    ],
    [
      [2, 0, 3],
      [2, 1, 3],
      [2, 2, 3],
      [2, 3, 3],
      [2, 4, 3],
    ],
    [
      [3, 0, 3],
      [3, 1, 3],
      [3, 2, 3],
      [3, 3, 3],
      [3, 4, 3],
    ],
    [
      [4, 0, 3],
      [4, 1, 3],
      [4, 2, 3],
      [4, 3, 3],
      [4, 4, 3],
    ],
    [
      [0, 0, 4],
      [0, 1, 4],
      [0, 2, 4],
      [0, 3, 4],
      [0, 4, 4],
    ], //z=4で横が揃った時
    [
      [1, 0, 4],
      [1, 1, 4],
      [1, 2, 4],
      [1, 3, 4],
      [1, 4, 4],
    ],
    [
      [2, 0, 4],
      [2, 1, 4],
      [2, 2, 4],
      [2, 3, 4],
      [2, 4, 4],
    ],
    [
      [3, 0, 4],
      [3, 1, 4],
      [3, 2, 4],
      [3, 3, 4],
      [3, 4, 4],
    ],
    [
      [4, 0, 4],
      [4, 1, 4],
      [4, 2, 4],
      [4, 3, 4],
      [4, 4, 4],
    ],
    [
      [0, 0, 0],
      [1, 0, 0],
      [2, 0, 0],
      [3, 0, 0],
      [4, 0, 0],
    ], //z=0で縦が揃った時
    [
      [0, 1, 0],
      [1, 1, 0],
      [2, 1, 0],
      [3, 1, 0],
      [4, 1, 0],
    ],
    [
      [0, 2, 0],
      [1, 2, 0],
      [2, 2, 0],
      [3, 2, 0],
      [4, 2, 0],
    ],
    [
      [0, 3, 0],
      [1, 3, 0],
      [2, 3, 0],
      [3, 3, 0],
      [4, 3, 0],
    ],
    [
      [0, 4, 0],
      [1, 4, 0],
      [2, 4, 0],
      [3, 4, 0],
      [4, 4, 0],
    ],
    [
      [0, 0, 1],
      [1, 0, 1],
      [2, 0, 1],
      [3, 0, 1],
      [4, 0, 1],
    ], //z=1で縦が揃った時
    [
      [0, 1, 1],
      [1, 1, 1],
      [2, 1, 1],
      [3, 1, 1],
      [4, 1, 1],
    ],
    [
      [0, 2, 1],
      [1, 2, 1],
      [2, 2, 1],
      [3, 2, 1],
      [4, 2, 1],
    ],
    [
      [0, 3, 1],
      [1, 3, 1],
      [2, 3, 1],
      [3, 3, 1],
      [4, 3, 1],
    ],
    [
      [0, 4, 1],
      [1, 4, 1],
      [2, 4, 1],
      [3, 4, 1],
      [4, 4, 1],
    ],
    [
      [0, 0, 2],
      [1, 0, 2],
      [2, 0, 2],
      [3, 0, 2],
      [4, 0, 2],
    ], //z=2で縦が揃った時
    [
      [0, 1, 2],
      [1, 1, 2],
      [2, 1, 2],
      [3, 1, 2],
      [4, 1, 2],
    ],
    [
      [0, 2, 2],
      [1, 2, 2],
      [2, 2, 2],
      [3, 2, 2],
      [4, 2, 2],
    ],
    [
      [0, 3, 2],
      [1, 3, 2],
      [2, 3, 2],
      [3, 3, 2],
      [4, 3, 2],
    ],
    [
      [0, 4, 2],
      [1, 4, 2],
      [2, 4, 2],
      [3, 4, 2],
      [4, 4, 2],
    ],
    [
      [0, 0, 3],
      [1, 0, 3],
      [2, 0, 3],
      [3, 0, 3],
      [4, 0, 4],
    ], //z=3で縦が揃った時
    [
      [0, 1, 3],
      [1, 1, 3],
      [2, 1, 3],
      [3, 1, 3],
      [4, 1, 4],
    ],
    [
      [0, 2, 3],
      [1, 2, 3],
      [2, 2, 3],
      [3, 2, 3],
      [4, 2, 4],
    ],
    [
      [0, 3, 3],
      [1, 3, 3],
      [2, 3, 3],
      [3, 3, 3],
      [4, 3, 4],
    ],
    [
      [0, 4, 3],
      [1, 4, 3],
      [2, 4, 3],
      [3, 4, 3],
      [4, 4, 4],
    ],
    [
      [0, 0, 4],
      [1, 0, 4],
      [2, 0, 4],
      [3, 0, 4],
      [4, 0, 4],
    ], //z=4で縦が揃った時
    [
      [0, 1, 4],
      [1, 1, 4],
      [2, 1, 4],
      [3, 1, 4],
      [4, 1, 4],
    ],
    [
      [0, 2, 4],
      [1, 2, 4],
      [2, 2, 4],
      [3, 2, 4],
      [4, 2, 4],
    ],
    [
      [0, 3, 4],
      [1, 3, 4],
      [2, 3, 4],
      [3, 3, 4],
      [4, 3, 4],
    ],
    [
      [0, 4, 4],
      [1, 4, 4],
      [2, 4, 4],
      [3, 4, 4],
      [4, 4, 4],
    ],
    [
      [0, 0, 0],
      [1, 1, 1],
      [2, 2, 2],
      [3, 3, 3],
      [4, 4, 4],
    ], //斜めが揃った時
    [
      [0, 4, 0],
      [1, 3, 1],
      [2, 2, 2],
      [3, 1, 3],
      [4, 0, 4],
    ],
    [
      [4, 4, 0],
      [3, 3, 1],
      [2, 2, 2],
      [1, 1, 3],
      [0, 0, 4],
    ],
    [
      [4, 0, 0],
      [3, 1, 1],
      [2, 2, 2],
      [1, 3, 3],
      [0, 4, 4],
    ],
  ];

  for (let i = 0; i < index.length; i++) {
    const [a1, b1, c1] = index[i][0];
    const [a2, b2, c2] = index[i][1];
    const [a3, b3, c3] = index[i][2];
    const [a4, b4, c4] = index[i][3];
    const [a5, b5, c5] = index[i][4];

    if (
      squares[(a1, b1, c1)] &&
      squares[(a1, b1, c1)] === squares[(a2, b2, c2)] &&
      squares[(a2, b2, c2)] === squares[(a3, b3, c3)] &&
      squares[(a3, b3, c3)] === squares[(a4, b4, c4)] &&
      squares[(a4, b4, c4)] === squares[(a5, b5, c5)]
    ) {
      return squares[(a1, b1, c1)];
    }
  }
  return null;
}
