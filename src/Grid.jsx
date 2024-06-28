import React, { useState } from 'react';
import solveSudoku from './solver';

const Grid = () => {
  const [grid, setGrid] = useState(Array(9).fill().map(() => Array(9).fill('')));
  const [error, setError] = useState('');

  const handleChange = (row, col, value) => {
    if (value === '' || (/^[1-9]$/.test(value) && grid[row][col] !== value)) {
      const newGrid = grid.map((r, rowIndex) =>
        r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
      );
      setGrid(newGrid);
      setError('');  // Clear error if input is valid
    } else {
      setError('Invalid input! Please enter digits 1-9.');
    }
  };

  const handleSolve = () => {
    const newGrid = grid.map(row => row.slice());
    if (solveSudoku(newGrid)) {
      setGrid(newGrid);
    } else {
      setError("No solution exists");
    }
  };

  const handleReset = () => {
    setGrid(Array(9).fill().map(() => Array(9).fill('')));
    setError('');
  };

  const getClassName = (rowIndex, colIndex) => {
    let className = "input input-bordered w-14 h-14 text-center text-xl border";
    if (rowIndex % 3 === 2) {
      className += " border-b-2";
    }
    if (colIndex % 3 === 2) {
      className += " border-r-2";
    }
    if (rowIndex === 8) {
      className += " border-b-0";
    }
    if (colIndex === 8) {
      className += " border-r-0";
    }
    return className;
  };

  return (
    <div className="flex flex-col items-center">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div className="grid grid-cols-9 gap-0">
        {grid.map((row, rowIndex) => (
          <React.Fragment key={rowIndex}> 
            {row.map((cell, colIndex) => (
              <input
                key={colIndex}
                type="text"
                maxLength="1"
                value={cell}
                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                className={getClassName(rowIndex, colIndex)}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 space-x-4">
        <button onClick={handleSolve} className="btn btn-primary">Solve</button>
        <button onClick={handleReset} className="btn btn-secondary">Reset</button>
      </div>
    </div>
  );
};  

export default Grid;