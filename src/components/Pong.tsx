/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Canvas } from '@react-three/fiber';
import Box from './Box';
import Ball from './Ball';
import Board from './Board';
import Info from './Info';
import { OrbitControls } from '@react-three/drei';

const theme = css`
  width: 100vw;
  height: 100vh;
`;

const Pong = () => {
  return (
    <div css={theme}>
    <Canvas shadows={true} camera={{position: [0, 1, 3]}}>
      <color attach="background" args={['#888']} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Box position={[-1.2, 0, 0]} />
      <Ball position={[1.2, 0, 0]} />
      <Board position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
    <Info />
    </div>
  )
}

export default Pong;