import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
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

    if (squares[i][j][4] || calculateWinner(squares)) {
      return;
    }

    if (xIsNext) {
      nextSquares[i][j].push('X');
    } else {
      nextSquares[i][j].push('O');
    }
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board">
        <div className="board-row">
          {' '}
          //最上段はデバッグ用にボタンを押すとステータスが表示されるようにしてます。不要になったら削除して大丈夫です。
          <Square
            value={squares[0][0].join('')}
            onSquareClick={() => handleClick(0, 0)}
          />
          <Square
            value={squares[0][1].join('')}
            onSquareClick={() => handleClick(0, 1)}
          />
          <Square
            value={squares[0][2].join('')}
            onSquareClick={() => handleClick(0, 2)}
          />
          <Square
            value={squares[0][3].join('')}
            onSquareClick={() => handleClick(0, 3)}
          />
          <Square
            value={squares[0][4].join('')}
            onSquareClick={() => handleClick(0, 4)}
          />
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

//勝利パターンの数え上げ
const index = [];
for (let z = 0; z < 5; z++) {
  //縦(x軸方向)に揃った時のインデックスを代入
  for (let y = 0; y < 5; y++) {
    index.push([
      [0, y, z],
      [1, y, z],
      [2, y, z],
      [3, y, z],
      [4, y, z],
    ]);
  }
}
for (let z = 0; z < 5; z++) {
  //横(y軸方向)に揃った時のインデックスを代入
  for (let x = 0; x < 5; x++) {
    index.push([
      [x, 0, z],
      [x, 1, z],
      [x, 2, z],
      [x, 3, z],
      [x, 4, z],
    ]);
  }
}
for (let x = 0; x < 5; x++) {
  //高さ（z軸方向）に揃った時のインデックスを代入
  for (let y = 0; y < 5; y++) {
    index.push([
      [x, y, 0],
      [x, y, 1],
      [x, y, 2],
      [x, y, 3],
      [x, y, 4],
    ]);
  }
}
for (let z = 0; z < 5; z++) {
  //xy平面で斜めに揃った時のインデックスを代入
  index.push([
    [0, 0, z],
    [1, 1, z],
    [2, 2, z],
    [3, 3, z],
    [4, 4, z],
  ]);
  index.push([
    [4, 0, z],
    [3, 1, z],
    [2, 2, z],
    [1, 3, z],
    [0, 4, z],
  ]);
}
for (let x = 0; x < 5; x++) {
  //yz平面で斜めに揃った時のインデックスを代入
  index.push([
    [x, 0, 0],
    [x, 1, 1],
    [x, 2, 2],
    [x, 3, 3],
    [x, 4, 4],
  ]);
  index.push([
    [x, 0, 4],
    [x, 1, 3],
    [x, 2, 2],
    [x, 3, 1],
    [x, 4, 0],
  ]);
}
for (let y = 0; y < 5; y++) {
  //zx平面で斜めに揃った時のインデックスを代入
  index.push([
    [0, y, 0],
    [1, y, 1],
    [2, y, 2],
    [3, y, 3],
    [4, y, 4],
  ]);
  index.push([
    [0, y, 4],
    [1, y, 3],
    [2, y, 2],
    [3, y, 1],
    [4, y, 0],
  ]);
}
index.push([
  //xyz空間全体で斜めに揃った時のインデックスを再入
  [0, 0, 0],
  [1, 1, 1],
  [2, 2, 2],
  [3, 3, 3],
  [4, 4, 4],
]);
index.push([
  [0, 4, 0],
  [1, 3, 1],
  [2, 2, 2],
  [3, 1, 3],
  [4, 0, 4],
]);
index.push([
  [4, 4, 0],
  [3, 3, 1],
  [2, 2, 2],
  [1, 1, 3],
  [0, 0, 4],
]);
index.push([
  [4, 0, 0],
  [3, 1, 1],
  [2, 2, 2],
  [1, 3, 3],
  [0, 4, 4],
]);

function calculateWinner(squares) {
  for (let i = 0; i < index.length; i++) {
    const [c1, c2, c3, c4, c5] = index[i];
    const [v1, v2, v3, v4, v5] = [
      squares[c1[0]][c1[1]][c1[2]],
      squares[c2[0]][c2[1]][c2[2]],
      squares[c3[0]][c3[1]][c3[2]],
      squares[c4[0]][c4[1]][c4[2]],
      squares[c5[0]][c5[1]][c5[2]],
    ];

    if (v1 && v1 === v2 && v2 === v3 && v3 === v4 && v4 === v5) {
      return v1;
    }
  }
  return null;
}
