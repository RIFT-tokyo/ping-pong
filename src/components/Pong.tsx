import Paddle from './Paddle';
import Ball from './Ball';
import Board from './Board';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { position } from '../type/position';
import Wall from './Wall';
import Info from './Info';

const Pong = () => {
  const controls = useControls();

  const [userPaddlePosition, setUserPaddlePosition] = useState<position>([0, 0.5, 19.5]);
  const [enemyPaddlePosition, setEnemyPaddlePosition] = useState<position>([0, 0.5, -19.5]);
  const [points, setPoints] = useState<number[]>([0, 0]);
  const ballPosition = useRef<position>([0, 0.5, 0]);

  useFrame(() => {
    const { /*forward, backward,*/ left, right, /*reset*/ } = controls.current;
    if (left && userPaddlePosition[0] > -((20 - 3) / 2 - 0.25)) {
      setUserPaddlePosition(prev => [prev[0] - 0.3, prev[1], prev[2]]);
    }
    if (right && userPaddlePosition[0] < ((20 - 3) / 2) - 0.25) {
      setUserPaddlePosition(prev => [prev[0] + 0.3, prev[1], prev[2]]);
    }

    let newEnemyX = ballPosition.current[0];
    if (Math.abs(newEnemyX) - ((20 - 3) / 2) > Number.EPSILON) {
      newEnemyX = enemyPaddlePosition[0];
    }
    setEnemyPaddlePosition(prev => [newEnemyX, prev[1], prev[2]]);

    if (ballPosition.current[2] <= -40/2) {
      setPoints(prev => [prev[0] + 1, prev[1]]);
    }
    if (ballPosition.current[2] >= 40/2) {
      setPoints(prev => [prev[0], prev[1] + 1]);
    }
  })

  return (
    <>
      <color attach="background" args={['#888']} />
      <ambientLight intensity={0.5} />
      <Physics defaultContactMaterial={{restitution: 1.06}} gravity={[0, 0, 0]}>
        <Wall position={[10, 0.5, 0]} />
        <Wall position={[-10, 0.5, 0]} />
        <Paddle position={userPaddlePosition}/>
        <Paddle position={enemyPaddlePosition} />
        <Ball position={ballPosition} />
        <Board position={[0, 0, 0]}/>
      </Physics>
      <OrbitControls />
      <Info points={points}/>
    </>
  )
}

export default Pong;

export function useKeyPress(target: string[], event: (pressed: boolean) => void) {
  useEffect(() => {
    const downHandler = ({ key }: KeyboardEvent) => target.indexOf(key) !== -1 && event(true)
    const upHandler = ({ key }: KeyboardEvent) => target.indexOf(key) !== -1 && event(false)
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])
}

export function useControls() {
  const keys = useRef({
    // forward: false,
    // backward: false,
    left: false,
    right: false,
    // reset: false,
  })
  // useKeyPress(['ArrowUp', 'w'], (pressed) => (keys.current.forward = pressed))
  // useKeyPress(['ArrowDown', 's'], (pressed) => (keys.current.backward = pressed))
  useKeyPress(['ArrowLeft', 'a'], (pressed) => (keys.current.left = pressed))
  useKeyPress(['ArrowRight', 'd'], (pressed) => (keys.current.right = pressed))
  // useKeyPress(['r'], (pressed) => (keys.current.reset = pressed))
  return keys
}
