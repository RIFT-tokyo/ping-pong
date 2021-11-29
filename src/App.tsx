/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import emotionReset from 'emotion-reset';
import Pong from './components/Pong';
import { Canvas } from '@react-three/fiber';
import Info from './components/Info';
import { useRef } from 'react';

const globalStyles = css`
  ${emotionReset}
  *, *::after, *::before {
    box-sizing: border-box;
    -mos-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }
`;

const theme = css`
  width: 100vw;
  height: 100vh;
`;

function App() {
  const points = useRef([0, 0]);

  const incrementPoint = (player: number) => {
      points.current[player] += 1;
      console.log(points.current);
  }

  return (
    <div className="App">
      <Global styles={globalStyles} />

      <div css={theme}>
        <Canvas shadows={true} camera={{position: [0, 10, 30]}}>
          <Pong incrementHandler={incrementPoint}/>
        </Canvas>
        <Info points={points.current}/>
      </div>
    </div>
  );
}

export default App;
