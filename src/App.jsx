import React from 'react';
import Grid from './Grid';
function App() {
  return (
    <div className="App">
    <div className="navbar bg base 300">
  <button className="btn btn-ghost text-xl">Sudoku Solver</button>
</div>
<br />
<br />
      <Grid />
    </div>
  );
}

export default App;