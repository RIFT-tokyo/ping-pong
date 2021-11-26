import Paddle from './Paddle';
import Ball from './Ball';
import Board from './Board';
import { OrbitControls } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

type position = [x: number, y: number, z: number];

const Pong = () => {
  const controls = useControls();

  const [paddlePosition, setPaddlePosition] = useState<position>([0, 0, 20]);
  const [ballPosition, setBallPosition] = useState<position>([0, 0, 0]);
  const [ballVelocity, setBallVelocity] = useState<position>([0.2, 0, 0.1]);

  useFrame(() => {
    const { forward, backward, left, right, reset } = controls.current;
    if (left) {
      setPaddlePosition(prev => [prev[0] - 0.3, prev[1], prev[2]]);
    }
    if (right) {
      setPaddlePosition(prev => [prev[0] + 0.3, prev[1], prev[2]]);
    }
    if (ballPosition[0] > 10 && ballVelocity[0] > 0) {
      setBallVelocity(prev => [prev[0] * -1, prev[1], prev[2]]);
    } else if (ballPosition[0] < -10 && ballVelocity[0] < 0) {
      setBallVelocity(prev => [prev[0] * -1, prev[1], prev[2]]);
    } else if (ballVelocity[2] > 0 && 19 <= ballPosition[2] && ballPosition[2] <= 21 && paddlePosition[0] - 1.5 <= ballPosition[0] && ballPosition[0] <= paddlePosition[0] + 1.5/* 手前のpaddleにぶつかったとき */) {
      setBallVelocity(prev => [prev[0], prev[1], prev[2] * -1]);
    } else if (ballVelocity[2] < 0 && -19 >= ballPosition[2] && ballPosition[2] >= -21 && paddlePosition[0] -1.5 <= ballPosition[0] && ballPosition[0] <= paddlePosition[0] + 1.5/* 後ろのpaddleにぶつかったとき */) {
      setBallVelocity(prev => [prev[0], prev[1], prev[2] * -1]);
    }

    setBallPosition(prev => [prev[0] + ballVelocity[0], prev[1] + ballVelocity[1], prev[2] + ballVelocity[2]]);
  })

  return (
    <>
      <color attach="background" args={['#888']} />
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, -10, -10]} />
      <Paddle position={paddlePosition} />
      <Paddle position={[paddlePosition[0], paddlePosition[1], paddlePosition[2] * -1]} />
      <Ball position={ballPosition} />
      <Board position={[0, -0.5, 0]} />
      <OrbitControls />
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
    forward: false,
    backward: false,
    left: false,
    right: false,
    reset: false,
  })
  useKeyPress(['ArrowUp', 'w'], (pressed) => (keys.current.forward = pressed))
  useKeyPress(['ArrowDown', 's'], (pressed) => (keys.current.backward = pressed))
  useKeyPress(['ArrowLeft', 'a'], (pressed) => (keys.current.left = pressed))
  useKeyPress(['ArrowRight', 'd'], (pressed) => (keys.current.right = pressed))
  useKeyPress(['r'], (pressed) => (keys.current.reset = pressed))
  return keys
}