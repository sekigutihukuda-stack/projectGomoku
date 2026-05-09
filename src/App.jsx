import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Grid, OrbitControls } from '@react-three/drei';

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

function Square({ onSquareClick }) {
  //XOボタンの定義
  return <button className="square" onClick={onSquareClick}></button>;
}

export default function Board() {
  const [xProbability, setXProbability] = useState(90);
  const [squares, setSquares] = useState(
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => [])),
  ); //三重配列の生成

  function handleClick(i, j) {
    const nextSquares = squares.map((row) => {
      return row.map((cell) => {
        return [...cell];
      });
    }); //三重配列のコピー

    if (squares[i][j][4] || winner) {
      return;
    } //おくことのできる上限に達しているか勝者が決まっていたら何もできないようにする

    if (xProbability === 90) {
      nextSquares[i][j].push(xProbability);
      setSquares(nextSquares);
      setXProbability(10);
    } else if (xProbability === 10) {
      nextSquares[i][j].push(xProbability);
      setSquares(nextSquares);
      setXProbability(70);
    } else if (xProbability === 70) {
      nextSquares[i][j].push(xProbability);
      setSquares(nextSquares);
      setXProbability(30);
    } else if (xProbability === 30) {
      nextSquares[i][j].push(xProbability);
      setSquares(nextSquares);
      setXProbability(90);
    }
  } //xIsNextを順繰りになるように定義

  const [winner, setWinner] = useState();
  function handleObserve(probability) {
    const randomNum = Math.random();
    if (probability / 10 > randomNum) {
      return 'X';
    } else {
      return 'O';
    }
  }
  function calculateWinner(squares) {
    const judgeSquares = squares.map((row) => {
      return row.map((cell) => {
        return [...cell];
      });
    }); //三重配列のコピー

    for (let i = 0; i < index.length; i++) {
      const [c1, c2, c3, c4, c5] = index[i];
      const [p1, p2, p3, p4, p5] = [
        squares[c1[0]][c1[1]][c1[2]],
        squares[c2[0]][c2[1]][c2[2]],
        squares[c3[0]][c3[1]][c3[2]],
        squares[c4[0]][c4[1]][c4[2]],
        squares[c5[0]][c5[1]][c5[2]],
      ];
      const [v1, v2, v3, v4, v5] = [
        handleObserve(p1),
        handleObserve(p2),
        handleObserve(p3),
        handleObserve(p4),
        handleObserve(p5),
      ];

      if (v1 && v1 === v2 && v2 === v3 && v3 === v4 && v4 === v5) {
        setWinner(v1);
      }
    }
  }

  const [nextPlayer, setNextplayer] = useState();
  if (xProbability === 90 || xProbability === 70) {
    setNextplayer('X');
  } else {
    setNextplayer('O');
  }

  let [status, setStatus] = useState();
  if (winner) {
    setStatus('Winner' + winner);
  } else {
    setStatus('Next player: ' + nextPlayer);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="canvasContainer">
        <Canvas camera={{ position: [10, 10, 10], fov: 70 }}>
          <axesHelper args={[5]} />
          <ambientLight intensity={1} />
          <directionalLight color="white" position={[0, 5, 0]} />

          <BaseBox />
          <Cylinders />
          <ReflectSquares squares={squares} />

          <OrbitControls />
        </Canvas>
      </div>

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

// ボードを定義
const BaseBox = () => {
  const meshRef = useRef(null);
  return (
    <group position={[0, -2.5, 0]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial color="burlywood" />
      </mesh>
      <gridHelper args={[4, 4, 'black', 'black']} position={[0, 0.501, 0]} />
    </group>
  );
};

// 柱群を定義
const Cylinders = () => {
  const positions = [];
  for (let x = -2; x <= 2; x++) {
    for (let z = -2; z <= 2; z++) {
      positions.push([x, 0, z]);
    }
  }
  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.1, 0.1, 6, 32]} />
          <meshStandardMaterial color="burlywood" />
        </mesh>
      ))}
    </group>
  );
};

// 石を定義
const Stone = ({ stonePosition, stoneType }) => {
  const color = stoneType === 'X' ? 'black' : 'white';
  return (
    <mesh position={stonePosition}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

// squaresを反映
const ReflectSquares = ({ squares }) => {
  function PutStones(i, j) {
    return squares[i][j].map((stoneType, k) => {
      const stonePosition = [j - 2, k - 1.5, i - 2];
      return (
        <Stone
          key={`${i}-${j}-${k}`}
          stonePosition={stonePosition}
          stoneType={stoneType}
        />
      );
    });
  }

  return (
    <group>
      {Array.from({ length: 5 }, (_, i) =>
        Array.from({ length: 5 }, (_, j) => PutStones(i, j)),
      )}
    </group>
  );
};
