import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";

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

  const [stage, setStage] = useState('start'); // 'start', 'game', 'result', 'ruleExplanation'のいずれかを取る

  function resetGame() {
    setSquares(Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => [])));
    setXIsNext(true);
    setStage('start');
  }

  useEffect(() => {
    if (stage === 'game') {
      const winner = calculateWinner(squares);
      if (winner) {
        setStage('result');
      }
    }
  }, [squares, stage]);

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
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  //ステージ遷移
  if (stage === 'start') {
    return (
      <>
      <div className="startScreen">
        <h1>3D量子五目並べ</h1>
        <div className = "buttonsInStartScreen">
          <button className = "startButton" onClick={() => setStage('game')}>スタート</button>
          <button className="ruleExplanationButton" onClick={() => setStage('ruleExplanation1')}>ルール説明</button>
        </div>
      </div>
      </>
    );
  }

  if (stage === 'ruleExplanation1') {
    return (
      <>
      <div className="ruleExplanationScreen">
        <h2>ルール説明</h2>
        <p>3D量子五目並べは、5x5x5の立方体の中で行う五目並べです。</p>
        <p>プレイヤーは交互に石を積んでいき、縦、横、高さ、斜めのいずれかで自分の石を5つ並べたプレイヤーが勝利となります。</p>
        <div className = "buttonsInRuleExplanationScreen">
          <button className="backButton" onClick={() => setStage('start')}>戻る</button>
          <button className="nextButton" onClick={() => setStage('ruleExplanation2')}>次へ</button>
        </div>
      </div>
      </>
    );
  }

   if (stage === 'ruleExplanation2') {
    return (
      <>
      <div className="ruleExplanationScreen">
        <h2>ルール説明</h2>
        <p>ただし、盤面に置く石の色はまだ確定していません！</p>
        <p>プレーヤーの置く石にはそれぞれ90,70,30,10の数字が書かれています。</p>
        <p>これらの数字はその石が黒石になる確率を表しています。(10→90%の確率で白石になる、30→70%の確率で白石になる)</p>
        <p>"観測"することで確率に従って石の色が決定します。</p>
        <div className = "buttonsInRuleExplanationScreen">
          <button className="backButton" onClick={() => setStage('ruleExplanation1')}>戻る</button>
          <button className="nextButton" onClick={() => setStage('ruleExplanation3')}>次へ</button>
        </div>
      </div>
      </>
    );
  }

     if (stage === 'ruleExplanation3') {
    return (
      <>
      <div className="ruleExplanationScreen">
        <h2>ルール説明</h2>
        <p>先手から90→10→30→70→90→...の順に石を置いていきます。</p>
        <p>確率の高い石をどこに置くか、どのタイミングで観測するかが勝敗の鍵となります！</p>
        <p>頭を使いつつ、運を味方につけて勝利を目指しましょう！</p>
        <div className = "buttonsInRuleExplanationScreen">
          <button className="backButton" onClick={() => setStage('ruleExplanation2')}>戻る</button>
          <button className="nextButton" onClick={() => setStage('start')}>メニューへ</button>
        </div>
      </div>
      </>
    );
  }

  if (stage === 'game') {
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
          {/*最上段はデバッグ用にボタンを押すとステータスが表示されるようにしてます。不要になったら削除して大丈夫です。*/}
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

  if (stage === 'result') {
    return (
      <>
        <div className="resultScreen">
          <h1>{status}</h1>
          <button className="menuButton" onClick={() => resetGame()}>メニューへ</button>
        </div>
      </>
    );
  }
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


// ボードを定義
const BaseBox = () => {
  const meshRef = useRef(null);
  return (
    <group position={[0,-2.5,0]}>
      <mesh ref={meshRef}>
        <boxGeometry args={[5, 1, 5]} />
        <meshStandardMaterial color="burlywood" />
      </mesh>
      <gridHelper
        args={[4,4,"black","black"]}
        position={[0,0.501,0]}
      />
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
        Array.from({ length: 5 }, (_, j) => PutStones(i, j))
      )}
    </group>
  );
};

