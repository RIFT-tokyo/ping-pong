/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import emotionReset from 'emotion-reset';
import Pong from './components/Pong';
import { Canvas } from '@react-three/fiber';

const globalStyles = css`
  ${emotionReset}
  *, *::after, *::before {
    box-sizing: border-box;
    -mos-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }
`;

function App() {
  return (
    <div className="App">
      <Global styles={globalStyles} />
      <Canvas
        shadows={true}
        camera={{ position: [0, 10, 30] }}
        style={{ width: "100vw", height: "100vh" }}
      >
        <Pong />
      </Canvas>
    </div>
  );
}

export default App;
