import Paddle from './Paddle';
import Ball from './Ball';
import Board from './Board';
import { Environment, Sphere } from '@react-three/drei';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree, ThreeEvent } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import { position } from '../type/position';
import Wall from './Wall';
import Info from './Info';
import PointLight from './PointLight';
import { Socket, io } from 'socket.io-client';
import Text2D from './Text2D';

const Pong = () => {
  const controls = useControls();

  const [userPaddlePosition, setUserPaddlePosition] = useState<position>([0, 0.5, 19.5]);
  const [enemyPaddlePosition, setEnemyPaddlePosition] = useState<position>([0, 0.5, -19.5]);
  const [points, setPoints] = useState<number[]>([0, 0]);
  const ballPosition = useRef<position>([0, 0.5, 0]);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  const [roomID, setRoomID] = useState<string>("testroom");
  const playerID = useRef<number>(0);
  const socket = useRef<Socket>();

  const text = useRef("connect");

  const serverBallPosition = useRef<position>([0, 0.5, 0]);

  const state = useThree();

  const connectSocket = (e: ThreeEvent<MouseEvent>) => {
    socket.current?.emit('client-to-server-request-room-id')
    text.current = "connecting ...";
  }

  useEffect(() => {
    socket.current?.emit('client-to-server-room-id-ready',  {
      roomID: roomID, player: playerID.current
    })
  }, [roomID]);

  
  useEffect(() => {
    state.camera.position.set(userPaddlePosition[0] * 0.3, 10, 30);
  }, [state.camera.position, userPaddlePosition]);
  
  useEffect(() => {
    console.log('socket connected');
//    socket.current = io('http://c1r31s9.42tokyo.jp:4000/pong');
    socket.current = io('http://localhost:4000/pong');

    socket.current.on('server-to-client-points', (data: { points: number[] }) => {
      setPoints(data.points);
    })

    socket.current.on('server-to-client-room-id', (data: { roomID: string, playerID: number }) => {
      console.log('room id: ', data.roomID);
      setRoomID(data.roomID)
      playerID.current = data.playerID;
    });
    // 2. recieve paddle postion from websocket
    socket.current.on('server-to-client-player-position', (data: { player: number, paddlePosition: [number, number, number] }) => {
//      console.log(data);
      if (data.player !== playerID.current) {
        setEnemyPaddlePosition([-data.paddlePosition[0], data.paddlePosition[1], -data.paddlePosition[2]]);
      }
    });
    socket.current.on('server-to-client-ball-position', (data: { player: number, ballPosition: [number, number, number] }) => {
      // console.log(playerID, ":", data);
      if (data.player === playerID.current) {
        serverBallPosition.current = [data.ballPosition[0], serverBallPosition.current[1], data.ballPosition[2]];
      } else {
        serverBallPosition.current = [-data.ballPosition[0], serverBallPosition.current[1], -data.ballPosition[2]];
      }
      // console.log(serverBallPosition.current);
    });

    socket.current.on('server-to-client-game-start', () => {
      console.log("komatsunana")
      text.current = "start";
      setGameStarted(true);
    });
  // eslint-disable-next-line
  }, [])


  useFrame(() => {
    // 1. recieve ball position from websocket (player1)

    // 3. set ball position and velocity from websocket

    // 4. set own position from keyboard
    const { /*forward, backward,*/ left, right, /*reset*/ } = controls.current;
    if (left && userPaddlePosition[0] > -((20 - 3) / 2 - 0.25)) {
      setUserPaddlePosition(prev => [prev[0] - 0.3, prev[1], prev[2]]);
    }
    if (right && userPaddlePosition[0] < ((20 - 3) / 2) - 0.25) {
      setUserPaddlePosition(prev => [prev[0] + 0.3, prev[1], prev[2]]);
    }

    /*
    // 5. set enemy position from websocket
    let newEnemyX = ballPosition.current[0];
    if (Math.abs(newEnemyX) - ((20 - 3) / 2) > Number.EPSILON) {
      newEnemyX = enemyPaddlePosition[0];
    }
    setEnemyPaddlePosition(prev => [newEnemyX, prev[1], prev[2]]);
    */

    // 6. get ball position and velocity from react-three-cannon
    if (playerID.current === 1) {
      if (ballPosition.current[2] <= -40/2) {
        setPoints(prev => [prev[0] + 1, prev[1]]);
      }
      if (ballPosition.current[2] > 40/2) {
        setPoints(prev => [prev[0], prev[1] + 1]);
      }
      socket.current?.emit('client-to-server-points', {
        points: points
      });
    } 

    // 7. emit ball position
    // 8. emit paddle position
    if (roomID !== "testroom") {
      if (playerID.current === 1) {
        socket.current?.emit('client-to-server-ball-position', {
          roomID: roomID, player: playerID.current, ballPosition: ballPosition.current
        } /*ボールの位置を送る(userPaddlePosition)*/);
      }
      socket.current?.emit('client-to-server-player-position', {
        roomID: roomID, player: playerID.current, paddlePosition: userPaddlePosition
      } /*自分のいちを送る(userPaddlePosition)*/);
    }
  })

  return (
    <>
      <Sphere args={[0.5, 16, 16]} position={serverBallPosition.current} >
        <meshNormalMaterial />
      </Sphere>

      <Text2D position={[0,12,0]} text={text.current} onClick={connectSocket} />
      <color attach="background" args={['#888']} />
      <ambientLight intensity={0.5} />
      <PointLight position={[6, 15, -7]} />
      {/*<PointLight position={[7, 10, 7]} />*/}
      {/*<PointLight position={[-6, 10, -7]} />*/}
      <PointLight position={[-7, 15, 7]} />
      <Physics defaultContactMaterial={{restitution: 1.04}} gravity={[0, 0, 0]}>
        <Wall position={[10, 0.5, 0]} />
        <Wall position={[-10, 0.5, 0]} />
        <Paddle position={userPaddlePosition}/>
        <Paddle position={enemyPaddlePosition} />
        <Ball position={ballPosition} started={gameStarted}/>
        <Board position={[0, 0, 0]}/>
      </Physics>
      {/*<TextObject text="Hello" />*/}
      <Info points={points} />
      <Environment preset="sunset" background />
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


/*

  velocity * 1.1
  velocity * 1.09
  velocity * 1.08
  ....
  velocity * 1.01
  velocity * 1.0
  velocity * 1.0
  velocity * 1.0
  velocity * 1.0
  velocity * 1.0
  velocity * 1.0

*/
