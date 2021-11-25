/** @jsxImportSource @emotion/react */
import { css, Global } from '@emotion/react';
import emotionReset from 'emotion-reset';
import Pong from './components/Pong';

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
      <Pong />
    </div>
  );
}

export default App;
