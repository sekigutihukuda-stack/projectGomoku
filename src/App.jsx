import { useState } from 'react';
import './App.css';

import React, { useRef, useEffect } from 'react';
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

function Square({ onSquareClick, setColor }) {
  //XOボタンの定義
  return (
    <button
      style={{ backgroundImage: setColor }}
      className="square"
      onClick={onSquareClick}
    ></button>
  );
}

function Observer({ onObserverClick, value }) {
  //観測ボタンの定義
  return (
    <button className="observer" onClick={onObserverClick}>
      {value}
    </button>
  );
}
export default function Board() {
  const [xProbability, setXProbability] = useState(90);
  const [hasPlacedStone, setHasPlacedStone] = useState(false);
  const [tempSquares, setTempSquares] = useState(null);
  const [squares, setSquares] = useState(
    Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => [])),
  ); //三重配列の生成
  const [stage, setStage] = useState('start'); // 'start', 'game', 'result', 'ruleExplanation'のいずれかを取る

  function resetGame() {
    setSquares(
      Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => [])),
    );
    setStage('start');
  }

  function handleClick(i, j) {
    const nextSquares = squares.map((row) => {
      return row.map((cell) => {
        return [...cell];
      });
    }); //三重配列のコピー

    if (squares[i][j][4] || winner || hasPlacedStone) {
      return;
    } //おくことのできる上限に達しているか勝者が決まっていたら何もできないようにする

    setHasPlacedStone(true);

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
    } //xIsNextを順繰りになるように定義
  }

  const [winner, setWinner] = useState();
  function handleObserve(probability) {
    const randomNum = Math.random();
    if (probability / 100 > randomNum) {
      return 'X';
    } else {
      return 'O';
    }
  }
  function calculateWinner(squares) {
    if (
      //観測回数が残っている時にしか観測できないようにする
      (nextPlayer === 'O' && xObserveLimit > 0) ||
      (nextPlayer === 'X' && oObserveLimit > 0)
    ) {
      const judgeSquares = squares.map((row) => {
        return row.map((cell) => {
          return [...cell];
        });
      }); //三重配列のコピー

      for (let i = 0; i < judgeSquares.length; i++) {
        for (let j = 0; j < judgeSquares[i].length; j++) {
          for (let k = 0; k < judgeSquares[i][j].length; k++) {
            judgeSquares[i][j][k] = handleObserve(judgeSquares[i][j][k]);
          }
        }
      } //確率が入った三重配列を実際の値に変換（観測する）

      setTempSquares(squares); //tempSquaresにSquaresを退避させる

      for (let i = 0; i < index.length; i++) {
        const [c1, c2, c3, c4, c5] = index[i]; //一直線に並ぶ時の座標を取得する
        const [v1, v2, v3, v4, v5] = [
          //各座標にxがあるかどうかを取得する
          judgeSquares[c1[0]][c1[1]][c1[2]],
          judgeSquares[c2[0]][c2[1]][c2[2]],
          judgeSquares[c3[0]][c3[1]][c3[2]],
          judgeSquares[c4[0]][c4[1]][c4[2]],
          judgeSquares[c5[0]][c5[1]][c5[2]],
        ];

        if (v1 && v1 === v2 && v2 === v3 && v3 === v4 && v4 === v5) {
          setWinner(v1 === 'X' ? 'Black' : 'White');
          setStage('result');
        }
      }
      setSquares(judgeSquares); //3d画面にjudgeSquaresの内容を表示させる

      if (nextPlayer === 'X') {
        setOObserveLimit(oObserveLimit - 1);
      } else {
        setXObserveLimit(xObserveLimit - 1);
      } //観測回数を１減らす
      setHasPlacedStone(false);
    }
  }

  let [xObserveLimit, setXObserveLimit] = useState(3);
  let [oObserveLimit, setOObserveLimit] = useState(3); //観測回数を制限
  const nextPlayer = xProbability === 90 || xProbability === 70 ? 'X' : 'O';

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (nextPlayer === 'X' ? 'Black' : 'White');
  }
  const observationLeft =
    'Observation left | Player Black:' +
    xObserveLimit +
    ' | Player White:' +
    oObserveLimit;

  //ステージ遷移
  if (stage === 'start') {
    return (
      <>
        <div className="startScreen">
          <h1>3D量子五目並べ</h1>
          <div className="buttonsInStartScreen">
            <button className="startButton" onClick={() => setStage('game')}>
              スタート
            </button>
            <button
              className="ruleExplanationButton"
              onClick={() => setStage('ruleExplanation1')}
            >
              ルール説明
            </button>
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
          <p>
            プレイヤーは交互に石を積んでいき、縦、横、高さ、斜めのいずれかで自分の石を5つ並べたプレイヤーが勝利となります。
          </p>
          <div className="buttonsInRuleExplanationScreen">
            <button className="backButton" onClick={() => setStage('start')}>
              戻る
            </button>
            <button
              className="nextButton"
              onClick={() => setStage('ruleExplanation2')}
            >
              次へ
            </button>
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
          <p>
            プレーヤーの置く石にはそれぞれ90,70,30,10の数字が書かれています。
          </p>
          <p>
            これらの数字はその石が黒石になる確率を表しています。(10→90%の確率で白石になる、30→70%の確率で白石になる)
          </p>
          <p>"観測"することで確率に従って石の色が決定します。</p>
          <div className="buttonsInRuleExplanationScreen">
            <button
              className="backButton"
              onClick={() => setStage('ruleExplanation1')}
            >
              戻る
            </button>
            <button
              className="nextButton"
              onClick={() => setStage('ruleExplanation3')}
            >
              次へ
            </button>
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
          <p>
            確率の高い石をどこに置くか、どのタイミングで観測するかが勝敗の鍵となります！
          </p>
          <p>頭を使いつつ、運を味方につけて勝利を目指しましょう！</p>
          <div className="buttonsInRuleExplanationScreen">
            <button
              className="backButton"
              onClick={() => setStage('ruleExplanation2')}
            >
              戻る
            </button>
            <button className="nextButton" onClick={() => setStage('start')}>
              メニューへ
            </button>
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
          <button className="menuButton" onClick={() => resetGame()}>
            メニューへ
          </button>
        </div>
      </>
    );
  }
  return (
    <div className="main-container">
      <div className="display-3d">
        <div className="status">{status}</div>
        <div className="observationleft">{observationLeft}</div>
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
      </div>
      <div className="game-controls">
        <div className="board">
          <div className="board-row">
            <Square
              onSquareClick={() => handleClick(0, 0)}
              setColor="linear-gradient(to bottom, rgb(247, 133, 133), rgb(247, 19, 19))"
            />
            <Square
              onSquareClick={() => handleClick(0, 1)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(0, 2)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(0, 3)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(0, 4)}
              setColor="linear-gradient(to bottom, rgb(144, 247, 133), green)"
            />
          </div>
          <div className="board-row">
            <Square
              onSquareClick={() => handleClick(1, 0)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(1, 1)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(1, 2)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(1, 3)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(1, 4)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
          </div>
          <div className="board-row">
            <Square
              onSquareClick={() => handleClick(2, 0)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(2, 1)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(2, 2)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(2, 3)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(2, 4)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
          </div>
          <div className="board-row">
            <Square
              onSquareClick={() => handleClick(3, 0)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(3, 1)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(3, 2)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(3, 3)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(3, 4)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
          </div>
          <div className="board-row">
            <Square
              onSquareClick={() => handleClick(4, 0)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(4, 1)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(4, 2)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(4, 3)}
              setColor="linear-gradient(to bottom, rgb(219, 209, 196), burlywood)"
            />
            <Square
              onSquareClick={() => handleClick(4, 4)}
              setColor="linear-gradient(to bottom, lightskyblue, rgb(15, 94, 252))"
            />
          </div>
        </div>
        {tempSquares ? (
          <div className="observers">
            <div style={{ fontSize: 20, color: 'blue' }}>
              観測結果を確認中...
            </div>
            <Observer
              value="戻して次へ"
              onObserverClick={() => {
                // バックアップしておいた確率盤面に戻す
                setSquares(tempSquares);
                setTempSquares(null); // バックアップを空にする
                setHasPlacedStone(false); // 次の石を置けるようにする

                // 次のプレイヤー・確率へ進める
                setXProbability((prev) => {
                  if (prev === 90) return 10;
                  if (prev === 10) return 70;
                  if (prev === 70) return 30;
                  return 90;
                });
              }}
            />
          </div>
        ) : (
          hasPlacedStone && (
            <div className="observers">
              <div style={{ fontSize: 25, color: 'black' }}>Observe?</div>

              {/* 観測回数がある時だけ Yes ボタンを出す */}
              {((nextPlayer === 'O' && xObserveLimit > 0) ||
                (nextPlayer === 'X' && oObserveLimit > 0)) && (
                <Observer
                  value="Yes"
                  onObserverClick={() => calculateWinner(squares)}
                />
              )}

              {/* No（観測せず終了）は常に選べるようにする */}
              <Observer
                value="No"
                onObserverClick={() => setHasPlacedStone(false)}
              />
            </div>
          )
        )}
      </div>
    </div>
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

  // 座標から色を判定する関数
  const getCylinderColor = (x, z) => {
    if (x === -2 && z === -2) return 'red'; // 左手前
    if (x === 2 && z === -2) return 'yellowgreen'; // 右手前
    if (x === 2 && z === 2) return 'lightskyblue'; // 右奥
    return 'burlywood'; // それ以外（デフォルト）
  };

  return (
    <group>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <cylinderGeometry args={[0.1, 0.1, 6, 32]} />
          {/* 判定関数の結果をcolorに渡す */}
          <meshStandardMaterial
            color={getCylinderColor(pos[0], pos[2])}
            transparent={true}
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

// 石を定義
const Stone = ({ stonePosition, stoneType }) => {
  let color;

  if (typeof stoneType === 'number') {
    if (stoneType === 90) {
      color = '#4d4d4d';
    } else if (stoneType === 70) {
      color = '#808080';
    } else if (stoneType === 30) {
      color = '#b3b3b3';
    } else if (stoneType === 10) {
      color = '#e6e6e6';
    }
  } else {
    color = stoneType === 'X' ? 'black' : 'white';
  }

  return (
    <mesh position={stonePosition}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.3} // 少しツヤを出すと質感が良くなります
        metalness={0.2}
      />
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
